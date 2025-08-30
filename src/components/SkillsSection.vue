<!-- src/components/SkillsSection.vue -->
<template>
  <section class="skills-section category-section" v-scroll-reveal>
    <h2 class="category-title">ทักษะและความสามารถ</h2>
    <div class="skills-grid">
      <div v-for="skill in skills" :key="skill.name" class="skill-item">
        <i :class="skill.iconClass"></i>
        <span>{{ skill.name }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// คุณสามารถเพิ่ม/แก้ไขทักษะของคุณได้ที่นี่
// ค้นหา class ของไอคอนได้ที่: https://devicon.dev/
const skills = ref([
  { name: 'HTML5', iconClass: 'devicon-html5-plain colored' },
  { name: 'CSS3', iconClass: 'devicon-css3-plain colored' },
  { name: 'JavaScript', iconClass: 'devicon-javascript-plain colored' },
  { name: 'Vue.js', iconClass: 'devicon-vuejs-plain colored' },
  { name: 'React', iconClass: 'devicon-react-plain colored' },
  { name: 'Node.js', iconClass: 'devicon-nodejs-plain colored' },
  { name: 'Git', iconClass: 'devicon-git-plain colored' },
  { name: 'Python', iconClass: 'devicon-python-plain colored' }
  // เพิ่มทักษะอื่นๆ ตามต้องการ
]);
</script>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 2rem;
  text-align: center;
}
.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.3s ease;
}
.skill-item:hover {
  transform: scale(1.1);
}
.skill-item i {
  font-size: 4rem; /* ขนาดไอคอน */
}
.skill-item span {
  color: var(--secondary-text-color);
  font-weight: 500;
}
</style>