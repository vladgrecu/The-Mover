class Player{
    constructor(){
        this.domElement = document.getElementById('player');
        this.obstacles = document.getElementById('obstacles');
        this.hearth = document.querySelectorAll('span');
        console.log(this.hearth);
        this.top = 136;
        this.left = 16;
        this.life = 3;
        this.obstacleLeft = 40;
        this.listenToDirection();
        this.arrayOfObstacles = [];
        for (let i = 0; i < 8; i++){
            this.arrayOfObstacles.push(this.createObstacles(this.obstacleLeft,i));
        }
        console.log(this.arrayOfObstacles);
    };
    checkColision(){
        for(let i=0; i<this.arrayOfObstacles.length;i++){
            let obstacle = this.arrayOfObstacles[i];
            if(obstacle.top === 0){
                //VERIFICA OBSTACOLELE CARE PORNESC DE SUS
                if((this.left >= obstacle.left - 15)&&(this.left <= obstacle.left+15)&&(this.top <= obstacle.height)){
                    console.log(`Colission with obstacle #${i+1}`);
                    console.log(obstacle);
                    if (this.life===0){
                        alert('You Lose');
                        this.top = 136;
                        this.left = 16;
                        this.domElement.style.top = this.top;
                        this.domElement.style.left = this.left;
                        this.life = 3;
                        for(let i = 0; i<=3; i++){
                            this.hearth[i].style.visibility = 'visible';
                        }
                    }
                    console.log('Vieti: ',this.life-1);
                    return true
                } 
            } else {
                //VERIFICA OBSTACOLELE CARE PORNESC DE JOS
                if((this.left >= obstacle.left - 15)&&(this.left <= obstacle.left+15)&&(this.top+15 >= obstacle.top)){
                    console.log(`Colission with obstacle #${i+1}`);
                    console.log(obstacle);
                    if (this.life===0){
                        alert('You Lose');
                        this.top = 136;
                        this.left = 16;
                        this.domElement.style.top = this.top;
                        this.domElement.style.left = this.left;
                        this.life = 3;
                        for(let i = 0; i<=3; i++){
                            this.hearth[i].style.visibility = 'visible';
                        }
                    }
                    console.log('Vieti: ',this.life-1);
                    return true
            }}
        }
        return false
    }
    createObstacles(left,i){
        let obstacle = document.createElement('div');
        let obstacleObject = {};
        obstacle.classList.add('obstacle');
        obstacle.id = 'o' + i;
        obstacle.style.height = Math.floor(Math.random()*235)+50;
        let topOrBottom=[0, 300 - parseInt(obstacle.style.height)];
        obstacle.style.top = topOrBottom[Math.floor(Math.random()*2)];
        obstacle.style.left=left;
        this.obstacleLeft = left+33+Math.floor(Math.random()*50);
        this.obstacles.appendChild(obstacle);
        obstacleObject.height = parseInt(obstacle.style.height);
        obstacleObject.top = parseInt(obstacle.style.top);
        obstacleObject.left = parseInt(obstacle.style.left);
        return obstacleObject
        }
        
    listenToDirection(){
        document.addEventListener('keydown', this.movePlayer);
    }
    movePlayer = (event) =>{
        if (event.key === "ArrowUp"){
            this.top -=2;
            if(this.checkColision()){
                this.life--;
                this.top+=2;
                this.domElement.style.top=this.top;
                this.hearth[this.life].style.visibility = 'hidden';
            };
            console.log('PlayerTop = ', this.top);
            console.log('PlayerLeft =', this.left);
            if(this.top <= 2){
                this.top = 0;
            }
            this.domElement.style.top =this.top;
        }
        if (event.key === "ArrowDown"){
            this.top +=2;
            if(this.checkColision()){
                this.life--;
                this.top-=2;
                this.domElement.style.top=this.top;
                this.hearth[this.life].style.visibility = 'hidden';
            };
            console.log('PlayerTop = ', this.top);
            console.log('PlayerLeft =', this.left);
            if(this.top >= 284){
                this.top = 286;
            }
            this.domElement.style.top =this.top;
        }
        if (event.key === "ArrowLeft"){
            this.left -=2;
            if(this.checkColision()){
                this.life--;
                this.left+=2;
                this.domElement.style.left=this.left;
                this.hearth[this.life].style.visibility = 'hidden';
            };
            console.log('PlayerTop = ', this.top);
            console.log('PlayerLeft =', this.left);
            if(this.left <= 2){
                this.left = 0;
            }
            this.domElement.style.left =this.left;
        }
        if (event.key === "ArrowRight"){
            this.left +=2;
            if(this.checkColision()){
                this.life--;
                this.left-=2;
                this.domElement.style.left=this.left;
                this.hearth[this.life].style.visibility = 'hidden';
            };
            console.log('PlayerTop = ', this.top);
            console.log('PlayerLeft =', this.left);
            if(this.left >= 586){
                alert('You Win!!!');
                location.reload();
            }
            this.domElement.style.left =this.left;
        }
    }
}


new Player();
