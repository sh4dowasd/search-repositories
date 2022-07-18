class View {
    constructor() {
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
        reposElement.innerHTML = `<li class="res">${userData.name}</li>`
        this.helpBox.append(reposElement)
    }
}

class Search {
    constructor(view) {
        this.view = view
        this.view.searchInput.addEventListener('keyup', this.searchRepos.bind(this))
    }
    
    async searchRepos() {
        const searchValue = this.view.searchInput.value
        if(searchValue) {
            return await fetch(`https://api.github.com/search/repositories?q=${searchValue}&per_page=5`).then((res) => {
                if(res.ok) {
                    res.json().then(res => {
                        res.items.forEach(user => this.view.createRepos(user))
                    })
                } else {

                }
            })
        } else {
            this.clearUsers()
        }
    }

    clearUsers() {
        this.view.helpBox.innerHTML = '';
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
}

new Search(new View())