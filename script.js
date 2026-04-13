console.log("Welcome to Spotify!");

// Initialise variables
let songIndex = 0;
let masterPlay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let songItems = Array.from(document.getElementsByClassName('songitem'));
let songCover = document.getElementById('songcover');
let songInfoName = document.getElementById('songinfo-name');
let bannerCover = document.getElementById('bannercover');

let audioElement = new Audio();

let songs = [
    { songName: "Wildflower - Billie Eilish", filePath: "song-items/Billie Eilish - WILDFLOWER (Official Lyric Video).mp3", coverPath: "albumcover/wildflower-albumcover.jpg" },
    { songName: "Cry - Cigarettes After Sex", filePath: "song-items/Cry - Cigarettes After Sex.mp3", coverPath: "albumcover/cry-albumcover.jpg" },  // FIX: removed extra 's' in 'ssong-items'
    { songName: "Khat - Navjot Ahuja", filePath: "song-items/Navjot Ahuja - Khat (Official Audio).mp3", coverPath: "albumcover/khat-albumcover.jpeg" },
];

// Populate song list from songs array
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songName; // FIX: class 'songname' now exists in HTML
});

// Load a song by index and update the UI
function loadSong(index) {
    audioElement.src = songs[index].filePath;
    songCover.src = songs[index].coverPath;
    bannerCover.src = songs[index].coverPath;    // Show album art in right panel
    songInfoName.innerText = songs[index].songName; // FIX: update bottom bar song name

    // Highlight active song in list
    songItems.forEach(item => item.classList.remove('active'));
    songItems[index].classList.add('active');
}

// Play current song and update play/pause icon
function playSong() {
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    bannerCover.classList.add('visible'); // reveal album art on play
}

// Pause current song and update play/pause icon
function pauseSong() {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
}

// Load the first song on page start (but don't autoplay - browsers block it) // FIX: removed autoplay
loadSong(songIndex);

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
});

// Handle previous button // FIX: added prev/next logic
prev.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playSong();
});

// Handle next button // FIX: added prev/next logic
next.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
});

// Handle clicking a song item in the list
songItems.forEach((element, i) => {
    element.addEventListener('click', () => {
        songIndex = i;
        loadSong(songIndex);
        playSong();
    });
});

// Update seekbar as song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
});

// Seek when user drags the progress bar
myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
});

// Auto-play next song when current one ends
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
});