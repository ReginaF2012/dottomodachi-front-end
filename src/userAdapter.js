class UserAdapter {
    constructor(url){
        this.baseURL = url
    }
    // userObj => {user: {username: ____, password: ____, pwconf: ____}}
    signUpUser(userObj){
        fetch(this.baseURL+'/users', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userObj)
              })
              .then(response => response.json())
              .then(json => {
                  // json => {userdata: {user: username: ___, id:__}, jwt: ____ }
                  if (!!json.errors){
                      showDangerAlert(json.errors)
                  } else {
                    currentUser = new User(json.userdata.user)
                    localStorage.setItem('jwt_token', json.jwt)
                    currentUser.renderProfile()
                  }
              })
              .catch(errors => showDangerAlert(errors))
    }

    loginUser(userObj){
        fetch(this.baseURL+'/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userObj)
          })
          .then(response => response.json())
          .then(json => {
              if (!!json.errors){
                  showDangerAlert(json.errors)
              } else {
                currentUser = new User(json.userdata.user)
                localStorage.setItem('jwt_token', json.jwt)
                currentUser.renderProfile()

              }
          })
          .catch(errors => showDangerAlert(errors))
    }

    autoLogin(token){
        fetch(this.baseURL+"/autologin", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(json => {
            if (!!json.errors){
                localStorage.clear()
                showDangerAlert(json.errors)
                state.page = 'login'
                renderLandingPage()
            } else {
              currentUser = new User(json.userdata.user)
              localStorage.setItem('jwt_token', json.jwt)
              currentUser.renderProfile()
            }
        })
        .catch(errors => showDangerAlert(errors))
    }

}