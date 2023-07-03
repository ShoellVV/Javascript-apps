import { Snake } from "./Snake.js"
import { Grid } from "./Grid.js"

class Game {

    constructor () {
        this.reset();

        this.setupGrid();
        this.setupSnake();
        this.spawnApple();

        window.requestAnimationFrame(currentTime => this.update(currentTime));
    };

    // domyślne ustawienia 
    reset() {
        this.snakeSpeed = 3; // ilość "ruchów" na sekundę
        this.eatenApples = 0;
        this.lastRenderTime = 0;
        this.level = 1;
        this.points = 0;
        this.gameOver = false;
    };

    onRestart() {
        this.reset();
        this.snake.reset();
        this.spawnApple();
        this.grid.popUp.style.display = "none";
        this.grid.pointPanel.innerHTML = " "
    };

    update(currentTime) {
        window.requestAnimationFrame(currentTime => this.update(currentTime));
        this.secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000; // zmiana czasu renderu z ms na sekundy

        if(this.gameOver){
            this.snake.velocityX = 0;
            this.snake.velocityY = 0;
            this.grid.popUp.style.display = "block";
            this.grid.pointPanel.innerHTML = `Ilość punktów: ${this.points}`;
        }

        if(!this.lastRenderTime){
            this.lastRenderTime = currentTime;
        }

        if (this.secondsSinceLastRender < 1 / this.snakeSpeed){
            return
        }

        this.lastRenderTime = currentTime;

        this.render();
    };

    render() {
        this.grid.gameBoard.innerHTML = " ";
        this.snake.snakeUpdate();
        this.updateApple();
        this.snake.drawSnake();
        this.drawApple();
        this.checkDeath();
    };

    setupGrid() {
        this.grid = new Grid(26,26);
    };

    setupSnake() {
        this.snake = new Snake(this, this.grid)
    };


    // sekcja jabłko start
    spawnApple() {
        this.apple = this.grid.getRandomPosition();
    };

    updateApple() {
        if(this.snake.equalPosition(this.apple,this.snake.snakeHead)){
            this.onEatenApple();
            this.apple = this.getRandomApplePosition();
        }
    };

    getRandomApplePosition(){
        let newApplePosition;

        while(newApplePosition == null || this.snake.onSnake(newApplePosition)){
            newApplePosition = this.grid.getRandomPosition();
        };

        return newApplePosition;
    };

    drawApple() {
        const gameBoard = this.grid.getBoard();

        const appleElement = document.createElement("div");
        appleElement.style.gridRowStart = this.apple.y;
        appleElement.style.gridColumnStart = this.apple.x;
        appleElement.classList.add("food");
        gameBoard.appendChild(appleElement);
    };

    onEatenApple() {
        this.eatenApples++;
        this.snake.newSegments = 1 * this.level;
        this.points += 5;
        this.levelUp();
    };

    levelUp() {
        if(this.eatenApples % 4 === 0)
        {
        this.level++
        this.snakeSpeed++;
        this.lvlUpText(); 
        }
    };
    
    lvlUpText() {
        this.grid.lvlUp.style.display = "block";
        setTimeout(() => {this.grid.lvlUp.style.display = "none"},600);  
    };
    // sekcja jabłko koniec


    // gameover jeśli snake "wejdzie" w ścianę lub na siebie 
    checkDeath() {
        this.gameOver = this.grid.outsideGrid(this.snake.snakeHead) || this.snake.snakeIntersection();
    }

   
}

let game = new Game();