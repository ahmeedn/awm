let data = JSON.parse(localStorage.getItem("item")) || [];
let item = document.querySelector(".item")
let TotalB = document.querySelector(".TotalB")
let TotalA = document.querySelector(".TotalA")
let itemlen = document.querySelector(".itemlen")


let checkout = document.querySelector(".checkout")
let input = document.querySelector("#input")
let APPLY = document.querySelector("#APPLY")



const sound = new Audio('/data/1.mp3')





data.forEach(ele => {

let ItemB = document.createElement("div");
    let img = document.createElement("img");
      let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let re = document.createElement("div")
  ItemB.className="ItemB";

    img.src = ele.img;
    p1.className = "p1";
    p2.className = "p2";
    p1.textContent = ele.p1;
    p2.textContent = `${ele.p2}`;



      ItemB.appendChild(img)
      ItemB.appendChild(p1)
        ItemB.appendChild(p2)
        item.appendChild(ItemB)
      
               itemlen.textContent= `Subtotal (${data.length} items)`; 
     


        
  });   
  
  let num = JSON.parse(localStorage.getItem("numtotal"));
  TotalB.textContent = `EGP ${num || 0}`;
    TotalA.textContent = `EGP ${num || 0}`;




    checkout.onclick = function(){
      checkout.textContent = `Processing...`
      checkout.style.background = "#aacfffff"
      
      setTimeout(() => {
        checkout.textContent = `CHECKOUT`
        checkout.style.background = "#1a73e8"
        const msg = document.getElementById("msg");
msg.style.top ="50%";
  sound.play();
  msg.textContent = `-${num} EGP `;
  localStorage.removeItem("item");
localStorage.removeItem("numtotal");
  TotalB.textContent = `EGP 0`;
    TotalA.textContent = `EGP 0`;
  itemlen.textContent= `Subtotal (0 items)`;
  item.innerHTML ="";
  



        
      }, 1000);
      setTimeout(() => {
        msg.style.top ="-10%";

      }, 3500);
    }


APPLY.onclick = function(){
  if( input.value == "Linguine"){
      let vnnum = num -= 8000
      localStorage.removeItem("numtotal")
        TotalB.textContent = `EGP ${vnnum || 0}`;
    TotalA.textContent = `EGP ${vnnum || 0}`;

  }

}

