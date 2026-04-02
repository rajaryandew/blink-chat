# Blink Chat

A modern, real-time chat application built with Next.js, Socket.io, and TypeScript. Experience instant messaging with a sleek, responsive interface and real-time synchronization across all connected clients.

**Live Demo:** https://blink-chat-web.vercel.app

## ✨ Features

- **Real-time Messaging** - Instant message delivery powered by Socket.io
- **User Authentication** - Secure authentication with better-auth
- **User Avatars** - Profile pictures and avatar support
- **Responsive Design** - Mobile-friendly interface built with Tailwind CSS
- **Dark Mode** - Seamless theme switching with next-themes
- **Type Safe** - 100% TypeScript for maximum code safety
- **Monorepo Architecture** - Scalable project structure with Turbo
- **Database Backed** - PostgreSQL with Prisma ORM

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 10.28.1 (or npm/yarn)
- PostgreSQL database

### Installation

1. Clone the repository
```
git clone https://github.com/rajaryandew/blink-chat.git
cd blink-chat
```

2. Install dependencies
```
pnpm install
```

3. Set up environment variables
```
# Create .env.local in apps/web
cp apps/web/.env.example apps/web/.env.local

# Create .env in apps/socket
cp apps/socket/.env.example apps/socket/.env
```

Configure these variables:
- DATABASE_URL - PostgreSQL connection string
- BETTER_AUTH_SECRET - Authentication secret key
- SOCKET_SERVER_URL - WebSocket server URL (localhost:3001 for development)

4. Set up the database
```
pnpm run db:push
```

5. Start development servers
```
pnpm dev
```

- Web app: http://localhost:3000
- Socket server: http://localhost:3001

## 📁 Project Structure

```
blink-chat/
├── apps/
│   ├── web/              # Next.js frontend application
│   ├── socket/           # Socket.io server for real-time messaging
│   └── docs/             # Documentation app
├── packages/
│   ├── database/         # Prisma schemas & database utilities
│   ├── schema/           # Shared TypeScript types & validation
│   ├── error/            # Error handling utilities
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/# Shared TypeScript configuration
└── turbo.json            # Turborepo configuration
```

## 🛠️ Available Scripts

From the root directory:

```
# Development
pnpm dev          # Start all apps in development mode
pnpm dev --filter=web   # Start only the web app

# Building
pnpm build        # Build all apps and packages
pnpm build --filter=socket  # Build specific app

# Code Quality
pnpm lint         # Run ESLint across the monorepo
pnpm format       # Format code with Prettier
pnpm check-types  # Run TypeScript type checking
```

## 🏗️ Tech Stack

**Frontend:**
- Next.js 16 - React framework
- React 19 - UI library
- Tailwind CSS 4 - Styling
- Radix UI - Accessible components
- React Hook Form - Form handling
- Socket.io Client - Real-time communication

**Backend:**
- Socket.io - WebSocket server
- Node.js - JavaScript runtime
- Prisma - ORM & database management
- Better Auth - Authentication

**Database:**
- PostgreSQL - Relational database

**Developer Experience:**
- TypeScript - Type safety
- Turbo - Monorepo management
- ESLint - Code linting
- Prettier - Code formatting

## 📖 Getting Help

- Check out the Next.js documentation: https://nextjs.org/docs
- Read the Socket.io docs: https://socket.io/docs/
- Review Prisma documentation: https://www.prisma.io/docs/

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

## 👨‍💻 Author

Created by @rajaryandew (https://github.com/rajaryandew)