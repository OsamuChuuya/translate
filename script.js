const text = document.getElementById('text')
const area = document.getElementById('area')
const select1 =document.getElementById('select1')
const select2 =document.getElementById('select2')
const btn = document.getElementById('btn')
const transVoice = document.getElementById('transVoice')
const voice = document.getElementById('voice')

"https://api.mymemory.translated.net/get?q=bitch&langpair=en|ru"

const select = {
    "en": "English",
    "ru": "Russian",
    "it": "Итальянский",
    "es": "Испанский",
    "uz": "Uzbek",
    "fr": "Французский",
    "de": "Немецкий",
    "ja": "Японский",   
    "zh": "Китайский"  
}

function Select() {
    Object.entries(select).forEach(([code, name]) => {
        select1.innerHTML+= `<option value="${code}">${name}</option>`
        select2.innerHTML+= `<option value="${code}">${name}</option>`

    });
}
Select();

function translated(){
    const inpValue = text.value.trim()
    const from = select1.value
    const to = select2.value

    if(inpValue.length > 0){
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inpValue)}&langpair=${from}|${to}`
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data=>{
        const translated = data.responseData.translatedText
        area.value = translated
    })
    .catch(error =>{
        area.value = `Ошибка`
        console.log(`error`, error)
    })

    }

}

voice.addEventListener('click', ()=>{
    const translate = new SpeechSynthesisUtterance(text.value)
    translate.lang = select1.value
    translate.rate= 1.2; 
    translate.pitch= 0.3; 
    
    speechSynthesis.speak(translate)
})

transVoice.addEventListener('click', ()=>{
    const translate = new SpeechSynthesisUtterance(area.value)
    translate.lang = select2.value
    translate.rate= 1.2; 
    translate.pitch= 0.3; 
    
    speechSynthesis.speak(translate)
})

btn.addEventListener('click', translated)