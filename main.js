
const menuLinks = document.querySelectorAll('.menu-link');
const sliderImages = document.querySelectorAll('.slider-img');
const playPauseButton = document.getElementById('play-pause');
const audioElements = document.querySelectorAll('.audio-wrapper audio');

let currentAudio = null;
let isPlaying = false;
let currentIndex = 0;

function activateImage(index) {
  sliderImages.forEach((img, idx) => {
    img.classList.toggle('active', idx === index);
  });
}

function activateMenuLink(activeLink) {
  menuLinks.forEach(link => link.classList.remove('active'));
  activeLink.classList.add('active');
}

function playAudio(index) {
  if (currentAudio && currentAudio !== audioElements[index]) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = audioElements[index];

  if (currentAudio.paused) {
    currentAudio.play();
    isPlaying = true;
    updatePlayPauseButton();
  } else {
    currentAudio.pause();
    isPlaying = false;
    updatePlayPauseButton();
  }

  currentIndex = index;
}

function updatePlayPauseButton() {
  playPauseButton.classList.toggle('pause', isPlaying);
}

menuLinks.forEach((link, index) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    activateImage(index);
    activateMenuLink(link);

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    currentAudio = audioElements[index];
    currentAudio.play();
    isPlaying = true;
    updatePlayPauseButton();
    currentIndex = index;
  });
});

window.addEventListener('DOMContentLoaded', () => {
  activateImage(0);
  activateMenuLink(menuLinks[0]);
  currentAudio = audioElements[0];
});

playPauseButton.addEventListener('click', () => {
  if (!currentAudio) return;

  if (currentAudio.paused) {
    currentAudio.play();
    isPlaying = true;
  } else {
    currentAudio.pause();
    isPlaying = false;
  }
  updatePlayPauseButton();
});

audioElements.forEach(audio => {
  audio.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayPauseButton();
  });
});