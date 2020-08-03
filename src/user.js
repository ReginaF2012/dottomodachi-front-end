class User {
    constructor({username, id}){
        this.username = username
        this.userId = id
    }

    renderProfile(){
        let mainSection = document.getElementById('main')
        //clear main
        mainSection.innerHTML = ""

        // grab the empty logout div
        let logoutArea = document.getElementById('logout-button-area')
        // put a logout button in there
        logoutArea.innerHTML = `
            <a class="button is-large is-info is-light">
                <span class="icon">
                    <i class="fas fa-sign-out-alt"></i>
                </span>
                <span>Log Out</span>
            </a>
        `
        //create logout event listener
        logoutArea.addEventListener('click', e => {
            if (e.target.nodeName === "SPAN"){
                localStorage.clear()
                state.page = 'login'
                logoutArea.innerHTML = ""
                renderLandingPage()
            }
        })

        //create area for dottomodachis
        let dottomodachiContainer = document.createElement('div')
        dottomodachiContainer.id = "dottomodachi-container"

        //create area for individual dottomodachi
        let dottomodachiDiv = document.createElement('div')
        dottomodachiDiv.className =  "dottomodachi-div"
        //create element for spite img
        let sprite = document.createElement('img')
        sprite.src = "./public/animations/stage-3-bad.gif"

        //add the sprite to the div
        dottomodachiDiv.appendChild(sprite)


        //create container for progress bars
        let progressBarsContainer = document.createElement('div')
        progressBarsContainer.className = "progress-bars has-text-centered"
        progressBarsContainer.innerHTML = `
            <h1><strong>Name</strong></h1>
            <label for="hunger">Hunger</label>
            <progress id="hunger" class="progress is-small is-success" value="60" max="100">60%</progress>
            <label for="happiness">Happiness</label>
            <progress id="happiness" class="progress is-small is-success" value="60" max="100">60%</progress>
            <label for="weight">Weight</label>
            <progress id="weight" class="progress is-small is-success" value="60" max="100">60%</progress>
            <button class="button is-small is-info is-rounded"">Meal</button>
            <button class="button is-small is-info is-rounded"">Play</button>
            <button class="button is-small is-info is-rounded"">Snack</button>
        `
        //add individual dottomodachi div to main div
        dottomodachiContainer.appendChild(dottomodachiDiv)
        // add progressbars
        dottomodachiDiv.appendChild(progressBarsContainer)
        mainSection.appendChild(dottomodachiContainer)

    }
}