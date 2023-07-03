import { GameBoard } from './GameBoard.js';
import { EasyMode } from './easy.js';
import { MediumMode } from './medium.js';
import { winCond } from './winCond.js';

//Klasa game, działania logiczne
class Game {
    fields;
    activePlayer;
    gameActive;

    currentMode = null // null = pvp
    doesAIMoveFirst = false; // ruch komputera

    //konstruktor klasy Game
    constructor() {
        this.resetGame();

        this.board = new GameBoard(
            this.handleBoxClick,
            this.handleReset,
            this.handleModeChange);
    }

    // funkcja odpowiedzialna za walidacje warunków zwycięstwa
    validateGame = () =>{
        let gameWon = false;
        for(let i = 0; i <= 7; i++){ // pętla przez tablice z zasadami wygranej
            const [posA, posB, posC] = winCond[i];
            // przypisanie do stałych pozycji X lub O z tablicy fields
            const value1 = this.fields[posA];
            const value2 = this.fields[posB];
            const value3 = this.fields[posC];
            
            // funkcja warunkowa, która sprawdza czy z wartość z 1 pozycji jest taka sama jak z dwóch kolejnych, jeśli tak, mamy wygraną gre i wychodzimy z ifa
            if (value1 !== "" && value1 === value2 && value1 === value3){
                gameWon= true;
                break;
            }
        };
        if (gameWon){ // jeśli gra jest wygrana, ustawia gre na nieaktyną i wyświetli zwycięzce
            this.gameActive = false;
            this.board.displayWinnner(this.activePlayer);
        } else if (this.isBoardFull()){ // jeśli nie ma zwycięzcy, a wszystkie pola są zaznaczone, gra stanie się nieaktywna i wyświetli informacje o remisie
            this. gameActive = false;
            this.board.displayDraw();
        };
    };

    // ustawia wartości na domyślne
    resetGame = (isAIsMove) => {
        this.fields = ['','','','','','','','',''];
        this.activePlayer = 'X';
        this.gameActive = true; 
        this.doesAIMoveFirst = isAIsMove !== undefined ? isAIsMove : false;
    };

    // metoda sprawdzająca czy wszystkie boxy są zaznaczone
    isBoardFull = () => {
        return this.fields.find(field => field === "") === undefined; // jeśli wszystkie pola są zaznaczone to find() zwraca undefined;
    };

    // metoda która wykonuje podane instrukcje dla buttona, który ją wywoła
    handleReset = () => {
        this.resetGame(!this.doesAIMoveFirst); //funkcja resetująca grę
        this.AIsFirstMove();
    };

    //metoda na wykonianie przez komputer ruchu jako pierwszy
    AIsFirstMove = () => {
        if(this.doesAIMoveFirst && this.currentMode !== null ){
            this.makeMove(this.currentMode.getMove(this.fields, this.activePlayer));
        }   ;
    };

    //metoda do zmiany trybu gry
    handleModeChange = (event) => {
        this.currentMode = this.getModeClassForName(event.target.value); // zmiana trybu gry
        this.resetGame(false); 
        this.board.resetBoard(); // wyczyszczenie boardu
    };

    //zaciąga nazwę trybu
    getModeClassForName = (name) => {
        if(name === 'easy') return new EasyMode(); //tworzy nowy objekt easyMode
        if(name === 'medium') return new MediumMode(); //tworzy nowy objekt mediumMode
        return null;
    };

    //metoda, która wykonuje instrukcje po kliknięciu na box
    handleBoxClick = (event) => {
        //przypisanie do stałej pos pozycji ustawionej dla wciśniętego boxa
        const {pos} = event.target.dataset;
        //sprawdzenie czy dany box nie był już wciśnięty i wykonanie metody jeśli nie był oraz czy gra dalej jest aktywna(po wygraniu jednego z graczy jest nieaktywna, co blokuje dalszą grę)
        if(this.gameActive && this.fields[pos] === ''){
            this.board.hidePanel();
            this.makeMove(pos);

            if(this.gameActive && this.currentMode !== null){
                    this.makeMove(this.currentMode.getMove(this.fields, this.activePlayer));
            };
        };
    };

    //metoda wykonania ruchu
    makeMove = (position) => {
        this.fields[position] = this.activePlayer; //przypisanie do tablicy stringa z activePlayer, aby dany box nie mógł zostać ponownie wciśnięty
            this.board.getFieldPosition(position).classList.add(`game__item--${this.activePlayer}`); // dodanie klasy odpowiedniej dla aktywnego gracza, X lub O
            this.validateGame(); // metoda walidacyjna
            this.activePlayer = this.activePlayer === 'X' ? 'O' : 'X'; // jeśli aktywny gracz to X, po kliknięciu zostanie zmieniony na O i vice versa
            this.board.setCurrentPlayer(this.activePlayer);
    };
};


const game = new Game();