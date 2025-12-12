# Typography Component Examples

The Typography component provides consistent, accessible text styling across the application.

## Variants

### Headings

```tsx
<Typography variant="h1">Main Page Title</Typography>
<Typography variant="h2">Section Heading</Typography>
<Typography variant="h3">Subsection Heading</Typography>
<Typography variant="h4">Minor Heading</Typography>
<Typography variant="h5">Small Heading</Typography>
<Typography variant="h6">Tiny Heading</Typography>
```

### Body Text

```tsx
// Regular paragraph
<Typography variant="p">
  This is regular paragraph text with proper line height and spacing.
</Typography>

// Lead paragraph (introduction/emphasis)
<Typography variant="lead">
  This is a lead paragraph, typically used for introductions or important content.
</Typography>

// Large text
<Typography variant="large">
  Larger, semibold text for emphasis.
</Typography>
```

### Small & Muted Text

```tsx
// Small text
<Typography variant="small">
  Small text for captions, labels, or fine print.
</Typography>

// Muted text
<Typography variant="muted">
  Secondary information with reduced visual weight.
</Typography>
```

### Special Elements

```tsx
// Inline code
<Typography variant="code">npm install</Typography>

// Blockquote
<Typography variant="blockquote">
  "The best way to predict the future is to invent it." - Alan Kay
</Typography>
```

## Semantic HTML Override

Use the `as` prop to maintain semantic HTML while using specific styling:

```tsx
// Looks like h2, but semantically h1 (for SEO)
<Typography variant="h2" as="h1">
  Page Title
</Typography>

// Looks like h1, but renders as div (non-heading)
<Typography variant="h1" as="div">
  Decorative Large Text
</Typography>
```

## Custom Styling

Combine with className for additional styles:

```tsx
<Typography variant="h2" className="text-primary">
  Colored Heading
</Typography>

<Typography variant="p" className="max-w-2xl">
  Paragraph with max width constraint
</Typography>

<Typography variant="muted" className="text-center">
  Centered muted text
</Typography>
```

## Real-World Examples

### Page Header

```tsx
<div className="mb-8">
  <Typography variant="h1" className="mb-4">
    CineTrack
  </Typography>
  <Typography variant="lead">
    Discover popular movies and series with detailed information and ratings
  </Typography>
</div>
```

### Section with Description

```tsx
<section>
  <Typography variant="h2" className="mb-4">
    Popular Movies
  </Typography>
  <Typography variant="muted" className="mb-6">
    Showing {count} movies
  </Typography>
  {/* Movie grid */}
</section>
```

### Error Message

```tsx
<div>
  <Typography variant="h4" className="text-destructive mb-2">
    Error Loading Movies
  </Typography>
  <Typography variant="muted">Failed to fetch popular movies. Please try again later.</Typography>
</div>
```

### Card Content

```tsx
<Card>
  <CardHeader>
    <Typography variant="h3">{movie.title}</Typography>
    <Typography variant="muted">{movie.releaseYear}</Typography>
  </CardHeader>
  <CardContent>
    <Typography variant="p" className="line-clamp-3">
      {movie.overview}
    </Typography>
  </CardContent>
</Card>
```

## Benefits

1. **Consistency**: All text uses the same sizing and spacing system
2. **Maintainability**: Change typography globally by updating variants
3. **Accessibility**: Semantic HTML elements by default
4. **Flexibility**: Override element while keeping styles
5. **Type Safety**: Full TypeScript support
6. **Theme-Aware**: Uses Tailwind's theme colors (text-muted-foreground, etc.)

## Typography Scale

| Variant | Font Size       | Font Weight    | Use Case            |
| ------- | --------------- | -------------- | ------------------- |
| h1      | 2.25rem (36px)  | 700 (bold)     | Page titles         |
| h2      | 1.875rem (30px) | 600 (semibold) | Section headings    |
| h3      | 1.5rem (24px)   | 600 (semibold) | Subsection headings |
| h4      | 1.25rem (20px)  | 600 (semibold) | Minor headings      |
| h5      | 1.125rem (18px) | 600 (semibold) | Small headings      |
| h6      | 1rem (16px)     | 600 (semibold) | Tiny headings       |
| p       | 1rem (16px)     | 400 (regular)  | Body text           |
| lead    | 1.25rem (20px)  | 400 (regular)  | Introduction text   |
| large   | 1.125rem (18px) | 600 (semibold) | Emphasized text     |
| small   | 0.875rem (14px) | 500 (medium)   | Labels, captions    |
| muted   | 0.875rem (14px) | 400 (regular)  | Secondary info      |
