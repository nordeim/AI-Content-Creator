Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        // Get user from auth header
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            throw new Error('No authorization header');
        }

        const token = authHeader.replace('Bearer ', '');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Verify token and get user
        const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'apikey': serviceRoleKey
            }
        });

        if (!userResponse.ok) {
            throw new Error('Invalid token');
        }

        const userData = await userResponse.json();
        const userId = userData.id;

        // Get total content count
        const totalContentResponse = await fetch(
            `${supabaseUrl}/rest/v1/contents?user_id=eq.${userId}&select=count`,
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json',
                    'Prefer': 'count=exact'
                }
            }
        );

        const totalContentData = await totalContentResponse.json();
        const totalContent = totalContentData.length || 0;

        // Get content by type
        const contentByTypeResponse = await fetch(
            `${supabaseUrl}/rest/v1/contents?user_id=eq.${userId}&select=content_type`,
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        const contentByTypeData = await contentByTypeResponse.json();
        
        const contentByType = {
            social_post: contentByTypeData.filter(c => c.content_type === 'social_post').length,
            ad_copy: contentByTypeData.filter(c => c.content_type === 'ad_copy').length
        };

        // Get recent content (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const isoDate = sevenDaysAgo.toISOString();

        const recentContentResponse = await fetch(
            `${supabaseUrl}/rest/v1/contents?user_id=eq.${userId}&created_at=gte.${isoDate}&select=count`,
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json',
                    'Prefer': 'count=exact'
                }
            }
        );

        const recentContentData = await recentContentResponse.json();
        const recentContent = recentContentData.length || 0;

        return new Response(JSON.stringify({
            data: {
                totalContent,
                contentByType,
                recentContent,
                userId
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Stats error:', error);

        const errorResponse = {
            error: {
                code: 'STATS_FETCH_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
