let awm = document.querySelector(".awm");
let bigCursor = document.querySelector(".big-cursor");
let userName = document.getElementsByTagName("input")[0];
let password = document.getElementsByTagName("input")[1];
let btn = document.getElementsByTagName("button")[0];
let log = false;
let currentUser = JSON.parse(localStorage.getItem("currentUser"));



btn.onclick = function () {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let currentUser = users.find(
    u => u.userName === userName.value && u.password === password.value
  );

  if (currentUser) {
    log = true;

    // 🟢 هنا بيتخزن اليوزر الحالي
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    startAnimation();
  } else {
    // رسالة خطأ
    let diverror = document.createElement("div");
    let diverrorOK = document.createElement("div");
    diverror.className = "error";
    diverrorOK.className = "errorOK";
    diverror.textContent = "اسم المستخدم او كلمه مرور خطأ ❌";
    diverrorOK.textContent = "OK";

    document.body.appendChild(diverror);
    document.body.appendChild(diverrorOK);

    diverrorOK.onclick = function(){
      diverror.remove();
      diverrorOK.remove();
    }
  }
};


function startAnimation() {
  if (log === true) {
     btn.disabled = true;   // يخلي الزر Disabled بعد الضغط
  btn.textContent = "جاري المعالجة..."; // تقدر تغير النص لو عايز
    btn.disabled = true;

    setTimeout(() => {

      open("./story/index.html", "_self");

    }, 2000);
  }
}
