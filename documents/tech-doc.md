## Panduan Teknis Senior Frontend - React JS Mini Project (Movie/Series)

Proyek ini bertujuan untuk mendemonstrasikan kemampuan _state management_ tingkat lanjut, _data fetching_ yang efisien, dan penerapan _best practices_ (Next.js, TypeScript, Atomic Design, React Query, ESLint/Prettier).

### I. Setup Proyek & Konfigurasi Kualitas Kode

### 1. Inisialisasi Proyek & Instalasi

Bash

`# Inisialisasi Next.js dengan TypeScript
npx create-next-app@latest senior-movie-project --typescript

# Instalasi Dependensi Utama

npm install tailwindcss postcss autoprefixer axios @tanstack/react-query @tanstack/react-query-devtools framer-motion

# Konfigurasi Tailwind

npx tailwindcss init -p`

### 2. Konfigurasi ESLint & Prettier

Integrasi ini memastikan konsistensi format dan kualitas kode.

Bash

`npm install -D prettier prettier-plugin-tailwindcss eslint-config-prettier`

**A. File `.eslintrc.json`**

JSON

`{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}`

**B. File `.prettierrc`**

JSON

`{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}`

### II. Struktur Proyek (Atomic Design)

Struktur yang bersih adalah kunci untuk _maintainability_ di level Senior.

`/src/
├── /app/           # Service layer: Axios instance dan functions
│   └── api/movies.ts
│   └── page.tsx
├── /components/
│   ├── /atoms/     # Button, Text, Icon
│   ├── /molecules/ # MovieCard, SearchInput
│   ├── /organisms/ # MovieList, Header, Footer
│   └── /templates/ # BaseLayout (Struktur Halaman)
├── /hooks/
│   ├── /query/     # React Query hooks: useGetMovies.ts
│   └── /utility/   # Custom hooks: useDebounce.ts
├── /types/         # Definisi Interface TypeScript
│   └── movie.ts
└── README.md       # Dokumentasi Proyek`

### III. Data Layer: Axios & React Query

### 1. Definisi Tipe (TypeScript)

Semua data API harus memiliki tipe yang jelas.

TypeScript

`// /src/types/movie.ts
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
}
export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}`

### 2. Service Layer (Axios)

Pisahkan logika _fetching_ data. Gunakan _Environment Variables_ untuk kunci API.

TypeScript

`// /src/api/movies.ts
import axios from 'axios';
import { MovieResponse } from '@/types/movie';

const movieApi = axios.create({
baseURL: 'https://api.themoviedb.org/3',
});

export const fetchPopularMovies = async (page: number = 1): Promise<MovieResponse> => {
const response = await movieApi.get('/movie/popular', {
params: {
api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
page: page,
},
});
return response.data;
};`

### 3. State Management (React Query)

Implementasikan _caching_, _re-fetching_, dan _error handling_ otomatis.

TypeScript

`// /src/hooks/query/useGetMovies.ts
import { useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from '@/api/movies';
import { MovieResponse } from '@/types/movie';

export const useGetPopularMovies = (page: number = 1) => {
return useQuery<MovieResponse, Error>({
queryKey: ['popularMovies', page],
queryFn: () => fetchPopularMovies(page),
staleTime: 1000 _ 60 _ 5, // Cache selama 5 menit
});
};`

### IV. Fitur Kualitas Senior

- **Optimasi Search Input:** Terapkan `useDebounce` pada input pencarian untuk membatasi jumlah panggilan API yang tidak perlu.
- **Loading State UX:** Gunakan **Skeleton Loader** di komponen `MovieList` berdasarkan status `isLoading` dari React Query, bukan hanya teks "Loading...".
- **Keamanan API Key:** Pastikan API Key hanya diakses melalui `process.env.NEXT_PUBLIC_...` dan file `.env.local` di-gitignore.
- **Code Documentation:** Sertakan JSDoc (atau komentar yang jelas) di atas fungsi atau _custom hooks_ yang kompleks.
