# Deployment Guide - AI Content Creator

## Prerequisites

Before deploying, you need:
1. Supabase account and project
2. OpenAI API key
3. Supabase project credentials (URL, anon key, service role key)

## Step 1: Database Setup

### 1.1 Create Tables

The following tables need to be created in your Supabase project:

1. **profiles**
2. **contents**
3. **feedback**

Tables will be created automatically once Supabase credentials are provided.

### 1.2 Apply RLS Policies

After tables are created, apply the Row Level Security policies from:
`/workspace/ai-content-creator/supabase/rls_policies.sql`

You can run this SQL in your Supabase SQL Editor.

## Step 2: Edge Functions Deployment

### 2.1 Set Environment Variables

In your Supabase project, set the following secret:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 2.2 Deploy Edge Functions

Two edge functions need to be deployed:

1. **generate-content** - Handles AI content generation
2. **get-user-stats** - Retrieves user statistics

Functions will be deployed automatically once OpenAI API key is provided.

## Step 3: Frontend Configuration

### 3.1 Environment Variables

Create `.env` file in the frontend directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3.2 Build Frontend

```bash
cd ai-content-creator-frontend
pnpm install
pnpm build
```

### 3.3 Deploy Frontend

The `dist` folder can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## Step 4: Testing

### 4.1 Test Authentication
1. Register a new user
2. Login with credentials
3. Verify JWT tokens are working

### 4.2 Test Profile Setup
1. Complete business profile
2. Verify data saves to database
3. Check profile loads on subsequent visits

### 4.3 Test Content Generation
1. Navigate to Generate Content page
2. Select content type and platform
3. Enter topic and generate
4. Verify content is generated within 5 seconds
5. Test copy and download functionality

### 4.4 Test Dashboard
1. Verify statistics display correctly
2. Check recent content list
3. Test quick actions

## Step 5: Production Checklist

- [ ] Database tables created
- [ ] RLS policies applied
- [ ] Edge functions deployed and tested
- [ ] Frontend built and deployed
- [ ] Environment variables configured
- [ ] Authentication working
- [ ] Content generation working
- [ ] All pages responsive on mobile
- [ ] Error handling tested
- [ ] Performance optimized

## Monitoring and Maintenance

### Monitor Edge Functions
Check Supabase Edge Functions logs for errors:
- Database insert failures
- OpenAI API errors
- Authentication issues

### Database Maintenance
- Monitor table sizes
- Check query performance
- Review RLS policies

### User Feedback
Monitor the feedback table for:
- User satisfaction ratings
- Feature requests
- Bug reports

## Troubleshooting

### Common Issues

**Issue**: "new row violates row-level security policy"
**Solution**: Verify RLS policies allow both 'anon' and 'service_role'

**Issue**: Edge function returns 500 error
**Solution**: Check OpenAI API key is set correctly and has credits

**Issue**: Authentication not working
**Solution**: Verify Supabase URL and anon key in .env file

**Issue**: Content not saving
**Solution**: Check edge function logs and database permissions

## Security Considerations

1. **Never commit** `.env` files to version control
2. **Rotate keys** regularly (OpenAI, Supabase)
3. **Monitor usage** to prevent abuse
4. **Review RLS policies** before production
5. **Enable rate limiting** on edge functions
6. **Use HTTPS** for all production deployments

## Scaling Considerations

1. **Database**: Supabase handles scaling automatically
2. **Edge Functions**: Consider adding rate limiting for high traffic
3. **OpenAI API**: Monitor usage and set appropriate limits
4. **Frontend**: Use CDN for static asset delivery

## Support

For issues and questions:
1. Check Supabase logs
2. Review edge function code
3. Test with different inputs
4. Contact support if needed
