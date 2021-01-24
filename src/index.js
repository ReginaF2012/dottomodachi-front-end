const BASEURL = "https://dottomodachi-back-end.herokuapp.com";

let currentUser;
const userAdapter = new UserAdapter(BASEURL);
const dottomodachiAdapter = new DottomodachiAdapter(BASEURL + "/dtomos");
const adoptionFormButton = document.getElementById("adoption-form-button");
const searchBarContainer = document.getElementById("search-bar-container");
const searchBar = document.getElementById("search-bar-input");
let noteDiv = document.getElementById("note-container");
// landing page is login form. What the page looks like will be determined on this variable, state.
let state = { page: "login" };

const mainSection = document.getElementById("main");

const adoptionForm = `
    <div id="login-form" class="container has-text-centered">
        <div class="column is-4 is-offset-4">
            <h3 class="title has-text-black">Adopt!</h3>
            <hr class="login-hr">
            <p class="subtitle has-text-black">Please Adopt Me!!</p>
            <div class="box">
                <figure class="avatar">
                    <img id="adoption-sprite" src="./public/animations/stage-1-neutral.gif">
                </figure>
                <form id="adoption-form">
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input is-large" id="dottomodachi-name-input" type="text" placeholder="Name">
                            <span class="icon is-small is-left">
                                <i class="fas fa-heart"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field submit">
                        <p class="control" id="adopt-button-area">
                            <button id="adopt-button" class="button is-block is-info is-large is-fullwidth">
                                Adopt Me!!!
                        </button>
                    </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;

const loginForm = `
    <div id="login-form" class="container has-text-centered">
    <div class="column is-4 is-offset-4">
        <h3 class="title has-text-black">Login</h3>
        <hr class="login-hr">
        <p class="subtitle has-text-black">Please login to proceed.</p>
        <div class="box">
            <figure class="avatar">
                <img class="sprite-logo" src="./public/images/test-sprite.jpeg">
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
`;

const signupForm = `
    <div id="signup-form" class="container has-text-centered">
    <div class="column is-4 is-offset-4">
        <h3 class="title has-text-black">Sign Up</h3>
        <hr class="login-hr">
        <p class="subtitle has-text-black">Welcome!!!</p>
        <div class="box">
            <figure class="avatar">
                <img class="sprite-logo" src="./public/images/test-sprite.jpeg">
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
`;

function showDangerAlert(message) {
	let alertDiv = document.createElement("div");
	alertDiv.className = "alert-danger";
	alertDiv.innerText = `${message}`;

	document.getElementById("alert-container").appendChild(alertDiv);

	let closeButton = document.createElement("span");
	closeButton.className = "closebtn";
	closeButton.innerHTML = `&times;`;
	alertDiv.appendChild(closeButton);

	//alert goes away on it's own after 3 seconds
	window.setTimeout(() => {
		closeButton.parentElement.hidden = true;
	}, 3000);

	//alert disappears when they click the closeButton
	closeButton.addEventListener("click", close);
}

function showSuccessAlert(message) {
	let alertDiv = document.createElement("div");
	alertDiv.className = "alert-success";
	alertDiv.innerText = `${message}`;

	document.getElementById("alert-container").appendChild(alertDiv);

	let closeButton = document.createElement("span");
	closeButton.className = "closebtn";
	closeButton.innerHTML = `&times;`;
	alertDiv.appendChild(closeButton);

	//alert goes away on it's own after 3 seconds
	window.setTimeout(() => {
		closeButton.parentElement.hidden = true;
	}, 3000);

	//alert disappears when they click the closeButton
	closeButton.addEventListener("click", close);
}

function createNote(message) {
	let note = `
    <div class="callout">
        <span class="callout-closebtn">&times;</span>
        <div class="callout-container">
            <p>${message}</p>
        </div>
    </div>
    `;
	noteDiv.innerHTML += note;
	noteDiv.hidden = false;
	noteDiv.addEventListener("click", removeNote);
}

function removeNote(e) {
	if (e.target.className === "callout-closebtn") {
		e.target.parentElement.remove();
		// only hide the noteDiv if it is empty
		if (noteDiv.childElementCount === 0) {
			noteDiv.hidden = true;
		}
	}
}

function close(e) {
	e.target.parentElement.hidden = true;
}

// determine what the page needs to look like based on the state assigned to it
function renderLandingPage() {
	let adoptionFormButtonDiv = document.getElementById(
		"adoption-button-container"
	);
	adoptionFormButtonDiv.hidden = true;

	searchBarContainer.hidden = true;

	switch (state.page) {
		case "login":
			mainSection.innerHTML = loginForm;
			break;
		case "signup":
			mainSection.innerHTML = signupForm;
			break;
	}
	// defining these here because this is when these elements are loaded into the DOM
	let submit = document.querySelector(".submit");
	let linkArea = document.querySelector(".link");
	linkArea.addEventListener("click", renderLoginOrSignup);
	submit.addEventListener("click", loginOrSignup);
}

// making the fetch request to login or sign up a user.
function loginOrSignup(e) {
	e.preventDefault();
	if (e.target.id === "sign-up-button") {
		let userObj = {
			user: {
				username: document.getElementById("signup-username-input")
					.value,
				password: document.getElementById("signup-password-input")
					.value,
				password_confirmation: document.getElementById(
					"signup-password-conf-input"
				).value,
			},
		};

		userAdapter.signUpUser(userObj);
	} else if (e.target.id === "login-button") {
		let userObj = {
			user: {
				username: document.getElementById("login-username-input").value,
				password: document.getElementById("login-password-input").value,
			},
		};
		userAdapter.loginUser(userObj);
	}
	//clear the form
	document.querySelector("form").reset();
}

// this is what toggles between the login and sign up forms
function renderLoginOrSignup(e) {
	e.preventDefault();
	if (e.target.id === "log-in-link") {
		state.page = "login";
		renderLandingPage();
	} else if (e.target.id === "sign-up-link") {
		state.page = "signup";
		renderLandingPage();
	}
}

// When they refresh the page, or revisit the page, if they have a jwt token in local storage
// I know they are authorized, so just automatically log them in
function keepLoggedIn() {
	if (!!localStorage.getItem("jwt_token")) {
		state.page = "logged-in";
		userAdapter.autoLogin(localStorage.getItem("jwt_token"));
	} else {
		renderLandingPage();
	}
}

function renderAdoptionForm() {
	// the search bar won't work while the adoption form is rendered because the dottomodachiContainer isn't on the page
	searchBarContainer.hidden = true;
	mainSection.innerHTML = adoptionForm;
	let adoptButton = document.getElementById("adopt-button");
	adoptButton.addEventListener("click", adopt);
}

function adopt(e) {
	// was getting duplicates when button button wasn't disabled
	e.target.disabled = true;
	e.preventDefault();
	let name = document.getElementById("dottomodachi-name-input").value;
	dottomodachiAdapter.createDottomodachi(name);
}

adoptionFormButton.addEventListener("click", (e) => {
	Dottomodachi.all.forEach((dottomodachi) =>
		clearInterval(dottomodachi.timer)
	);
	renderAdoptionForm();
});

function searchBarResults(e) {
	//empty the containing div
	let dottomodachiContainer = document.getElementById(
		"dottomodachi-container"
	);
	dottomodachiContainer.innerHTML = "";
	//this is the value of what the user has typed into the search bar
	//toUpperCase since I am going to ignore case sensitivity
	let filter = e.target.value.toUpperCase();
	// create empty array to push matches into
	let filteredDottomodachi = [];
	// loop over all of the dottomodachi in the all array
	for (let i = 0; i < Dottomodachi.all.length; i++) {
		// grab an instance
		let dottomodachi = Dottomodachi.all[i];
		// stop it's timer so points don't go down if it's not on screen
		clearInterval(dottomodachi.timer);
		// toUpperCase since we're ignoring case sensitivity
		let name = dottomodachi.name.toUpperCase();
		// https://www.w3schools.com/jsref/jsref_indexof.asp
		// indexOf will return -1 if the name does not contain the filter
		if (name.indexOf(filter) > -1) {
			//if it is greater than -1 then the name does contain the filter
			//therefor push it into the array of filteredDottomodachi
			filteredDottomodachi.push(dottomodachi);
		}
	}
	// render all of the dottomodachi from the filtered array.
	filteredDottomodachi.forEach((dottomodachi) =>
		dottomodachi.renderDottomodachi()
	);
}

// I chose keyup because keyup fires last, allowing the browser to process the key (vs keydown)
searchBar.addEventListener("keyup", searchBarResults);

keepLoggedIn();
