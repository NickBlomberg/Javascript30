const player = document.querySelector('.player');
const video = document.querySelector('.viewer');

const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

const fullscreen = document.querySelector('.fullscreen');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateToggleButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // My first implementation used a switch statement to
  // update the values, however, the solution from the video
  // uses a much more concise version. As the fields are
  // named after the video properies, you can update the
  // value for both properties using a single statement.

  // switch(this.name) {
  //   case 'volume':
  //     video.volume = this.value;

  //   case 'playbackRate':
  //     video.playbackRate = this.value;
  // }

  video[this.name] = this.value;
}

function handleProgress() {
  const { currentTime, duration } = video;

  const percent = (currentTime / duration) * 100;

  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullscreen() {
  player.fullscreenElement ? 
    player.exitFulltscreen() :
    player.requestFullscreen();
}

toggle.addEventListener('click', (e) => togglePlay());
video.addEventListener('click', (e) => togglePlay());
video.addEventListener('play', (e) => updateToggleButton());
video.addEventListener('pause', (e) => updateToggleButton());
video.addEventListener('timeupdate', (e) => handleProgress());

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true );
progress.addEventListener('mouseup', () => mousedown = false );

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

fullscreen.addEventListener('click', toggleFullscreen);