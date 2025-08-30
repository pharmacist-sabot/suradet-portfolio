<!-- src/views/PortfolioView.vue (ฉบับแก้ไขสมบูรณ์) -->
<template>
  <main class="container">
    <section class="hero fade-in">
      <h1>Suradet Pratomsak</h1>
      <p class="tagline">
        เภสัชกรชำนาญการ โรงพยาบาลสระโบสถ์ นักพัฒนา, วิทยากร, และผู้สร้างสรรค์นวัตกรรม
        ที่นี่คือพื้นที่รวบรวมผลงานและประสบการณ์ของผม
      </p>
    </section>

    <!-- ***** CHANGE #1: Removed v-scroll-reveal, animation will be handled by CSS ***** -->
    <SkillsSection class="category-section" />

    <div v-if="loading" class="loading">กำลังโหลดข้อมูลผลงาน...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && !error && portfolioItems.length === 0" class="empty-state">
      ยังไม่มีผลงานในระบบ... <router-link to="/add">เพิ่มผลงานชิ้นแรก!</router-link>
    </div>

    <div v-if="!loading && !error && portfolioItems.length > 0">
      <!-- ***** CHANGE #2: Removed v-scroll-reveal from here too ***** -->
      <section v-for="(items, category) in groupedItems" :key="category" class="category-section">
        <h2 class="category-title">{{ category }}</h2>
        <div class="item-title-list">
          <div v-for="item in items" :key="item.id" class="item-title" @click="openModal(item)">
            <span class="title-text">{{ item.title }}</span>
            <span class="item-date">{{ formatSimpleDate(item.start_date) }}</span>
          </div>
        </div>
      </section>
    </div>

    <PortfolioDetailModal v-if="isModalOpen" :item="selectedItem" @close="closeModal" />
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../supabase';
import SkillsSection from '../components/SkillsSection.vue';
import PortfolioDetailModal from '../components/PortfolioDetailModal.vue';

const isModalOpen = ref(false);
const selectedItem = ref(null);

const openModal = (item) => { selectedItem.value = item; isModalOpen.value = true; };
const closeModal = () => { isModalOpen.value = false; selectedItem.value = null; };

const formatSimpleDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('th-TH', options);
};

const portfolioItems = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchPortfolioItems() {
  try {
    loading.value = true;
    const { data, error: dbError } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('start_date', { ascending: false });
    if (dbError) throw dbError;
    portfolioItems.value = data || [];
  } catch (err) {
    console.error('Error fetching data:', err);
    error.value = 'เกิดข้อผิดพลาดในการโหลดข้อมูล';
  } finally {
    loading.value = false;
  }
}

// ***** START OF CHANGE #3: Improved and more flexible grouping logic *****
const groupedItems = computed(() => {
  // Group all items by category dynamically from the data
  const groups = portfolioItems.value.reduce((acc, item) => {
    const category = item.category || 'ไม่มีหมวดหมู่';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Define the desired order of categories
  const categoryOrder = ['วิทยากร', 'ผลงานวิชาการ', 'นวัตกรรม', 'การประชุม/อบรม'];
  
  // Sort the grouped items based on the defined order
  const sortedGroups = {};
  categoryOrder.forEach(category => {
    if (groups[category]) {
      sortedGroups[category] = groups[category];
      delete groups[category]; // Remove from original to handle remaining categories
    }
  });

  // Add any remaining categories (that were not in the order list) to the end
  Object.keys(groups).forEach(category => {
    sortedGroups[category] = groups[category];
  });

  return sortedGroups;
});
// ***** END OF CHANGE #3 *****

onMounted(() => { 
  fetchPortfolioItems(); 
});
</script>

<!-- Add a simple animation style directly here for simplicity -->
<style scoped>
.fade-in {
  animation: fadeInAnimation 0.8s ease-in-out forwards;
}

.category-section {
  animation: fadeInAnimation 0.8s ease-in-out forwards;
  animation-delay: 0.2s; /* Stagger the animation */
  opacity: 0; /* Start hidden */
}

@keyframes fadeInAnimation {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>