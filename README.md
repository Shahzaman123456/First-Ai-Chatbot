# AI Chatbot & Review Summarizer

Full-stack AI monorepo with two features — a theme park support chatbot and a product review summarizer.

## Tech Stack

**Backend** — Bun, Express, TypeScript, Prisma 7, MariaDB, Groq SDK  
**Frontend** — React 19, Vite, TailwindCSS, shadcn/ui, React Query  
**AI** — Groq LLaMA 3.3 70B · Hugging Face API · Ollama (local)

## Features

- 🤖 WonderWorld chatbot with conversation history & system prompt engineering
- ⭐ Review summarizer with 7-day LLM summary caching
- 🔄 Multi-provider LLM switching (Groq / Hugging Face / Ollama)
- 🏗️ Clean architecture — Controller → Service → Repository
- 🎨 Skeleton loaders, star ratings, React Query mutations

## Setup

```bash
# Install
bun install

# Environment — create pakages/server/.env
DATABASE_URL="mysql://root:password@localhost:3306/review_summrizer"
GROQ_API_KEY=your_key_here

# Database
cd pakages/server
bunx prisma migrate dev

# Run
bun run dev
```

**Server** → http://localhost:3000  
**Client** → http://localhost:5173

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products/:id/reviews` | Reviews + cached summary |
| POST | `/api/products/:id/reviews/summarize` | Generate AI summary |
| POST | `/api/chat` | WonderWorld chatbot |

---

**Shahzaman Ali** · [GitHub](https://github.com/Shahzaman123456) · [Fiverr](https://www.fiverr.com/shahzamanali123)
