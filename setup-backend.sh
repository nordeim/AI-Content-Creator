#!/bin/bash

# AI Content Creator - Backend Setup Script
# This script completes the backend setup once credentials are provided

set -e

echo "========================================"
echo "AI Content Creator - Backend Setup"
echo "========================================"
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required tools
if ! command_exists curl; then
    echo "Error: curl is not installed"
    exit 1
fi

echo "Step 1: Verify Credentials"
echo "----------------------------"

# Check for OpenAI API key
if [ -z "$OPENAI_API_KEY" ]; then
    echo "❌ OPENAI_API_KEY is not set"
    echo "   Please export your OpenAI API key:"
    echo "   export OPENAI_API_KEY='your_openai_key_here'"
    exit 1
else
    echo "✅ OpenAI API key found"
fi

# Check for Supabase URL
if [ -z "$SUPABASE_URL" ]; then
    echo "❌ SUPABASE_URL is not set"
    echo "   Please export your Supabase URL:"
    echo "   export SUPABASE_URL='https://your-project.supabase.co'"
    exit 1
else
    echo "✅ Supabase URL found"
fi

# Check for Supabase anon key
if [ -z "$SUPABASE_ANON_KEY" ]; then
    echo "❌ SUPABASE_ANON_KEY is not set"
    echo "   Please export your Supabase anon key:"
    echo "   export SUPABASE_ANON_KEY='your_anon_key_here'"
    exit 1
else
    echo "✅ Supabase anon key found"
fi

echo ""
echo "Step 2: Update Frontend Configuration"
echo "--------------------------------------"

# Update frontend .env file
cat > ai-content-creator-frontend/.env << EOF
VITE_SUPABASE_URL=$SUPABASE_URL
VITE_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
EOF

echo "✅ Frontend .env file updated"

echo ""
echo "Step 3: Database Tables"
echo "-----------------------"
echo "⚠️  Manual step required:"
echo ""
echo "Please run the following SQL in your Supabase SQL Editor:"
echo ""
cat << 'EOSQL'
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    industry VARCHAR(255),
    brand_voice VARCHAR(255),
    target_audience TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create contents table
CREATE TABLE IF NOT EXISTS contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    platform VARCHAR(50),
    original_text TEXT NOT NULL,
    edited_text TEXT,
    topic VARCHAR(500),
    tone VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    rating INTEGER,
    message TEXT NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_contents_user_id ON contents(user_id);
CREATE INDEX IF NOT EXISTS idx_contents_created_at ON contents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contents_content_type ON contents(content_type);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
EOSQL

echo ""
echo "Press Enter after you have created the tables..."
read

echo ""
echo "Step 4: Apply RLS Policies"
echo "--------------------------"
echo "⚠️  Manual step required:"
echo ""
echo "Please run the RLS policies from: supabase/rls_policies.sql"
echo "in your Supabase SQL Editor"
echo ""
echo "Press Enter after you have applied RLS policies..."
read

echo ""
echo "Step 5: Configure Supabase Edge Functions"
echo "------------------------------------------"
echo "⚠️  Manual step required:"
echo ""
echo "1. Go to your Supabase project settings"
echo "2. Navigate to Edge Functions → Secrets"
echo "3. Add the secret:"
echo "   Name: OPENAI_API_KEY"
echo "   Value: $OPENAI_API_KEY"
echo ""
echo "Press Enter after you have set the secret..."
read

echo ""
echo "Step 6: Deploy Edge Functions"
echo "------------------------------"
echo "⚠️  Manual step required:"
echo ""
echo "The edge functions need to be deployed using the Supabase CLI or through the deployment system."
echo "Files to deploy:"
echo "  - supabase/functions/generate-content/index.ts"
echo "  - supabase/functions/get-user-stats/index.ts"
echo ""
echo "Press Enter after edge functions are deployed..."
read

echo ""
echo "Step 7: Rebuild and Redeploy Frontend"
echo "--------------------------------------"

cd ai-content-creator-frontend
echo "Building frontend with updated configuration..."
pnpm build

echo ""
echo "✅ Frontend build complete"
echo ""
echo "The updated dist/ folder is ready for deployment."
echo ""

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Deploy the updated frontend from ai-content-creator-frontend/dist/"
echo "2. Test the application end-to-end"
echo "3. Verify content generation works with OpenAI"
echo ""
echo "Application URL: https://krxypi6hki7u.space.minimax.io"
echo ""
