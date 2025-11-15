
let data = JSON.parse(localStorage.getItem("item")) || [];
let cont = document.querySelector(".cont")
let done = document.querySelector(".done")
let arr = "";

if(data.length == 0){
  done.textContent  = `Total: 0 EGP`;
}


data.forEach(ele => {

let item = document.createElement("div");
    let img = document.createElement("img");
    let divp = document.createElement("div")
      let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let re = document.createElement("div")
        re.className = "re";
        re.innerHTML = `<img src="/data/cross.svg" alt="re" width="20"height="20"></img>`;
  item.className="item";
divp.className = 'divp';
    img.src = ele.img;
    p1.className = "p1";
    p2.className = "p2";
    p1.textContent = ele.p1;
    p2.textContent = `${ele.p2}`;
arr += ele.p2

    item.dataset.id = ele.id
    item.appendChild(img)
      divp.appendChild(p1)
        divp.appendChild(p2)
        divp.appendChild(re)
       item.appendChild(divp)
        cont.appendChild(item)




        
  });
function rendernum(){

  let nums = arr.match(/\d+,\d+,?\d+/g);

let cleanNums = nums.map(num => Number(num.replace(/,/g, "")));

let result = eval(cleanNums.join("+"));


done.textContent  = `Total: ${result} EGP`;
}


rendernum()




document.addEventListener('click', function(e) {
  const item = e.target.closest('.re');
  
  if (item) {
  
    let loader = document.createElement("div");
    loader.className= "loader";
    item.parentElement.parentElement.appendChild(loader)
    loader.style.display = "block";

  
   removeItem(item.parentElement.parentElement.dataset.id)
    
    let num = item.parentElement.parentElement.children[1].children[1].textContent
          
  let clean = num.replace(/,/g, "").replace("EGP", "").trim();
let value = Number(clean);
let clean2 = done.textContent.replace("Total: ", "").replace(" EGP", "").trim();
   setTimeout(() => {
    let fin = +clean2 - value;
    done.textContent = `Total: ${fin} EGP`;
   

      item.parentElement.parentElement.remove()
      loader.remove()
    }, 1000);
  }
});



function removeItem(id) {
  let arrcart = JSON.parse(localStorage.getItem("item")) || [];
  arrcart = arrcart.filter(product => product.id != id);
  localStorage.setItem("item", JSON.stringify(arrcart));
}

setInterval(() => {
  let clean2 = done.textContent.replace("Total: ", "").replace(" EGP", "").trim();
 localStorage.setItem("numtotal",clean2 );
}, 0);


   

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
        item.style.border = "1px solid rgba(0, 0, 0, 0)";
        return;
      }

      // فلترة حسب النص
      if (text.includes(value)) {
        item.style.border = "1px solid rgba(43, 255, 0, 1)";
      } else {
        item.style.border = "1px solid rgba(0, 0, 0, 0.77)";
      }
    });

    input.value = ""; // امسح الحقل بعد البحث لو حبيت
  };
}, 500);






