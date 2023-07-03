export class Grid {

    constructor(width, height){
        this.width = width;
        this.height = height;

        this.gameBoard = document.getElementById("snakeBoard");
        this.popUp = document.getElementById("snakePopUp");
        this.pointPanel = document.getElementById("points");
        this.lvlUp = document.getElementById("lvlUp");
    };

    getBoard() {
        return this.gameBoard;
    };

    getRandomPosition() {
        return {
            x: Math.floor(Math.random() * this.width) + 1,
            y: Math.floor(Math.random() * this.height) + 1
        }
    };

    outsideGrid(pos){
        return (
            pos.x < 1 || pos.x > this.width ||
            pos.y < 1 || pos.y > this.height
        )
    };
}