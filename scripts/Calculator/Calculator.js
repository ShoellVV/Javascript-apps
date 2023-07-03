// dodać liczenie na enter
// obiekt kalkulatora
let calculator ={

    buttons: undefined,
    input: undefined,

    //inicjacja funkcji kalkualtora
    init: function(){
        this.buttons = document.querySelectorAll(".calc-btn button"); //przypisanie do buttons buttonów ze strony
        this.input = document.getElementById("input"); //przypisanie do input okienka input ze strony

        for(let i=0; i < this.buttons.length;i++){  //pętla na dodanie eventlistenera do wciskanych przycisków na click
            let el = this.buttons[i];
            el.addEventListener("click",this.buttonClick); //event click uruchamia funcje buttonClick
        }
    },

    buttonClick: function(event) { //funkcja która ze zmienna event
        let divHtmlText = event.target.innerHTML; // przypisanie do zmiennej tekstu z pliku html z wciśniętego buttona 
        console.log("Klik: " + divHtmlText);    //test w konsoli czy kod z linijki wyżej działa

        switch(divHtmlText) {  //switch, który pobiera zmienną magazynująca tekst przycisku z pliku html i uruchamia funckje dla odpowiednich przycisków
            case "=":
                calculator.evaluate(); // wykonywanie działań matematycznych
            break;
            case "C":
                calculator.clear(); //wyczysczenie konsoli
            break;
            case "9":
            case "8":
            case "7":
            case "6":
            case "5":
            case "4":
            case "3":
            case "2":
            case "1":
            case "0":
            case "00":
            case ".":
            case "-":
            case "+":
            case "*":
            case "/":
                calculator.addToInput(divHtmlText); //dodanie do okienka input wciśniętego przycisku
                break;
        }
    },

    addToInput: function(str) { 
        this.input.value += str; // dodaje wartość ze zmiennej podanej w funckji do inputa jako string
    },

    evaluate: function() {
       let result = math.evaluate(calculator.input.value); // biblioteka mathjs, wykonuje działania matematyczne podane w inpucie i przypisuje  do zmiennej
       calculator.setInput(result); //wyświetlenie zmiennej w inpucie
    },

    clear: function() {
        calculator.setInput(""); // "czyści" input ustawiając jego wartość na pustą
    },

    setInput: function(str){
        calculator.input.value = str; //ustawia zawartość inputu na wartość zmiennej podanej w funkcji
    }

};

calculator.init();