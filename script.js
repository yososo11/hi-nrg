/* script.js */


document.addEventListener("DOMContentLoaded", function () {
    
    /*** HERO VIDEO CONTROLS ***/
    const video = document.querySelector(".heroVideo");
    const muteToggle = document.getElementById("muteToggle");

    // Start muted
    video.muted = true;
    muteToggle.src = "images/soundoff.png";

    // Click video to toggle play/pause
    video.addEventListener("click", () => {
        video.paused ? video.play() : video.pause();
    });

    // Click mute icon to toggle sound and icon image
    muteToggle.addEventListener("click", () => {
        video.muted = !video.muted;
        muteToggle.src = video.muted ? "images/soundoff.png" : "images/soundon.png";
        if (!video.muted) video.volume = 1;
    });

    /*** EXPLORE MORE BUTTON FUNCTIONALITY (VIDEO SECTION - RECAP VIDS)***/
    const exploreBtn = document.getElementById("exploreBtn");
    if (exploreBtn) {
        exploreBtn.addEventListener("click", function () {
            const recapVideosWrapper = document.getElementById("recapVideosWrapper");
            if (!recapVideosWrapper) {
                console.error(" Error: Recap Videos section not found! Check your HTML ID.");
                return;
            }
            
            // Toggle visibility of the recap videos section
            recapVideosWrapper.style.display = recapVideosWrapper.style.display === "none" || recapVideosWrapper.style.display === "" 
                ? "block" 
                : "none";
            
            // Scroll to the recap video section after showing it
            if (recapVideosWrapper.style.display === "block") {
                window.scrollTo({
                    top: recapVideosWrapper.offsetTop - 10,
                    behavior: "smooth"
                });
            }

            
        });
    }

    /*** EXPLORE MORE BUTTON FUNCTIONALITY (AUDIO SECTION - HYPE PICKS) ***/
    const hypeExploreBtn = document.getElementById("hypeExploreBtn");
    if (hypeExploreBtn) {
        hypeExploreBtn.addEventListener("click", function () {
            const hypeWrapper = document.getElementById("HypeWrapper");
            if (!hypeWrapper) {
                console.error(" Error: Hype Picks section not found! Check your HTML ID.");
                return;
            }
            hypeWrapper.style.display = hypeWrapper.style.display === "none" || hypeWrapper.style.display === ""
                ? "block"
                : "none";

            if (hypeWrapper.style.display === "block") {
                window.scrollTo({
                    top: hypeWrapper.offsetTop - 10,
                    behavior: "smooth"
                });
            }
        });

        /*** AUDIO TRACK CONTROLS ***/
        const hypeWrapper = document.getElementById("HypeWrapper");
        if (hypeWrapper) {
            const hypeAudios = hypeWrapper.querySelectorAll("audio");
        
            hypeAudios.forEach(audio => {
                audio.addEventListener("play", () => {
                    hypeAudios.forEach(otherAudio => {
                        if (otherAudio !== audio) {
                            otherAudio.pause();
                        }
                    });
                });
            });
        }

    }    


    /*** VIDEO PLAYLIST FUNCTIONALITY ***/
    const videoPlayer = document.getElementById("currentVideo");
    const videoSource = document.getElementById("videoSource");
    const title = document.getElementById("videoTitle");
    const artist = document.getElementById("artist");
    const venue = document.getElementById("venue");
    const track = document.getElementById("track");

    const videoData = [
        {
            src: "images/Japan.mp4",
            title: "Location: Nagano, Japan",
            artist: "Artist: Zhu",
            venue: "Venue: Hakuba Iwatake Mountain",
            track: "Track: Anyway/Isolated (Klunsh Remix)"
        },
        {
            src: "images/France.mp4",
            title: "Location: Sisteron, France",
            artist: "Artist: Shimza",
            venue: "Venue: Citadelle de Sisteron",
            track: "Track: Mashup (Chopstar)"
        },
        {
            src: "images/Switzerland.mp4",
            title: "Location: Jungfraujoch, Switzerland",
            artist: "Artist: Argy",
            venue: "Venue: Sphinx Observatory",
            track: "Track: Sierra (Argy & Baset)"
        },
        {
            src: "images/Egypt.mp4",
            title: "Location: Luxor, Egypt",
            artist: "Artist: Adriatique",
            venue: "Venue: Hatshepsut Temple",
            track: "Track: Latlal (Spada Remix)"
        },
        {
            src: "images/Spain.mp4",
            title: "Location: Sevilla, Spain",
            artist: "Artist: Mochakk",
            venue: "Venue: Plaza de España",
            track: "Track: Da Fonk (Mochakk ft. Joni)"
        }
    ];

    let video_count = 0;
    let isPlaying = false;

    function updateVideo() {
        videoSource.src = videoData[video_count].src;
        videoPlayer.load();

        title.innerText = videoData[video_count].title;
        artist.innerText = videoData[video_count].artist;
        venue.innerText = videoData[video_count].venue;
        track.innerText = videoData[video_count].track;

        if (isPlaying) {
            videoPlayer.play();
            playBtn.style.display = "none";
            pauseBtn.style.display = "inline-block";
        }
    }

    updateVideo();

    document.getElementById("nextBtn").addEventListener("click", function () {
        video_count = (video_count + 1) % videoData.length;
        updateVideo();
    });

    document.getElementById("prevBtn").addEventListener("click", function () {
        video_count = (video_count - 1 + videoData.length) % videoData.length;
        updateVideo();
    });

    /*** VIDEO PLAYER CONTROLS ***/
    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");

    playBtn.addEventListener("click", function () {
        videoPlayer.play();
        isPlaying = true;
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";

        const hypeAudios = document.querySelectorAll("#HypeWrapper audio");
        hypeAudios.forEach(audio => audio.pause());
    });

    pauseBtn.addEventListener("click", function () {
        videoPlayer.pause();
        isPlaying = false;
        playBtn.style.display = "inline-block";
        pauseBtn.style.display = "none";
    });

    stopBtn.addEventListener("click", function () {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        isPlaying = false;
        playBtn.style.display = "inline-block";
        pauseBtn.style.display = "none";
    });

 /*** SYNC AUDIO + VIDEO TO NOT OVERLAP ***/
 const allAudios = document.querySelectorAll("#HypeWrapper audio");
    if (allAudios.length) {
     allAudios.forEach(audio => {
         audio.addEventListener("play", () => {
             allAudios.forEach(otherAudio => {
                 if (otherAudio !== audio) {
                     otherAudio.pause();
                 }
             });

             // Pause video if playing
             if (!videoPlayer.paused) {
                 videoPlayer.pause();
                 isPlaying = false;
                 playBtn.style.display = "inline-block";
                 pauseBtn.style.display = "none";
             }
         });
     });
    }

    // Video playback and pause audios
    videoPlayer.addEventListener("play", () => {
        isPlaying = true;
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";

        allAudios.forEach(audio => {
            if (!audio.paused) {
                audio.pause();
            }
        });
    });

    videoPlayer.addEventListener("pause", () => {
        isPlaying = false;
        playBtn.style.display = "inline-block";
        pauseBtn.style.display = "none";
    });   

 });
