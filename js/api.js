const URL = 'https://api.github.com/'

export class Api {
    async loadRepos(value) {
        return await fetch(`${URL}search/repositories?q=${value}&per_page=5`).then(res => res)
    }

    loadReposData(rep, login) {
        const urls = [
            `${URL}repos/${login}/${rep}`,
            `${URL}repos/${login}/${rep}`,
            `${URL}repos/${login}/${rep}`,
        ]

        const requests = urls.map(url => fetch(url))
        return Promise.all(requests)
            .then(responses => Promise
                .all((responses
                    .map(r => r.json())
                        )))
    }
}
