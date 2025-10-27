import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { INDUSTRIES, BRAND_VOICES } from '@/lib/constants';
import { Profile } from '@/types';

export function ProfileSetupPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [existingProfile, setExistingProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    industry: '',
    brand_voice: '',
    target_audience: '',
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

      if (data) {
        setExistingProfile(data);
        setFormData({
          industry: data.industry || '',
          brand_voice: data.brand_voice || '',
          target_audience: data.target_audience || '',
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (existingProfile) {
        const { error } = await supabase
          .from('profiles')
          .update({
            industry: formData.industry,
            brand_voice: formData.brand_voice,
            target_audience: formData.target_audience,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingProfile.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('profiles')
          .insert({
            user_id: user?.id,
            industry: formData.industry,
            brand_voice: formData.brand_voice,
            target_audience: formData.target_audience,
          });

        if (error) throw error;
      }

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {existingProfile ? 'Update Your Profile' : 'Set Up Your Business Profile'}
          </h2>
          <p className="text-gray-600 mb-8">
            Tell us about your business to help us generate better content for you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select
                id="industry"
                required
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your industry</option>
                {INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="brand_voice" className="block text-sm font-medium text-gray-700 mb-2">
                Brand Voice
              </label>
              <select
                id="brand_voice"
                required
                value={formData.brand_voice}
                onChange={(e) => setFormData({ ...formData, brand_voice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your brand voice</option>
                {BRAND_VOICES.map((voice) => (
                  <option key={voice} value={voice}>
                    {voice}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="target_audience" className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <textarea
                id="target_audience"
                required
                rows={4}
                value={formData.target_audience}
                onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                placeholder="Describe your target audience (e.g., young professionals aged 25-35, interested in technology and innovation)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : existingProfile ? 'Update Profile' : 'Save Profile'}
              </button>
              {existingProfile && (
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
