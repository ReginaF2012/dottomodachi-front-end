const BASEURL = "http://localhost:3000"
let state = {page: "login" }

const mainSection = document.getElementById('main')

const loginForm = `
    <div id="login-form" class="container has-text-centered">
    <div class="column is-4 is-offset-4">
        <h3 class="title has-text-black">Login</h3>
        <hr class="login-hr">
        <p class="subtitle has-text-black">Please login to proceed.</p>
        <div class="box">
            <figure class="avatar">
                <img src="./public/images/test-sprite.jpeg">
            </figure>
        <form id="login-form">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input is-large" type="text" placeholder="Username">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input is-large" type="password" placeholder="Password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field submit">
                <p class="control">
                    <button id="login-button" class="button is-block is-info is-large is-fullwidth">
                        Login
                    </button>
                </p>
                
            </div>
            <p class="link"><a id="sign-up-link" href="#">Need to Sign Up?</a></p>
        </div>
    </div>
    </form>
`

const signupForm = `
    <div id="signup-form" class="container has-text-centered">
    <div class="column is-4 is-offset-4">
        <h3 class="title has-text-black">Sign Up</h3>
        <hr class="login-hr">
        <p class="subtitle has-text-black">Welcome!!!</p>
        <div class="box">
            <figure class="avatar">
                <img src="./public/images/test-sprite.jpeg">
            </figure>
        <form id="login-form">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input is-large" id="signup-username" type="text" placeholder="Username">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input is-large" id="signup-password" type="password" placeholder="Password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
            <p class="control has-icons-left">
                <input class="input is-large" id="signup-password-confirmation" type="password" placeholder="Password Confirmation">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
            </div>
            <div class="field submit"">
                <p class="control">
                    <button id="sign-up-button" class="button is-block is-info is-large is-fullwidth">
                        Sign Up
                    </button>
                </p>
                
            </div>
            <p class="link" ><a id="log-in-link" href="#">Already Signed Up?</a></p>
        </div>
    </div>
    </form>
`

function renderPage(){
    switch(state.page){
        case('login'):
        mainSection.innerHTML = loginForm
        break;
        case('signup'):
        mainSection.innerHTML = signupForm
        break;
    }
    let submit = document.querySelector(".submit")
    let linkArea = document.querySelector(".link")
    linkArea.addEventListener('click', renderLoginOrSignup)
    submit.addEventListener('click', login)
}

function login(e){

}

function renderLoginOrSignup(e){
    if (e.target.id === "log-in-link"){
        state.page = "login"
        renderPage()
    } else if (e.target.id === "sign-up-link"){
        state.page = "signup"
        renderPage()
    }
}

renderPage()
