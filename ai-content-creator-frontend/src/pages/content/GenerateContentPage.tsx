import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { CONTENT_TYPES, PLATFORMS, TONES, CHARACTER_LIMITS } from '@/lib/constants';
import { ContentGenerationRequest, Profile } from '@/types';
import { Copy, Download } from 'lucide-react';

export function GenerateContentPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [formData, setFormData] = useState<ContentGenerationRequest>({
    contentType: 'social_post',
    platform: '',
    topic: '',
    tone: '',
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleGenerate = async () => {
    if (!formData.topic || !formData.platform) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setGeneratedContent('');
    setEditedContent('');

    try {
      const requestBody = {
        ...formData,
        brandVoice: profile?.brand_voice || undefined,
        targetAudience: profile?.target_audience || undefined,
        industry: profile?.industry || undefined,
      };

      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: requestBody,
      });

      if (error) throw error;

      const content = data?.data?.content || data?.content;
      setGeneratedContent(content);
      setEditedContent(content);
    } catch (error: any) {
      console.error('Error generating content:', error);
      alert(`Failed to generate content: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedContent);
    alert('Content copied to clipboard!');
  };

  const downloadContent = () => {
    const blob = new Blob([editedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentPlatforms = PLATFORMS[formData.contentType];
  const characterLimit = formData.platform ? CHARACTER_LIMITS[formData.platform as keyof typeof CHARACTER_LIMITS] : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Content</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {CONTENT_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, contentType: type.value, platform: '' });
                      setGeneratedContent('');
                    }}
                    className={`py-3 px-4 rounded-md font-medium transition-colors ${
                      formData.contentType === type.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                id="platform"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select platform</option>
                {currentPlatforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                Topic / Product
              </label>
              <textarea
                id="topic"
                rows={3}
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="Describe what you want to create content about..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
                Tone (Optional)
              </label>
              <select
                id="tone"
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select tone</option>
                {TONES.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Content'}
            </button>
          </div>
        </div>

        {generatedContent && (
          <div className="bg-white shadow rounded-lg p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Generated Content</h3>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy size={20} />
                </button>
                <button
                  onClick={downloadContent}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Download"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>

            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            />

            {characterLimit && (
              <div className="mt-2 text-sm text-gray-600">
                Character count: {editedContent.length} / {characterLimit}
                {editedContent.length > characterLimit && (
                  <span className="text-red-600 ml-2">Exceeds platform limit</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
