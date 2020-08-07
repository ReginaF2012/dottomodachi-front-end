class Dottomodachi {
    static all = []
    constructor({name, id, hunger_meter, happiness_meter, weight_meter, evo_type, stage, total_points, evolution_countdown}){
        this.name = name
        this.id = id
        this.hungerMeter = hunger_meter
        this.happinessMeter = happiness_meter
        this.weightMeter = weight_meter
        this.evoType = evo_type
        this.stage = stage
        this.totalPoints = total_points
        this.evolutionCountdown = evolution_countdown
        this.gif = `./public/animations/stage-${this.stage}-${this.evoType}.gif`

        Dottomodachi.all.push(this)
    }

    //https://www.w3resource.com/javascript-exercises/javascript-math-exercise-37.php
    //this is for php but we will see if it works for JS too!
    valueLimit(val, min=0, max=100) {
        return val < min ? min : (val > max ? max : val)
      }
      

    renderProgressBarsInnerHTML(){
        let weightLabel = "Healthy"
        if(this.weightMeter >= 75){
            weightLabel = "Overweight"
        }else if(this.weightMeter <= 25){
            weightLabel = "Underweight"
        }else{
            weightLabel = "Normal Weight"
        }
        return `
        <h1>Name: <strong>${this.name}</strong></h1>
        <label for="hunger">Hunger</label>
        <progress id="${this.id}-hunger" class="progress is-small is-success" value="${this.hungerMeter}" max="100">${this.hungerMeter}%</progress>
        <label for="happiness">Happiness</label>
        <progress id="${this.id}-happiness" class="progress is-small is-success" value="${this.happinessMeter}" max="100">${this.happinessMeter}%</progress>
        <label for="weight">${weightLabel}</label>
        <progress id="${this.id}-weight" class="progress is-small is-success" value="${this.weightMeter}" max="100">${this.weightMeter}%</progress>
        `
    }

    renderDottomodachi(){
        let mainSection = document.getElementById('main')
        let dottomodachiContainer = document.getElementById('dottomodachi-container')
        //create area for individual dottomodachi
        let dottomodachiDiv = document.createElement('div')
        dottomodachiDiv.className =  "dottomodachi-div"
        dottomodachiDiv.dataset.id = `${this.id}`
        //create element for spite img
        let sprite = document.createElement('img')
        sprite.src = `${this.gif}`
        
        //add the sprite to the div
        dottomodachiDiv.appendChild(sprite)
        
        
        //create container for progress bars
        let progressBarsContainer = document.createElement('div')
        progressBarsContainer.className = "progress-bars has-text-centered"
        progressBarsContainer.id = `${this.id}-progress-bars`
        this.progressBarsContainer = progressBarsContainer
        progressBarsContainer.innerHTML = this.renderProgressBarsInnerHTML()


        let buttonsArea = document.createElement('div')
        buttonsArea.className = "buttons-area"
        let mealButton = document.createElement('button')
        this.mealButton = mealButton
        mealButton.className = "button is-small is-info is-rounded"
        mealButton.innerText = "Meal"
        buttonsArea.appendChild(mealButton)
        mealButton.addEventListener('click', (e) => this.meal())

        let playButton = document.createElement('button')
        this.playButton = playButton
        playButton.className = "button is-small is-info is-rounded"
        playButton.innerText = "Play"
        buttonsArea.appendChild(playButton)
        playButton.addEventListener('click', (e) => this.play())

        let snackButton = document.createElement('button')
        this.snackButton = snackButton
        snackButton.className = "button is-small is-info is-rounded"
        snackButton.innerText = "Snack"
        buttonsArea.appendChild(snackButton)
        snackButton.addEventListener('click', (e) => this.snack())

        // add progressbars and buttons
        dottomodachiDiv.append(progressBarsContainer, buttonsArea)
        //add individual dottomodachi div to main div
        dottomodachiContainer.appendChild(dottomodachiDiv)
        mainSection.appendChild(dottomodachiContainer)
        this.startGame()

    }

    startGame(){
        this.timer = window.setInterval( () => this.meterHandler(), 1000)
    }

    meterHandler(){

        this.mealButton.disabled = false
        this.snackButton.disabled = false
        this.playButton.disabled = false

        if (this.hungerMeter > 99){
            this.snackButton.disabled = true
            this.mealButton.disabled = true
        }

        if (this.happinessMeter > 99){
            this.playButton.disabled = true
        }

        if (this.weightMeter > 99){
            this.snackButton.disabled = true
            this.mealButton.disabled = true
        }

        this.hungerMeter = this.valueLimit(this.hungerMeter - 1)
        this.happinessMeter = this.valueLimit(this.happinessMeter -1 )
        this.progressBarsContainer.innerHTML = this.renderProgressBarsInnerHTML()
    }

    meal(e){
        this.weightMeter = this.valueLimit(this.weightMeter + 1)
        this.hungerMeter = this.valueLimit(this.hungerMeter + 5)
        this.progressBarsContainer.innerHTML = this.renderProgressBarsInnerHTML()
    }

    play(e){
        this.happinessMeter = this.valueLimit(this.happinessMeter + 5)
        this.weightMeter = this.valueLimit(this.weightMeter - 3)
        this.progressBarsContainer.innerHTML = this.renderProgressBarsInnerHTML()
    }

    snack(e){
        this.hungerMeter = this.valueLimit(this.hungerMeter + 1)
        this.happinessMeter = this.valueLimit(this.happinessMeter + 5)
        this.weightMeter = this.valueLimit(this.weightMeter + 5)
        this.progressBarsContainer.innerHTML = this.renderProgressBarsInnerHTML()
    }
}