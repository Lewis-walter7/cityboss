# City Boss Motors

A premium car dealership website built with Next.js, MongoDB, and TailwindCSS. Features a modern, fast, mobile-first UI with smooth animations, advanced filtering, and SEO optimization.

## Features

- 🚗 Premium automotive design with dark theme
- 🔍 Advanced vehicle filtering and search
- 📱 Fully responsive mobile-first design
- ⚡ Fast performance with SSR and image optimization
- 🎨 Smooth animations and micro-interactions
- ❤️ Favorite vehicles (localStorage)
- 📊 Comprehensive vehicle details
- 📝 Contact and sell car forms
- 🔒 SEO optimized with proper metadata

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** TailwindCSS 4
- **Database:** MongoDB
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Images:** Next/Image (optimized)
- **TypeScript:** Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
cd /home/lewis/ClientProjects/CityBoss/motors
```

2. Install dependencies
```bash
npm install
# or
bun install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/cityboss_motors
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cityboss_motors

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Seed the database

```bash
npx tsx scripts/seed-database.ts
```

5. Run the development server

```bash
npm run dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── listings/          # Vehicle listings page
│   ├── vehicles/[id]/     # Vehicle detail pages (SSR)
│   ├── contact/           # Contact page
│   ├── about/             # About page
│   ├── sell/              # Sell car page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── home/             # Home page sections
│   └── ...
├── lib/                   # Utilities and config
│   ├── mongodb.ts        # MongoDB connection
│   ├── types.ts          # TypeScript types
│   ├── utils.ts          # Helper functions
│   └── seed-data.ts      # Sample vehicle data
├── hooks/                 # Custom React hooks
├── scripts/              # Utility scripts
└── public/               # Static assets
```

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Database Setup

### Option 1: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/cityboss_motors`

### Option 2: MongoDB Atlas (Free)

1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Get connection string from Atlas dashboard
4. Update `.env.local` with your connection string

## Seeding Data

The project includes sample vehicles. To populate your database:

```bash
npx tsx scripts/seed-database.ts
```

This will create 12 premium vehicles across different categories.

## Features Todo

- [ ] Image upload with cloud storage (UploadThing/Cloudinary)
- [ ] Quick view modal for vehicles
- [ ] Related vehicles carousel
- [ ] Admin dashboard
- [ ] User authentication
- [ ] Vehicle comparison
- [ ] Test drive scheduling
- [ ] Email notifications

## Performance

- Uses Next.js Image component for optimized images
- SSR for SEO on vehicle pages
- Code splitting and lazy loading
- Efficient MongoDB queries with indexes
- Skeleton loading states for better UX

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contact

For questions or support, contact: info@citybossmotors.com
