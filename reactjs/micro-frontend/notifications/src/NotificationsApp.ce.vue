<template>
  <div :style="containerStyle">
    <div :style="headerStyle">
      <h2 style="margin: 0; color: #333">🔔 Notifications</h2>
      <span :style="badgeStyle">{{ unreadCount }}</span>
    </div>

    <div :style="messageStyle">
      <p style="color: #666; margin-bottom: 1rem">
        Built with <strong style="color: #42b883">Vue.js</strong> 🎉
      </p>
      <p style="color: #999; font-size: 0.9rem">
        This demonstrates that micro frontends can use different frameworks!
      </p>
    </div>

    <div :style="listContainerStyle">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :style="notificationStyle(notification.read)"
        @click="markAsRead(notification.id)"
      >
        <div style="flex: 1">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem">
            <span style="font-size: 1.5rem">{{ notification.icon }}</span>
            <h4 style="margin: 0; color: #333; font-size: 1rem">
              {{ notification.title }}
            </h4>
            <span v-if="!notification.read" :style="unreadDotStyle"></span>
          </div>
          <p style="margin: 0; color: #666; font-size: 0.9rem">
            {{ notification.message }}
          </p>
          <p style="margin: 0.5rem 0 0 0; color: #999; font-size: 0.8rem">
            {{ notification.time }}
          </p>
        </div>
        <button
          v-if="!notification.read"
          @click.stop="markAsRead(notification.id)"
          :style="markReadButtonStyle"
        >
          ✓
        </button>
      </div>
    </div>

    <div :style="actionBarStyle">
      <button @click="markAllAsRead" :style="buttonStyle">
        Mark All as Read
      </button>
      <button @click="clearAll" :style="{ ...buttonStyle, background: '#dc3545' }">
        Clear All
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Notification {
  id: number;
  icon: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications = ref<Notification[]>([
  {
    id: 1,
    icon: '🛒',
    title: 'New Item Added to Cart',
    message: 'Wireless Headphones have been added to your cart',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    icon: '✅',
    title: 'Profile Updated',
    message: 'Your profile information has been successfully updated',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    icon: '🎉',
    title: 'Welcome!',
    message: 'Welcome to the Micro Frontend demo application',
    time: '2 hours ago',
    read: true,
  },
  {
    id: 4,
    icon: '💡',
    title: 'Framework Agnostic',
    message: 'This notification panel is built with Vue.js while the rest uses React!',
    time: '3 hours ago',
    read: false,
  },
]);

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length;
});

const markAsRead = (id: number) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true);
};

const clearAll = () => {
  notifications.value = [];
};

// Styles
const containerStyle = {
  maxWidth: '1200px',
  margin: '2rem auto',
  padding: '2rem',
  background: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
  paddingBottom: '1rem',
  borderBottom: '2px solid #e0e0e0',
};

const badgeStyle = {
  background: '#42b883',
  color: 'white',
  padding: '0.25rem 0.75rem',
  borderRadius: '12px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
};

const messageStyle = {
  padding: '1rem',
  background: '#f0f9ff',
  border: '1px solid #bfdbfe',
  borderRadius: '8px',
  marginBottom: '1.5rem',
};

const listContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1rem',
  marginBottom: '1.5rem',
};

const notificationStyle = (read: boolean) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
  padding: '1rem',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  background: read ? '#f9f9f9' : 'white',
  cursor: 'pointer',
  transition: 'all 0.2s',
  opacity: read ? 0.7 : 1,
});

const unreadDotStyle = {
  width: '8px',
  height: '8px',
  background: '#42b883',
  borderRadius: '50%',
  display: 'inline-block',
};

const markReadButtonStyle = {
  width: '32px',
  height: '32px',
  border: '1px solid #42b883',
  background: 'white',
  color: '#42b883',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const actionBarStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  flexWrap: 'wrap' as const,
};

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  background: '#42b883',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem',
};
</script>
