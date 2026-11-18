let container;
let song;
let fft;

// function preload () {
//     song = loadSound('./assets/audio/sunflower_postMalone.mp3')
// }

async function setup () {
    container = document.getElementById('visualizer')

    let canvas = createCanvas(container.clientWidth, container.clientHeight)
    canvas.parent('visualizer')

    song = await loadSound('./assets/audio/sunflower_postMalone.mp3')

    fft = new p5.FFT()
    fft.setInput(song)
}

function draw () {
    background(0)
    stroke(255)

    // fill(0, 255, 200)
    // noStroke()
    // ellipse(width / 2, height / 2, 100, 100)

    let wave = fft.waveform()

    for (let i = 0; i < width; i++) {
        let index = floor(map(i, 0, width, 0, wave.length))

        let x = i
        let y = wave[index] * 300 + height / 2
        point(x, y)
    }

}

function mouseClicked () {
    if (song.isPlaying()) {
        song.pause()
    }
    else {
        song.play()
    }
}