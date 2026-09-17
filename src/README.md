# Simple Handyman Website

A small, fast, no-framework HTML/CSS/JS website.

## Customize it

Open `script.js` and change:

- `name`
- `phone`
- `phoneHref`
- `email`
- `serviceArea`

## Add your real photo

The hero currently uses a CSS placeholder. The easiest upgrade is:

1. Put a photo named `me.jpg` in this folder.
2. In `index.html`, replace the `<div class="photo-placeholder">...</div>` with:
   `<img src="me.jpg" alt="Your Name" class="your-photo">`
3. Add this CSS:

```css
.your-photo {
  width: 100%;
  min-height: 520px;
  object-fit: cover;
  display: block;
}
```

You can also simply replace the placeholder with any image URL.

## Publish

This is a static site, so it can be hosted on essentially any static web host. No server or database is required.
