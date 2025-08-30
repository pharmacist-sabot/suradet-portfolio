<!-- src/components/PortfolioDetailModal.vue -->
<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button @click="$emit('close')" class="modal-close-btn" aria-label="Close modal">&times;</button>
      <h2 class="modal-title">{{ item.title }}</h2>
      <div class="modal-meta">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        <span>{{ formatDate(item.start_date, item.end_date) }}</span>
      </div>
      <p class="modal-description" v-if="item.description">{{ item.description }}</p>
      <p class="modal-description" v-else><i>ไม่มีรายละเอียดเพิ่มเติม</i></p>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, onMounted, onUnmounted } from 'vue';
defineProps({ item: { type: Object, required: true } });
const emit = defineEmits(['close']);
const formatDate = (start, end) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const startDate = new Date(start).toLocaleDateString('th-TH', options);
  if (end && start !== end) {
    const endDate = new Date(end).toLocaleDateString('th-TH', options);
    return `${startDate} ถึง ${endDate}`;
  }
  return startDate;
};
const handleKeydown = (e) => {
  if (e.key === 'Escape') { emit('close'); }
};
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  document.body.style.overflow = 'hidden';
});
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = 'auto';
});
</script>
<style scoped>
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 2000; backdrop-filter: blur(5px); }
.modal-content { background-color: var(--surface-color); padding: 2.5rem; border-radius: var(--border-radius); border: 1px solid var(--border-color); width: 90%; max-width: 600px; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); animation: slide-up 0.3s ease-out; }
@keyframes slide-up { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.modal-close-btn { position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 2.5rem; color: var(--secondary-text-color); cursor: pointer; line-height: 1; padding: 0; }
.modal-close-btn:hover { color: var(--primary-text-color); }
.modal-title { font-size: 2rem; margin-top: 0; margin-bottom: 1rem; color: var(--primary-text-color); }
.modal-meta { display: flex; align-items: center; gap: 0.75rem; color: var(--secondary-text-color); margin-bottom: 1.5rem; }
.modal-meta svg { flex-shrink: 0; }
.modal-description { font-size: 1rem; line-height: 1.8; color: var(--secondary-text-color); }
</style>