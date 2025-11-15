let gpuName = document.getElementById("gpuName");
let gpuPhone = document.getElementById("gpuPhone");
let gpuImage = document.getElementById("gpuImage");
let profileName = document.getElementById("profileName");
let profilePhone = document.getElementById("profilePhone");
let profilePic = document.getElementById("profilePic");

// تحميل بيانات المستخدم الحالي
window.onload = () => {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (currentUser && users.length > 0) {
    // هات اليوزر من المصفوفة
    let user = users[currentUser.id];
    if (user) {
      profileName.textContent = user.firstName || "";
      profilePhone.textContent = user.phone || "";
      profilePic.src = user.image || "./1.jpg";

      gpuName.value = user.firstName || "";
      gpuPhone.value = user.phone || "";
    }
  }
};

// ✅ دالة لتحديث بيانات المستخدم في المصفوفة
function updateUser(newData) {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (currentUser && users[currentUser.id]) {
    users[currentUser.id] = {
      ...users[currentUser.id],
      ...newData
    };

    // حفظ التحديثات
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(users[currentUser.id]));

    // تحديث العرض
    profileName.textContent = users[currentUser.id].firstName;
    profilePhone.textContent = users[currentUser.id].phone || "";
    if (users[currentUser.id].image) {
      profilePic.src = users[currentUser.id].image;
    }
  }
}

// ✅ متابعة التغييرات مباشرة
gpuName.addEventListener("input", () => {
  updateUser({ firstName: gpuName.value });
});

gpuPhone.addEventListener("input", () => {
  updateUser({ phone: gpuPhone.value });
});

gpuImage.addEventListener("change", function () {
  let file = this.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      updateUser({ image: e.target.result });
    };
    reader.readAsDataURL(file);
  }
});
