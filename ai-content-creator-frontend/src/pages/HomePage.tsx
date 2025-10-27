import { Link } from 'react-router-dom';
import { Sparkles, Zap, Target } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            AI Content Creator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Generate professional marketing content in seconds with the power of AI
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered</h3>
            <p className="text-gray-600">
              Leverage advanced AI to generate engaging social media posts and ad copy tailored to your brand
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Generate high-quality content in seconds. No more spending hours writing and rewriting
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Targeted Content</h3>
            <p className="text-gray-600">
              Content customized for your industry, brand voice, and target audience
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Up Your Profile</h3>
              <p className="text-gray-600">
                Tell us about your business, industry, and target audience
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Content</h3>
              <p className="text-gray-600">
                Choose your content type, platform, and topic. Let AI do the rest
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Edit and Export</h3>
              <p className="text-gray-600">
                Fine-tune the content and export it for use across your channels
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
