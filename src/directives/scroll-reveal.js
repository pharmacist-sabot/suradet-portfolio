// src/directives/scroll-reveal.js

const animatedScrollObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      // เมื่อ element เข้ามาในหน้าจอ
      if (entry.isIntersecting) {
        entry.target.classList.add('enter');
        observer.unobserve(entry.target); // ให้ทำงานแค่ครั้งเดียว
      }
    });
  },
  {
    threshold: 0.1 // ให้เริ่มทำงานเมื่อเห็น element 10%
  }
);

export default {
  // 'mounted' คือ hook ที่จะทำงานเมื่อ element ถูกใส่เข้าไปใน DOM
  mounted(el) {
    el.classList.add('before-enter');
    animatedScrollObserver.observe(el);
  }
};