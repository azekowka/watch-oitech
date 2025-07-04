# WATCH-OITECH

*Enjoy the newest movies*


---

# Демо-видео
https://youtu.be/R5Eip4lCQLE
# Деплоймент
https://watch-oitech.vercel.app

## Built with

- ![JSON](https://img.shields.io/badge/-JSON-black?logo=json&logoColor=white)
- ![pnpm](https://img.shields.io/badge/-npm-red?logo=npm&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow?logo=javascript&logoColor=black)
- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
- ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white)
- ![Next.js](https://img.shields.io/badge/-Next.js-black?logo=next.js&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwindcss&logoColor=white)
- ![Zustand](https://img.shields.io/badge/-Zustand-f39637?logo=Zustand&logoColor=white)
- ![Clerk](https://img.shields.io/badge/-Clerk-critical?logo=clerk&logoColor=white)
- ![TMDB](https://img.shields.io/badge/-TMDB-01B4E4?logo=themoviedatabase&logoColor=white)
- ![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?logo=prettier&logoColor=black)
- ![PostCSS](https://img.shields.io/badge/-PostCSS-DD3A0A?logo=postcss&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**WATCH-OITECH** - это SPA на Next.js/React для поиска фильмов и их сохранения.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (recommended v16 or later)
- [npm/pnpm/bun/yarn](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/azekowka/watch-oitech.git
   cd watch-oitech
   ```

2. **Install dependencies:**
   ```bash
   pnpm i
   ```
3. **Переименуйте .env.local.example на .env.local, и вставьте API key:**
   ```bash
    # API Provider - TBDB
   NEXT_PUBLIC_TMDB_API_KEY= #https://developer.themoviedb.org/docs/getting-started
   ```

### Usage

To start the development server, run:
```bash
pnpm dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

To build for production:
```bash
pnpm build
```

To run linter checks:
```bash
pnpm lint
```

---

## Project Structure

```
watch-oitech/
├── src/             # Application source code
├── public/          # Static public assets
├── package.json     # Project metadata and scripts
├── tsconfig.json    # TypeScript configuration
├── .eslint.config.mjs   # ESLint configuration
├── .prettierrc   # Prettier
├── .env.example  # Environmental variables
└── README.md        # Project documentation
```

---

## Built With

- **TypeScript** – строго типизированное надмножество JavaScript, помогает ловить ошибки на этапе компиляции.
- **React + React Hooks** – декларативный UI-фреймворк, обеспечивает реактивность и изоморфный рендеринг.
- **Next.js@latest (App Router)** – маршрутизация, SSR/SSG, оптимизация изображений, zero-config сборка.
- **Tailwind CSS** – утилитарный CSS-фреймворк, ускоряет верстку и упрощает поддержку стилей.
- **Zustand** – минималистичное состояние хранилище без boilerplate; удобно для избранных фильмов.
- **Clerk Auth** – готовая аутентификация (Sign-in/Sign-up, UserButton) в модальном режиме, + middleware для защиты роутов - было в процессе разработки
- **TMDB API** – источник данных популярного кино и деталей фильма.
- **ESLint & Prettier** – единое форматирование и контроль качества кода.
- **pnpm** – быстрый пакетный менеджер с dedupe-link стратегией.

---

### Key Code Highlights

#### 1. Получение «Trending» фильмов
```ts
// src/services/tmdb.ts
export async function getTrendingMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API}/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  if (!res.ok) throw new Error('Failed TMDB fetch');
  return res.json() as Promise<{ results: Movie[] }>;
}
```
Используется на странице `/home` через `useEffect` + локальный стейт.

#### 2. Динамический роут страницы фильма
```tsx
// src/app/movie/[id]/page.tsx
import { getMovie } from '@/services/tmdb';
export default async function MoviePage({ params }) {
  const movie = await getMovie(params.id);
  return <MovieDetails {...movie} />;
}
```
Благодаря **React Server Components** данные загружаются на сервере, а клиент получает уже готовую разметку.

#### 3. Zustand-стор избранного
```ts
// src/store/use-favourites.ts
import { create } from 'zustand';
interface FavState { list: number[]; toggle(id: number): void }
export const useFav = create<FavState>((set, get) => ({
  list: [],
  toggle: id => set({ list: get().list.includes(id) ? get().list.filter(i => i!==id) : [...get().list, id] })
}));
```

#### 4. Защита маршрутов (middleware)
```ts
// src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';
export default clerkMiddleware((auth, req) => {
  if (!auth.userId && !['/'].includes(req.nextUrl.pathname)) auth().redirectToSignIn();
});
```

#### 5. Кастомная 404 / Coming Soon
`src/components/404.tsx` содержит анимацию «палочек» + Canvas-эффект. Переиспользуется как заглушка **Coming Soon** для страниц Community/Social/Settings.

---

Эти разделы помогают быстро понять, какие технологии применены и где находятся ключевые части реализации проекта.

## Почему отказался от RapidAPI ?
![image](https://github.com/user-attachments/assets/7da94176-ff6f-4638-b030-e5d45ccc8b65)
Превысил лимит месячный, поэтому стал использовать TBDB API https://developer.themoviedb.org/docs/getting-started

## Contributing

We welcome contributions! If you have suggestions or improvements, please open an issue or submit a pull request.

1. Fork this repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a PR.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---
