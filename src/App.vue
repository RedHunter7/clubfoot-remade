<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import SideBar from './components/SideBar.vue'
</script>

<template>
  <div className="drawer">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col">
      <!--{/* Navbar */}-->
      <NavigationBar />

      <!--{/* Page content here */}-->
      <RouterView class="bg-primary min-h-[h-[calc(100vh_-_72px)]]" />
    </div>
    <div className="drawer-side">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <!--{/* Sidebar */}-->
      <SideBar />
    </div>
  </div>
</template>
