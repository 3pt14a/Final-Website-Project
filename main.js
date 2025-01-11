function openArticle(articleUrl) {
    window.location.href = articleUrl;
}

const menuBtn = document.querySelector('#menu-btn');
const navig = document.querySelector('.navig');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('fa-times');
    navig.classList.toggle('active');
})
document.addEventListener('click', (event) => {
    if (!menuBtn.contains(event.target) && !navig.contains(event.target)) {
        menuBtn.classList.remove('fa-times'); 
        navig.classList.remove('active');    
    }
});

let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        header.style.top = "-60px";  // Hide header
    } else {
        // Scrolling up
        header.style.top = "0";  // Show header
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values
});

const audio = document.getElementById("longlive");
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.getElementById("progress");

playPauseBtn.addEventListener("click", () => {
    const icon = playPauseBtn.querySelector("i");
    if (audio.paused || audio.ended) {
      audio.play();
      icon.classList.remove("fa-play");
      icon.classList.add("fa-pause");
    } else {
      audio.pause();
      icon.classList.remove("fa-pause");
      icon.classList.add("fa-play");
    }
  });

// Update progress bar as audio plays
audio.addEventListener("timeupdate", () => {
    // Calculate progress percentage
    const progress = (audio.currentTime / audio.duration) * 100;
    
    // Update range input value
    progressBar.value = progress;
    
    // Dynamically update progress bar background
    progressBar.style.background = `linear-gradient(to right, #451a03 ${progress}%, #ddd ${progress}%)`;
  });
  
  // Update audio current time when progress bar changes
  progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });