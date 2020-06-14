const startButton = document.getElementById('start-button')
const ball = document.getElementById('ball')
const MIN_SIZE = 50
const MAX_SIZE = 150
const MIN_X = 50
const MIN_Y = 50
const MAX_X = 1700
const MAX_Y = 750
const MAX_SCORE = 10

class Game{
    constructor(){
        this.init()
        setTimeout(this.showBall, 1500);
    }

    init(){
        this.toggleStartButton()
        this.time = 1500
        this.score = 0
        this.ballNumber = 0
        this.showBall = this.showBall.bind(this)
        this.chooseNextBallByTime = this.chooseNextBallByTime.bind(this)
        this.chooseNextBallByClick = this.chooseNextBallByClick.bind(this)
        this.init = this.init.bind(this)
    }

    toggleStartButton(){
        const status = startButton.classList.contains('hide')
        if (status){
            startButton.classList.remove('hide')
        }
        else{
            startButton.classList.add('hide')
        }
    }

    showBall(){
        ball.classList.remove('hide')
        this.addClickEvent()
        this.noScore = setTimeout(this.chooseNextBallByTime, this.time)
    }

    gameOver(){
        swal("Your score is", this.score.toString()+"/"+MAX_SCORE.toString()).then(() => {
            this.deleteClickEvent()
            ball.classList.add('hide')
            this.init()
        })
    }

    chooseNextBallByTime(){
        console.log("ballNumber="+this.ballNumber)
        console.log("score="+this.score)
        console.log("time="+this.time)
        this.ballNumber++
        if(this.ballNumber == MAX_SCORE){
            this.gameOver()
        }
        else{
            this.choosePositionBall()
            this.chooseColorBall()
            this.chooseSizeBall()
            this.noScore = setTimeout(this.chooseNextBallByTime, this.time)
        }
    }

    addClickEvent(){
        ball.addEventListener("click", this.chooseNextBallByClick)
    }

    deleteClickEvent() {
        ball.removeEventListener("click", this.chooseNextBallByClick)
    }
    
    chooseNextBallByClick(){
        console.log("ballNumber="+this.ballNumber)
        console.log("score="+this.score)
        console.log("time="+this.time)
        clearTimeout(this.noScore)
        this.ballNumber++
        this.score++
        this.time-=100
        if(this.ballNumber == MAX_SCORE){
            this.gameOver()
        }
        else{
            this.choosePositionBall()
            this.chooseColorBall()
            this.chooseSizeBall()
            this.noScore = setTimeout(this.chooseNextBallByTime, this.time)
        }
    }

    choosePositionBall(){
        ball.style.top = this.getPositionY()
        ball.style.left = this.getPositionX()
    }

    chooseColorBall(){
        ball.style.background = this.getColorBall()
    }

    chooseSizeBall(){
        const sizeBall = this.getSizeBall()
        ball.style.height = sizeBall
        ball.style.width = sizeBall
    }

    getPositionX(){
        const positionY = Math.floor(Math.random() * (MAX_X - MIN_X + 1)) + MIN_X
        return positionY.toString() + "px"
    }

    getPositionY(){
        const positionX = Math.floor(Math.random() * (MAX_Y - MIN_Y + 1)) + MIN_Y
        return positionX.toString() + "px"
    }

    getColorBall(){
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return "#"+randomColor.toString()
    }

    getSizeBall(){
        const sizeBall = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE + 1)) + MIN_SIZE
        return sizeBall.toString() + "px"
    }
    
}

function beginGame() {
    window.game = new Game()
}