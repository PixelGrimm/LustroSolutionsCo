# Lustro Solutions Co. - Complete Website Rebuild

## 🚀 Deployment Instructions

### For Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project directory
cd "/Users/alex/Desktop/WebApp/Lustro Solutions Co"

# Deploy
vercel

# For production
vercel --prod
```

### For Netlify:
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Navigate to project directory
cd "/Users/alex/Desktop/WebApp/Lustro Solutions Co"

# Deploy
netlify deploy

# For production
netlify deploy --prod
```

## 📁 File Structure

```
/
├── index-new.html (RENAME to index.html)
├── sitemap-new.xml (RENAME to sitemap.xml)
├── robots-new.txt (RENAME to robots.txt)
├── end-of-tenancy-cleaning-new/
│   └── index.html (RENAME folder to end-of-tenancy-cleaning)
├── deep-cleaning-new/ (CREATE - use template below)
├── carpet-cleaning-new/ (CREATE - use template below)
├── window-cleaning-new/ (CREATE - use template below)
├── commercial-cleaning-new/ (CREATE - use template below)
├── residential-cleaning-new/ (CREATE - use template below)
├── oven-cleaning-new/ (CREATE - use template below)
└── after-builders-cleaning-new/ (CREATE - use template below)
```

## ✅ Completed Files

1. ✅ **Homepage** (`index-new.html`) - Complete with:
   - Hero section with phone & WhatsApp
   - Services grid (8 services)
   - Before/After gallery
   - Google reviews carousel (4.9/5, 87 reviews)
   - Trust badges
   - Areas we serve (40+ London boroughs)
   - Contact form
   - Exit-intent popup
   - WhatsApp floating button
   - Full JSON-LD schema

2. ✅ **End of Tenancy Cleaning** (`end-of-tenancy-cleaning-new/index.html`) - Complete with:
   - 1200+ words of unique content
   - Table of contents
   - Pricing table
   - What's included checklist
   - Before/After gallery
   - FAQ section with schema
   - Breadcrumb schema
   - Service schema

3. ✅ **Sitemap** (`sitemap-new.xml`)
4. ✅ **Robots.txt** (`robots-new.txt`)

## 📝 Remaining Service Pages to Create

You need to create 7 more service pages using the same structure as `end-of-tenancy-cleaning-new/index.html`. Each should have:

- **900-1400 words** of unique, SEO-optimized content
- **Unique H1** with target keyword (e.g., "Deep Cleaning London")
- **Meta title/description** with exact target keyword
- **Table of contents** with anchor links
- **Pricing table** specific to that service
- **What's included checklist**
- **Before/After gallery** (use Unsplash WebP images)
- **FAQ section** with JSON-LD schema
- **Breadcrumb schema**
- **Service schema**

### Target Keywords for Each Service:

1. **Deep Cleaning** → "deep cleaning london"
2. **Carpet Cleaning** → "carpet cleaning london"
3. **Window Cleaning** → "window cleaning london"
4. **Commercial Cleaning** → "commercial cleaning london"
5. **Residential Cleaning** → "residential cleaning london"
6. **Oven Cleaning** → "oven cleaning london"
7. **After Builders Cleaning** → "after builders cleaning london"

## 🎨 Design Specifications

- **Color Scheme**: Dark navy (#0a1929) + Bright teal (#00d4aa)
- **Font**: System fonts (Inter via Tailwind)
- **Framework**: Tailwind CSS (CDN) + Alpine.js (CDN)
- **Images**: WebP format, lazy-loaded, ≤80KB

## 📊 SEO Checklist

- ✅ One H1 per page
- ✅ Semantic HTML5
- ✅ JSON-LD schemas (Organization, LocalBusiness, Service, AggregateRating, FAQPage, BreadcrumbList)
- ✅ Open Graph + Twitter Cards
- ✅ Canonical URLs
- ✅ XML Sitemap
- ✅ Robots.txt
- ✅ Mobile-first responsive design

## 🔧 Post-Deployment Tasks

1. **Rename files**:
   - `index-new.html` → `index.html`
   - `sitemap-new.xml` → `sitemap.xml`
   - `robots-new.txt` → `robots.txt`
   - `end-of-tenancy-cleaning-new/` → `end-of-tenancy-cleaning/`

2. **Update image paths**:
   - Ensure `/logo.png` exists
   - Replace Unsplash placeholder images with actual WebP images
   - Optimize all images to ≤80KB

3. **Submit to Google**:
   - Google Search Console: Submit sitemap
   - Google Business Profile: Update with new website

4. **Test PageSpeed**:
   - Target: 95+ mobile / 99+ desktop
   - Optimize images if needed
   - Minimize render-blocking resources

5. **Test all forms**:
   - Contact forms on all pages
   - Formspree integration working

## 📞 Contact Information (Already Integrated)

- **Phone**: 020 3239 8059 (clickable tel: links)
- **Email**: info@lustrosolutions.co.uk
- **Discount Code**: FIRST20 (20% off first clean)
- **WhatsApp**: +44 20 3239 8059

## 🎯 Expected SEO Results

With proper implementation and content completion:
- **Rank page 1** for "cleaning services london" within 60-90 days
- **Rank page 1** for "end of tenancy cleaning london" within 60-90 days
- **Rank page 1** for "deep cleaning london" within 60-90 days

## 📝 Notes

- All pages use Tailwind CSS via CDN (no build step required)
- Alpine.js for interactivity (lightweight, no build step)
- Forms use Formspree (already configured)
- Images should be optimized WebP format
- All internal links use clean URLs (no .html)

---

**Status**: Homepage and End of Tenancy Cleaning page are complete. 7 service pages remaining to be created using the same template structure.

