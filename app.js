const saat = document.getElementById("saat")
const dakika = document.getElementById("dakika")
const saniye = document.getElementById("saniye")
const salise = document.getElementById("salise")
const time = document.querySelector(".time")

const pause = document.getElementById("pause")
const play = document.getElementById("play")
const reset = document.getElementById("reset")
const playPause = document.getElementById("play-pause")
const tur = document.getElementById("tur")

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

// https://randomuser.me/api/  
// https://restcountries.com/v3.1/all

let times = []
let sayac2 = 0

tur.addEventListener("click", () => {
    times.push(time.textContent)
    dereceDomaYaz()
    sayac2++
})

//! dereceyi doma yazdırma

const dereceDomaYaz = () => {

    let random = Math.floor(Math.random() * 250)
    document.getElementById("derece-body").innerHTML += `
    <tr>
    <td>${sayac2+1}</td>
    <td><img src="${ulke[random].flags.png}" width="35rem"></img></td>
    <td>${athlete[sayac2].name.first} ${athlete[sayac2].name.last}</td>
    <td>${times[sayac2]}</td>

    </tr>
    `
}

let ulke = []

const getCountries = async () => {

    try {
    const res = await fetch(`https://restcountries.com/v3.1/all`)
    if (!res.ok) {
        throw new Error(`Something went wrong:${res.status}`)
    }
    const data = await res.json()
    ulke = data

    } catch (error) {
        document.querySelector(".container1").innerHTML = `<h2>${error}</h2>`
    }
}

window.addEventListener("load", () => {
    getCountries()
})

let athlete = []

const getUsers = async () => {
    try {
        const res = await fetch("https://randomuser.me/api/?gender=male")
        if(!res.ok) {
            throw new Error()
        }
        const data = await res.json()
        show(data.results)
    } catch (error) {
        document.querySelector(".container1").innerHTML = `<h2>${error}</h2>`
    }
}

window.addEventListener("load", () => {
    getUsers()
})

console.log(athlete);

const show = (results) => {

    results.forEach((user) => {
        athlete.push(user)
    })

    tur.addEventListener("click", getUsers)
}