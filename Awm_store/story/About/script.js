
  window.addEventListener("DOMContentLoaded", function() {
    let name = "Ahmed Awm"; // غير الاسم هنا
    let i = 0;
    let speed = 500; // سرعة الكتابة (بالـ ms)

    function typeWriter() {
      if (i < name.length) {
        document.querySelector(".text").textContent += name.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  });

let img = document.querySelector("img");
setTimeout(() => {
  img.classList.add("active");
}, 500); // بعد نصف ثانية تبدأ تتحرك
