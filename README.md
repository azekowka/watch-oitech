# WATCH-OITECH

*Enjoy the newest movies*


---

# Демо-видео
https://youtu.be/R5Eip4lCQLE
# Деплоймент
https://watch-oitech.vercel.app

## Built with

- ![JSON](https://img.shields.io/badge/-JSON-black?logo=json&logoColor=white)
- ![Markdown](https://img.shields.io/badge/-Markdown-black?logo=markdown&logoColor=white)
- ![npm](https://img.shields.io/badge/-npm-red?logo=npm&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow?logo=javascript&logoColor=black)
- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
- ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white)
- ![YAML](https://img.shields.io/badge/-YAML-red?logo=yaml&logoColor=white)

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

- **TypeScript** – Strongly typed programming language that builds on JavaScript
- **React** – A strong library for frontend
- **Next.js** – A strong framework built on React
- **pnpm** – Optimized package manager
- **ESLint** – TypeScript linter

---

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
