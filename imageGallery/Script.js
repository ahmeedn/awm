let upload = document.querySelector("#upload");
let previewDiv = document.querySelector(".previewDiv");
let yas = document.querySelector(".yas");
let no = document.querySelector(".no");
let img = document.querySelector(".img");
let con = document.querySelector(".con");



let s = JSON.parse(localStorage.getItem("a")) || [];

window.onload = function () {
    s.forEach(e => {
        createImageItem(e.src);
    });
};

let popup = document.createElement("div");
popup.className = "popup";
let popupImg = document.createElement("img");
popup.appendChild(popupImg);
document.body.appendChild(popup);

popup.addEventListener("click", () => {
  popup.classList.remove("show");
});


upload.addEventListener("change", function() {
    let tar = "";
     let file = upload.files[0];
     if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            tar = e.target.result
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
        previewDiv.removeAttribute("id","active")
       

        yas.onclick = function(){
           previewDiv.setAttribute("id","active")

         
            createImageItem(tar);

           
            s.push({ src: tar});
            localStorage.setItem("a", JSON.stringify(s));
        }

        no.onclick = function(){
             previewDiv.setAttribute("id","active")
        }
    }

})

function createImageItem(tar){
let divI = document.createElement("div")
let imgI = document.createElement("img")

divI.className = "item";

imgI.src = tar;


divI.appendChild(imgI)

con.appendChild(divI)



  imgI.addEventListener("click", function () {
    popupImg.src = tar;
    popup.classList.add("show");
  });

  divI.appendChild(imgI);
  con.appendChild(divI);
}

