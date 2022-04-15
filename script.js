const music = document.querySelector("audio");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const artist = document.querySelector(".artist");
const title = document.querySelector(".title");
const img = document.querySelector(".audio-img");
const audio = document.querySelector("audio");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".duration");

const songs = [
  {
    name: "Beautiful People",
    displayName: "Beautiful People",
    artist: "Ed sheeran",
  },
  {
    name: "Good Times",
    displayName: "Good Times",
    artist: "Sam Medina",
  },
  {
    name: "Hold Tight",
    displayName: "Hold Tight",
    artist: "Selena Gomez",
  },
  {
    name: "Suckers",
    displayName: "Suckers",
    artist: "Jonas brothers",
  },
  {
    name: "Whats Poppin",
    displayName: "Whats Poppin",
    artist: "Jack Harlow",
  },
];

// Initial Song Status
let isPlaying = false;

//Play
const playSong = function () {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

//Pause
const pauseSong = function () {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

// Current Song
let songIndex = 0;

//Updating song content
const loadSong = function (song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audio.src = `./music/${song.name}.mp3`;
  img.src = `./img/${song.name}.jpg`;
};

const nextSong = function () {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const prevSong = function () {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

loadSong(songs[songIndex]);

//Progress Bar
const updateProgressBar = function (e) {
  if (isPlaying) {
    const { currentTime, duration } = e.srcElement;
    //Progress Bar Updating
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
    //Updating Duration and display on the progress bar
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //to avoid display delay on switching elements
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    //Updating current time and display on the progress bar
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    //to avoid display delay on switching elements
    if (currentSeconds) {
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
};

// Set progress bar
const setProgressBar = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
  playSong();
};

//Play/Pause EventListner
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//EventListners
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
