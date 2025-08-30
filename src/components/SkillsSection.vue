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

const skills = ref([
  { name: 'HTML5', iconClass: 'devicon-html5-plain colored' },
  { name: 'CSS3', iconClass: 'devicon-css3-plain colored' },
  { name: 'JavaScript', iconClass: 'devicon-javascript-plain colored' },
  { name: 'Vue.js', iconClass: 'devicon-vuejs-plain colored' },
  { name: 'React', iconClass: 'devicon-react-plain colored' },
  { name: 'Node.js', iconClass: 'devicon-nodejs-plain colored' },
  { name: 'Git', iconClass: 'devicon-git-plain colored' },
  { name: 'Python', iconClass: 'devicon-python-plain colored' }
]);
</script>