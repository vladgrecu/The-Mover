class TheMover{
    constructor(totalTime,lifes){
        this.domElement = document.getElementById('player');
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('countdown-number');
        this.life = lifes;
        this.lifesRemaining = lifes;
        this.hearth = Array.from(document.getElementsByClassName('life'));
        this.playerLeftBorder = 16;
        this.playerRightBorder = this.playerLeftBorder+15;
        this.playerTopBorder = 136;
        this.playerBottomBorder = this.playerTopBorder+15;
        this.obstacles = document.getElementById('obstacles');
        this.firstObstacle = 120;
        this.obstaclesFromTop =[];
        this.obstaclesFromBottom = [];
        this.difficulty = 1;
        for (let i = 0; i < this.difficulty; i++){
            this.createObstacles(this.firstObstacle);
        }
        this.arrayOfObstacles =Array.from(document.getElementsByClassName('obstacle'));
        this.level = 1;
    }
    startGame(){
        this.timeRemaining = this.totalTime;
        this.timer.innerText = this.timeRemaining;
        setTimeout(() => {
            // this.audioController.startMusic();
            this.countdown = this.startCountdown();
            if(this.level>8 && this.level<=16){
                this.obstacleMovement = this.gameModeVertical()
            }
            if(this.level>16){
                this.obstacleMovement = this.gameModeHorizontal()
            }
            document.addEventListener('keydown', this.movePlayer);
        }, 500);
    }
    startCountdown(){
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0){
                this.gameOver();
            }
        }, 1000);
    }
    gameOver(){
        clearInterval(this.countdown);
        clearInterval(this.obstacleMovement);
        document.removeEventListener('keydown',this.movePlayer);
        // this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
        document.getElementById('game-over-level').innerText = `Level ${this.level}`;
        this.resetPlayerPosition();
    }
    victory(){
        clearInterval(this.countdown);
        clearInterval(this.obstacleMovement);
        // this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
        document.removeEventListener('keydown',this.movePlayer);
        document.getElementById('victory-level').innerText = `Level ${this.level} COMPLETE`;
        this.resetPlayerPosition();
        this.resetObstaclePosition();
        this.level++;
        console.log(this.level);
    }
    createObstacles(previousObstacle){
        let obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.left=previousObstacle;
        obstacle.style.height = Math.floor(Math.random()*200)+50;
        let topOrBottom=[0, 300 - parseInt(obstacle.style.height)];
        obstacle.style.top = topOrBottom[Math.floor(Math.random()*2)];
        this.obstacles.appendChild(obstacle);
        
        if(parseInt(obstacle.style.top)<=0){
            this.obstaclesFromTop.push(obstacle);
        }
        if(parseInt(obstacle.style.top)+parseInt(obstacle.style.height)>=300){
            this.obstaclesFromBottom.push(obstacle);
        }
        this.firstObstacle = previousObstacle+Math.floor(Math.random()*20)+50;
        return obstacle
    }
    moveObstaclesHorizontal = ()=>{
        this.checkColision();
        this.arrayOfObstacles.forEach(obstacle =>{
            obstacle.style.left=parseInt(obstacle.style.left)-1;
            if(parseInt(obstacle.style.left)===0){
                obstacle.remove();
                this.arrayOfObstacles.push(this.createObstacles(580))
            }
        })
    }
    moveObstaclesVertically = (topObstacles,bottomoObstacles) =>{
        this.checkColision();
        bottomoObstacles.forEach((obstacle,i) =>{
            obstacle.style.top=parseInt(obstacle.style.top)-1;
            if (parseInt(obstacle.style.top)===0){
                bottomoObstacles.splice(i,1);
                topObstacles.splice(i,0,obstacle)
            }
        }) 
        topObstacles.forEach((obstacle,i) => {
            obstacle.style.top=parseInt(obstacle.style.top)+1;
            if (parseInt(obstacle.style.top)+parseInt(obstacle.style.height)===300){
                topObstacles.splice(i,1);
                bottomoObstacles.splice(i,0,obstacle)
            }
        })
    }
    gameModeHorizontal = ()=>{
        return setInterval(() => {
            this.moveObstaclesHorizontal();
        }, 40);
    }
    gameModeVertical = ()=> {
        return setInterval(() => {
            this.moveObstaclesVertically(this.obstaclesFromTop,this.obstaclesFromBottom);
        }, 15);
        
    }
    resetPlayerPosition(){
        this.playerTopBorder = 136;
        this.playerBottomBorder = this.playerTopBorder+15;
        this.playerLeftBorder = 16;
        this.playerRightBorder = this.playerLeftBorder+15;
        this.domElement.style.top = this.playerTopBorder;
        this.domElement.style.left = this.playerLeftBorder;
        this.life = 3;
        this.hearth.forEach(life =>life.style.visibility = 'visible')
        document.getElementById('startGame').disabled = false;
    }
    resetObstaclePosition(){
        this.difficulty++
        this.arrayOfObstacles.forEach(obstacle => obstacle.remove());
        this.firstObstacle = 120;
        this.obstaclesFromTop =[];
        this.obstaclesFromBottom = [];
        for (let i = 0; i < this.difficulty; i++){
            this.createObstacles(this.firstObstacle);
        }
        if(this.difficulty % 8 ===0){
            this.difficulty = 0;
        }
        this.arrayOfObstacles =Array.from(document.getElementsByClassName('obstacle'));
    }
    checkColision(){
        for(let i=0; i<this.arrayOfObstacles.length;i++){
            let obstacle = this.arrayOfObstacles[i];
            obstacle.left = parseInt(obstacle.style.left);
            obstacle.right =parseInt(obstacle.style.left)+15;
            obstacle.top = parseInt(obstacle.style.top);
            obstacle.bottom = 300-parseInt(obstacle.style.height)-parseInt(obstacle.style.top);
            obstacle.height = parseInt(obstacle.style.height);
            if(
            (this.playerLeftBorder <= obstacle.right)&&
            (this.playerRightBorder >= obstacle.left)&&
            ((obstacle.top === 300-obstacle.height && this.playerBottomBorder >= obstacle.top)||
            (this.playerBottomBorder >= obstacle.top && obstacle.top+obstacle.height>=this.playerTopBorder))
            ) {   
                this.life--;
                console.log(`Colission with obstacle #${i+1}`);
                this.hearth[this.life].style.visibility = 'hidden';
                if (this.life === 0){
                    setTimeout(() => {
                        this.resetPlayerPosition();
                    }, 20);       
                }
                return true
            }     
            }
            return false
        }
        movePlayer = (event) =>{
            if (event.key === "ArrowUp"){
                this.playerTopBorder-=4;
                this.playerBottomBorder-=4;
                if(this.checkColision()){
                    this.playerTopBorder+=4;
                    this.playerBottomBorder+=4;
                };
                if(this.playerTopBorder <= 2){
                    this.playerTopBorder = 2;
                };
            }
            if (event.key === "ArrowDown"){
                this.playerTopBorder+=4;
                this.playerBottomBorder+=4;
                if(this.checkColision()){
                    this.playerTopBorder-=4;
                    this.playerBottomBorder-=4;
                };
                if(this.playerTopBorder >= 282){
                    this.playerTopBorder = 282;
                };
            }
            if (event.key === "ArrowLeft"){
                this.playerLeftBorder-=4;
                this.playerRightBorder-=4;
                if(this.checkColision()){
                    this.playerLeftBorder+=4;
                    this.playerRightBorder+=4;
                };
                if(this.playerLeftBorder <= 2){
                    this.playerLeftBorder = 2;
                }
            }
            if (event.key === "ArrowRight"){
                this.playerLeftBorder+=4;
                this.playerRightBorder+=4;
                if(this.checkColision()){
                    this.playerLeftBorder-=4;
                    this.playerRightBorder-=4;
                };
            }
            this.domElement.style.top=this.playerTopBorder;
            this.domElement.style.left=this.playerLeftBorder;
            
            if(this.playerLeftBorder >= 586){
            this.victory();
        }
    }
}
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let game = new TheMover(45, 3);
    
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    document.addEventListener('keyup', (event) => {
        console.log(event.key)
        if(event.key ==='Enter'){
            overlays.forEach(overlay => {
                overlay.classList.remove('visible');
            })
            game.startGame();
        }
    });
}
