const video = document.querySelector('video');
const playerButton = document.querySelector('.player__button');
const volumeControl = document.querySelector('.volume');
const playbackSpeedControl = document.querySelector('.playbackSpeed');
const progressBar = document.querySelector('.progress-bar');
const progressFilled = document.querySelector('.progress__filled');
const rewindButton = document.querySelector('.rewind');
const skipButton = document.querySelector('.skip');
const speedBar = document.querySelector('.speed-bar');

// Handle update function for controls
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

// Toggle play and pause button
playerButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playerButton.textContent = '❚ ❚'; // Pause button
  } else {
    video.pause();
    playerButton.textContent = '►'; // Play button
  }
});

// Volume control
volumeControl.addEventListener('input', (e) => {
  video.volume = e.target.value / 100;
});

// Playback speed control
playbackSpeedControl.addEventListener('input', (e) => {
  video.playbackRate = e.target.value;
  speedBar.textContent = `${e.target.value}×`; // Update speed display
});

// Update progress bar as video plays
video.addEventListener('timeupdate', () => {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${progressPercent}%`;
});

// Seek video when clicking on progress bar
progressBar.addEventListener('click', (e) => {
  const newTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = newTime;
});

// Rewind 10 seconds
rewindButton.addEventListener('click', () => {
  video.currentTime -= 10;
});

// Skip forward 25 seconds
skipButton.addEventListener('click', () => {
  video.currentTime += 25;
});
