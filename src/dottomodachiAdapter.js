class DottomodachiAdapter{

    constructor(url){
        this.baseURL = url
    }

    getDottomodachis(){
        fetch(this.baseURL, { method: "GET",
        headers: {
            'Authorization':`Bearer ${localStorage.jwt_token}`,
            'Content-type':'application/json'
         }
        })
        .then(resp => resp.json())
        .then(dottomodachis => {
            dottomodachis.forEach(dottomodachi => {
                let newDottomodachi = new Dottomodachi(dottomodachi)
                newDottomodachi.renderDottomodachi()
            })
        })
        .then( () =>{
            if (Dottomodachi.all.length === 0){
                renderAdoptionForm()
            }
        })   
    }

    updateDottomodachi(dottomodachiObj, id){
        fetch(this.baseURL+`/${id}`, { method: "PATCH",
        headers: {
            'Authorization':`Bearer ${localStorage.jwt_token}`,
            'Content-type':'application/json'
        },
        body: JSON.stringify(dottomodachiObj)
        })
    }

    createDottomodachi(name){
        let body = {dottomodachi: {
            name: name
        }}
        fetch(this.baseURL, { method: "POST",
        headers: {
            'Authorization':`Bearer ${localStorage.jwt_token}`,
            'Content-type':'application/json' 
        },
        body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then( keepLoggedIn() )
    }
}