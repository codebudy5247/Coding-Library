# Micro Frontend Architecture Demo

A comprehensive example demonstrating micro frontend architecture with **THREE different frameworks** working together! This project showcases how independent applications built with React, Vue.js, and Angular can seamlessly integrate into a cohesive user experience using Module Federation.

## 🏗️ Architecture

```
micro-frontend/
├── host/              # Container application (port 5000) - React
├── products/          # Products catalog (port 5001) - React
├── cart/              # Shopping cart (port 5002) - React
├── user-profile/      # User profile (port 5003) - React
├── notifications/     # Notifications (port 5004) - Vue.js ✨
└── settings/          # App settings (port 5005) - Angular 🅰️
```

### 🎉 Framework-Agnostic!
This example proves that **micro frontends can use ANY framework**! 
- **React** (4 apps): Host, Products, Cart, User Profile
- **Vue.js** (1 app): Notifications
- **Angular** (1 app): Settings

All working together seamlessly in one application!

## ✨ Key Features

- **🌐 Framework Diversity** - React, Vue.js, and Angular in one app
- **🚀 Independent Deployment** - Each micro frontend deploys separately
- **🔄 Shared Dependencies** - React loaded only once (singleton pattern)
- **📡 Inter-App Communication** - Custom events for cross-app messaging
- **🛡️ Error Boundaries** - Graceful degradation if a micro frontend fails
- **🔧 Standalone Mode** - Each micro frontend runs independently
- **📘 TypeScript** - Full type safety across all applications
- **⚡ Vite + Module Federation** - Lightning-fast development

## 🚀 Getting Started

### Installation

Install dependencies for **all six applications**:

```bash
# Host (React)
cd host && npm install

# Products (React)
cd ../products && npm install

# Cart (React)
cd ../cart && npm install

# User Profile (React)
cd ../user-profile && npm install

# Notifications (Vue.js)
cd ../notifications && npm install

# Settings (Angular)
cd ../settings && npm install
```

### Running the Applications

**IMPORTANT:** You need to start ALL applications in separate terminal windows. Start remote apps BEFORE the host.

```bash
# Terminal 1 - Products (React)
cd products
npm run dev

# Terminal 2 - Cart (React)
cd cart
npm run dev

# Terminal 3 - User Profile (React)
cd user-profile
npm run dev

# Terminal 4 - Notifications (Vue.js)
cd notifications
npm run dev

# Terminal 5 - Settings (Angular)
cd settings
npm run dev

# Terminal 6 - Host (React - START LAST!)
cd host
npm run dev
```

### Access Points

Then open your browser to:
- **🏠 Host Application**: http://localhost:5000 (main entry point)
- **📦 Products (standalone)**: http://localhost:5001
- **🛒 Cart (standalone)**: http://localhost:5002
- **👤 User Profile (standalone)**: http://localhost:5003
- **🔔 Notifications (standalone)**: http://localhost:5004
- **⚙️ Settings (standalone)**: http://localhost:5005

## 📦 What's Included

### 1. Host Application (React) - Port 5000
**The Shell/Container**
- Navigation between all micro frontends
- Lazy loading with React Suspense
- Error boundaries for each remote
- Routing with React Router
- VueWrapper for embedding Vue components
- Framework-agnostic integration layer

### 2. Products Micro Frontend (React) - Port 5001
**E-commerce Product Catalog**
- 6 tech products with search functionality
- Add to cart with real-time updates
- Product cards with hover effects
- Dispatches custom events for inter-app communication
- Demonstrates cross-framework event messaging

### 3. Cart Micro Frontend (React) - Port 5002
**Shopping Cart Management**
- Listens for "add to cart" events from Products
- Dynamic cart items with quantity controls
- Add/remove items functionality
- Real-time total calculation
- Event-driven state management

### 4. User Profile Micro Frontend (React) - Port 5003
**User Profile & Preferences**
- Editable user information (name, email, phone, bio)
- Profile settings (notifications, theme)
- Save/cancel functionality
- Form state management
- Profile avatar display

### 5. Notifications Micro Frontend (Vue.js) - Port 5004
**Notification Center** ✨ **Built with Vue.js!**
- Real-time notifications list
- Read/unread state management
- Mark as read functionality
- Mark all as read / Clear all actions
- Vue 3 Composition API
- Custom element integration with React host

### 6. Settings Micro Frontend (Angular) - Port 5005
**Application Settings** 🅰️ **Built with Angular!**
- Language selection (English, Español, Français, Deutsch)
- Timezone configuration
- Email & push notification toggles
- Dark mode & auto-save settings
- Angular 17 with FormsModule
- Two-way data binding with ngModel
- Save & reset functionality

## 🔗 Inter-App Communication

The applications communicate using browser **Custom Events**:

```javascript
// Products (React) dispatches event
window.dispatchEvent(new CustomEvent('addToCart', { detail: product }));

// Cart (React) listens for event
window.addEventListener('addToCart', (event) => {
  const product = event.detail;
  // Add product to cart state
});
```

This demonstrates **framework-agnostic communication** - any framework can dispatch/listen to events!

## 💡 How Module Federation Works

### 1. Remote Apps Expose Components

**React (Vite + Module Federation):**
```typescript
// products/vite.config.ts
federation({
  name: 'products',
  filename: 'remoteEntry.js',
  exposes: {
    './ProductsApp': './src/ProductsApp.tsx',
  },
})
```

**Vue.js:**
```typescript
// notifications/vite.config.ts
federation({
  name: 'notifications',
  exposes: {
    './NotificationsApp': './src/NotificationsApp.ce.vue',
  },
})
```

**Angular (Webpack):**
```javascript
// settings/webpack.config.js
new ModuleFederationPlugin({
  name: "settings",
  exposes: {
    './SettingsModule': './src/app/settings/settings.module.ts',
  },
})
```

### 2. Host App Consumes Them

```typescript
// host/vite.config.ts
federation({
  name: 'host',
  remotes: {
    products: 'http://localhost:5001/assets/remoteEntry.js',
    cart: 'http://localhost:5002/assets/remoteEntry.js',
    userProfile: 'http://localhost:5003/assets/remoteEntry.js',
    notifications: 'http://localhost:5004/assets/remoteEntry.js',
    settings: 'http://localhost:5005/remoteEntry.js',
  },
})
```

### 3. Import Dynamically

```typescript
// React components
const ProductsApp = lazy(() => import('products/ProductsApp'));
const CartApp = lazy(() => import('cart/CartApp'));

// Vue component (via wrapper)
const NotificationsApp = lazy(() => import('notifications/NotificationsApp'));

// Angular (standalone access)
// Accessible at localhost:5005
```

## 🎯 Benefits of Micro Frontends

✅ **Team Autonomy** - Different teams can own different micro frontends  
✅ **Independent Deployment** - Deploy updates without affecting other apps  
✅ **Technology Flexibility** - Use React, Vue, Angular, or any framework!  
✅ **Scalability** - Easier to scale development across teams  
✅ **Fault Isolation** - One app's failure doesn't crash the entire application  
✅ **Incremental Migration** - Gradually migrate from one framework to another  
✅ **Specialized Teams** - Teams can use their preferred technology stack  

## ⚠️ Trade-offs

❌ **Complexity** - More complex setup than a monolith  
❌ **Performance** - Initial load might be slower due to multiple bundles  
❌ **Shared State** - More difficult than in a monolith  
❌ **Testing** - Integration testing is more complex  
❌ **Version Management** - Need to coordinate shared dependency versions  
❌ **Build Tooling** - Different frameworks may require different build configs  

## 🛠️ Building for Production

```bash
# Build all applications
cd host && npm run build
cd ../products && npm run build
cd ../cart && npm run build
cd ../user-profile && npm run build
cd ../notifications && npm run build
cd ../settings && npm run build
```

Each app builds independently and can be deployed to separate CDNs or servers.

## 📚 Technology Stack

| App | Framework | Build Tool | Port |
|-----|-----------|------------|------|
| Host | React 18 | Vite | 5000 |
| Products | React 18 | Vite | 5001 |
| Cart | React 18 | Vite | 5002 |
| User Profile | React 18 | Vite | 5003 |
| Notifications | Vue 3 | Vite | 5004 |
| Settings | Angular 17 | Angular CLI + Webpack | 5005 |

## 🔧 Framework Integration Techniques

### React → React
Direct lazy imports via Module Federation

### React → Vue
- Vue component exported as Web Component (Custom Element)
- `VueWrapper` component in React host
- Uses Vue 3's `defineCustomElement`

### React → Angular
- Angular app runs standalone on port 5005
- Can be integrated via iframe or Angular Elements
- Demonstrates independent deployment model

## 🤝 Use Cases

This architecture is ideal for:
- 🏢 **Large-scale applications** with multiple teams
- 🎯 **Applications with distinct feature areas**
- 🚀 **Projects requiring independent deployment cycles**
- 📈 **Systems where different parts have different scaling needs**
- 🔄 **Migrating from one framework to another** incrementally
- 👥 **Organizations with teams specialized in different frameworks**

## 🔍 Tips & Best Practices

1. **Always start remote apps before the host**
2. **Use strict ports** to avoid conflicts (configured in vite.config.ts)
3. **Test each app standalone** before integrating
4. **Use error boundaries** for resilience
5. **Keep shared dependencies in sync** (especially React versions)
6. **Document inter-app communication protocols**
7. **Use TypeScript** for better type safety across apps
8. **Monitor bundle sizes** - each framework adds overhead
9. **Consider shared UI components** for consistent design
10. **Plan your deployment strategy** early

## 🐛 Troubleshooting

### App won't load in host
- Ensure the remote app is running on its designated port
- Check browser console for Module Federation errors
- Verify the `remoteEntry.js` URL is accessible

### "Cannot find module" errors
- Run `npm install` in each app directory
- Check that all apps use compatible React versions (for shared dependencies)

### Vue component not rendering
- Ensure Vue app is running on port 5004
- Check that the component is exported as a custom element

### Port conflicts
- Ensure no other apps are using ports 5000-5005
- Ports are strictly configured to avoid conflicts

## 📖 Learn More

- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Vite Plugin Federation](https://github.com/originjs/vite-plugin-federation)
- [Micro Frontends](https://micro-frontends.org/)
- [Vue Custom Elements](https://vuejs.org/guide/extras/web-components.html)
- [Angular Elements](https://angular.io/guide/elements)

## 🎓 What You'll Learn

By exploring this project, you'll understand:
- How to set up Module Federation with Vite
- Framework-agnostic micro frontend architecture
- Inter-app communication patterns
- Error handling in distributed UI systems
- Web Components for framework integration
- Independent deployment strategies
- Shared dependency management

---

**Built with ❤️ using React, Vue.js, Angular, Vite, and Module Federation**

*A complete demonstration of framework-agnostic micro frontend architecture*
