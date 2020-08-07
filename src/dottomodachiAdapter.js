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
    }

    updateDotomodachi(dottomodachiObj){fetch(this.baseURL, { method: "PATCH",
    headers: {
        'Authorization':`Bearer ${localStorage.jwt_token}`,
        'Content-type':'application/json'
     },
     body: JSON.stringify(dottomodachiObj)
    })

    }
}