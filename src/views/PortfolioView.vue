<!-- src/views/PortfolioView.vue -->
<template>
  <main class="container">
    
    <!-- Hero Section -->
    <section class="hero" v-scroll-reveal>
      <h1>Suradet Pratomsak</h1>
      <p class="tagline">
        เภสัชกรชำนาญการ โรงพยาบาลสระโบสถ์ นักพัฒนา, วิทยากร, และผู้สร้างสรรค์นวัตกรรม
        ที่นี่คือพื้นที่รวบรวมผลงานและประสบการณ์ของผม
      </p>
    </section>
    <SkillsSection />

    <div v-if="loading" class="loading">กำลังโหลดข้อมูลผลงาน...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="!loading && !error && Object.keys(groupedItems).length === 0" class="empty-state">
      ยังไม่มีผลงานในระบบ... <router-link to="/add">เพิ่มผลงานชิ้นแรก!</router-link>
    </div>

    <div v-if="!loading && !error">
      <!-- ใช้ v-scroll-reveal กับ section ที่วนลูป -->
      <section 
        v-for="(items, category) in groupedItems" 
        :key="category" 
        class="category-section"
        v-scroll-reveal 
      >
        <h2 class="category-title">{{ category }}</h2>
        <div class="portfolio-list">
          <!-- เราไม่จำเป็นต้องใส่ animation ที่ card ย่อย เพราะทั้ง section จะโผล่มาพร้อมกัน -->
          <PortfolioCard 
            v-for="item in items" 
            :key="item.id" 
            :item="item" 
          />
        </div>
      </section>
    </div>

  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../supabase';
import PortfolioCard from '../components/PortfolioCard.vue';
import SkillsSection from '../components/SkillsSection.vue';

// **สำคัญ:** อย่าลืมเปลี่ยน [ชื่อของคุณ] และ tagline ใน <template> ด้านบน

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
  
  // สร้าง key เปล่าๆ ตามลำดับที่ต้องการก่อน
  for (const category of categoryOrder) {
      groups[category] = [];
  }

  // เพิ่มข้อมูลลงใน group
  for (const item of portfolioItems.value) {
    if (groups[item.category]) {
      groups[item.category].push(item);
    }
  }

  // กรอง group ที่ไม่มีข้อมูลออก
  for (const category in groups) {
      if (groups[category].length === 0) {
          delete groups[category];
      }
  }
  
  return groups;
});


onMounted(() => {
  fetchPortfolioItems();
});
</script>