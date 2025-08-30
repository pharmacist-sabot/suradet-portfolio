<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-brand" @click="closeMenu">
        Suradet | Portfolio
      </router-link>

      <!-- Hamburger Menu Icon (แสดงเฉพาะบนมือถือ) -->
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

// **สำคัญ:** อย่าลืมเปลี่ยน Your Name เป็นชื่อของคุณ

// State สำหรับควบคุมการเปิด/ปิดเมนูบนมือถือ
const isMenuOpen = ref(false);

// Function สำหรับสลับสถานะเมนู
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Function สำหรับปิดเมนู (ใช้เมื่อคลิกที่ลิงก์)
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
/* Scoped CSS จะมีผลแค่ใน Component นี้เท่านั้น */

.navbar {
  /* ใช้ CSS variable จาก main.css */
  background-color: rgba(28, 36, 56, 0.8);
  backdrop-filter: blur(10px);
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 10; /* ให้อยู่เหนือเมนู */
}

/* --- Desktop Navigation Styles --- */
.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: var(--primary-text-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-links a:hover, .nav-links a.router-link-exact-active {
  background-color: rgba(134, 152, 254, 0.1);
  color: #c4cfff;
}

/* ซ่อน Hamburger Icon บนจอใหญ่ */
.hamburger-menu {
  display: none;
}


/* --- Mobile Navigation Styles (ทำงานเมื่อจอแคบกว่า 768px) --- */
@media (max-width: 768px) {
  /* แสดง Hamburger Icon */
  .hamburger-menu {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
  }

  .hamburger-menu span {
    width: 2rem;
    height: 3px;
    background: var(--primary-text-color);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
  
  /* Animation Hamburger -> X mark */
  .hamburger-menu.is-active span:nth-child(1) {
    transform: rotate(45deg);
  }
  .hamburger-menu.is-active span:nth-child(2) {
    opacity: 0;
    transform: translateX(20px);
  }
  .hamburger-menu.is-active span:nth-child(3) {
    transform: rotate(-45deg);
  }

  /* ซ่อนลิงก์แนวนอนบนมือถือ (สถานะปกติ) */
  .nav-links {
    display: none; /* ซ่อนไว้ก่อน */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    padding-top: 6rem;
    background-color: var(--background-color);
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  /* แสดงเมนูเมื่อ isMenuOpen เป็น true */
  .nav-links.nav-links-mobile-active {
    display: flex;
  }
  
  .nav-links a {
    font-size: 1.25rem;
  }
}
</style>