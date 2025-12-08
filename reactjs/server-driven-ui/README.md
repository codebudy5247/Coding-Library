# Server Driven UI Example

A React TypeScript application demonstrating the **Server Driven UI** pattern, where the UI structure is defined entirely by JSON configuration received from a "server".

## 🎯 What is Server Driven UI?

Server Driven UI (SDUI) allows the backend to control the frontend layout and components dynamically. Instead of hardcoding UI components, the frontend renders whatever the backend tells it to render via JSON schemas.

## 📋 Example JSON Schema

```json
{
  "id": "welcome-card",
  "type": "card",
  "props": {
    "title": "Dynamic Content"
  },
  "children": [
    {
      "id": "card-text",
      "type": "text",
      "props": {
        "content": "This is server-driven!"
      }
    }
  ]
}
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 💡 Benefits of SDUI

1. **Dynamic updates** - Change UI without app updates
2. **A/B testing** - Different users see different UIs
3. **Personalization** - Customize UI per user
4. **Flexibility** - Backend controls the experience
5. **Consistency** - Same components, different arrangements

## 📦 Extending

To add new components:

1. Create component in `src/sdui/components/YourComponent.tsx`
2. Register it in `src/sdui/registry.ts`
3. Use it in your JSON schema

