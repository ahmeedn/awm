let cont = document.querySelector(".cont")






   let curnt = 0



let user = JSON.parse(localStorage.getItem("item")) || [];

async function feth(){
  const res = await fetch("./data/products.json")
  const data = await res.json()
rander(data)
}








function rander(data){

  data.forEach(ele => {
let item = document.createElement("div");
    let img = document.createElement("img");
    let divp = document.createElement("div")
      let p1 = document.createElement("p");
        let p2 = document.createElement("p");

  item.className="item";
divp.className = 'divp';
    img.src = ele.image;
    p1.className = "p1";
    p2.className = "p2";
    let eleF = ele.name.slice(0, 100);
    p1.textContent = eleF;
    p2.textContent = `${ele.price} EGP`;
    item.appendChild(img)
      divp.appendChild(p1)
        divp.appendChild(p2)
       item.appendChild(divp)
        cont.appendChild(item)
  });


}
 feth()
let num = 0;
let numCart = document.querySelector(".numCart");

let arrcart = JSON.parse(localStorage.getItem("item")) || [];

document.addEventListener('click', function(e) {
  const item = e.target.closest('.item');
  
  if (item) {
    num++;
    numCart.style.display = "flex";
    numCart.textContent = num;
    let loader = document.createElement("div");
    loader.className= "loader";
    item.appendChild(loader)
    loader.style.display = "block";
    item.style.pointerEvents = "none";
    item.style.opacity = 0.6;

    const cart = {
        id: Date.now(),
      img: item.children[0].src,
      p1: item.children[1].children[0].textContent,
      p2: item.children[1].children[1].textContent
    };


    arrcart.push(cart);
    localStorage.setItem("item", JSON.stringify(arrcart));

    setTimeout(() => {
      loader.remove()
      item.style.pointerEvents = "auto";
      item.style.opacity = 1;
    }, 1000);
  }
});

setTimeout(() => {
  let btnSearch = document.querySelector(".btnSearch");
  let input = document.querySelector(".input");
  let items = document.querySelectorAll(".item");

  btnSearch.onclick = function () {
    let value = input.value.trim().toLowerCase(); // خُذ القيمة لحظة الضغط

    items.forEach(item => {
      let text = item.children[1].children[0].textContent.toLowerCase();

      // لو القيمة فاضية، أظهر كل العناصر
      if (value === "") {
        item.style.display = "flex";
        return;
      }

      // فلترة حسب النص
      if (text.includes(value)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });

    input.value = ""; // امسح الحقل بعد البحث لو حبيت
  };
}, 500);





 