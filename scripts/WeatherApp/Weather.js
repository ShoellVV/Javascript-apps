class WeatherApp {

    constructor() {
    //////////////////////////////////////////////
    // data start 
    this.monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", 
        "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", 
        "Listopad", "Grudzień"];

    this.today = new Date();
    this.todayMonth = this.monthNames[this.today.getMonth()];
    this.todayDay = this.today.getDate();
    // data koniec
    //////////////////////////////////////////////    
    
    this.apiKey = "444f3282de1e6de4b96076a83b3ae9ab" // klucz api do openWeather
    this.cities = ["Nowy Jork","Warszawa","Tokio","Buenos Aires","Dakar","Sydney"]; // tablica z miastami do default page 
    this.url = null // url dla Api
    this.executed = false; // czy wykonano metodę usuwającą default page
    this.error = false; // czy wystąpił error przy pobieraniu danych z API

    //elementy DOM
    this.input = document.querySelector(".weather-input"); // input do wpisania miasta
    this.cardContainer = document.getElementById("card-container"); // container dla cards
    this.form = document.querySelector(".weather-form") // formularz, w którym user wpisuje miasto, aby sprawdzić pogodę
    this.msgBox = document.querySelector(".info-msg") // div, gdzie wyświetli wiadomość, jeśli user wpiszę złe miasto
    };

    init(){
        //default page
        for(let i = 0; i < 6 ; i++) this.createCards(i);

        //wyszukiwanie pogody dla wpisanego miasta na event listener - submit
        this.form.addEventListener("submit", event =>{
            event.preventDefault();
            
            this.msgBox.textContent = "";
            this.error = false;
    
            this.createCards(1,false);
            this.input.value ="";
          });
    };

    // metoda, która tworzy strukturę cards dla defaultowej strony, na koniec pobiera dane dla nich
    createCards(index = null, defaultPage = true) {
        // create cards start

            //stworzenie card
            const card = document.createElement("div");
            card.classList.add("card");
    
            //stworzenie containera dla ikony
            const iconContainer = document.createElement("div");
            iconContainer.classList.add("icon-container");
            card.appendChild(iconContainer);
    
            //stworzenie headera card
            const cardHeader = document.createElement("div");
            cardHeader.classList.add("card-header");
            card.appendChild(cardHeader);
    
            //stworzenie spana z miastem
            const city = document.createElement("span");
            city.classList.add("city");
            cardHeader.appendChild(city);
    
            //stworzenie spana z data
            const date = document.createElement("span");
            date.classList.add("date");
            cardHeader.appendChild(date);
    
            //stworzenie spana z temperatura
            const temperature = document.createElement("span");
            temperature.classList.add("temp");
            card.appendChild(temperature);
    
            //stworzenie containera dla opisu pogody
            const weatherContainer = document.createElement("div");
            weatherContainer.classList.add("desc-container");
            card.appendChild(weatherContainer);
    
            //stworzenie spana opisu pogody
            const weatherDesc = document.createElement("span");
            weatherDesc.classList.add("weather-desc");
            weatherContainer.appendChild(weatherDesc);
        //create cards koniec
    
        if(defaultPage){
        this.getDataFromApi(index,card,iconContainer,city,date,temperature,weatherDesc);
        }else{
        this.getDataFromApi(index,card,iconContainer,city,date,temperature,weatherDesc,false);
        };
    };

    //Metoda do otrzymania danych z OpenWeather API, ostatnii parametr domyślnie na true, aby defaultowa strona wypełniała się danymi
    getDataFromApi(indexForDefaultPage,card,iconContainer,city,date,temperature,weatherDesc,defaultPage = true){
        if(defaultPage){
        this.cardContainer.appendChild(card);
        this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cities[indexForDefaultPage]}&appid=${this.apiKey}&lang=pl&units=metric`;
        }else{
        this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.input.value}&appid=${this.apiKey}&lang=pl&units=metric`;
        }

        fetch(this.url)
        .then(response => response.json())
        .then(data =>{
            const icon = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;
            
            iconContainer.innerHTML = `<img src=${icon}>`;
            city.innerHTML = `${data.name}<sup>${data.sys.country}</sup>`;
            date.innerHTML = `${this.todayMonth} ${this.todayDay}`;
            temperature.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
            weatherDesc.innerHTML = data.weather[0].description;

            //jeśli jest wyszukiwana pogoda dla wpisanego miasta, to nowe miasto będzie pojawiało się od lewej strony
            if(!defaultPage && !this.executed){
                this.cardContainer.appendChild(card);
            }else if(!defaultPage && this.executed){
                const card2 = document.querySelector(".card");
                this.cardContainer.insertBefore(card,card2);
            }

            if(!defaultPage) this.removeCard(); // wyczyszczenie defaultowej strony po wyszukaniu pierwszego miasta
        })

        // jeśli fetch da error
        .catch(() => {
        this.error = true;
        this.msgBox.textContent = "Proszę wpisać poprawną nazwę miasta";
        });
    };

    //usunięcie card
    removeCard(){
        if(!this.executed && !this.error){
            this.executed = true;
            for(let i = 0; i < 6; i++){
                const card = document.querySelector(".card");
                this.cardContainer.removeChild(card);
            };
        };
    };
};

let weatherApp = new WeatherApp;
weatherApp.init();
