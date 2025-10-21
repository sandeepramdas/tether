# Development Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Git installed

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sandeepramdas/tether.git
   cd tether
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure:
   ```env
   # Required for basic functionality
   DATABASE_URL="postgresql://postgres:password@localhost:5432/tether"
   NEXTAUTH_SECRET="run: openssl rand -base64 32"
   NEXTAUTH_URL="http://localhost:3000"

   # Optional: OAuth providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**

   Create PostgreSQL database:
   ```bash
   createdb tether
   ```

   Generate Prisma client and create tables:
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to http://localhost:3000

## 🔑 Authentication Setup

### Email/Password Authentication
Works out of the box! Just sign up at `/signup`

### Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env`

### GitHub OAuth (Optional)

1. Go to [GitHub Settings > Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to `.env`

## 📁 Project Structure

```
tether/
├── app/                        # Next.js App Router
│   ├── (auth)/                # Auth pages (login, signup)
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── (dashboard)/           # Protected routes
│   │   └── dashboard/
│   ├── api/                   # API routes
│   │   └── auth/
│   │       ├── [...nextauth]/ # NextAuth handler
│   │       └── register/      # Registration API
│   ├── onboarding/            # User onboarding
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   ├── providers.tsx          # Session provider
│   └── globals.css            # Global styles
├── components/
│   ├── auth/                  # Auth components
│   │   ├── login-form.tsx
│   │   └── signup-form.tsx
│   ├── layout/                # Layout components
│   │   └── navbar.tsx
│   └── ui/                    # UI primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── label.tsx
├── lib/
│   ├── auth/                  # Auth utilities
│   │   └── session.ts
│   ├── auth.ts                # NextAuth config
│   ├── db.ts                  # Prisma client
│   └── utils.ts               # Helper functions
├── prisma/
│   └── schema.prisma          # Database schema
├── types/
│   └── next-auth.d.ts         # NextAuth types
├── middleware.ts              # Route protection
└── package.json
```

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema to database (dev)
npm run db:migrate       # Create migration
npm run db:studio        # Open Prisma Studio

# Type Checking
npm run type-check       # Run TypeScript compiler
```

## 🗄️ Database Schema

### Core Models

1. **User** - User accounts and profiles
2. **Account** - OAuth provider accounts
3. **Session** - User sessions
4. **ProviderProfile** - Provider-specific data
5. **Skill** - Hierarchical skill taxonomy
6. **Service** - Service listings
7. **JobPost** - Service requests
8. **Booking** - Transactions
9. **Review** - Ratings and reviews
10. **Message** - Chat messages
11. **Notification** - User notifications

### View Schema
```bash
npm run db:studio
```
This opens Prisma Studio at http://localhost:5555

## 🔐 Authentication Flow

### Registration
1. User visits `/signup`
2. Fills form (email, password, name, user type)
3. API validates and creates user with hashed password
4. Auto-login with credentials
5. Redirect to `/onboarding`

### Login
1. User visits `/login`
2. Enters email/password OR uses OAuth
3. NextAuth validates credentials
4. Session created with JWT
5. Redirect to `/dashboard`

### Protected Routes
Routes under `/dashboard`, `/onboarding`, `/messages`, `/bookings` require authentication.
Middleware automatically redirects to `/login` if not authenticated.

## 🎨 UI Components

Built with shadcn/ui and Radix UI primitives:
- Fully accessible (ARIA labels, keyboard navigation)
- Dark mode ready (theme variables)
- Responsive design
- Smooth animations with Framer Motion

### Adding New Components
```bash
# Install shadcn component
npx shadcn-ui@latest add [component-name]
```

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
pg_isready

# Test connection
psql -U postgres -c "SELECT version();"

# Reset database
npm run db:push --force-reset
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma Client
npm run db:generate
```

### Authentication Issues
- Clear browser cookies
- Check `.env` has `NEXTAUTH_SECRET` set
- Verify database has Account and Session tables
- Check browser console for errors

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production
```env
DATABASE_URL="postgresql://..."  # Production database
NEXTAUTH_SECRET="..."            # Generate new secret
NEXTAUTH_URL="https://yourdomain.com"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests (when available)
5. Submit pull request

## ⚡ Performance Tips

- Use `npm run build` to test production build locally
- Monitor bundle size: `npm run build -- --profile`
- Use Chrome DevTools Lighthouse for audits
- Enable Edge Runtime for API routes when possible

## 🔒 Security Best Practices

- Never commit `.env` file
- Use environment variables for secrets
- Keep dependencies updated: `npm audit`
- Review security alerts in GitHub
- Use HTTPS in production
- Implement rate limiting for APIs
- Validate all user inputs

---

Happy coding! 🚀
