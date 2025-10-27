-- Row Level Security Policies for AI Content Creator

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Profiles table policies
-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.role() IN ('anon', 'service_role'));

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Contents table policies
-- Allow users to view their own content
CREATE POLICY "Users can view own content" ON contents
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert their own content (via edge function)
CREATE POLICY "Users can insert own content" ON contents
  FOR INSERT
  WITH CHECK (auth.role() IN ('anon', 'service_role'));

-- Allow users to update their own content
CREATE POLICY "Users can update own content" ON contents
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own content
CREATE POLICY "Users can delete own content" ON contents
  FOR DELETE
  USING (auth.uid() = user_id);

-- Feedback table policies
-- Allow users to view their own feedback
CREATE POLICY "Users can view own feedback" ON feedback
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert feedback
CREATE POLICY "Users can insert feedback" ON feedback
  FOR INSERT
  WITH CHECK (auth.role() IN ('anon', 'service_role'));

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_contents_user_id ON contents(user_id);
CREATE INDEX idx_contents_created_at ON contents(created_at DESC);
CREATE INDEX idx_contents_content_type ON contents(content_type);
CREATE INDEX idx_feedback_user_id ON feedback(user_id);
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
