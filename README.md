# Abraham Translation Service

Professional translation service platform specializing in legal, medical, and technical document translation.

## Features

- **Document Upload & Management** - Secure file upload with support for multiple formats
- **Instant Quote Generation** - Automated pricing based on document type, language pair, and urgency
- **Order Tracking** - Real-time status updates and progress tracking
- **Admin Dashboard** - Complete order management system for translators
- **Email Notifications** - Automated client and admin notifications
- **Multi-language Support** - 10+ language pairs available

## Services

- Legal document translation
- Medical document translation  
- Technical documentation
- Business document translation
- Certified translations available

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **File Storage**: Supabase Storage
- **Email**: Resend API
- **UI Components**: Radix UI, shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Supabase account
- Resend account (for email notifications)

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run database migrations
5. Start development server: `npm run dev`

### Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Deployment

This application is optimized for deployment on Vercel with Supabase as the backend service.

## License

MIT License - see LICENSE file for details.

## Contact

For support or inquiries, contact: info@abrahamtranslation.com
