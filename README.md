# Blink Chat

A real-time chat application built to deeply explore WebSockets, system design, and scalable frontend-backend architecture.

**Live Demo:** [https://blink-chat-web.vercel.app](https://blink-chat-web.vercel.app)

---

## 🧠 Why I Built This

This project was built to understand how real-time systems actually work under the hood — not just sending messages, but handling synchronization, connections, and data flow between multiple clients.

Instead of focusing on UI-heavy features, the goal was to design a clean, scalable architecture for real-time communication.

---

## ✨ Core Features

* **Real-time Messaging** — Instant message delivery using WebSockets
* **Authentication** — Secure user authentication system
* **Responsive UI** — Works smoothly across devices
* **Dark Mode** — Theme switching support
* **Type Safety** — Fully written in TypeScript
* **Persistent Storage** — Messages stored in PostgreSQL

---

## 🏗️ Architecture Highlights

* **Separated WebSocket server** from the frontend for better scalability
* **Monorepo structure** using Turbo for organized and efficient development
* **Shared packages** for types, schemas, and utilities across apps
* **Database layer abstraction** using Prisma ORM
* Designed with **real-world scalability patterns in mind**, not just a single-server setup

---

## 📁 Project Structure

```
blink-chat/
├── apps/
│   ├── web/              # Next.js frontend
│   ├── socket/           # WebSocket server (Socket.io)
│   └── docs/             # Documentation app
├── packages/
│   ├── database/         # Prisma schema & DB utilities
│   ├── schema/           # Shared validation & types
│   ├── error/            # Error handling utilities
│   ├── eslint-config/    # Shared lint rules
│   └── typescript-config/# Shared TS config
└── turbo.json
```

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* Radix UI
* Socket.io Client

### Backend

* Node.js
* Socket.io
* Prisma

### Database

* PostgreSQL

### Developer Experience

* TypeScript
* Turborepo
* ESLint + Prettier

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* pnpm / npm / yarn
* PostgreSQL database

### Setup

```bash
git clone https://github.com/rajaryandew/blink-chat.git
cd blink-chat
pnpm install
```

### Environment Variables

Create:

* `apps/web/.env.local`
* `apps/socket/.env`

Add:

```
DATABASE_URL=
BETTER_AUTH_SECRET=
SOCKET_SERVER_URL=
```

### Run the App

```bash
pnpm dev
```

* Frontend → [http://localhost:3000](http://localhost:3000)
* Socket Server → [http://localhost:3001](http://localhost:3001)

---

## ⚙️ Available Scripts

```bash
pnpm dev              # run all apps
pnpm build            # build all apps
pnpm lint             # lint code
pnpm format           # format code
pnpm check-types      # type checking
```

---

## 📌 Notes

This project focuses on **core system design and real-time communication**, not full product-level features like advanced profiles, notifications, or complex UI flows.

---

## 👨‍💻 Author

Built by
[https://github.com/rajaryandew](https://github.com/rajaryandew)

---

## 📄 License

MIT License

---

## 🤝 Contributions

Feel free to open issues or submit PRs if you want to improve anything.