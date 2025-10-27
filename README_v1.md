# AI Content Creator

A full-stack web application that enables small business owners to generate tailored marketing content using AI with minimal input.

## Features

- **User Authentication**: Secure registration and login with Supabase Auth
- **Business Profile Setup**: Industry selection, brand voice preferences, and target audience definition
- **AI Content Generation**: Generate social media posts and ad copy using OpenAI GPT
- **Content Management**: Edit, copy, and download generated content
- **Dashboard**: View content statistics and history

## Technology Stack

### Frontend
- React 18 with TypeScript
- TailwindCSS for styling
- React Router for navigation
- Supabase Client for backend integration
- Lucide React for icons

### Backend
- Supabase (PostgreSQL database)
- Supabase Edge Functions (Deno runtime)
- Supabase Auth for authentication
- OpenAI GPT API for content generation

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account and project
- OpenAI API key

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Edge Functions environment variables (set in Supabase):

```env
OPENAI_API_KEY=your_openai_api_key
```

### Installation

1. Install dependencies:
```bash
cd ai-content-creator-frontend
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

3. Build for production:
```bash
pnpm build
```

## Database Schema

### profiles
- id: UUID (Primary Key)
- user_id: UUID (References auth.users)
- industry: VARCHAR(255)
- brand_voice: VARCHAR(255)
- target_audience: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP

### contents
- id: UUID (Primary Key)
- user_id: UUID (References auth.users)
- content_type: VARCHAR(50) (social_post or ad_copy)
- platform: VARCHAR(50)
- original_text: TEXT
- edited_text: TEXT
- topic: VARCHAR(500)
- tone: VARCHAR(50)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP

### feedback
- id: UUID (Primary Key)
- user_id: UUID (References auth.users)
- rating: INTEGER
- message: TEXT
- category: VARCHAR(100)
- created_at: TIMESTAMP

## Edge Functions

### generate-content
Generates AI-powered content using OpenAI GPT API.

**Endpoint**: `POST /functions/v1/generate-content`

**Request Body**:
```json
{
  "contentType": "social_post" | "ad_copy",
  "platform": "Instagram" | "Facebook" | "Twitter" | etc,
  "topic": "Description of what to write about",
  "tone": "Neutral" | "Excited" | "Professional" | etc,
  "brandVoice": "Professional" | "Casual" | etc,
  "targetAudience": "Description of target audience",
  "industry": "Technology" | "Healthcare" | etc
}
```

### get-user-stats
Retrieves user content statistics for the dashboard.

**Endpoint**: `GET /functions/v1/get-user-stats`

**Response**:
```json
{
  "totalContent": number,
  "contentByType": {
    "social_post": number,
    "ad_copy": number
  },
  "recentContent": number,
  "userId": string
}
```

## Usage

1. **Sign Up**: Create an account with email and password
2. **Set Up Profile**: Enter your business information, industry, brand voice, and target audience
3. **Generate Content**: Select content type (social post or ad), choose platform, enter topic
4. **Edit and Export**: Review generated content, make edits, and copy or download
5. **View Dashboard**: Track your content generation statistics and history

## Security Features

- JWT-based authentication
- Row-level security (RLS) policies on all tables
- Secure API key management via environment variables
- Input validation and sanitization
- CORS configuration for edge functions

## License

MIT

## Support

For support and questions, please open an issue in the repository.
