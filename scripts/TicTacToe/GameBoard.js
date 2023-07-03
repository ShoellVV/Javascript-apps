//klasa Gameboard, działanie na elementach DOM
export class GameBoard {
    //przypisanie elementów z klasy .game-item czyli kontenery dla X i O, NodeList
    fieldsElements = document.querySelectorAll('.game-item');
    //przypisanie elementu odpowiedzialnego za panel z informacją o zwycięzcy 
    panel = document.querySelector('.winner-panel');
    //przypisanie elementu odpowiedzialnego za reset
    button = document.querySelector('.reset');
    //przypisanie popupu, który wyświetli się po skończonej grze
    popup = document.getElementById('popup');
    //przypisanie button popupu
    buttonPop = document.querySelector('.btn-popup');
    //przypisanie select do wybrania trybu
    modeSelect = document.querySelector('#mode-select');
    //przypisanie informacji o aktualnym graczu
    currentPlayerTag = document.querySelector('#current-player');
    //przypisanie panelu informacyjnego
    info = document.querySelector('.infoPanel');

//konstruktor klasy GameBoard, przyjmuje dwa callbacki z klasy Game
    constructor (onBoxClick, onButtonClick, onModeChange) {

        this.onButtonClick = onButtonClick;
        this.button.addEventListener('click', this.handleButtonClick);
        this.buttonPop.addEventListener('click', this.handleButtonClick);
        this.fieldsElements.forEach(field => {
            field.addEventListener("click", onBoxClick);
        });
        this.modeSelect.addEventListener("change", onModeChange);
    };


    setCurrentPlayer = (player) => {
        this.currentPlayerTag.innerHTML = `Aktualny gracz: ${player}`
    };

    //schowanie panelu informacyjnego
    hidePanel = () => {
        this.info.classList.add("hide");
    }

    // działania dla buttonów na click
    handleButtonClick = () => {
        this.resetBoard(); //resetuje board
        this.onButtonClick(); // resetuje grę
    };

    //reset gry
    resetBoard = () => {
        this.resetBoxClasses(); //usunięcie klas z boxów(X i O), aby je wyczyścić
        this.clearMsgPanel(); // wyczyszczenie panelu informującego o wygranej danego gracza
        this.currentPlayerTag.innerHTML = '';
    };

    //reset klas boxów
    resetBoxClasses = () => {
        this.fieldsElements.forEach(field => {
            field.classList.remove('game__item--X','game__item--O')
        })
        this.info.classList.remove("hide");
    };

    // metoda zbierająca pozycję kliknięcia w pole
    getFieldPosition = (position) => {
        return this.fieldsElements[position];
    }

    //wyświetlenie zwycięzcy
    displayWinnner = (activePlayer) => {
        this.panel.innerText = `Gratulacje graczu ${activePlayer}, Wygrałeś!`;
        this.popup.className += ' popup-visible';
    };

    //wyświetlenie remisu
    displayDraw = () => {
        this.panel.innerText = 'Remis!';
        this.popup.className += ' popup-visible';
    };

    //wyczyszczenie panelu o informacji wygranej
    clearMsgPanel = () => {
        this.panel.innerText =  '';
        this.popup.className -= ' popup-visible';
    };

};
