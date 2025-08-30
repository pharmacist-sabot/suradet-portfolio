<!-- src/views/AddPortfolioView.vue -->
<template>
  <main class="container">
    <div class="form-container">
      <h2>เพิ่มผลงานใหม่</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">ชื่อเรื่อง *</label>
          <input type="text" id="title" v-model="form.title" required />
        </div>

        <div class="form-group">
          <label for="description">รายละเอียด</label>
          <textarea id="description" v-model="form.description"></textarea>
        </div>

        <div class="form-group">
          <label for="category">ประเภท *</label>
          <select id="category" v-model="form.category" required>
            <option disabled value="">กรุณาเลือกประเภท</option>
            <option>วิทยากร</option>
            <option>ผลงานวิชาการ</option>
            <option>การประชุม/อบรม</option>
            <option>นวัตกรรม</option>
          </select>
        </div>

        <div class="form-group">
          <label for="start_date">วันที่ *</label>
          <input type="date" id="start_date" v-model="form.start_date" required />
        </div>
        
        <div class="form-group">
          <label for="end_date">ถึงวันที่ (หากเป็นงานวันเดียวไม่ต้องกรอก)</label>
          <input type="date" id="end_date" v-model="form.end_date" />
        </div>

        <div class="form-group">
          <label for="secret_key">รหัสสำหรับบันทึกผลงาน *</label>
          <input type="password" id="secret_key" v-model="form.secret_key" required />
        </div>

        <button type="submit" class="form-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'กำลังบันทึก...' : 'บันทึกผลงาน' }}
        </button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useRouter } from 'vue-router';

const router = useRouter();
const isSubmitting = ref(false);

const form = ref({
  title: '',
  description: '',
  category: '',
  start_date: '',
  end_date: null,
  secret_key: ''
});

const handleSubmit = async () => {
  if (form.value.secret_key !== import.meta.env.VITE_ADD_POST_SECRET_KEY) {
    alert('รหัสสำหรับบันทึกผลงานไม่ถูกต้อง!');
    return;
  }
  isSubmitting.value = true;
  try {
    const dataToInsert = {
      title: form.value.title,
      description: form.value.description,
      category: form.value.category,
      start_date: form.value.start_date,
      end_date: form.value.end_date || null
    };
    const { error } = await supabase.from('portfolio_items').insert([dataToInsert]);
    if (error) throw error;
    alert('บันทึกผลงานสำเร็จ!');
    router.push('/');
  } catch (error) {
    console.error('Error inserting data:', error);
    alert(`เกิดข้อผิดพลาด: ${error.message}`);
  } finally {
    isSubmitting.value = false;
  }
};
</script>