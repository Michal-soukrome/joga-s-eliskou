# Yoga Portfolio

A beautiful, responsive yoga portfolio page built with Next.js and Tailwind CSS.

## Features

- **Hero Section**: Eye-catching landing section with call-to-action buttons
- **Services**: Showcase 6 different yoga and wellness services with icons
- **Testimonials**: Display student testimonials with star ratings
- **Contact Form**: Interactive contact form for inquiries
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Custom Tailwind Theme**: Warm, yoga-inspired color palette

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS 3
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)

## Getting Started

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main homepage
│   └── globals.css       # Global styles and Tailwind directives
├── components/
│   ├── Hero.tsx          # Hero section component
│   ├── Services.tsx      # Services showcase component
│   ├── Testimonials.tsx  # Testimonials section component
│   ├── Contact.tsx       # Contact form component
│   └── Footer.tsx        # Footer component
```

## Customization

### Colors

Edit the Tailwind theme in `tailwind.config.js` to customize the yoga-inspired color palette.

### Content

Update the content in each component file to match your specific yoga business information.

### Services

Modify the `services` array in `src/components/Services.tsx` to add or update services.

### Testimonials

Update the `testimonials` array in `src/components/Testimonials.tsx` with real student feedback.

## Features to Add

- Navigation header with smooth scrolling
- Blog section for yoga tips and articles
- Class schedule and booking system
- About the instructor section
- Image gallery
- Newsletter signup
- Integration with email service for contact form

## License

This project is open source and available under the MIT License.
