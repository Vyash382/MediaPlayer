console.log("Lets write some java script");
let currentSong = new Audio("nnn");
let obj = {};
let obli = {};
let obli2 ={};
let ptr;
let curL;
let yourS;
let SongUl;

document.querySelector(".hmg").addEventListener("click",()=>{
  document.querySelector(".left").style.left = "0%";
})
document.querySelector(".hmg2").addEventListener("click",()=>{
  document.querySelector(".left").style.left = "-130%";
})

async function getSongs(folder) {
  document.querySelector(".circle").style.left = "-3px";
  play.src = "pause.svg";
  currfolder = folder
  let aa = await fetch(`http://127.0.0.1:3000/${folder}/`);
  // let aa = await fetch("https://www.mediafire.com/folder/w1i7acrvp0kuo/Songs/");
  let response = await aa.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  console.log(response)
  let tds = div.getElementsByTagName("a");
  let songs = [];
  for (let ind = 0; ind < tds.length; ind++) {
    if (tds[ind].href.endsWith(".mp3")) {
      songs.push(tds[ind].href);
    }
  }
  currentSong.src = songs[0];
  currentSong.play();
  SongUl = document
    .getElementsByClassName("library")[0]
    .getElementsByTagName("ul")[0];
  SongUl.innerHTML = "";
  let iii=0;
  for (const song of songs) {
    let li = document.createElement("li");
    let aaaa = `<img class="invert " src="music.svg" alt="">
        <div class="info">
            <div>${
              song.split("Songs/")[1].replaceAll("%20", " ").split(".mp3")[0].split("/")[1]
            }</div>
            <div>Yash Sinha</div>
        </div>
        <div class="pn">
            <div>Play Now</div>
            <img class="invert " src="playb.svg" alt="">
        </div>
        
        `;

        console.log(iii);
    li.innerHTML = aaaa;
    obj[li.innerHTML] = song;
    obli[iii] = li.innerHTML;
        
    obli2[li.innerHTML] = iii;
    iii++;
    SongUl.append(li);
  }

   yourS = document
    .querySelector(".library")
    .getElementsByClassName("songUl")[0]
    .getElementsByTagName("li");
  curL = yourS[0];
  ptr =0;
  // console.log(SongUl.innerHTML);
  for (const so of yourS) {
    so.addEventListener("click", () => {
      play.src = "pause.svg";
      if (curL != undefined) {
        curL.style.backgroundColor = "transparent";
        curL.style.color = "white";
      }
      let aaa = obj[so.innerHTML];
      if (currentSong.src != aaa) {
        
        currentSong.src = aaa;
        currentSong.currentTime =0;
        document.querySelector(".circle").style.left = "0%";
        currentSong.play();
        

        curL = so;
        ptr = obli2[curL.innerHTML];
        console.log(ptr);
      }
       else {
        if (currentSong.paused) {
          currentSong.play();
        } else {
          currentSong.pause();
        }
      }
    });
  }
  
}
async function displayAlbums(){
  console.log("displaying albums")
    let a = await fetch(`/Songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cards")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index]; 
        if (e.href.includes("/Songs") && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/").slice(-2)[0]
            // Get the metadata of the folder
            let a = await fetch(`/Songs/${folder}/info.json`)
            let response = await a.json(); 
            cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder="${folder}" class="card">
            <div class="playbtn">
            <img src="play.svg" alt="">
            </div>

            <img src="/Songs/${folder}/cover.jpeg" alt="">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
        </div>`
        }
    }
  Array.from(document.getElementsByClassName("card")).forEach(e => { 
    e.addEventListener("click", async item => {
        console.log("Fetching Songs");
        console.log(`songs/${item.currentTarget.dataset.folder}`)
        await getSongs(`Songs/${item.currentTarget.dataset.folder}`)  
    })
});
}

async function main() {                                 //"Songs/NCS"
  // await getSongs("Songs/NCS");
   await displayAlbums();
  

  play.addEventListener("click", () => {
    
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${formatTime(
      currentSong.currentTime
    )}/${formatTime(currentSong.duration)}`;
    document.querySelector(".songinfo").innerHTML =  obj[curL.innerHTML]
      .split("Songs/")[1]
      .replaceAll("%20", " ")
      .split(".mp3")[0].split("/")[1];
    // let bbb = ;
    // console.log(bbb);
    document.querySelector(".circle").style.left =  (currentSong.currentTime/currentSong.duration)*100 + "%";
    curL.style.backgroundColor = "#1fdf64";
    curL.style.color = "black";
  });
  function formatTime(seconds) {
    seconds = Math.round(seconds);
    if (typeof seconds !== "number" || isNaN(seconds) || seconds < 0) {
      return "00";
    }
  
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  // Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click",(e)=>{
  
    let ofs = e.offsetX;
    let yy = document.querySelector(".seekbar").offsetWidth;
    if(currentSong.paused){
      currentSong.currentTime = (ofs/yy)*currentSong.duration;
      currentSong.play();
      
      
      
    }
    else{
    currentSong.pause();
    currentSong.currentTime = (ofs/yy)*currentSong.duration;
    currentSong.play();
    // document.querySelector(".circle").style.transform =  "translateX("(currentSong.currentTime/currentSong.duration)*100 + "%)";
    
    // play.src = "pause.svg";
    }
    play.src = "pause.svg";
    // console.log(); 
  })
  
  prevv.addEventListener("click" , ()=>{
    curL.style.backgroundColor = "transparent";
    curL.style.color = "white";
    play.src= "pause.svg";
    // console.log(ptr);
    // console.log(SongUl.length);
    if(ptr==0){
      
      ptr=yourS.length-1;
      currentSong.src = obj[obli[ptr]];
      currentSong.play();
      curL =yourS[ptr];
    }
    else{
      ptr--;
      currentSong.src = obj[obli[ptr]];
      currentSong.play();
      curL =yourS[ptr];
    }
  });
  next.addEventListener("click" , ()=>{
    curL.style.backgroundColor = "transparent";
    curL.style.color = "white";
    play.src= "pause.svg";
    // console.log(ptr);
    // console.log(SongUl.length);
    if(ptr==yourS.length-1){
      
      ptr=0;
      currentSong.src = obj[obli[ptr]];
      currentSong.play();
      curL =yourS[ptr];
    }
    else{
      ptr++;
      currentSong.src = obj[obli[ptr]];
      currentSong.play();
      curL =yourS[ptr];
    }
  });
  const volumeRange = document.getElementById('rangee');
  
  
  volumeRange.addEventListener('input', function() {
      
      const volumeValue = parseFloat(volumeRange.value);
  
      
      currentSong.volume = volumeValue / 100;
  });
  // load playlist whenever it is clicked
}

      main();
      




