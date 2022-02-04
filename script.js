const MAIN = document.querySelector('main')
const options = document.querySelectorAll('select')
const WRAPPER = document.querySelector('.wrapper')
const SEARCH = document.querySelector('nav input')
const THEMA = document.querySelector('.thema button')

const urlEU = 'https://restcountries.com/v3.1/region/europe'
const urlAF = 'https://restcountries.com/v3.1/region/africa'
const urlAM = 'https://restcountries.com/v3.1/region/america'
const urlAS = 'https://restcountries.com/v3.1/region/asia'
const urlOC = 'https://restcountries.com/v3.1/region/oceania'

options.forEach(option => option.addEventListener('change', selectCountry))

function selectCountry(e) {
    MAIN.innerHTML = ''
    const region = e.target.value
    if (region === 'Europe') {
        displayCountries(urlEU)
    } else if (region === 'Africa') {
        displayCountries(urlAF)
    } else if (region === 'America') {
        displayCountries(urlAM)
    } else if (region === 'Asia') {
        displayCountries(urlAS)
    } else if (region === 'Oceania') {
        displayCountries(urlOC)
    } else {
        displayCountries(urlEU)
    }
}

async function displayCountries(url) {
    const res = await fetch(url)
    const resources = await res.json()

    resources
        .forEach(country => {
            const {
                name,
                flags,
                population,
                region,
                capital,
                cca3
            } = country
            const countryDiv = document.createElement('div')
            countryDiv.classList.add('card')
            countryDiv.setAttribute('onclick', 'detailsCountries(this)')
            countryDiv.setAttribute('id', cca3)

            countryDiv.innerHTML = `   
        <img class="card-img-top" src="${flags.png}" alt="${name.common}">  
        <div class="card-body">
        <h5 class="card-title">${name.common}</h5>
        <p class="population">Population: <span>${population}</span></p>
        <p class="region">Region: <span>${region}</span></p>
        <p class="capital">Capital:<span>${capital}</span></p>
        </div>`
            MAIN.appendChild(countryDiv)
        })
}
displayCountries(urlEU)

async function detailsCountries(e) {
    WRAPPER.innerHTML = ''
    const code = e.id
    const res = await fetch(`https://restcountries.com/v2/alpha/${code}`)
    const resources = await res.json()

    const {
        name,
        flags,
        nativeName,
        population,
        region,
        subregion,
        capital,
        topLevelDomain,
        currencies,
        languages,
        borders
    } = resources
    let borders1 = ''
    borders ? borders1 = borders : borders1 = []

    const countryDiv = document.createElement('div')
    countryDiv.classList.add('ctry-card')

    countryDiv.innerHTML = `
    <div class="ctry-img">
    <button class="ctry-btn " onclick="back()">🔙 </button>
         <img class="ctry-card-img-top" src="${flags.png}" alt="${name}">
    </div>
    <div class="row">
      <div class="ctry-card-body">
        <h1 class="ctry-card-title">${name}</h1>
        <p class="ctry-nativeName">Native Name: <span>${nativeName}</span></p>
        <p class="ctry-population">Population: <span>${population}</span></p>
        <p class="ctry-region">Region: <span>${region}</span></p>
        <p class="ctry-subregion">Sub Region: <span>${subregion}</span></p>
        <p class="ctry-capital">Capital:<span>${capital}</span></p>
      </div>
      <div class="ctry-card-right">
        <p class="ctry-topLevelDomain">Top Level Domain: <span>${topLevelDomain}</span></p>
        <p class="ctry-currencies">Currencies: <span>${currencies[0].name}</span></p>
        <p class="ctry-languages">Languages: <span>${languages[0].name}</span></p>
      </div> 
      <div class="ctry-footer">
        <p class="ctry-borders">Borders: <span>${borders1.map(el=>
            '<button class="bor" onclick="codeCountries(this)">'+el+'</button>').join('')}</span></p>
      </div>
      </div>`
    WRAPPER.appendChild(countryDiv)
}

async function codeCountries(e) {
    WRAPPER.innerHTML = ''
    const countryCode = e.innerText
    const res = await fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
    const resources = await res.json()

    const {
        name,
        flags,
        nativeName,
        population,
        region,
        subregion,
        capital,
        topLevelDomain,
        currencies,
        languages,
        borders
    } = resources
    let borders1 = ''
    borders ? borders1 = borders : borders1 = []
    const countryDiv = document.createElement('div')
    countryDiv.classList.add('ctry-card')

    countryDiv.innerHTML = `
        <div class="ctry-img">
        <button class="ctry-btn " onclick="back()">🔙 </button>
             <img class="ctry-card-img-top" src="${flags.png}" alt="${name}">
        </div>
        <div class="row">
          <div class="ctry-card-body">
            <h1 class="ctry-card-title">${name}</h1>
            <p class="ctry-nativeName">Native Name: <span>${nativeName}</span></p>
            <p class="ctry-population">Population: <span>${population}</span></p>
            <p class="ctry-region">Region: <span>${region}</span></p>
            <p class="ctry-subregion">Sub Region: <span>${subregion}</span></p>
            <p class="ctry-capital">Capital:<span>${capital}</span></p>
          </div>
          <div class="ctry-card-right">
            <p class="ctry-topLevelDomain">Top Level Domain: <span>${topLevelDomain}</span></p>
            <p class="ctry-currencies">Currencies: <span>${currencies[0].name}</span></p>
            <p class="ctry-languages">Languages: <span>${languages[0].name}</span></p>
          </div>    
          <div class="ctry-footer">
            <p class="ctry-borders">Borders: <span>${borders1.map(el=>
                '<button class="bor" onclick="codeCountries(this)">'+el+'</button>').join('')}</span></p>
          </div>
          </div>`
    WRAPPER.appendChild(countryDiv);
}

function back() {
    location.reload();
}

SEARCH.addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const countryName = card.querySelector('h5').innerText.toLowerCase();
        if (countryName.indexOf(search) != -1) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    })
})

THEMA.addEventListener('click', (e) => {
    if (e.target.id == 'dark') {
        e.target.parentElement.firstElementChild.innerText = ''
        document.documentElement.style.setProperty('--Very-Light-Gray', '#2b3945')
        document.documentElement.style.setProperty('--Dark-Gray', '#ffffff')
        e.target.innerText = 'Light Mode'
        e.target.parentElement.firstElementChild.innerText = "☀️"
        e.target.id = 'light'
    } else {
        e.target.parentElement.firstElementChild.innerText = ''
        document.documentElement.style.setProperty('--Very-Light-Gray', '#fafafa')
        document.documentElement.style.setProperty('--Dark-Gray', '#111517')
        e.target.innerText = 'Dark Mode'
        e.target.parentElement.firstElementChild.innerText = "🌙"
        e.target.id = 'dark'
    }
})