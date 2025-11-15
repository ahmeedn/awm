let Search = document.querySelector(".Search");
let Searchbtn = document.querySelector(".btnSearch");
let main = document.querySelector(".main");
let s = document.querySelector(".s");

// 🛑 منع الرجوع للخلف مع حذف currentUser
history.pushState(null, null, location.href);
window.onpopstate = function () {
  localStorage.removeItem("currentUser");
  window.open("./login.html", "_self");
};

// ✅ تحقق من تسجيل الدخول
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  window.open("./index.html", "_self");
}

// المنتجات
let products = [];

// 🟢 تحميل البيانات من JSON + دمج localStorage
// 🟢 تحميل البيانات من JSON + دمج localStorage
fetch("./item/gpus.json")
  .then(res => res.json())
  .then(data => {
    products = data;

    let localData = localStorage.getItem("gpus");
    if (localData) {
      let gpus = JSON.parse(localData);
      gpus.forEach(p => {
        products.push({
          name: p.name,
          price_egp: p.price,
          images: [p.image],
          ownerName: p.ownerName || "Unknown",
          ownerImage: p.ownerImage || "./profile/1.jpg"
        });
      });
    }

    renderItems(products);
  })
  .catch(err => console.error("Error loading JSON:", err));

// 🟢 دالة العرض
function renderItems(data) {
  main.innerHTML = "";

  data.forEach(product => {
    let divItem = document.createElement("div");
    divItem.className = "item";

    // ⬆️ بروفايل صاحب المنتج (owner)
    let userDiv = document.createElement("div");
    userDiv.className = "user-box";

    let userImg = document.createElement("div");
    userImg.className = "imgpro";
    userImg.style.backgroundImage = product.ownerImage
      ? `url(${product.ownerImage})`
      : "url('./profile/1.jpg')";

    let userName = document.createElement("div");
    userName.className = "namepro";
    userName.textContent = product.ownerName || "Unknown";

    userDiv.appendChild(userImg);
    userDiv.appendChild(userName);

    // صورة المنتج
    let imgItem = document.createElement("img");
    imgItem.src = product.images[0];
    imgItem.alt = product.name;

    // اسم المنتج
    let nameP = document.createElement("p");
    nameP.textContent = product.name;

    // السعر
    let priceP = document.createElement("p");
    priceP.textContent = product.price_egp + " EGP";

    // زر الشراء
    let buyDIV = document.createElement("div");
    buyDIV.classList.add("buy-btn");
    buyDIV.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <path d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
      </svg>
    `;

    // 📦 تجميع العناصر
    divItem.appendChild(userDiv);
    divItem.appendChild(imgItem);
    divItem.appendChild(nameP);
    divItem.appendChild(priceP);
    divItem.appendChild(buyDIV);

    main.appendChild(divItem);
  });
}

// 🟢 البحث
let allBtn = document.createElement("button");
allBtn.textContent = "All";
allBtn.className = "allBtn";
s.appendChild(allBtn);

Searchbtn.addEventListener("click", () => {
  let keyword = Search.value.toLowerCase().trim();
  if (keyword === "") {
    renderItems(products);
  } else {
    let filtered = products.filter(p =>
      p.name.toLowerCase().includes(keyword)
    );
    renderItems(filtered);
  }
});

// زر عرض الكل
allBtn.addEventListener("click", () => {
  Search.value = "";
  renderItems(products);
});

// 🟢 زر الخروج
let logoutBtn = document.querySelector(".logOut");
if (logoutBtn) {
  logoutBtn.onclick = function() {
    localStorage.removeItem("currentUser");
    window.open("../index.html", "_self");
  };
}
// 🟢 بروفايل الهيدر
let namepro = document.querySelector("header .namepro");
let imgpro = document.querySelector("header .imgpro");

// نجيب الجيمع الكروت المخزنة
const gpus = JSON.parse(localStorage.getItem("gpus")) || [];


if (currentUser) {
  namepro.textContent = currentUser.firstName || "User";

  imgpro.style.backgroundImage = currentUser.image
    ? `url("${currentUser.image}")`
    : `url("./profile/1.jpg")`;
}

  
namepro.textContent = currentUser?.firstName ?? "User";

imgpro.style.backgroundImage = currentUser?.image
  ? `url("${currentUser.image}")`
  : `url("./profile/1.jpg")`;

