
const playbackBtn = document.getElementById('playback-btn')
const playlistToggle = document.getElementById('playlist-toggle')
const playlistContainer = document.getElementById('playlist')

// console.log(playbackBtn)
// console.log(playlistToggle)

// let isPlaying = false
playbackBtn.addEventListener('click', () => {

    if(!window.visualizerAudio) return

    window.visualizerAudio.toggle()
    isPlaying = window.visualizerAudio.isPlaying()

    if (isPlaying) {
        playbackBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
        isPlaying = false
    }
    else {
        playbackBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
        isPlaying = true
    }
})

let playlistToggel_isOpen = false
playlistToggle.addEventListener('click', () => {
    if (playlistToggel_isOpen) {
        playlist.style.display = 'none'
        playlistToggel_isOpen = false
    }
    else {
        playlist.style.display = 'flex'
        playlistToggel_isOpen = true
    }
})


const songs = document.querySelectorAll('.song')
const visualizerDiv = document.getElementById('visualizer')
const main = document.querySelector('main')
const songInfoDiv = document.getElementById('song-info')

const song_details = {
    song1: {
        title: "Sunflower", 
        artists: "Post Malone, Swae Lee",
        track: "./assets/audio/sunflower_postMalone.mp3",
        album_cover: "./assets/album_covers/sunflower_postMalone.jpg",
        bg: "./assets/bg/sunflower_postMalone.jpg"
    },
    song2: {
        title: "test", 
        artists: "Post Malone, Swae Lee",
        track: "./assets/audio/gta_ringtone.mp3",
        album_cover: "./assets/album_covers/album2.jpg",
        bg: "./assets/bg/sunflower_postMalone.jpg"
    }
}


songs.forEach((song) => {
    song.addEventListener('click', async () => {
        let id = song.getAttribute('id')
        let details = song_details[id]
        console.log(id)

        main.style.backgroundImage = `url('${details.bg}')`
        main.style.backgroundSize = `cover`

        songInfoDiv.innerHTML = `<img src="${details.album_cover}" alt="">`


        if (window.visualizerAudio?.loadTrack) {
            await window.visualizerAudio.loadTrack(details.track, true)
        }
        
        isPlaying = window.visualizerAudio.isPlaying()

        if (isPlaying) {
            playbackBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
            isPlaying = false
        }
        else {
            playbackBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
            isPlaying = true
        }
    })
})