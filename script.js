console.log("Spotify")

// initialize varibles 
let SongIndex = 0;
let AudioElement = new Audio("songs/1.mp3")
let masterPlay = document.getElementById("masterPlay")
let myprogressBar = document.getElementById("myprogressBar")
let gif = document.getElementById("gif")
let masterSongName = document.getElementById("masterSongName")
let songItemPlays = document.getElementById("songItemPlays")
let songItems = Array.from(document.getElementsByClassName("songItem"))


let Songs = [
    {songName:"song 1", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName:"song 2", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"song 3", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"song 4", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"song 5", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"song 6", filePath:"songs/6.mp3", coverPath:"covers/1.jpg"},
    {songName:"song 7", filePath:"songs/7.mp3", coverPath:"covers/2.jpg"},
    {songName:"song 8", filePath:"songs/8.mp3", coverPath:"covers/3.jpg"},
    {songName:"song 9", filePath:"songs/9.mp3", coverPath:"covers/4.jpg"},
    {songName:"song 10", filePath:"songs/10.mp3", coverPath:"covers/5.jpg"},
]



songItems.forEach((element,i) => {
    console.log("element",element,i)
    element.getElementsByTagName("img")[0].src = Songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText= Songs[i].songName

    
});


// handle play and paused 
masterPlay.addEventListener("click",()=>{
    if(AudioElement.paused || AudioElement.currentTime<=0){
        AudioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        // songItemPlays.classList.remove("fa-play-circle") 
        // songItemPlays.classList.add("fa-pause-circle")
        gif.style.opacity=1
    }
    else{
        AudioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
       
        gif.style.opacity=0


    }
})

// Listen to Events 
AudioElement.addEventListener("timeupdate",()=>{
    // update seekbar 
    progress= parseInt((AudioElement.currentTime/AudioElement.duration)*100)
    console.log(progress)
    myprogressBar.value = progress

})


myprogressBar.addEventListener("change",()=>{
    AudioElement.currentTime = myprogressBar.value * AudioElement.duration/100

})

const makeAllPlay =()=>{
    Array.from( document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        console.log(element.classList)
            element.classList.add("fa-play-circle")
            element.classList.remove("fa-pause-circle")  
    })

}


// inline song play button work 

Array.from( document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        // console.log("e",e/)
        SongIndex = parseInt(e.target.id)
        makeAllPlay()
        e.target.classList.remove("fa-play-circle")
        e.target.classList.add("fa-pause-circle")
        AudioElement.src = `songs/${SongIndex+1}.mp3`
    masterSongName.innerHTML=Songs[SongIndex].songName
        AudioElement.currentTime=0
        AudioElement.play()
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")




    })
})



// down next and previous button work 

document.getElementById("next").addEventListener("click",()=>{
    if (SongIndex>=9){
        SongIndex = 0
    }
    else{
        SongIndex +=1
    }
    AudioElement.src = `songs/${SongIndex+1}.mp3`
    masterSongName.innerHTML=Songs[SongIndex].songName
    AudioElement.currentTime=0
    AudioElement.play()
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")
})


document.getElementById("previous").addEventListener("click",()=>{
    if (SongIndex<=0){
        SongIndex = 0
    }
    else{
        SongIndex -=1
    }
    AudioElement.src = `songs/${SongIndex+1}.mp3`
    masterSongName.innerHTML=Songs[SongIndex].songName
    AudioElement.currentTime=0
    AudioElement.play()
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")
})
