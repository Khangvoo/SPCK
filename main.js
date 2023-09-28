let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let curr_track = document.createElement('audio');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

let songs = [
    {songName: "Stay-Justin Gieber", coverPath: "images/stay.jpg"},
    {songName: "Baby-Justin Bieber", coverPath: "images/baby.jpg"},
    {songName: "Loveyourself-Justin Bieber", coverPath: "images/loveyourself.jpg"},
    {songName: "Sorry-Justin Bieber",coverPath: "images/sorry.jpg"},
    {songName: "Intentions-Justin Bieber", coverPath: "images/intentions.jpg"},
    {songName: "Peaches-Justin Bieber", coverPath: "images/peaches.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

const music_list = [
    {
        img : 'images/stay.jpg',
        name : 'stay',
        artist : 'Justin Bieber',
        music : 'music/stay.mp3'
    },
    {
        img : 'images/baby.jpg',
        name : 'baby',
        artist : 'Justin Bieber',
        music : 'music/baby.mp3'
    },
    {
        img : 'images/loveyourself.jpg',
        name : 'loveyourself',
        artist : 'Justin Bieber',
        music : 'music/loveyourself.mp3'
    },
    {
        img : 'images/sorry.jpg',
        name : 'sorry',
        artist : 'Justin Bieber',
        music : 'music/sorry.mp3'
    },
    {
        img : 'images/intentions.jpg',
        name : 'intentions',
        artist : 'Justin Bieber',
        music : 'music/intentions.mp3'
    },
    {
        img : 'images/peaches.jpg',
        name : 'peaches',
        artist : 'Justin Bieber',
        music : 'music/peaches.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
}else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
    }
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
