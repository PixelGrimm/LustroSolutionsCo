# Image Upload Guide for Before & After Photos

## 🖼️ **How to Add Your Real Before & After Photos**

Since I can't directly upload images to your website, here are the best ways to add your actual cleaning photos:

### **Option 1: Use Cloudinary (Recommended)**
1. **Sign up** at [cloudinary.com](https://cloudinary.com) (free tier available)
2. **Upload your photos** to Cloudinary
3. **Get the URLs** for each image
4. **Replace the image URLs** in the HTML

### **Option 2: Use GitHub (Free)**
1. **Create a folder** in your GitHub repository called `images/`
2. **Upload your photos** to this folder
3. **Use GitHub's raw URLs** for the images

### **Option 3: Use Railway Static Files**
1. **Create an `images/` folder** in your project
2. **Add your photos** to this folder
3. **Reference them** as `/images/photo-name.jpg`

## 📸 **Photos You Want to Add:**

Based on your images, here are the before/after pairs you should upload:

1. **Building Facade Cleaning** - The concrete wall with scaffolding
2. **Carpet Cleaning (4-panel)** - The four-panel carpet collage
3. **Commercial Floor Cleaning** - The wooden floor in commercial setting
4. **Carpet Stain Removal** - The side-by-side carpet with stains
5. **Oriental Carpet Restoration** - The detailed carpet with patterns
6. **Concrete Wall Cleaning** - The horizontal split concrete wall

## 🔧 **Quick Setup with Cloudinary:**

1. **Go to** [cloudinary.com](https://cloudinary.com)
2. **Sign up** for free account
3. **Upload your 12 photos** (6 before + 6 after)
4. **Copy the URLs** for each image
5. **Replace the URLs** in `index.html` lines 157-200

## 📝 **Example HTML Structure:**

```html
<div class="before-after">
    <div class="before">
        <img src="YOUR_CLOUDINARY_URL_HERE" alt="Before - Building Facade">
        <span class="label">Before</span>
    </div>
    <div class="after">
        <img src="YOUR_CLOUDINARY_URL_HERE" alt="After - Building Facade">
        <span class="label">After</span>
    </div>
</div>
```

## 🎯 **Recommended Image Sizes:**
- **Width**: 400px
- **Height**: 300px
- **Format**: JPG or PNG
- **Quality**: High (for professional look)

Would you like me to help you set up any of these options?
