export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'E-commerce',
  'Education',
  'Real Estate',
  'Food & Beverage',
  'Travel & Tourism',
  'Fashion & Beauty',
  'Sports & Fitness',
  'Entertainment',
  'Automotive',
  'Construction',
  'Legal Services',
  'Marketing & Advertising',
  'Non-Profit',
  'Retail',
  'Manufacturing',
  'Consulting',
  'Other'
] as const;

export const BRAND_VOICES = [
  'Professional',
  'Casual',
  'Friendly',
  'Humorous',
  'Inspirational',
  'Authoritative',
  'Conversational',
  'Educational',
  'Luxury',
  'Bold'
] as const;

export const TONES = [
  'Neutral',
  'Excited',
  'Confident',
  'Urgent',
  'Friendly',
  'Professional',
  'Playful',
  'Informative'
] as const;

export const CONTENT_TYPES = [
  { value: 'social_post', label: 'Social Media Post' },
  { value: 'ad_copy', label: 'Ad Copy' }
] as const;

export const PLATFORMS = {
  social_post: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok'],
  ad_copy: ['Google Ads', 'Facebook Ads', 'Instagram Ads', 'LinkedIn Ads']
} as const;

export const CHARACTER_LIMITS = {
  Instagram: 2200,
  Facebook: 63206,
  Twitter: 280,
  LinkedIn: 3000,
  TikTok: 2200,
  'Google Ads': 90,
  'Facebook Ads': 125,
  'Instagram Ads': 125,
  'LinkedIn Ads': 600
} as const;
