const URL = 'https://api.github.com/'

export class Api {
    async loadRepos(value) {
        return await fetch(`${URL}search/repositories?q=${value}&per_page=5`).then(res => res)
    }

    loadReposData(name) {
        const urls = [
            `${URL}repositories/${name}`,
            `${URL}repositories/${name}/owner/login`,
            `${URL}repositories/${name}/stargazers_count`,
        ]
        const requests = urls.map(url => fetch(url))
        return Promise.all(requests)
            .then(responses => Promise.all((responses.map(r => r.json))))
    }

}
