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
                      alert(json.errors)
                  } else {
                    let newUser = new User(json.userdata.user)
                    localStorage.setItem('jwt_token', json.jwt)
                    newUser.renderProfile()
                  }
              })
              .catch(errors => alert(errors))
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
                  alert(json.errors)
              } else {
                let loggedInUser = new User(json.userdata.user)
                localStorage.setItem('jwt_token', json.jwt)
                loggedInUser.renderProfile()
              }
          })
          .catch(errors => alert(errors))
    }

    autoLogin(token){
        console.log(localStorage.getItem('jwt_token'));
        fetch(this.baseURL+"/autologin", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(json => {
            if (!!json.errors){
                alert(json.errors)
            } else {
              let loggedInUser = new User(json.userdata.user)
              localStorage.setItem('jwt_token', json.jwt)
              loggedInUser.renderProfile()
            }
        })
        .catch(errors => alert(errors))
    }

}