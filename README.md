# dakershner.github.io

A modern, headless, developer-friendly personal site and portfolio. This repo powers my blog, resume, services, and photography gallery. It's also a template for anyone who wants to build a similar site with TinaCMS, Next.js, and Jekyll.

## Features
- **Blog**: Markdown-based posts, categories, tags, and archive
- **Resume**: Easily editable, cleanly styled
- **Services**: Simple, modular content model
- **Photography Gallery**: S3-backed, TinaCMS-managed, with custom YAML/Markdown schema
- **Headless CMS**: TinaCMS for content editing (locally or via Tina Cloud)
- **Static Site Generation**: Jekyll for fast, SEO-friendly output
- **Modern Dev Workflow**: TypeScript, Next.js, ESLint, Jest, CI/CD, and more

## Quick Start
1. **Clone this repo**
   ```sh
   git clone https://github.com/dakershner/dakershner.github.io.git
   cd dakershner.github.io
   ```
2. **Install dependencies**
   ```sh
   npm install
   bundle install
   ```
3. **Copy and edit your .env file** (see below for required variables)
4. **Run locally**
   ```sh
   npm run dev
   # or for Jekyll
   bundle exec jekyll serve
   ```
5. **Edit content**
   - Use TinaCMS admin (`/admin`) for posts, galleries, and more
   - Or edit Markdown/YAML files directly

## How to Use This as a Template
1. **Fork or clone this repo**
2. **Replace content**: Update posts, resume, services, and gallery files with your own
3. **Set up TinaCMS**: Register at [tina.io](https://tina.io), get your client ID and token, and add them to your `.env`
4. **Set up S3**: Create an S3 bucket for your images, set credentials in `.env`, and configure CORS
5. **Customize**: Tweak `_config.yml`, styles, and layouts as needed
6. **Deploy**: Use GitHub Pages, Vercel, or your preferred static host

## Environment Variables
Create a `.env` file in the project root with:
```
NEXT_PUBLIC_TINA_CLIENT_ID=your-tina-client-id
TINA_TOKEN=your-tina-token
TINA_S3_REGION=your-s3-region
TINA_S3_BUCKET=your-s3-bucket
TINA_S3_ACCESS_KEY_ID=your-access-key
TINA_S3_SECRET_ACCESS_KEY=your-secret-key
```

## Managing the Photography Gallery

This site includes a custom photography gallery system inspired by Stephen Shore's website. Here's how to manage it:

## Adding a New Photo Collection

1. **Create a new Markdown file** in the `photography` directory with a descriptive name, e.g., `photography/japan-2023.md`

2. **Add the front matter** at the top of the file with the following structure:

```yaml
---
layout: photo_gallery
title: Japan Trip (2023)
description: Tokyo, Kyoto, and Osaka. Shot with Sony A7IV.
photos:
  - image: https://dkershner-photography.s3.amazonaws.com/japan-2023/tokyo-street.jpg
  - image: https://dkershner-photography.s3.amazonaws.com/japan-2023/kyoto-temple.jpg
  - image: https://dkershner-photography.s3.amazonaws.com/japan-2023/osaka-night.jpg
---
```

3. **Update the photo collections data file** at `_data/photo_collections.yml` to include your new collection:

```yaml
- id: japan-2023
  title: Japan Trip (2023)
  description: Tokyo, Kyoto, and Osaka
  thumbnail: https://dkershner-photography.s3.amazonaws.com/japan-2023/tokyo-street.jpg
```

## Photo Collection Structure

- **id**: The filename of your collection markdown file (without the `.md` extension)
- **title**: The display title for the collection
- **description**: A brief description of the collection
- **thumbnail**: The URL to the image that will be displayed on the photography landing page

## Photo Structure

In each collection markdown file, the `photos` array contains all the images for that collection:

```yaml
photos:
  - image: https://example.com/path/to/image1.jpg
    caption: Optional caption for image 1
  - image: https://example.com/path/to/image2.jpg
    caption: Optional caption for image 2
```

- **image**: The URL to the full-size image
- **caption**: (Optional) A caption to display below the image

## Tips for Best Results

1. **Consistent Image Sizes**: For the best gallery experience, try to use images with similar aspect ratios
2. **Optimize Image Files**: Compress your images for web to ensure fast loading times
3. **Meaningful Filenames**: Use descriptive filenames that indicate the content of the photo
4. **Choose Strong Thumbnails**: Select thumbnails that represent the collection well and have visual impact
5. **Add Captions**: Captions provide context and enhance the viewing experience

# Credits & Theme Source

This project is based on the [Beautiful Jekyll](https://beautifuljekyll.com) theme by [Dean Attali](https://deanattali.com). Many layout and config options are inherited from the original theme. See the [original documentation](https://beautifuljekyll.com) for advanced Jekyll usage, FAQ, and more.

Some vestigial files and config remain for compatibility and attribution. Please see LICENSE for details.

## Architecture Overview

This diagram illustrates the flow of content, media, and build/deploy in this TinaCMS + Jekyll + S3 setup:

<p align="center">
  <img src="assets/site-architecture.png" width="600" alt="TinaCMS + Jekyll + S3 Architecture">
</p>

