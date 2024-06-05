// Element references
const backgroundMusic = new Audio(); // Utilize a single audio element
const toggleMusic = document.getElementById('toggleMusic');
const musicIndicator = document.getElementById('musicIndicator');
let musicOn = false;
let currentMusicIndex = -1;
let currentBackgroundIndex = -1;

const gifDirectory = 'background/';
const gifs = [
  "1.gif",
  "2.gif",
  "3.gif",
  "4.gif",
  "5.gif"
].map(background => gifDirectory + background);
const musicDirectory = 'music/';
const musics = [
  "Day in Paris.mp3",
  "Resonance.mp3",
  "Steven Universe.mp3",
  "Superstar Sh＊t.mp3",
  "Take Me to Pluto.mp3"
].map(song => musicDirectory + song);

// Preload audio files
const preloadedFiles = musics.map(src => {
  const audio = new Audio(src);
  audio.preload = 'auto';
  return audio;
});

// Change background with no consecutive repeats and ensure full loading
function changeBackground() {
  let newBackgroundIndex;
  do {
    newBackgroundIndex = Math.floor(Math.random() * gifs.length);
  } while (newBackgroundIndex === currentBackgroundIndex);

  const newBackground = gifs[newBackgroundIndex];
  const img = new Image();
  img.src = newBackground;

  img.onload = () => {
    currentBackgroundIndex = newBackgroundIndex;
    document.body.style.backgroundImage = `url(${newBackground})`;
    document.body.style.transition = 'background 1s ease';
  };
}

// Play new music, avoid repeating the last one
function changeMusic() {
  if (musicOn) {
    let newMusicIndex;
    do {
      newMusicIndex = Math.floor(Math.random() * musics.length);
    } while (newMusicIndex === currentMusicIndex);
    currentMusicIndex = newMusicIndex;
    backgroundMusic.src = musics[currentMusicIndex];
    backgroundMusic.play();
  }
}

// Debounced music toggle to avoid excessive toggling
let toggleTimeout = null;
toggleMusic.addEventListener('click', () => {
  if (toggleTimeout) {
    clearTimeout(toggleTimeout);
  }
  toggleTimeout = setTimeout(() => {
    musicOn = !musicOn;
    if (musicOn) {
      changeMusic();
      musicIndicator.textContent = 'Music Playing';
      musicIndicator.classList.remove('music-paused');
    } else {
      backgroundMusic.pause();
      musicIndicator.textContent = 'Music Paused';
      musicIndicator.classList.add('music-paused');
    }
  }, 300); // Debounce timeout
});

// Set intervals for changing background and music
setInterval(changeBackground, 10000); // Change background every 10 seconds
setInterval(() => { if (musicOn) changeMusic(); }, 60000); // Change music every 1 minute

// Initial calls
changeBackground();
