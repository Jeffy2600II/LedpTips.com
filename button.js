// เลือกปุ่มทั้งหมดที่มี name="button"
const buttons = document.getElementsByName('button');

// เพิ่ม event listener ให้กับแต่ละปุ่ม
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // ดึงค่า href จากปุ่ม
    const href = button.getAttribute('href');

    // ตรวจสอบว่า href มีค่าหรือไม่
    if (href) {
      // เปิดหน้าเว็บใหม่ตามค่า href
      window.location.href = href;
    }
  });
});

const backButton = document.querySelector('[name="back-button"]');

backButton.addEventListener('click', () => {
    window.history.back();
});
