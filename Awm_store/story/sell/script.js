const saveBtn   = document.getElementById("saveBtn");
const gpuName   = document.getElementById("gpuName");
const gpuPrice  = document.getElementById("gpuPrice");
const gpuImage  = document.getElementById("gpuImage");
const preview   = document.getElementById("preview");
const main      = document.getElementById("main");
const container = document.getElementById("savedGpus");

// =============================
// بيانات المستخدم الحالي
// =============================
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
  firstName: "Guest",
  userName: "guest",
  image: "./profile/1.jpg"
};

// =============================
// حفظ كرت جديد
// =============================
saveBtn.addEventListener("click", (e) => {
  e.preventDefault(); // منع الريفريش لو الزرار جوه form

  const name = gpuName.value.trim();
  const price = parseFloat(gpuPrice.value.trim());
  const file = gpuImage.files[0];

  if (!name || !price || !file) {
    alert("⚠️ دخل كل البيانات!");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const newGpu = {
      id: Date.now(),
      name: name,
      price: price,
      image: e.target.result, // صورة Base64
      ownerName: currentUser.firstName || currentUser.userName,
      ownerImage: currentUser.image || "./profile/1.jpg"
    };

    // حفظ
    const gpus = JSON.parse(localStorage.getItem("gpus")) || [];
    gpus.push(newGpu);
    localStorage.setItem("gpus", JSON.stringify(gpus));

    alert("✅ اتحفظ الكرت");

    // تفريغ الفورم
    gpuName.value = "";
    gpuPrice.value = "";
    gpuImage.value = "";
    preview.innerHTML = "";

    // تحديث العرض
    showSavedGpus();
  };
  reader.readAsDataURL(file);
});

// =============================
// عرض صورة قبل الحفظ
// =============================
gpuImage.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    preview.innerHTML = `<img class="imgP" src="${e.target.result}" style="width:150px">`;
  };
  reader.readAsDataURL(file);
});

// =============================
// عرض الكروت من localStorage
// =============================
function showSavedGpus() {
  const gpus = JSON.parse(localStorage.getItem("gpus")) || [];
  if (!container) return;

  container.innerHTML = "";
  gpus.forEach((gpu) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="gpu-card">
        <div class="owner">
          <img src="${gpu.ownerImage}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">
          <span>${gpu.ownerName}</span>
        </div>
        <h3 class="file">${gpu.name} - ${gpu.price} EGP</h3>
        <img src="${gpu.image}" style="width:120px">
      </div>
    `;
    container.appendChild(div);
  });
}
