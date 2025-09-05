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