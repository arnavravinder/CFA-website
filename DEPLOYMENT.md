# CareForAll - Deployment Guide

## Overview
Your CareForAll website has been completely refactored into a modern, static site with:
- **Modern Design**: Classy theme with Instrument Sans/Serif + Inter fonts
- **Unified CSS**: All styles in one file (`styles/main.css`)
- **Inline Vue.js**: Interactive components using Vue 3 CDN
- **Icon Library**: Unicons icon set (lightweight alternative)
- **Pure Static**: No server required - ready for Vercel/Netlify/any static host

## Project Structure

```
/
├── index.html          # Homepage with carousel, timeline, team
├── volunteer.html      # Volunteer signup page
├── fundraise.html      # Fundraising information page
├── blog.html           # Blog listing page
├── blogs.json          # Static blog data
├── styles/
│   └── main.css        # All CSS styles (unified)
├── static/             # All images and assets
│   ├── blog/           # Blog images
│   ├── colabs/         # Collaboration logos
│   ├── icons/          # Social media icons
│   ├── img carasoul/   # Carousel images
│   ├── pics/           # Content images
│   └── profile picture/ # Team photos
├── vercel.json         # Vercel configuration
└── package.json        # Minimal package file
```

## Features

### Design
- **Fonts**: Instrument Sans, Instrument Serif, Inter
- **Icons**: Unicons (via CDN)
- **Colors**: Modern, classy dark/light theme
- **Mobile**: Fully responsive

### Functionality
- Interactive carousel with auto-play
- Animated timeline with click interactions
- Smooth scrolling navigation
- Mobile menu with overlay
- Contact form (requires backend)
- Blog system with JSON data
- Vue.js reactivity for all interactive elements

## Deploy to Vercel

### Quick Deploy
1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Refactored to static site"
   git push
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect settings
6. Click "Deploy"

### Manual Deploy
```bash
npm install -g vercel
vercel
```

## Deploy to Netlify

### Quick Deploy
1. Drag and drop your project folder to [app.netlify.com/drop](https://app.netlify.com/drop)

### CLI Deploy
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Local Development

### Option 1: Python
```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

### Option 2: Node.js
```bash
npx serve .
# Open http://localhost:3000
```

### Option 3: VS Code
Install "Live Server" extension and click "Go Live"

## Contact Form Setup

The contact form currently uses a POST to `/contact`. For a static site, you have several options:

### Option 1: Formspree
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms
Add `netlify` attribute to form:
```html
<form name="contact" method="POST" data-netlify="true">
```

### Option 3: Email Service (EmailJS)
Use EmailJS CDN and update the form handler in Vue.

## Blog System

Blogs are stored in `blogs.json`. To add a new blog:

1. Add blog metadata to `blogs.json`:
```json
{
  "title": "Your Blog Title",
  "author": "Author Name",
  "image": "/static/blog/your-image.jpg",
  "date": "DD/MM/YYYY",
  "url": "blog-url-slug",
  "description": "Short description..."
}
```

2. Add the blog image to `static/blog/`

3. The blog will automatically appear on the blog listing page

## Customization

### Colors
Edit CSS variables in `styles/main.css`:
```css
:root {
    --primary: #1a1a1a;
    --accent: #2c5f7a;
    /* ... more colors */
}
```

### Content
- **Team Members**: Edit `teamMembers` array in `index.html`
- **Volunteers**: Edit `volunteers` array in `index.html`
- **Milestones**: Edit `milestones` array in `index.html`
- **Stats**: Edit `stats` object in `index.html`

### Fonts
All fonts are loaded from Google Fonts CDN. To change:
1. Get new font URL from [fonts.google.com](https://fonts.google.com)
2. Replace `<link>` tag in HTML head
3. Update `font-family` in CSS

## Performance

- All fonts loaded via CDN with preconnect
- Images optimized and served from `/static`
- CSS minified (single file)
- Vue.js loaded from CDN (cached)
- No build step required

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 8+

## Troubleshooting

### Images not loading
- Check file paths start with `/static/`
- Verify images exist in static folder
- Check file extensions match (case-sensitive)

### CSS not applying
- Clear browser cache
- Check `/styles/main.css` path is correct
- Verify CSS file exists

### Vue not working
- Check browser console for errors
- Ensure Vue CDN is loading
- Check `v-cloak` CSS rule is present

## Support

For issues or questions:
- Check browser console for errors
- Verify all file paths are correct
- Test in incognito/private mode
- Check network tab in DevTools

---

Built with Vue.js 3, Instrument Sans/Serif, Inter, and Unicons.
