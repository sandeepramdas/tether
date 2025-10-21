# 🔗 Tether

**Universal Skills Marketplace** - Connect every skill with every need, anywhere, anytime

## 🌟 Overview

Tether is a revolutionary marketplace platform that connects people with skills to people with needs. Whether you're looking for local services or remote expertise, Tether makes it seamless, secure, and efficient.

## ✨ Key Features

- 🎯 **AI-Powered Matching** - Intelligent algorithm matches seekers with the perfect providers
- 🔒 **Secure Payments** - Escrow-protected transactions with instant payouts
- ✅ **Multi-Level Verification** - Background checks, licenses, and identity verification
- 💬 **Real-Time Messaging** - Built-in chat and video calling
- 🌍 **Global & Local** - From hyperlocal neighborhood services to worldwide remote work
- ⭐ **Trust & Safety** - Comprehensive review system and dispute resolution
- 📱 **Mobile-First** - Beautiful, responsive design across all devices

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Framer Motion** - Smooth animations

### Backend
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Robust relational database
- **NextAuth.js** - Authentication
- **Stripe** - Payment processing

### Infrastructure
- **Vercel** - Deployment platform
- **AWS S3** - File storage
- **Socket.io** - Real-time communication

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

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
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   npm run db:generate  # Generate Prisma client
   npm run db:push      # Create database schema
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
tether/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth routes (login, signup)
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   ├── providers/         # Provider pages
│   └── seekers/           # Seeker pages
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   ├── services/         # Service-related components
│   └── auth/             # Authentication components
├── lib/                   # Utility libraries
│   ├── db.ts             # Prisma client
│   ├── utils.ts          # Helper functions
│   └── api/              # API utilities
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema
└── public/               # Static assets
```

## 🗄️ Database Schema

The platform uses a comprehensive database schema supporting:

- **Users** - Authentication and profiles
- **Provider Profiles** - Professional details and verification
- **Skills** - Hierarchical skill taxonomy
- **Services** - Service listings and catalogs
- **Job Posts** - Service requests and needs
- **Bookings** - Transactions and scheduling
- **Reviews** - Ratings and feedback
- **Messages** - Real-time communication
- **Notifications** - Multi-channel alerts

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Create and run migrations
npm run db:studio    # Open Prisma Studio
```

## 🎯 Roadmap

### Phase 1: MVP (Months 1-3)
- [x] Project initialization
- [x] Database schema design
- [x] Basic UI components
- [ ] Authentication system
- [ ] Provider/Seeker profiles
- [ ] Service listings
- [ ] Basic matching
- [ ] Payment integration

### Phase 2: Growth (Months 4-6)
- [ ] AI-powered matching algorithm
- [ ] Real-time messaging
- [ ] Mobile app (React Native)
- [ ] Advanced verification
- [ ] Review system

### Phase 3: Scale (Months 7-12)
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] B2B marketplace
- [ ] API for partners
- [ ] Global expansion

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Star History

If you find Tether useful, please consider giving it a star! ⭐

## 📧 Contact

- Website: [tether.com](https://tether.com)
- Email: hello@tether.com
- Twitter: [@tether](https://twitter.com/tether)

---

Built with ❤️ by the Tether Team
