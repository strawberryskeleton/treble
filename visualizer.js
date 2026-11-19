let container;
let song;
let fft;
let particles = [];

// function preload () {
//     song = loadSound('./assets/audio/sunflower_postMalone.mp3')
// }

async function setup () {
    container = document.getElementById('visualizer')

    let canvas = createCanvas(container.clientWidth, container.clientHeight)
    canvas.parent('visualizer')
    angleMode(DEGREES)

    song = await loadSound('./assets/audio/sunflower_postMalone.mp3')

    // frameRate(30)
    fft = new p5.FFT()
    fft.setInput(song)

    noLoop()
}

function draw () {
    background(0)
    // clear()
    stroke(255)
    strokeWeight(3)
    noFill()

    translate(width / 2, height / 2)
    // fill(0, 255, 200)
    // noStroke()
    // ellipse(width / 2, height / 2, 100, 100)

    // fft.analyze()
    // amp = fft.getEnergy(20, 200)

    let wave = fft.waveform()

    for (let t = -1; t <= 1; t += 2) {
        beginShape()
        for (let i = 0; i <= 180; i += 0.5) {
            let index = floor(map(i, 0, 180, 0, wave.length - 1))

            let r = map(wave[index], -1, 1, 150, 350)

            let x = r * sin(i) * t
            let y = r * cos(i)
            // let x = i
            // let y = wave[index] * 300 + height / 2
            vertex(x, y)
        }
        endShape()
    }


    let p = new Particle()
    particles.push(p)

    for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].edges()) {
            particles[i].update()
            particles[i].show()
        } 
        else {
            particles.splice(i, 1)
        }
    }

}

function mouseClicked () {
    if (song.isPlaying()) {
        song.pause()
        noLoop()
    }
    else {
        song.play()
        loop()
    }
}


class Particle {
    constructor () {
        this.pos = p5.Vector.random2D().mult(250)
        this.vel = createVector(0, 0)
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

        this.w = random(3, 5)
        this.color = [random(200, 255), random(200, 255), random(200, 255)]
    }

    update () {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
    }

    edges () {
        if (this.pos.x < -width / 2 || this.pos.x > width / 2 ||
            this.pos.y < -height / 2 || this.pos.y > height / 2) {
            return true
        }
        else {
            return false
        }
    }

    show () {
        noStroke()
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, this.w)
    }
}