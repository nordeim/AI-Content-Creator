export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  industry: string | null;
  brand_voice: string | null;
  target_audience: string | null;
  created_at: string;
  updated_at: string;
}

export interface Content {
  id: string;
  user_id: string;
  content_type: 'social_post' | 'ad_copy';
  platform: string;
  original_text: string;
  edited_text: string | null;
  topic: string;
  tone: string;
  created_at: string;
  updated_at: string;
}

export interface Feedback {
  id: string;
  user_id: string;
  rating: number | null;
  message: string;
  category: string | null;
  created_at: string;
}

export interface ContentGenerationRequest {
  contentType: 'social_post' | 'ad_copy';
  platform: string;
  topic: string;
  tone?: string;
  brandVoice?: string;
  targetAudience?: string;
  industry?: string;
}

export interface ContentGenerationResponse {
  content: string;
  contentType: string;
  platform: string;
  topic: string;
  userId: string | null;
}

export interface UserStats {
  totalContent: number;
  contentByType: {
    social_post: number;
    ad_copy: number;
  };
  recentContent: number;
  userId: string;
}
