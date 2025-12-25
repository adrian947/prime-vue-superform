<template>
  <div class="sidebar">
    <div>
      <div
        v-for="item in menu.top"
        :key="item.title"
        class="sidebar-item-group level-1"
      >
        <!-- Level 1 Item -->
        <div
          class="sidebar-item"
          :title="item.title"
          @click="handleClick(item)"
        >
          <img
            :src="item.image"
            class="icon main-icon"
          />
          <span class="label">{{ item.title }}</span>
          <i
            v-if="item.children"
            class="pi pi-chevron-down arrow-icon"
          ></i>
        </div>

        <!-- Level 2 Submenu -->
        <div
          v-if="item.children"
          class="submenu level-2-container"
        >
          <div
            v-for="child in item.children"
            :key="child.title"
            class="submenu-group"
          >
            <!-- Level 2 Item -->
            <div
              class="submenu-item level-2"
              :title="child.title"
              @click.stop="handleClick(child)"
            >
              <span class="label">{{ child.title }}</span>
              <img
                v-if="child.image"
                :src="child.image"
                class="icon sub-icon"
              />
            </div>

            <!-- Level 3 Submenu -->
            <div
              v-if="child.children"
              class="submenu-level-3"
            >
              <div
                v-for="subchild in child.children"
                :key="subchild.title"
                class="submenu-item level-3"
                @click.stop="handleClick(subchild)"
              >
                <span class="label">{{ subchild.title }}</span>
                <img
                  v-if="subchild.image"
                  :src="subchild.image"
                  class="icon sub-icon-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div
        v-for="item in menu.above"
        :key="item.title"
        class="sidebar-item"
        :title="item.title"
        @click="handleClick(item)"
      >
        <img
          :src="item.image"
          class="icon"
        />
        <span class="label">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

export type MenuItem = {
  title: string
  image?: string
  visible?: boolean
  path?: string
  children?: MenuItem[]
}

export type Menu = {
  top: MenuItem[]
  above: MenuItem[]
}

const props = defineProps<{
  menu: Menu
}>()

const emit = defineEmits<{
  (e: 'navigate', data: any): void
}>()

const handleClick = (item: MenuItem) => {
  if (item.path) {
    router.push(item.path)
  }
  emit('navigate', item)
}
</script>

<style scoped>
/* Sidebar Style Update */
.sidebar {
  /* Purple gradient matching Navbar */
  background: linear-gradient(135deg, #7435ff 0%, #5e2acc 100%);
  width: 70px;
  transition: width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  /* Fit within screen below navbar (assuming 70px navbar) */
  height: calc(100vh - 70px);
  position: sticky;
  top: 70px;
  /* Stick below navbar */

  /* Rounded corners on the right */
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-radius: 0 30px 30px 0;
  /* Shorthand */

  padding: 20px 0;
  z-index: 999;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 4px 0 15px rgba(116, 53, 255, 0.3);

  /* Flex layout to push bottom section down */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar:hover {
  width: 260px;
}

/* Sidebar Item Group */
.sidebar-item-group {
  position: relative;
  margin-bottom: 5px;
}

/* Base Items */
.sidebar-item,
.submenu-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: rgba(255, 255, 255, 0.85);
  /* White text */
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s;
  margin: 0 10px;
  white-space: nowrap;
}

.sidebar-item:hover,
.submenu-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  transform: translateX(3px);
}

/* Icons and Labels */
.icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  object-fit: contain;
  filter: brightness(0) invert(1);
  /* Make icons white */
}

/* Active/Hover states for icons if needed */
.sidebar-item:hover .icon {
  opacity: 1;
}

.label {
  margin-left: 15px;
  opacity: 0;
  transition: opacity 0.2s;
  flex-grow: 1;
  font-size: 0.95rem;
  font-weight: 500;
}

.sidebar:hover .label {
  opacity: 1;
}

/* Level 2 Container */
.level-2-container {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
  background-color: rgba(0, 0, 0, 0.15);
  /* Darker background for nested */
  border-radius: 12px;
  margin: 5px 10px;
}

/* Show Level 2 on hover of Level 1 */
.sidebar-item-group:hover .level-2-container {
  max-height: 500px;
  /* Arbitrary large height */
}

/* Level 2 Items */
.submenu-item.level-2 {
  padding-left: 15px;
  font-size: 0.85rem;
}

/* Level 3 Submenu */
.submenu-level-3 {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  margin-left: 10px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

/* Show Level 3 on hover of Level 2 Group */
.submenu-group:hover .submenu-level-3 {
  max-height: 300px;
}

/* Level 3 items */
.submenu-item.level-3 {
  padding-left: 20px;
  font-size: 0.8rem;
  color: #bbb;
}

.submenu-item.level-3:hover {
  color: #fff;
}

.sub-icon {
  width: 18px;
  height: 18px;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
</style>
