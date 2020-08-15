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
                localStorage.removeItem('jwt_token')
                state.page = 'login'
                logoutArea.innerHTML = ""
                Dottomodachi.all.forEach(dottomodachi => clearInterval(dottomodachi.timer))
                renderLandingPage()
            }
        })

        let adoptionFormButtonDiv = document.getElementById('adoption-button-container')
        adoptionFormButtonDiv.hidden = false

        //create area for dottomodachis
        let dottomodachiContainer = document.createElement('div')
        dottomodachiContainer.id = "dottomodachi-container"
        mainSection.appendChild(dottomodachiContainer)

        dottomodachiAdapter.getDottomodachis()

    }
}