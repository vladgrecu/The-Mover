class Player{
    constructor(){
        this.domElement = document.getElementById('player');
        this.playerLeftBorder = 16;
        this.playerRightBorder = this.playerLeftBorder+15;
        this.playerTopBorder = 136;
        this.playerBottomBorder = this.playerTopBorder+15;
        this.hearth = document.querySelectorAll('span');
        this.life = 3;
        this.obstacles = document.getElementById('obstacles');
        this.obstacleLeft = 60;
        this.arrayOfObstacles = [];
        this.obstaclesFromTop =[];
        this.obstaclesFromBottom = [];
        for (let i = 0; i < 8; i++){
            this.arrayOfObstacles.push(this.createObstacles(this.obstacleLeft));
        }
        this.listenToDirection();
        console.log(this.arrayOfObstacles);
    };
    moveObstacles = (topObstacles,bottomoObstacles) =>{
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
    tryAgain(){
        alert('You Lose');
        this.playerTopBorder = 136;
        this.playerBottomBorder = this.playerTopBorder+15;
        this.playerLeftBorder = 16;
        this.playerRightBorder = this.playerLeftBorder+15;
        this.domElement.style.top = this.playerTopBorder;
        this.domElement.style.left = this.playerLeftBorder;
        this.life = 3;
        this.hearth.forEach(life =>life.style.visibility = 'visible')
        document.getElementById('startGame').disabled = false;
        // document.getElementById('startGame').style.height = 300;
        // document.getElementById('startGame').style.width = 600;
    }
    timer = () => {
        document.addEventListener('keydown', this.movePlayer);
        let sec = 30;
        let countdownNumberEl = document.getElementById('countdown-number');
        countdownNumberEl.textContent = sec;
        let obstacleLet = 15000;
        let obstacleTimer = setInterval(() => {
            obstacleLet-=10;
            this.moveObstacles(this.obstaclesFromTop,this.obstaclesFromBottom);
            if (obstacleLet<0){
                clearInterval(obstacleTimer);
            }
        }, 20);
        let timer = setInterval(()=>{
            --sec;
            countdownNumberEl.textContent = sec;
            if (sec!==30){
                document.getElementById('startGame').disabled = true;
                document.getElementById('startGame').innerText = 'GO JOHNY GO!!!'
            }
            console.log('Timer is:',sec);
            if (sec < 0) {
                countdownNumberEl.textContent = 0;
                clearInterval(timer);
                this.tryAgain();
                document.getElementById('startGame').innerText = 'Try Again!!!'
            }
        }, 1000,this.tryAgain);
        console.log(sec);
    }
    checkColision(){
        for(let i=0; i<this.arrayOfObstacles.length;i++){
            let obstacle = this.arrayOfObstacles[i];
            obstacle.left = parseInt(obstacle.style.left);
            obstacle.right =parseInt(obstacle.style.left)+15;
            obstacle.top = parseInt(obstacle.style.top);
            obstacle.bottom = 300-parseInt(obstacle.style.height)-parseInt(obstacle.style.top);
            obstacle.height = parseInt(obstacle.style.height);
            if((this.playerLeftBorder <= obstacle.right)                          
            &&(this.playerRightBorder >= obstacle.left)                            
            &&(     
            (obstacle.top === 300-obstacle.height && this.playerBottomBorder >= obstacle.top)
            ||(this.playerBottomBorder >= obstacle.top && obstacle.top+obstacle.height>=this.playerTopBorder))) {   
                this.life--;
                console.log(`Colission with obstacle #${i+1}`);
                this.hearth[this.life].style.visibility = 'hidden';
                if (this.life === 0){
                    setTimeout(() => {
                        this.tryAgain();
                    }, 20);       
                }
                return true
            }     
        }
        return false
    }
    createObstacles(left){
        let obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.left=left;
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
        this.obstacleLeft = left+33+Math.floor(Math.random()*50);
        return obstacle
    }
    listenToDirection(){
        document.getElementById('startGame').addEventListener('click', this.timer);
    }
    activateGameFace(){

    }
    movePlayer = (event) =>{
        if (event.key === "ArrowUp"){
            this.playerTopBorder-=2;
            this.playerBottomBorder-=2;
            this.domElement.style.top =this.playerTopBorder;
            if(this.checkColision()){
                this.playerTopBorder+=2;
                this.playerBottomBorder+=2;
                this.domElement.style.top=this.playerTopBorder;
            };
            if(this.playerTopBorder <= 2){
                this.playerTopBorder = 2;
            };
        }
        if (event.key === "ArrowDown"){
            this.playerTopBorder+=2;
            this.playerBottomBorder+=2;
            this.domElement.style.top =this.playerTopBorder;
            if(this.checkColision()){
                this.playerTopBorder-=2;
                this.playerBottomBorder-=2;
                this.domElement.style.top=this.playerTopBorder;
            };
            if(this.playerTopBorder >= 282){
                this.playerTopBorder = 282;
            };
        }
        if (event.key === "ArrowLeft"){
            this.playerLeftBorder-=2;
            this.playerRightBorder-=2;
            this.domElement.style.left =this.playerLeftBorder;
            if(this.checkColision()){
                this.playerLeftBorder+=2;
                this.playerRightBorder+=2;
                this.domElement.style.left=this.playerLeftBorder;
            };
            if(this.playerLeftBorder <= 2){
                this.playerLeftBorder = 2;
            }
        }
        if (event.key === "ArrowRight"){
            this.playerLeftBorder+=2;
            this.playerRightBorder+=2;
            this.domElement.style.left =this.playerLeftBorder;
            if(this.checkColision()){
                this.playerLeftBorder-=2;
                this.playerRightBorder-=2;
                this.domElement.style.left=this.playerLeftBorder;
            };
        }
        if(this.playerLeftBorder >= 586){
            alert('You Win!!!');
            location.reload();
        }
        this.domElement.style.backgroundImage ='url(playermoving.png)'
    }
}
new Player();
