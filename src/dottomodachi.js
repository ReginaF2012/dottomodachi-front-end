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
        progressBarsContainer.innerHTML = `
            <h1>Name: <strong>${this.name}</strong></h1>
            <label for="hunger">Hunger</label>
            <progress id="hunger" class="progress is-small is-success" value="${this.hungerMeter}" max="100">${this.hungerMeter}%</progress>
            <label for="happiness">Happiness</label>
            <progress id="happiness" class="progress is-small is-success" value="${this.happinessMeter}" max="100">${this.happinessMeter}%</progress>
            <label for="weight">Weight</label>
            <progress id="weight" class="progress is-small is-success" value="${this.weightMeter}" max="100">${this.weightMeter}%</progress>
            <button class="button is-small is-info is-rounded"">Meal</button>
            <button class="button is-small is-info is-rounded"">Play</button>
            <button class="button is-small is-info is-rounded"">Snack</button>
            `
        // add progressbars
        dottomodachiDiv.appendChild(progressBarsContainer)
        //add individual dottomodachi div to main div
        dottomodachiContainer.appendChild(dottomodachiDiv)
        mainSection.appendChild(dottomodachiContainer)

    }
}