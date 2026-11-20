

const playbackBtn = document.getElementById('playback-btn')
const playlistToggle = document.getElementById('playlist-toggle')
const playlistContainer = document.getElementById('playlist')

console.log(playbackBtn)
console.log(playlistToggle)

let isPlaying = false
playbackBtn.addEventListener('click', () => {

    if (isPlaying) {
        playbackBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
        isPlaying = false
    }
    else {
        playbackBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
        isPlaying = true
    }
})

let playlistTogge_isOpen = false
playlistToggle.addEventListener('click', () => {
    if (playlistTogge_isOpen) {
        playlist.style.display = 'none'
        playlistTogge_isOpen = false
    }
    else {
        playlist.style.display = 'flex'
        playlistTogge_isOpen = true
    }
})