let right = document.querySelectorAll(".right");
let left = document.querySelectorAll(".left");
let cont = document.querySelectorAll(".cont");

let inputS = document.querySelector(".inputS");
let btn = document.querySelector(".btn");
let awm = document.querySelector(".awm");
awm.onclick = function(){

    window.open("./index.html", "_self")
}


document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    btn.click(); // هنا btn هو الزرار اللي عايز تضغطه
  }
});


let page1 = 1;
let page2 = 1;
let ahmed = document.querySelector(".ahmed");
let valueSarch = ""

ahmed.textContent = `جميع الحقوق محفوظة Ahmed AWM - © ${new Date().getFullYear()}`;


const bestMovies = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "Inception",
  "Fight Club",
  "The Matrix",
  "Interstellar",
  "Avengers: Endgame",
  "The Batman",
  "Joker",
  "Gladiator",
  "Titanic",
];
const bestSeries = [
  "Game of Thrones",
  "Breaking Bad",
  "Better Call Saul",
  "Stranger Things",
  "The Walking Dead",
  "The Sopranos",
  "Friends",
  "The Office",
  "Sherlock",
  "Chernobyl",
  "The Crown",
  "Dark"
  
];



let sarc1 = bestSeries[Math.floor(Math.random() * bestSeries.length)];


let sarc2 = bestMovies[Math.floor(Math.random() * bestMovies.length)];




inputS.onkeyup = function(){
    valueSarch = inputS.value
    
    
}
valueSarch.trim().toLocaleLowerCase()
btn.onclick = function(){
  sarc1 = ""
    if(valueSarch === "")
    {
        return;
    }
    let container = document.querySelector(".cont");
    let arr = [];
    for (let e = 0; e < container.children.length; e++) {
        arr.push(container.children[e])
        
          
        }
        arr.forEach(ele => {
            ele.remove()
        });
         console.log(arr)
        

 
   
sarc1 = valueSarch;
fetcheMovies(`https://www.omdbapi.com/?s=${sarc1}&page=${page1}&apikey=2dff578f`, cont[0], addedIds1);
    
fetcheMovies(`https://www.omdbapi.com/?s=${sarc2}&page=${page1}&apikey=2dff578f`, cont[0], addedIds1);
    
}



// ✅ لتفادي تكرار تحميل نفس العناصر
const addedIds1 = new Set();
const addedIds2 = new Set();

// ✅ منع تعدد الطلبات أثناء التحميل
let isLoading1 = false;
let isLoading2 = false;

// ----------- تحميل عند فتح الصفحة -------------
window.onload = function () {
  fetcheMovies(`https://www.omdbapi.com/?s=${sarc1}&page=${page1}&apikey=2dff578f`, cont[0], addedIds1);
  fetcheMovies(`https://www.omdbapi.com/?s=${sarc2}&page=${page2}&apikey=2dff578f`, cont[1], addedIds2);
};

// ----------- دوال الجلب -------------
async function fetcheMovies(url, container, addedSet) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.Search) return;
    render(data.Search, container, addedSet);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

// ----------- دوال العرض -------------
function render(data, container, addedSet) {
  const frag = document.createDocumentFragment();

  data.forEach(movie => {
    if (addedSet.has(movie.imdbID)) return; // ✅ منع التكرار
    addedSet.add(movie.imdbID);

    let mainM = document.createElement("div");
    let imgI = document.createElement("img");
    let pI = document.createElement("p");

    mainM.className = "mainM";
 
    imgI.src = movie.Poster !== "N/A" ? movie.Poster : "./data/1.png";
    pI.textContent = movie.Title;
      imgI.onerror = () => {
   imgI.src = "./data/1.png";
 };
    mainM.appendChild(imgI);
    mainM.appendChild(pI);
    
  
    // ✅ فتح صفحة الفيلم على IMDB عند الضغط
    mainM.addEventListener("click", () => {
      window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank");
    });

    frag.appendChild(mainM);
  });

  container.appendChild(frag);
}

// ----------- الأزرار يمين ويسار -------------
right.forEach((btn, index) => {
  btn.onclick = async function () {
    let container = btn.parentElement.querySelector(".cont");
    container.scrollBy({ left: 340, behavior: "smooth" });

    if (index === 0 && !isLoading1) {
      isLoading1 = true;
      page1++;
      await fetcheMovies(`https://www.omdbapi.com/?s=${sarc1}&page=${page1}&apikey=2dff578f`, cont[0], addedIds1);
      isLoading1 = false;
    }

    if (index === 1 && !isLoading2) {
      isLoading2 = true;
      page2++;
      await fetcheMovies(`https://www.omdbapi.com/?s=${sarc2}&page=${page2}&apikey=2dff578f`, cont[1], addedIds2);
      isLoading2 = false;
    }
  };
});

left.forEach((btn) => {
  btn.onclick = function () {
    let container = btn.parentElement.querySelector(".cont");
    container.scrollBy({ left: -340, behavior: "smooth" });
  };
});