## 📄 Definisi Proyek: Movie/Series List Web App

| **Atribut**         | **Detail**                                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nama Proyek**     | CineTrack: Movie & Series Explorer                                                                                                                                                          |
| **Tujuan Utama**    | Menguji kemampuan _Frontend Development_ Senior (Next.js, TypeScript, React Query, Atomic Design) dengan mengimplementasikan aplikasi berbasis data API yang dinamis dan berkinerja tinggi. |
| **Target Pengguna** | Siapa saja yang ingin mencari informasi dasar dan _rating_ tentang film atau serial populer.                                                                                                |
| **Teknologi Inti**  | Next.js (TypeScript), Tailwind CSS, Axios, React Query.                                                                                                                                     |
| **Sumber Data**     | The Movie Database (TMDB) API (Wajib menggunakan _Environment Variables_ untuk kunci API).                                                                                                  |

---

## 💡 Fitur Inti (Minimum Viable Product - MVP)

Fitur-fitur ini harus diselesaikan 100% dan menjadi fokus utama.

| **ID**   | **Fitur**                          | **Keterangan Teknis & Penilaian**                                                                                                                                                      |
| -------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **F-01** | **Halaman Beranda (List Populer)** | Menampilkan daftar film/serial populer saat ini. Harus menggunakan **React Query** untuk _caching_ dan manajemen _state_.                                                              |
| **F-02** | **Detail Item**                    | Halaman individual yang menampilkan sinopsis, _rating_, tanggal rilis, dan poster besar untuk film/serial yang dipilih. _Data fetching_ harus diinisiasi ulang menggunakan ID item.    |
| **F-03** | **Navigasi**                       | Memiliki _Header_ dan _Footer_ yang konsisten. Navigasi ke halaman detail dan kembali ke beranda harus menggunakan _routing_ Next.js (`<Link>`).                                       |
| **F-04** | **Pencarian (Search)**             | Kotak input yang memungkinkan pengguna mencari film/serial berdasarkan judul. **Wajib** menerapkan _Debouncing_ untuk membatasi panggilan API.                                         |
| **F-05** | **Pagination/Loading**             | Menerapkan _Pagination_ untuk daftar film/serial (menggunakan _query parameter_ `page` TMDB). **Wajib** menampilkan **Skeleton Loader** saat _loading state_ (dari React Query) aktif. |

## ✨ Fitur Nilai Tambah (Senior Level Enhancement)

Fitur ini akan menunjukkan pemahaman mendalam tentang optimasi UX dan performa, memberikan nilai ekstra dalam penilaian.

| **ID**   | **Fitur**               | **Keterangan Teknis & Penilaian**                                                                                                                                               |
| -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A-01** | **Error & Empty State** | Tampilkan pesan yang ramah pengguna dan visual yang informatif ketika API gagal _fetch_ (Error State) atau ketika hasil pencarian kosong (Empty State).                         |
| **A-02** | **Reusable Components** | Menerapkan konsep **Atomic Design** secara ketat. Komponen seperti `Card` dan `Button` harus memiliki _props_ yang didefinisikan dengan TypeScript dan dapat digunakan kembali. |
| **A-03** | **Responsive Design**   | Tata letak harus beradaptasi dengan baik pada _mobile view_ (menggunakan utilitas responsif Tailwind CSS).                                                                      |
| **A-04** | **Query Devtools**      | Mengintegrasikan **React Query Devtools** dalam mode _development_ untuk mempermudah _debugging_ data _caching_ dan _state_.                                                    |

---

## 🎯 Prioritas dan Jadwal Estimasi (Waktu Total 6 Hari)

Kita akan fokus pada implementasi fitur MVP dan struktur dasar terlebih dahulu.

| **Hari** | **Fokus Utama**                         | **Output Wajib**                                                                                                                                          | **Keterampilan yang Diuji**                            |
| -------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **H1**   | **Setup Dasar & Struktur**              | Next.js/TS, Tailwind Config, ESLint/Prettier setup, Struktur folder **Atomic Design**, Service Layer **Axios** dasar, **React Query Provider** terpasang. | Setup Environment, Struktur Kode, _Linting_.           |
| **H2**   | **Data & Home Page (F-01, F-05)**       | _Custom Hook_ `useGetPopularMovies` (React Query), Komponen `MovieList` dan `MovieCard` (Atom/Molecule), Implementasi **Skeleton Loader**.                | Data Fetching, Caching, Atomic Design (Atom/Molecule). |
| **H3**   | **Detail Page & Navigasi (F-02, F-03)** | Halaman detail dinamis (`/movies/[id].tsx`), Fungsi `fetchMovieDetail`, Implementasi **Header/Footer** (Organism/Template).                               | Routing Next.js, Data Fetching Ulang, Komponen Layout. |
| **H4**   | **Pencarian & Optimasi (F-04, A-01)**   | Implementasi _Search_ dengan **Debouncing** (`useDebounce` custom hook), _Error State_ dan _Empty State_ (Nilai Tambah A-01).                             | Custom Hooks, Optimasi Performa, Error Handling.       |
| **H5**   | **Refinement & Styling (A-03, A-02)**   | Koreksi tampilan _responsiveness_ (Mobile View), Review dan _refactoring_ kode ke standar ESLint/Prettier, Finalisasi `MovieCard` reusability.            | Tailwind Responsiveness, Clean Code, Code Refactoring. |
| **H6**   | **Finalisasi & Deployment**             | Tulis `README.md` (termasuk Tech Stack), Deploy ke Vercel/Netlify, Final Check untuk semua kriteria penilaian (Termasuk **Query Devtools** A-04).         | Dokumentasi, CI/CD Dasar, Quality Assurance.           |

---
