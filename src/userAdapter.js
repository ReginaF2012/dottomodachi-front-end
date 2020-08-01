class UserAdapter {
    constructor(url){
        this.baseURL = url
    }

    loginUser(loginParams){
        return fetch(`${this.baseURL}/sessions`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(loginParams)
        })
        .then(resp => resp.json())
        .then(userObj => {
            return User.new(userObj)
        })
    }
}