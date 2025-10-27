import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Content, UserStats } from '@/types';
import { Plus, FileText, TrendingUp } from 'lucide-react';

export function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentContent, setRecentContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const [statsResponse, contentsResponse] = await Promise.all([
        supabase.functions.invoke('get-user-stats'),
        supabase
          .from('contents')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      if (statsResponse.data?.data) {
        setStats(statsResponse.data.data);
      }

      if (contentsResponse.data) {
        setRecentContent(contentsResponse.data);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back! Here is your content overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FileText size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Content</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalContent || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <TrendingUp size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Social Posts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.contentByType?.social_post || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FileText size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ad Copy</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.contentByType?.ad_copy || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/generate"
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Plus size={24} className="text-gray-400 mr-2" />
              <span className="font-medium text-gray-700">Generate New Content</span>
            </Link>
            <Link
              to="/profile-setup"
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FileText size={24} className="text-gray-400 mr-2" />
              <span className="font-medium text-gray-700">Update Profile</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Content</h2>
          {recentContent.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">No content generated yet</p>
              <Link
                to="/generate"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Generate Your First Content
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentContent.map((content) => (
                <div
                  key={content.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          content.content_type === 'social_post'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {content.content_type === 'social_post' ? 'Social Post' : 'Ad Copy'}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">{content.platform}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(content.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Topic: {content.topic}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {content.edited_text || content.original_text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
