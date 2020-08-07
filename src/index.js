const BASEURL = "http://localhost:3000"

const userAdapter = new UserAdapter(BASEURL)
const dottomodachiAdapter = new DottomodachiAdapter(BASEURL+'/dtomos')
// landing page is login form. What the page looks like will be determined on this variable; state.
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
                <img id="sprite-logo" src="./public/images/test-sprite.jpeg">
            </figure>
        <form id="login-form">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input is-large" id="login-username-input" type="text" placeholder="Username">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input is-large" id="login-password-input" type="password" placeholder="Password">
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
                    <input class="input is-large" id="signup-username-input" type="text" placeholder="Username">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input is-large" id="signup-password-input" type="password" placeholder="Password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
            <p class="control has-icons-left">
                <input class="input is-large" id="signup-password-conf-input" type="password" placeholder="Password Confirmation">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
            </div>
            <div class="field submit"">
                <p id="sign-up-button-container" class="control">
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
// determine what the page needs to look like based on the state assigned to it
function renderLandingPage(){
    switch(state.page){
        case('login'):
        mainSection.innerHTML = loginForm
        break;
        case('signup'):
        mainSection.innerHTML = signupForm
        break;
    }
    // defining these here because this is when these elements are loaded into the DOM  
    let submit = document.querySelector(".submit")
    let linkArea = document.querySelector(".link")
    linkArea.addEventListener('click', renderLoginOrSignup)
    submit.addEventListener('click', loginOrSignup)
}

function loginOrSignup(e){
    e.preventDefault()
    if (e.target.id === "sign-up-button"){

        let userObj = { user: {
            username: document.getElementById('signup-username-input').value,
            password: document.getElementById('signup-password-input').value,
            password_confirmation: document.getElementById('signup-password-conf-input').value
            }
        }

        userAdapter.signUpUser(userObj)

    }else if(e.target.id === "login-button"){
        
        let userObj = { user: {
            username: document.getElementById('login-username-input').value,
            password: document.getElementById('login-password-input').value
            }
        }
        userAdapter.loginUser(userObj)
    }
    document.querySelector('form').reset()
}

function renderLoginOrSignup(e){
    e.preventDefault()
    if (e.target.id === "log-in-link"){
        state.page = "login"
        renderLandingPage()
    } else if (e.target.id === "sign-up-link"){
        state.page = "signup"
        renderLandingPage()
    }
}

function keepLoggedIn(){
    if (!!localStorage.getItem('jwt_token')){
        state.page = "logged-in"
        userAdapter.autoLogin(localStorage.getItem('jwt_token'))
    } else {
        renderLandingPage()
    }
}

keepLoggedIn()
