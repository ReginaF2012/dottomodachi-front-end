class User {
    constructor({username, id}){
        this.username = username
        this.userId = id
    }

    renderProfile(){
        let mainSection = document.getElementById('main')
        let dottomodachiContainer = document.createElement('div')
        dottomodachiContainer.className = 'columns'
        dottomodachiContainer.id = "dottomodachi-container"
        let logoutArea = document.getElementById('logout-button-area')
        logoutArea.innerHTML = `
            <a class="button is-large is-info is-light">
                <span class="icon">
                    <i class="fas fa-sign-out-alt"></i>
                </span>
                <span>Log Out</span>
            </a>
        `
 
        let dottomodachiHeader = `
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <h1 class="title">
                             ${this.username}'s dottomodachi
                        </h1>
                    </div>
                </div>
            </section>
            `

        mainSection.innerHTML = dottomodachiHeader
        mainSection.append(dottomodachiContainer)

        logoutArea.addEventListener('click', e => {
            if (e.target.nodeName === "SPAN"){
                localStorage.clear()
                state.page = 'login'
                logoutArea.innerHTML = ""
                renderLandingPage()
            }
        })
    }
}