import {Api} from "./api.js"
const api = new Api()

class View {
    constructor(api) {
        this.api = api
        this.searchLine = document.querySelector('.workplace__search')
        this.searchInput = document.querySelector('.search-input')
        this.helpBox = document.querySelector('.workplace__helper')
    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag)
        if(elementClass) {
            element.classList.add(elementClass)
        }
        return element
    }

    createRepos(userData) {
        const reposElement = this.createElement('li', 'rep')
        reposElement.addEventListener('click', () => this.followRepos(userData.name))
        reposElement.innerHTML = `<li class="res">${userData.name}</li>`
        this.helpBox.append(reposElement)
    }

    followRepos(name) {
        const repEl = this.createElement('div', 'workplace__added_repository')
        const data = this.api.loadReposData(name)
            .then(res => {
                console.log(res)
        })
    }
}

class Search {
    constructor(view, api) {
        this.api = api
        this.view = view
        this.view.searchInput.addEventListener('keyup', this.debounce(this.searchRepos.bind(this), 500))
    }
    
    searchRepos() {
        const searchValue = this.view.searchInput.value
        try {
            if(searchValue) {
                this.clearUsers()
                this.api.loadRepos(searchValue).then((res) => {
                    res.json().then(res => {
                        res.items.forEach(repos => this.view.createRepos(repos))
                    })
                })
            } else {
                this.clearUsers()
            }
        } catch(e) {
            console.log('Error: ' + e)
        }
    }

    clearUsers() {
        this.view.helpBox.innerHTML = '';
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this, args = arguments
            const later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
            }
            const callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    }
}

new Search(new View(api), api)