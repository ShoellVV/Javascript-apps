export class Snake {

    constructor(game, grid){
        this.game = game;
        this.grid = grid;

        this.reset();
        
        document.addEventListener('keydown', event => this.setVelocity(event));
    };

    reset() {
        this.setupSnakeBody();
    };

    setupSnakeBody() {
        this.snakeBody = [{
            x: 13,
            y:13
        }];
    

        this.velocityX = 0;
        this.velocityY = 0;

        this.newSegments = 0;
    };

    addSnakeBody() {
        for(let i = 0; i < this.newSegments; i++ ) {
            this.snakeBody.push ({ ...this.snakeBody[this.snakeBody.length - 1] })
        }
        
        this.newSegments = 0;
    };

    get snakeHead() {
        return this.snakeBody[0];
    };

    drawSnake() {
    const gameBoard = this.grid.getBoard();
    
        this.snakeBody.forEach(body => { 
            const snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = body.y;
            snakeElement.style.gridColumnStart = body.x;
            snakeElement.classList.add('snake');
            gameBoard.appendChild(snakeElement);
        })
    };

    setVelocity(event) {

        if(this.game.gameOver){
            if(event.code === "Space"){
                event.preventDefault();
                this.game.onRestart();
            }
        }
        
        const lastVelocityX = this.velocityX;
        const lastVelocityY = this.velocityY;

        switch (event.key){
            case "W":
            case "w":
            case "ArrowUp":
                event.preventDefault();
                if(lastVelocityY !== 0) break;
                    this.velocityY = -1;
                    this.velocityX = 0;
                    break;
            case "S":
            case "s":
            case "ArrowDown":
                event.preventDefault();
                if(lastVelocityY !== 0) break;
                    this.velocityY = 1;
                    this.velocityX = 0;
                    break;
            case "A":
            case "a":
            case "ArrowLeft":
                if(lastVelocityX !== 0) break;
                    this.velocityX = -1;
                    this.velocityY = 0;
                    break;
            case "D":
            case "d":
            case "ArrowRight":
                if(lastVelocityX !== 0) break;
                    this.velocityX = 1;
                    this.velocityY = 0;
                    break;
        }
    }

    snakeUpdate() {
        this.addSnakeBody();

        for(let i = this.snakeBody.length - 2; i >= 0; i--) {
            this.snakeBody[i + 1] = {...this.snakeBody[i]};
        };

        this.snakeHead.x += this.velocityX;
        this.snakeHead.y += this.velocityY;

    };

    equalPosition(pos1, pos2){
        return pos1.x === pos2.x && pos1.y === pos2.y;
    };

    onSnake(position, { ignoreHead = false } = {}) { 
 
        return this.snakeBody.some( (segment, index) => {

            if(ignoreHead && index === 0) return false
    
            return this.equalPosition(segment, position)
        } )
    };

    snakeIntersection() {
        return this.onSnake(this.snakeHead, {ignoreHead: true});
    }
}