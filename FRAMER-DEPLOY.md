# 🎯 FRAMER DEPLOYMENT GUIDE
### Green Star Solar VAPI Widget - Perfect for Framer Sites

---

## 🚀 **INSTANT FRAMER DEPLOYMENT**

### **⚡ Quick Setup (5 Minutes)**

1. **Add Custom Code Component** in Framer:
   - Drag **Custom Code** component to your page
   - Or use **Insert** → **Custom Code**

2. **Copy & Paste Widget Code**:
   - Open [`widget/widget-framer.html`](./widget/widget-framer.html)
   - **Select All** (Ctrl+A / Cmd+A) and **Copy**
   - **Paste** into Framer's Custom Code component

3. **Configure Component**:
   - **Width**: `Auto` or `100%`
   - **Height**: `100px` (minimum)
   - **Position**: `Fixed` (recommended)
   - **Z-index**: `10000`

4. **Publish** your Framer site ✅

---

## 🔒 **SECURE PRODUCTION SETUP**

### **For Maximum Security (Recommended)**

1. **Deploy Backend Server**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Add your VAPI credentials to .env
   npm run start:secure
   ```

2. **Configure CORS for Framer**:
   ```env
   # In backend/.env
   CORS_ORIGINS=https://your-site.framer.website,https://your-custom-domain.com
   ```

3. **Use Secure Widget**:
   - Use `widget-framer.html` (includes all security features)
   - Widget automatically connects to your secure backend

---

## 🎯 **FRAMER-SPECIFIC FEATURES**

### **✅ Perfect Framer Integration**
- **Auto-positioning**: Widget floats perfectly over Framer content
- **Z-index optimization**: Always appears above Framer elements  
- **Responsive design**: Adapts to Framer's responsive system
- **Animation safe**: Won't conflict with Framer animations
- **Touch optimized**: Perfect mobile experience

### **✅ Framer Deployment Options**

#### **Option A: Single Page**
- Add Custom Code component to specific page
- Widget appears only on that page

#### **Option B: Site-Wide** 
- **Site Settings** → **Custom Code** → **End of `<body>`**
- Widget appears on all pages

#### **Option C: Multiple Pages**
- Add Custom Code component to multiple pages
- Full control over widget placement

---

## 🎨 **CUSTOMIZATION FOR FRAMER**

### **Match Your Framer Design**
```css
/* Add this to the widget CSS */
:root {
  --vapi-primary-color: #your-brand-color;
  --vapi-secondary-color: #your-accent-color;
}
```

### **Position Adjustments**
```css
#vapi-hybrid-widget {
  bottom: 20px;  /* Adjust for your layout */
  right: 20px;   /* Left: 20px for left side */
}
```

---

## 📱 **MOBILE OPTIMIZATION**

### **Automatic Mobile Adaptation**
- **Responsive sizing**: Adjusts to mobile screens
- **Touch-friendly**: Optimized for mobile interactions
- **iOS/Android**: Full compatibility
- **Framer Preview**: Test with Framer's mobile preview

---

## 🔧 **TROUBLESHOOTING**

### **Widget Not Visible**
```
✅ Check Z-index is set to 999999
✅ Ensure Custom Code component has minimum 100px height
✅ Verify widget code was pasted completely
✅ Check Framer Preview mode
```

### **Mobile Issues**
```
✅ Test in Framer's device preview
✅ Check responsive breakpoints
✅ Verify touch interactions work
✅ Test on actual mobile devices
```

### **Voice Not Working**
```
✅ Ensure site is served over HTTPS
✅ Check microphone permissions
✅ Verify secure backend is deployed
✅ Test voice in different browsers
```

---

## ✅ **FRAMER DEPLOYMENT CHECKLIST**

**Pre-Deployment**:
- [ ] Backend server deployed (for secure version)
- [ ] CORS configured for your Framer domain
- [ ] Widget code copied from `widget-framer.html`

**In Framer**:
- [ ] Custom Code component added
- [ ] Widget code pasted completely
- [ ] Component settings configured (width, height, z-index)
- [ ] Mobile preview tested

**Post-Deployment**:
- [ ] Live site tested on desktop
- [ ] Mobile responsiveness verified
- [ ] Voice functionality tested (if using secure backend)
- [ ] Chat functionality confirmed
- [ ] Security features validated

---

## 🎉 **SUCCESS INDICATORS**

When properly deployed, you'll see:
- ✅ Green Star Solar chat button (bottom-right)
- ✅ Console message: "VAPI Widget loaded successfully in Framer!"
- ✅ Smooth animations and interactions
- ✅ Responsive behavior on mobile
- ✅ Working chat and voice features

---

## 📞 **FRAMER-SPECIFIC SUPPORT**

### **Need Help?**
- 📧 **Email**: hello@coldlava.ai
- 🎯 **Subject**: "Framer Widget Integration"
- 📋 **Include**: Your Framer site URL and any error messages

### **Quick Questions**
1. **"Widget not showing?"** → Check Z-index and component height
2. **"Mobile issues?"** → Use Framer's device preview for testing
3. **"Voice not working?"** → Ensure HTTPS and backend deployment
4. **"Customization help?"** → See customization section above

---

**🎯 This widget is specifically optimized for Framer and will work perfectly on your site!** 

**Deployment Time**: 5 minutes  
**Compatibility**: ✅ All Framer plans  
**Mobile Ready**: ✅ Fully responsive  
**Security**: ✅ Enterprise-grade  

**🚀 Ready to go live!**