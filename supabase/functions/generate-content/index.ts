Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        // Get request body
        const { contentType, platform, topic, tone, brandVoice, targetAudience, industry } = await req.json();

        if (!contentType || !topic) {
            throw new Error('Content type and topic are required');
        }

        // Get OpenAI API key
        const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
        if (!openaiApiKey) {
            throw new Error('OpenAI API key not configured');
        }

        // Build prompt based on content type
        let systemPrompt = '';
        let userPrompt = '';

        if (contentType === 'social_post') {
            systemPrompt = `You are an expert social media content creator. Generate engaging ${platform || 'social media'} posts that capture attention and drive engagement. ${brandVoice ? `Write in a ${brandVoice} tone.` : ''} ${targetAudience ? `Target audience: ${targetAudience}.` : ''} ${industry ? `Industry: ${industry}.` : ''}`;
            userPrompt = `Create a compelling social media post about: ${topic}. ${tone ? `Tone: ${tone}.` : ''} Include relevant hashtags and call-to-action. Keep it concise and engaging.`;
        } else if (contentType === 'ad_copy') {
            systemPrompt = `You are an expert advertising copywriter. Create persuasive ad copy that converts. ${brandVoice ? `Write in a ${brandVoice} tone.` : ''} ${targetAudience ? `Target audience: ${targetAudience}.` : ''} ${industry ? `Industry: ${industry}.` : ''}`;
            userPrompt = `Write compelling ${platform || 'digital'} ad copy for: ${topic}. ${tone ? `Tone: ${tone}.` : ''} Focus on benefits, create urgency, and include a clear call-to-action.`;
        } else {
            throw new Error('Invalid content type. Must be social_post or ad_copy');
        }

        // Call OpenAI API
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!openaiResponse.ok) {
            const errorData = await openaiResponse.json();
            throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const openaiData = await openaiResponse.json();
        const generatedContent = openaiData.choices[0]?.message?.content;

        if (!generatedContent) {
            throw new Error('No content generated from OpenAI');
        }

        // Get user from auth header
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        let userId = null;

        if (token && supabaseUrl && serviceRoleKey) {
            try {
                // Verify token and get user
                const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'apikey': serviceRoleKey
                    }
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    userId = userData.id;

                    // Save content to database
                    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/contents`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${serviceRoleKey}`,
                            'apikey': serviceRoleKey,
                            'Content-Type': 'application/json',
                            'Prefer': 'return=representation'
                        },
                        body: JSON.stringify({
                            user_id: userId,
                            content_type: contentType,
                            platform: platform || 'general',
                            original_text: generatedContent,
                            edited_text: generatedContent,
                            topic: topic,
                            tone: tone || 'neutral'
                        })
                    });

                    if (!insertResponse.ok) {
                        console.error('Database insert failed:', await insertResponse.text());
                    }
                }
            } catch (error) {
                console.error('Error saving to database:', error);
            }
        }

        return new Response(JSON.stringify({
            data: {
                content: generatedContent,
                contentType: contentType,
                platform: platform,
                topic: topic,
                userId: userId
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Content generation error:', error);

        const errorResponse = {
            error: {
                code: 'CONTENT_GENERATION_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
