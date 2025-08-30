 <!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-brand" @click="closeMenu">
        Suradet | Portfolio
      </router-link>

      <!-- Hamburger Menu Icon -->
      <button 
        class="hamburger-menu" 
        @click="toggleMenu" 
        :class="{ 'is-active': isMenuOpen }"
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation Links -->
      <div class="nav-links" :class="{ 'nav-links-mobile-active': isMenuOpen }">
        <router-link to="/" @click="closeMenu">ผลงานทั้งหมด</router-link>
        <router-link to="/add" @click="closeMenu">เพิ่มผลงาน</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value; };
const closeMenu = () => { isMenuOpen.value = false; };
</script>