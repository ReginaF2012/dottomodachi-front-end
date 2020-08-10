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
    //use this to prevent values from going above or below 100
    valueLimit(val, min=0, max=100) {
        return val < min ? min : (val > max ? max : val)
      }

    setGif(){
        return this.gif = `./public/animations/stage-${this.stage}-${this.evoType}.gif`
    }

      //the values in the progress bars are going to change every second, so I thought it would be
      //easy to save the innerHTML to a function to call on
    renderProgressBarsInnerHTML(){
        
        //this is just to change the label of the weight meter, so hopefully people understand
        // that they want it in the middle, not at either extreme
        let weightLabel = ""
        if(this.weightMeter >= 75){
            weightLabel = "Overweight"
        }else if(this.weightMeter <= 25){
            weightLabel = "Underweight"
        }else{
            weightLabel = "Normal Weight"
        }
  
        return `
        <h1><strong>${this.name}</strong></h1>
        <label for="hunger">Hunger</label>
        <progress id="${this.id}-hunger" class="progress is-small is-success" value="${this.hungerMeter}" max="100">${this.hungerMeter}%</progress>
        <label for="happiness">Happiness</label>
        <progress id="${this.id}-happiness" class="progress is-small is-success" value="${this.happinessMeter}" max="100">${this.happinessMeter}%</progress>
        <label for="weight">${weightLabel}</label>
        <progress id="${this.id}-weight" class="progress is-small is-success" value="${this.weightMeter}" max="100">${this.weightMeter}%</progress>
        `
    }



    renderDottomodachi(){
        //grab the main div that holds all dottomodachiDivs 
        let dottomodachiContainer = document.getElementById('dottomodachi-container')

        //create area for individual dottomodachi
        let dottomodachiDiv = document.createElement('div')
        this.div = dottomodachiDiv
        dottomodachiDiv.className =  "dottomodachi-div"
        dottomodachiDiv.dataset.id = `${this.id}`

        //create element for spite img
        let sprite = document.createElement('img')
        this.sprite = sprite
        sprite.src = this.setGif()
        
        //add the sprite to the div
        dottomodachiDiv.appendChild(sprite)
        
        
        //create container for progress bars
        let progressBarsContainer = document.createElement('div')
        progressBarsContainer.className = "progress-bars has-text-centered"
        progressBarsContainer.id = `${this.id}-progress-bars`

        //I will need to update this frequently so I'm saving it to the instance of the dottomodachi
        this.progressBarsContainer = progressBarsContainer
        progressBarsContainer.innerHTML = this.renderProgressBarsInnerHTML()

        //create div to hold all of the buttons
        let buttonsArea = document.createElement('div')
        buttonsArea.className = "buttons-area"

        //create each button and eventListener
        let mealButton = document.createElement('button')
        this.mealButton = mealButton
        mealButton.className = "button is-small is-info is-rounded"
        mealButton.innerText = "Meal"
        buttonsArea.appendChild(mealButton)

        mealButton.addEventListener('click', this.meal.bind(this))

        let playButton = document.createElement('button')
        this.playButton = playButton
        playButton.className = "button is-small is-info is-rounded"
        playButton.innerText = "Play"
        buttonsArea.appendChild(playButton)
        playButton.addEventListener('click', this.play.bind(this))

        let snackButton = document.createElement('button')
        this.snackButton = snackButton
        snackButton.className = "button is-small is-info is-rounded"
        snackButton.innerText = "Snack"
        buttonsArea.appendChild(snackButton)
        snackButton.addEventListener('click', this.snack.bind(this))

        // add progressbars and buttons
        dottomodachiDiv.append(progressBarsContainer, buttonsArea)

        //add individual dottomodachi div to main div
        dottomodachiContainer.appendChild(dottomodachiDiv)

        this.startGame()

    }

    startGame(){
        this.timer = window.setInterval(this.gameHandler.bind(this), 1000)
    }

    gameHandler(){
        
        //tally the points
        this.handlePoints()

        // if the points are below -100 have the dottomodachi run away
        if (this.totalPoints < -100){
            this.removeDiv()
            showDangerAlert(`${this.name} ran away!!!`)
        }

        //decrease the evolutionCountdown
        this.evolutionCountdown = this.valueLimit(this.evolutionCountdown - 1)

        //if it's at 0 evolve and update sprite
        if (this.evolutionCountdown <= 0){
            
            //there's only 3 stages so after that retire the dottomodachi
            if (this.stage > 2){
                this.retireDottomodachi()
            } else {

                this.evolve()
                //reset the points after evolution
                this.totalPoints = 0 
                //update the gif
                this.sprite.src = this.setGif()
            }
        }

        //decrease the hunger and happiness meters, but not below 0
        this.hungerMeter = this.valueLimit(this.hungerMeter - 1)
        this.happinessMeter = this.valueLimit(this.happinessMeter -1 )
        //update the progress bars
        this.progressBarsContainer.innerHTML = this.renderProgressBarsInnerHTML()  
        //make a patch request
        dottomodachiAdapter.updateDottomodachi(this.makeDottomodachiObj(), this.id)
    }

    evolve(){
        //increase stage
        this.stage += 1
        //reset evolutionCountdown
        this.evolutionCountdown = 60

        //determine which evolution path to take
        switch(this.evoType){
            case('neutral'):
            this.neutralEvolve()
            break;
            case('good'):
            this.goodEvolve()
            break;
            case('bad'):
            this.badEvolve()
            break;
        }

        //notify the user that the dottomodachi has evolved
        showSuccessAlert(`${this.name} has evolved!`)
    }



    retireDottomodachi(){
        // there is no evolutions after stage 3
        this.stage = 4
        // remove it from the page
        this.removeDiv()

        //determine which goodbye letter it leaves
        let text = this.goodbyeLetterText()
        
        //display the goodbye letter
        createNote(text)

    }

    removeDiv(){
        //remove it's div
        this.div.remove()

        //stop the game timer from ticking
        clearInterval(this.timer)

        // setting up app to be able to have more than 1 dottomodachi at a time
        // if the last dottomodachi is removed render the adoption form again
        // currently there is only ever 1 dottomodachi at a time
        for (let i = 0; i < Dottomodachi.all.length; i++){
            if (Dottomodachi.all[i] === this){
                Dottomodachi.all.splice(i, 1)
            }
        }
        if (Dottomodachi.all.length === 0){
            renderAdoptionForm()
        }
        

    }

    goodbyeLetterText(){

        //depending on the evolution type depends on the letter it leaves
        switch(this.evoType){
            case('neutral'):
            return `Dear ${currentUser.username},</br></br>
            Thank you for taking care of me. I've left to start a life of my own. Times were not always the best but you did what you could. Please consider adopting again.</br></br>

            Sincerely, ${this.name}
            `
            break;
            case('good'):
            return `Dear ${currentUser.username},</br></br>

            I've moved out to start a life of my own. You've done such a wonderful job taking care of me, won't you please consider adopting again?</br></br>

            Love, ${this.name}
            `
            break;
            case('bad'):
            return `${currentUser.username},</br></br>

            I've moved out, I couldn't stand your neglect any longer. Hopefully you do better next time.</br></br>

            -${this.name}
            `
            break;
        }
    }

    //if it's neutral I want it to be able to evolve into any of the 3 evoTypes
    neutralEvolve() {
        if (this.totalPoints >= 130){
            this.evoType = "good"
        } else if (this.totalPoints >= 50 ){
            this.evoType = "neutral"
        } else {
            this.evoType = "bad"
        }
    }

    //if it's good I only want it to be able to evolve to good or neutral
    goodEvolve() {
        if (this.totalPoints >= 130){
            this.evoType = "good"
        } else {
            this.evoType = "neutral"
        }
    }

    //if it's bad I only want it to be able to evolve into neutral or bad
    badEvolve() {
        if (this.totalPoints >= 130){
            this.evoType = "neutral"
        } else {
            this.evoType = "bad"
        }
    }

    //When I send a patch request, I need to make an object with everything in snake_case for my rails back-end
    makeDottomodachiObj() {
        return {dottomodachi: {
                id: this.id,
                name: this.name,
                hunger_meter: this.hungerMeter,
                happiness_meter: this.happinessMeter,
                weight_meter: this.weightMeter,
                total_points: this.totalPoints,
                stage: this.stage,
                evo_type: this.evoType,
                evolution_countdown: this.evolutionCountdown  
            }
        }
    }

    handlePoints(){
        this.tallyHappinessOrHungerPoints(this.hungerMeter)
        this.tallyHappinessOrHungerPoints(this.happinessMeter)
        this.tallyWeightPoints()
    }

    tallyHappinessOrHungerPoints(status){
        if (status < 25){
            this.totalPoints -= 5
        } else if (status < 50){
            this.totalPoints -= 3
        } else if (status < 75){
            this.totalPoints -= 3
        } else {
            this.totalPoints += 5
        }
    }

    tallyWeightPoints(){
        if (this.weightMeter > 75 || this.weightMeter < 26){
            this.totalPoints -= 3
        } else {
            this.totalPoints += 3
        }
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