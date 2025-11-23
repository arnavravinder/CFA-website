# CFA Website Rebuild Walkthrough

I have completely rebuilt the CareForAll website with a modern, premium design, improved "vibes", and a clean static architecture.

## Changes Made

### 1. Design Overhaul
- **New Color Palette**: Adopted a trustworthy Teal (`#0F766E`) as the primary color, with a warm Orange (`#F97316`) for accents, and a clean off-white background.
- **Typography**: Used `Instrument Serif` for headings (premium feel) and `Inter` for body text (readability).
- **Icons**: Switched to **Phosphor Icons** for a consistent, modern look.
- **Animations**: Added smooth scroll effects, hover states, and animated counters for the stats section.

### 2. Architecture
- **Static Site**: Removed all Vue.js dependencies, Docker files, and Vercel config. The site is now pure HTML/CSS/JS.
- **File Structure**:
    - `index.html`: Main landing page.
    - `styles/index.css`: Single source of truth for styles.
    - `scripts/index.js`: Handles mobile menu and interactions.
    - `blog-template.html`: A reusable template for new blog posts.

### 3. Pages Rebuilt
- **Home (`index.html`)**: Features a new Hero section, animated Stats, Timeline for milestones, and a clean Team grid.
- **Volunteer (`volunteer.html`)**: Updated with the new design and a static application form.
- **Fundraise (`fundraise.html`)**: Redesigned to highlight impact and transparency, with a clear "Donate" call to action.
- **Blog (`blog.html`)**: A clean index page listing the latest posts.

## How to Add a New Blog Post

1.  **Duplicate** the `blog-template.html` file and rename it (e.g., `my-new-post.html`).
2.  **Open** the new file in your editor.
3.  **Update** the content inside the `<article class="blog-content">` tag. You can paste your text directly.
4.  **Update** the Title, Date, and Author in the `<header class="blog-header">` section.
5.  **Link** the new post in `blog.html` by adding a new `<a href="my-new-post.html" class="blog-card">...</a>` block (copy an existing one and update the details).

## Next Steps
-   **Images**: Ensure all images in `static/` are high quality. The design relies on good visuals.
-   **Forms**: The forms currently point to `mailto:` or placeholders. You may want to connect them to a service like Formspree for real email delivery without a backend.
