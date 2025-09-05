# 📦 VAPI Chat Widget Installation Guide

Complete installation instructions for integrating the Green Star Solar VAPI Chat Widget into any website.

## 🎯 Quick Install (All Platforms)

**Option 1: Complete Copy-Paste (Recommended)**
1. Copy all code from [widget.html](./widget.html) - paste before `</body>`
2. Your widget is live! 🚀

**Option 2: Modular Install**
1. Add HTML from [widget.html](./widget.html)
2. Add CSS from [widget.css](./widget.css) 
3. Add JavaScript from [widget.js](./widget.js)

---

## 🌐 Platform-Specific Instructions

### 📄 Static Websites (HTML/CSS/JS)

**Step 1:** Add to your HTML file before `</body>`:
```html
<!-- Paste entire contents of widget.html here -->
```

**Step 2:** Done! The widget includes all CSS and JavaScript inline.

---

### 📝 WordPress

#### Method A: Theme Editor (Recommended)
1. **Admin Dashboard** → **Appearance** → **Theme Editor**
2. Select **footer.php** or **header.php**
3. Paste widget code before `</body>` tag
4. Click **Update File**

#### Method B: Custom HTML Block
1. **Add Block** → **Custom HTML**
2. Paste the complete widget code
3. **Publish** or **Update**

#### Method C: Plugin
1. Install plugin like "Insert Headers and Footers"
2. Paste widget code in **Footer Scripts**
3. **Save**

---

### 🛒 Shopify

#### Method A: Theme Code (Recommended)
1. **Admin** → **Online Store** → **Themes** → **Actions** → **Edit code**
2. Open `layout/theme.liquid`
3. Paste widget code before `</body>`
4. **Save**

#### Method B: Page Template
1. **Admin** → **Online Store** → **Pages**
2. Edit page → **Show HTML** 
3. Paste widget code
4. **Save**

---

### ⚛️ React Applications

#### Step 1: Create Widget Component
```jsx
// components/VapiWidget.jsx
import { useEffect } from 'react';

const VapiWidget = () => {
  useEffect(() => {
    // Paste the JavaScript portion from widget.js here
    // (inside the useEffect hook)
  }, []);

  return (
    <div dangerouslySetInnerHTML={{
      __html: `
        <!-- Paste HTML portion from widget.html here -->
        <style>
          /* Paste CSS from widget.css here */
        </style>
      `
    }} />
  );
};

export default VapiWidget;
```

#### Step 2: Add to App
```jsx
// App.jsx
import VapiWidget from './components/VapiWidget';

function App() {
  return (
    <div>
      {/* Your existing app */}
      <VapiWidget />
    </div>
  );
}
```

---

### 🟢 Vue.js Applications

#### Step 1: Create Widget Component
```vue
<!-- components/VapiWidget.vue -->
<template>
  <div v-html="widgetHtml"></div>
</template>

<script>
export default {
  name: 'VapiWidget',
  data() {
    return {
      widgetHtml: `
        <!-- Paste HTML from widget.html -->
        <style>
          /* Paste CSS from widget.css */
        </style>
      `
    };
  },
  mounted() {
    // Paste JavaScript from widget.js here
  }
};
</script>
```

#### Step 2: Register Component
```js
// main.js or App.vue
import VapiWidget from './components/VapiWidget.vue';

// In your template
<VapiWidget />
```

---

### 🅰️ Angular Applications

#### Step 1: Create Widget Component
```typescript
// vapi-widget.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vapi-widget',
  template: `
    <div [innerHTML]="widgetHtml"></div>
  `
})
export class VapiWidgetComponent implements OnInit {
  widgetHtml = `
    <!-- Paste HTML from widget.html -->
    <style>
      /* Paste CSS from widget.css */
    </style>
  `;

  ngOnInit() {
    // Paste JavaScript from widget.js here
  }
}
```

#### Step 2: Add to Module
```typescript
// app.module.ts
import { VapiWidgetComponent } from './vapi-widget.component';

@NgModule({
  declarations: [VapiWidgetComponent],
  // ...
})
```

---

### 🎨 Webflow

1. **Project Settings** → **Custom Code** → **Footer Code**
2. Paste complete widget code
3. **Save Changes** and **Publish**

---

### 🧩 Squarespace

1. **Settings** → **Advanced** → **Code Injection**
2. Paste widget code in **Footer**
3. **Save**

---

### 🎪 Wix

1. **Add** → **Embed Code** → **Custom Element**
2. Paste widget code
3. **Update** and **Publish**

---

### 🎯 Framer ⭐ **RECOMMENDED FOR YOUR DEPLOYMENT**

Framer is perfect for this widget! Here's the step-by-step guide:

#### **Method A: Custom Code Component (Recommended)**

1. **Add Custom Code Component**:
   - In Framer, drag a **Custom Code** component onto your page
   - Or use **Insert** → **Custom Code**

2. **Insert Widget Code**:
   ```html
   <!-- Paste this exact code in the Custom Code component -->
   <div id="framer-vapi-widget">
   <!-- Copy entire contents of widget-secure.html here -->
   </div>
   
   <script>
   // Framer-specific initialization
   if (typeof document !== 'undefined') {
     // Ensure widget initializes after Framer loads
     setTimeout(() => {
       if (document.readyState === 'complete') {
         // Widget will auto-initialize
       }
     }, 1000);
   }
   </script>
   ```

3. **Configure Settings**:
   - Set component **Width**: `Auto` or `100%`
   - Set component **Height**: `Auto` or `100px`
   - **Position**: `Fixed` or `Absolute` (for floating widget)
   - **Z-index**: `10000` (ensure it appears above other elements)

#### **Method B: Site-Wide Custom Code (Global)**

1. **Site Settings**:
   - Go to **Site Settings** → **General** → **Custom Code**

2. **Add to End of Body**:
   - Paste the complete widget code in **End of `<body>` tag**
   - This makes the widget available on all pages

#### **Method C: Page-Specific Custom Code**

1. **Page Settings**:
   - Select your page
   - Go to **Page Settings** → **Custom Code**

2. **Add Widget Code**:
   - Paste in **End of `<body>` tag** section
   - Widget will only appear on this specific page

#### **🔧 Framer-Specific Optimizations**

Add this CSS to ensure perfect Framer compatibility:

```css
/* Add this to your widget CSS for Framer optimization */
#vapi-hybrid-widget {
  /* Ensure widget appears above Framer elements */
  z-index: 999999 !important;
  
  /* Prevent conflicts with Framer's responsive system */
  position: fixed !important;
  pointer-events: auto !important;
  
  /* Ensure proper stacking */
  isolation: isolate !important;
}

/* Prevent Framer animations from affecting widget */
#vapi-hybrid-widget * {
  animation-fill-mode: none !important;
  will-change: auto !important;
}

/* Mobile responsive fixes for Framer */
@media (max-width: 768px) {
  #vapi-hybrid-widget {
    bottom: 20px !important;
    right: 20px !important;
  }
}
```

#### **⚡ Framer Quick Start (Copy-Paste Ready)**

For immediate deployment, use this **complete code block** in any Framer Custom Code component:

```html
<!-- 🚀 FRAMER-OPTIMIZED VAPI WIDGET - Ready to use! -->
<style>
/* Framer-specific widget styles */
#framer-vapi-widget #vapi-hybrid-widget {
  position: fixed !important;
  bottom: 30px !important;
  right: 30px !important;
  z-index: 999999 !important;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  pointer-events: auto !important;
  isolation: isolate !important;
}

/* Ensure compatibility with Framer's system */
#framer-vapi-widget * {
  box-sizing: border-box !important;
  animation-fill-mode: none !important;
}
</style>

<!-- Copy the ENTIRE contents of widget-secure.html here -->
<!-- This ensures maximum security and Framer compatibility -->

<script>
// Framer-optimized initialization
(function() {
  // Wait for Framer to fully load
  const initWidget = () => {
    if (typeof document !== 'undefined' && document.readyState === 'complete') {
      // Widget auto-initializes
      console.log('✅ VAPI Widget loaded successfully in Framer');
    } else {
      setTimeout(initWidget, 500);
    }
  };
  
  if (typeof window !== 'undefined') {
    initWidget();
  }
})();
</script>
```

#### **🔒 Security Configuration for Framer**

If using the secure version (recommended):

1. **Deploy Backend Server**:
   ```bash
   cd backend
   npm install
   npm run start:secure
   ```

2. **Configure CORS for Framer**:
   ```env
   # In backend/.env
   CORS_ORIGINS=https://your-framer-site.framer.website,https://your-custom-domain.com
   ```

#### **🎨 Framer Design Integration**

To match your Framer site's design:

```css
/* Customize colors to match your Framer theme */
:root {
  --vapi-primary-color: #your-brand-color;
  --vapi-secondary-color: #your-accent-color;
  --vapi-accent-color: #ffffff;
}

/* Position adjustments for Framer layouts */
#vapi-hybrid-widget {
  /* Adjust position based on your Framer layout */
  bottom: 80px; /* If you have a sticky footer */
  right: 20px;  /* Adjust for sidebars */
}
```

#### **📱 Mobile Testing in Framer**

1. Use Framer's **Preview** mode to test on mobile
2. Check widget positioning and responsiveness  
3. Ensure touch interactions work properly
4. Test voice functionality on mobile devices

#### **✅ Framer Deployment Checklist**

- [ ] Widget code added to Custom Code component
- [ ] Z-index set to 999999 for proper layering
- [ ] Backend deployed and CORS configured
- [ ] Mobile responsiveness tested in Framer Preview
- [ ] Voice functionality tested (requires HTTPS)
- [ ] Security features validated
- [ ] Published to live Framer site

---

## 🎨 Customization Options

### Change Colors
```javascript
// In the widget JavaScript, modify:
const WIDGET_CONFIG = {
  primaryColor: '#your-brand-color',  // Default: '#68ccd1'
  assistantName: 'Your Assistant',    // Default: 'Sophie'
  companyName: 'Your Company'         // Default: 'Green Star Solar'
};
```

### Change Position
```css
/* In the widget CSS, modify: */
#vapi-hybrid-widget {
  bottom: 20px;    /* Distance from bottom */
  right: 20px;     /* Distance from right */
  /* Or use 'left: 20px' for left side */
}
```

### Custom Button Text
```html
<!-- In widget HTML, modify the tooltip: -->
<div id="vapi-tooltip">Your Custom Text</div>
```

---

## 🔧 Advanced Configuration

### Custom API Endpoint
If you want to use your own secure backend:

```javascript
// In widget JavaScript, modify:
async function attemptSecureChat(message) {
  try {
    const response = await fetch('https://your-domain.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: message })
    });
    // ... rest of function
  }
}
```

### Disable Voice or Text
```javascript
// To disable voice chat:
const ENABLE_VOICE = false;

// To disable text chat:
const ENABLE_TEXT = false;
```

---

## 🔒 Security Setup (Optional)

For maximum security, deploy the included backend proxy:

### Step 1: Deploy Backend
```bash
# Upload backend/ folder to your server
npm install
node vapi-proxy.js
```

### Step 2: Update Widget Config
```javascript
// In widget JavaScript:
const API_ENDPOINT = 'https://your-backend-domain.com';
```

---

## ✅ Testing Your Installation

1. **Load your website**
2. **Look for the Green Star Solar button** (bottom-right by default)
3. **Click to open** the chat widget
4. **Test text chat** - type a message and send
5. **Test voice chat** - click "Voice Call" and speak
6. **Test mobile** - verify responsiveness on phone/tablet

---

## 🆘 Troubleshooting

### Widget Doesn't Appear
- ✅ Check browser console for JavaScript errors
- ✅ Ensure code is pasted before `</body>` tag
- ✅ Verify no CSS conflicts with `z-index`

### Chat Not Working
- ✅ Check internet connection
- ✅ Verify VAPI service is operational
- ✅ Check browser console for API errors

### Voice Issues
- ✅ Test microphone permissions
- ✅ Try different browsers (Chrome recommended)
- ✅ Check HTTPS requirement for voice features

### Mobile Issues
- ✅ Test viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- ✅ Verify touch events are working
- ✅ Check CSS media queries

---

## 📞 Support

Need help with installation?

- 📧 **Email:** hello@coldlava.ai
- 🐛 **Issues:** [GitHub Issues](https://github.com/coldlavaai/greenstar/issues)
- 💬 **Live Chat:** Use the widget on [our demo site](https://coldlavaai.github.io/greenstar/)

---

## 🔄 Updates

To update your widget:
1. Replace your existing widget code with the latest version
2. Clear browser cache
3. Test functionality

**Current Version:** 2.0.0
**Last Updated:** September 2025

---

**🎉 Congratulations! Your AI chat widget is ready to engage customers 24/7!**