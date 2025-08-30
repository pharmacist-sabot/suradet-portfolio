<!-- src/components/PortfolioCard.vue -->
<template>
  <div class="card">
    <h3 class="card-title">{{ item.title }}</h3>
    
    <div class="card-meta">
      <!-- SVG Icon for Calendar -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      <span class="date">{{ formatDate(item.start_date, item.end_date) }}</span>
    </div>

    <p class="card-description" v-if="item.description">{{ item.description }}</p>
    <p class="card-description" v-else><i>ไม่มีรายละเอียดเพิ่มเติม</i></p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  item: {
    type: Object,
    required: true
  }
});

const formatDate = (start, end) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }; // 'short' month looks cleaner
  const startDate = new Date(start).toLocaleDateString('th-TH', options);
  
  if (end && start !== end) {
    const endDate = new Date(end).toLocaleDateString('th-TH', options);
    return `${startDate} - ${endDate}`;
  }
  
  return startDate;
};
</script>