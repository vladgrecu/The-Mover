class Player{
    constructor(){
        this.domElement = document.getElementById('player');
        this.top = 136;
        this.left = 16;
        this.hearth = document.querySelectorAll('span');
        this.life = 3;
        this.obstacles = document.getElementById('obstacles');
        this.obstacleLeft = 60;
        this.arrayOfObstacles = [];
        for (let i = 0; i < 8; i++){
            this.arrayOfObstacles.push(this.createObstacles(this.obstacleLeft));
        }
        this.listenToDirection();
        console.log(this.arrayOfObstacles);
    };
    tryAgain(){
        this.top = 136;
        this.left = 16;
        this.life = 3;
        this.hearth.forEach(life =>life.style.visibility = 'visible')
        this.domElement.style.top = this.top;
        this.domElement.style.left = this.left;
        alert('You Lose');
        document.getElementById('timerDisplay').innerText=`Time Left: 30sec`;
        document.getElementById('startGame').disabled = false;
    }
    timer = () => {
        let sec = 30;
        let timer = setInterval(()=>{
            document.getElementById('timerDisplay').innerText=`Time Left: ${sec}sec`;
            sec--;
            if (sec!==30){
                document.getElementById('startGame').disabled = true;
                document.getElementById('startGame').innerText = 'GO JOHNY GO!!!'
            }
            console.log('Timer is:',sec);
            if (sec < 0) {
                clearInterval(timer);
                this.tryAgain();
                document.getElementById('startGame').innerText = 'Try Again!!!'
            }
        }, 1000,this.tryAgain)
    }
    checkColision(){
        for(let i=0; i<this.arrayOfObstacles.length;i++){
            let obstacle = this.arrayOfObstacles[i];
            if((this.left >= obstacle.left - 15)                          //Verifica Coliziune Stanga
            &&(this.left <= obstacle.left+15)                            //Verifica Coliziune Dreapta
            &&((obstacle.top === 0 && this.top <= obstacle.height)      //Verifica daca este coliziune cu obstacol care porneste de sus SAU
            ||(obstacle.top !== 0 && this.top+15 >= obstacle.top))) {   //cu obstacol care porneste de jos
                this.life--;
                console.log(`Colission with obstacle #${i+1}`);
                this.hearth[this.life].style.visibility = 'hidden';
                if (this.life === 0){
                    setTimeout(() => {
                        this.tryAgain();
                    }, 0);       
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
        obstacle.style.height = Math.floor(Math.random()*230)+50;
        let topOrBottom=[0, 300 - parseInt(obstacle.style.height)];
        obstacle.style.top = topOrBottom[Math.floor(Math.random()*2)];
        this.obstacles.appendChild(obstacle);
        
        let obstacleObject = {};
        obstacleObject.height = parseInt(obstacle.style.height);
        obstacleObject.top = parseInt(obstacle.style.top);
        obstacleObject.left = parseInt(obstacle.style.left);
        
        this.obstacleLeft = left+33+Math.floor(Math.random()*50);
        return obstacleObject
    }
    listenToDirection(){
        document.addEventListener('keydown', this.movePlayer);
        document.getElementById('startGame').addEventListener('click', this.timer);
    }
    movePlayer = (event) =>{
        if (event.key === "ArrowUp"){
            this.top -=2;
            this.domElement.style.top =this.top;
            if(this.checkColision()){
                this.top+=2;
                this.domElement.style.top=this.top;
            };
            if(this.top <= 2){
                this.top = 2;
            };
        }
        if (event.key === "ArrowDown"){
            this.top +=2;
            this.domElement.style.top =this.top;
            if(this.checkColision()){
                this.top-=2;
                this.domElement.style.top=this.top;
            };
            if(this.top >= 282){
                this.top = 282;
            };
        }
        if (event.key === "ArrowLeft"){
            this.left -=2;
            this.domElement.style.left =this.left;
            if(this.checkColision()){
                this.left+=2;
                this.domElement.style.left=this.left;
            };
            if(this.left <= 2){
                this.left = 2;
            }
        }
        if (event.key === "ArrowRight"){
            this.left +=2;
            this.domElement.style.left =this.left;
            if(this.checkColision()){
                this.left-=2;
                this.domElement.style.left=this.left;
            };
            if(this.left >= 586){
                alert('You Win!!!');
                location.reload();
            }
        }
    }
}


new Player();
