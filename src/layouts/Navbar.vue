<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = [
  { name: 'Home', path: '/', icon: 'pi pi-home' },
  { name: 'About', path: '/about', icon: 'pi pi-info-circle' },
  { name: 'Form', path: '/form', icon: 'pi pi-file-edit' },
  { name: 'Feedback', path: '/feedback', icon: 'pi pi-comments' }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-brand">
        <router-link
          to="/"
          class="brand-link"
        >
          <i class="pi pi-bolt brand-icon"></i>
          <span class="brand-text">Smartclaims</span>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <div class="navbar-menu desktop-menu">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ active: isActive(item.path) }"
        >
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </router-link>
        <router-link
          to="/table"
          class="nav-link"
        >
          <i class="pi pi-table"></i>
          <span>Table Demo</span>
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="mobile-menu-button"
        @click="toggleMobileMenu"
      >
        <i :class="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <transition name="slide">
      <div
        v-if="mobileMenuOpen"
        class="mobile-menu"
      >
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="mobile-nav-link"
          :class="{ active: isActive(item.path) }"
          @click="mobileMenuOpen = false"
        >
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </router-link>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #7435ff 0%, #5e2acc 100%);
  box-shadow: 0 2px 12px rgba(116, 53, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

/* Brand */
.navbar-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  transition: transform 0.3s ease;
}

.brand-link:hover {
  transform: scale(1.05);
}

.brand-icon {
  font-size: 2rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.brand-text {
  background: linear-gradient(to right, #ffffff, #e0d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Desktop Menu */
.desktop-menu {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  transform: translateY(-2px);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-link i {
  font-size: 1.1rem;
}

/* Mobile Menu Button */
.mobile-menu-button {
  display: none;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-menu-button:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  background: linear-gradient(135deg, #6b2acc 0%, #5420a8 100%);
  padding: 1rem;
  gap: 0.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.mobile-nav-link.active {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}

.mobile-nav-link i {
  font-size: 1.2rem;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .mobile-menu {
    display: flex;
  }
}
</style>
