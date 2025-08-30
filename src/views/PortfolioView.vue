<!-- src/views/PortfolioView.vue (ฉบับแก้ไข) -->
<template>
  <main class="container">
    
    <!-- Hero Section (ของคุณทำไว้ดีแล้ว) -->
    <section class="hero" v-scroll-reveal>
      <h1>Suradet Pratomsak</h1>
      <p class="tagline">
        เภสัชกรชำนาญการ โรงพยาบาลสระโบสถ์ นักพัฒนา, วิทยากร, และผู้สร้างสรรค์นวัตกรรม
        ที่นี่คือพื้นที่รวบรวมผลงานและประสบการณ์ของผม
      </p>
    </section>
    
    <!-- Skills Section (ของคุณทำไว้ดีแล้ว) -->
    <SkillsSection />

    <div v-if="loading" class="loading">กำลังโหลดข้อมูลผลงาน...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="!loading && !error && Object.keys(groupedItems).length === 0" class="empty-state">
      ยังไม่มีผลงานในระบบ... <router-link to="/add">เพิ่มผลงานชิ้นแรก!</router-link>
    </div>

    <div v-if="!loading && !error">
      <section 
        v-for="(items, category) in groupedItems" 
        :key="category" 
        class="category-section"
        v-scroll-reveal 
      >
        <h2 class="category-title">{{ category }}</h2>
        
        <!-- นี่คือส่วนที่เปลี่ยนไป: สร้างลิสต์ของชื่อเรื่องแทนการ์ด -->
        <div class="item-title-list">
          <div 
            v-for="item in items" 
            :key="item.id" 
            class="item-title" 
            @click="openModal(item)"
          >
            <span class="title-text">{{ item.title }}</span>
            <span class="item-date">{{ formatSimpleDate(item.start_date) }}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- Modal จะถูกเรียกใช้จากที่นี่ -->
    <PortfolioDetailModal 
      v-if="isModalOpen" 
      :item="selectedItem" 
      @close="closeModal" 
    />
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../supabase';
import SkillsSection from '../components/SkillsSection.vue';
// เราจะสร้างไฟล์นี้ในขั้นตอนต่อไป
import PortfolioDetailModal from '../components/PortfolioDetailModal.vue'; 

// --- Logic สำหรับควบคุม Modal ---
const isModalOpen = ref(false);
const selectedItem = ref(null);

const openModal = (item) => {
  selectedItem.value = item;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedItem.value = null;
};
// ---------------------------------

// ฟังก์ชันสำหรับ format วันที่ในลิสต์
const formatSimpleDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('th-TH', options);
};

const portfolioItems = ref([]);
const loading = ref(true);
const error = ref(null);

// โค้ดส่วนดึงข้อมูลและจัดกลุ่ม เหมือนเดิม ไม่ต้องแก้
async function fetchPortfolioItems() {
  try {
    loading.value = true;
    const { data, error: dbError } = await supabase.from('portfolio_items').select('*').order('start_date', { ascending: false });
    if (dbError) throw dbError;
    portfolioItems.value = data;
  } catch (err) {
    console.error('Error fetching data:', err);
    error.value = 'เกิดข้อผิดพลาดในการโหลดข้อมูล';
  } finally {
    loading.value = false;
  }
}
const groupedItems = computed(() => {
  const groups = {};
  const categoryOrder = ['วิทยากร', 'ผลงานวิชาการ', 'นวัตกรรม', 'การประชุม/อบรม'];
  for (const category of categoryOrder) { groups[category] = []; }
  for (const item of portfolioItems.value) { if (groups[item.category]) { groups[item.category].push(item); } }
  for (const category in groups) { if (groups[category].length === 0) { delete groups[category]; } }
  return groups;
});
onMounted(() => { fetchPortfolioItems(); });
</script>