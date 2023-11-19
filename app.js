const saat = document.getElementById("saat")
const dakika = document.getElementById("dakika")
const saniye = document.getElementById("saniye")
const salise = document.getElementById("salise")

const pause = document.getElementById("pause")
const play = document.getElementById("play")
const reset = document.getElementById("reset")
const playPause = document.getElementById("play-pause")

//! kronometre süre akışı fonksiyonu

const startKronometre = () => {
    return setInterval(() => {
        if(salise.textContent < 99){
            salise.textContent = (+salise.textContent + 1).toString().padStart(2, "0")
        } else if (salise.textContent == 99) {
            salise.textContent = "00"

            if(saniye.textContent < 59){
                saniye.textContent = (+saniye.textContent + 1).toString().padStart(2, "0")
            } else {
                saniye.textContent = "00"
                if(dakika.textContent < 59) {
                    dakika.textContent = (+dakika.textContent + 1).toString().padStart(2, "0")
                } else {
                    dakika.textContent = "00"
                    if(saat.textContent < 23) {
                        saat.textContent = (+saat.textContent + 1).toString().padStart(2, "0")
                    } else {
                        saat.textContent = "00"   
                        reset.click()                   
                    }                    
                }
            }
        }
    }, 10)    
}

//! start-pause

let sayac = 0
let startStop = ""

playPause.addEventListener("click", () => {
    sayac++
    if(sayac % 2) {
        play.style.display = "none"
        pause.style.display = "block"
        startStop = startKronometre()
    } else {
        play.style.display = "block"
        pause.style.display = "none"
        pauseKronometre()
    }
})

//! pause fonksiyonu 

const pauseKronometre = () => {
    clearInterval(startStop)
}

//! reset fonksiyonu

reset.addEventListener("click", () => {
    pauseKronometre()
    play.style.display = "block"
    pause.style.display = "none"
    saat.textContent = "00"
    dakika.textContent = "00"
    saniye.textContent = "00"
    salise.textContent = "00"
    sayac = 0
})

