class Calendar {   

    constructor(input,options){
    this.now = new Date();
    this.day = this.now.getDay();
    this.month = this.now.getMonth();
    this.year = this.now.getFullYear();

    this.input = input; // referencja do inputa tekstowego podpiętego kalendarza
    this.divContainer = null; // calendar container
    this.divHeader = null; // calendar header
    this.divTable = null; // container tabeli z kalendarzem
    this.divDateText = null; // container z nazwą miesiąca i roku
    this.divButtons = null // container z przyciskami do przełącania miesiąca

    //defaultowe opcje
    const defaultOptions = {
        //zamknięcie kalendarza po wybraniu daty
        closeOnSelect : false,
        //wrzucenie daty do inputa po wybraniu daty
        onDateSelect : (day, month, year) => {
            // jeśli numer miesiąca jest mniejszy niż 10, stawia 0 przed numerem miesiąca
            const monthText = ((month + 1) < 10) ? "0" + (month + 1) : month + 1;
            // jeśli numer dnia jest mniejszy niż 10, stawia 0 przed numerem dnia
            const dayText =  (day < 10) ? "0" + day : day;
            this.input.value = `${dayText}-${monthText}-${this.year}`;
        }
        }
        this.options = Object.assign({}, defaultOptions, options);
    };


    //toogleShow, show i hide
    toggleShow() {
        this.divContainer.classList.toggle("calendar-show")
    };

    show() {
        this.divContainer.classList.add("calendar-show");
    };

    hide() {
        this.divContainer.classList.remove("calendar-show");
    };

    //wyswietlanie nazw miesiecy i roku

    createDateText() {
        const monthNames = ["styczeń", "luty", "marzec", "kwiecień", 
        "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", 
        "listopad", "grudzień"];

        this.divDateText.innerHTML = monthNames[this.month] + " " + this.year;
    };

    //tabela z kalendarzem

    createCalendarTable() {
        //czyszczenie diva
        this.divTable.innerHTML = "";


        //tabela z dniami
        const tab = document.createElement("table");
        tab.classList.add("calendar-table");

        //nagłówki dni
        let tr = document.createElement("tr");
        tr.classList.add("calendar-table-days-names");
        const days = ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"];
        days.forEach(day => {
            const th = document.createElement("th");
            th.innerHTML = day;
            tr.appendChild(th);
        });
        tab.appendChild(tr);

        //pobranie wszystkich dni w miesiącu
        const daysInMonth = new Date(this.year, this.month+1, 0).getDate();

        //pobranie pierwszego dnia miesiąca
        const tempDate = new Date (this.year, this.month, 1);
        let firstMonthDay = tempDate.getDay();

        //zmiana pierwszego dnia z niedzieli na poniedziałek
        if(firstMonthDay === 0){
            firstMonthDay = 7;
        };

        //liczba komórek (pustych i z dniami)
        const cells = daysInMonth + firstMonthDay - 1;

        // jeżeli pierwszy dzień miesiąca nie zaczyna się od początku, tworzy dodatkowe TR
        if(firstMonthDay - 1 !== 0){
            tr = document.createElement("tr");
            tab.appendChild(tr);
        }

        //puste komórki
        for(let i = 0; i < firstMonthDay - 1; i++){
            const td = document.createElement("td");
            td.innerHTML = "";
            tr.appendChild(td);
        };

        //komórki z dniami
        for (let i = firstMonthDay - 1; i < cells ; i++){
            if( i % 7 === 0){
                tr = document.createElement("tr");
                tab.appendChild(tr);
            };

            const td = document.createElement("td");
            td.innerText = i - firstMonthDay + 2;
            td.dayNr = i - firstMonthDay + 2;
            td.classList.add("day");

            if (this.year === this.now.getFullYear() && this.month === this.now.getMonth() && i + 1 === this.now.getDate() ) {
                td.classList.add("current-day");
            }

            tr.appendChild(td);
        }

        tab.appendChild(tr);

        //dołaczenie do diva na table
        this.divTable.appendChild(tab)
    };

    createButtons() {
        //previous button
        const prevBtn = document.createElement("button");
        prevBtn.innerText = "<";
        prevBtn.type = "button";
        prevBtn.classList.add("input-prev");
        prevBtn.addEventListener("click", event => {
            this.month--;
            if(this.month < 0){
                this.month = 11;
                this.year--;
            };
            this.createCalendarTable();
            this.createDateText();
        });
        this.divButtons.appendChild(prevBtn);

        //next button

        const nextBtn = document.createElement("button");
        nextBtn.innerText = ">";
        nextBtn.type = "button";
        nextBtn.classList.add("input-next");
        nextBtn.addEventListener("click", event => {
            this.month++;
            if(this.month > 11){
                this.month = 0;
                this.year++;
            };
            this.createCalendarTable();
            this.createDateText();
        });
        this.divButtons.appendChild(nextBtn);
    };
    //event na wybranie dnia
    daysEvent() {
        this.divTable.addEventListener("click", event => {
            if(event.target.tagName.toLowerCase() === "td" && event.target.classList.contains("day")){
                if(this.options.closeOnSelect){
                    this.hide();
                };
                this.options.onDateSelect(event.target.dayNr, this.month + 1, this.year);
            };
        });
    };

     //inicjacja kalendarza
     init() {
        //zmiana kursoru i dodanie ikonki kalendarza dla inputa
        this.input.classList.add("input-calendar");

        //container kalendarza
        this.divContainer = document.createElement("div");
        this.divContainer.classList.add("calendar");

        //container dla buttonów
        this.divButtons = document.createElement("div");
        this.divButtons.className = "calendar-prev-next";
        this.createButtons();

        //text miesiąca i roku
        this.divDateText = document.createElement("div");
        this.divDateText.className = "date-name";
        this.createDateText();

        //div z przyciskami i nazwa miesiaca wrzucony do headera kalendarza
        this.divHeader = document.createElement("div");
        this.divHeader.classList.add("calendar-header");

        this.divHeader.appendChild(this.divButtons);
        this.divHeader.appendChild(this.divDateText);
        this.divContainer.appendChild(this.divHeader);

        //tablica kalendarza
        this.divTable = document.createElement("div");
        this.divTable.className = ("calendar-table-container");
        this.divContainer.appendChild(this.divTable);
        this.createCalendarTable();
        this.daysEvent();

        //wrapper dla inputa
        this.calendarWrapper = document.createElement("div");
        this.calendarWrapper.classList.add("input-calendar-container")
        this.input.parentElement.insertBefore(this.calendarWrapper, this.input);
        this.calendarWrapper.appendChild(this.input);
        this.calendarWrapper.appendChild(this.divContainer);

        this.input.addEventListener("click", event => this.toggleShow())
        this.input.addEventListener("click", event => event.stopImmediatePropagation());
        this.divContainer.addEventListener("click", event => event.stopImmediatePropagation());
        document.addEventListener("click", event => this.hide());
    };

};

const input = document.querySelector(".input-calendar");
const cal = new Calendar(input, {
    closeOnSelect:true,
    onDateSelect(day, month, year){
        const dayText = (day < 10) ? "0" + day : day;
        const monthText = (month < 10) ? "0" + month : month;
        const date = `${dayText} / ${monthText} / ${year}`;
        input.value = date;
    }
});
cal.init();


