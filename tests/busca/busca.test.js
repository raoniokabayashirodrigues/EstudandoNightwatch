import pg from '../../lib/db'

let movieData = {}

module.exports = {
    '@tags': ['busca', 'regressivo'],
    before: function (browser) {
        movieData = {
            title: 'Meu Namorado é um Zumbi',
            status: 'Disponível',
            year: 2013,
            releaseDate: '01/05/2013',
            cast: ['Nicholas Hoult', 'Teresa Palmer', 'Analeigh Tipton', 'Rob Corddry'],
            cover: 'meu-namo-zumbi.jpg',
            plot: 'Em um mundo pós-apocalíptico, um zumbi romântico se apaixona por uma humana, e o envolvimento deles cria uma reação em cadeia.'
        }

        pg.removeByTitle(movieData.title).then(function () {
            pg.InsertMovie(movieData)
        })

        let login = browser.page.login()
        login.with('raoni@praxio.com.br', 'pwd123')

    },

    'Quando faço a busca pelo titulo': function (browser) {
        let searchMovie = browser.page.busca()
            searchMovie
                    .setValue('@searchInput', movieData.title)
                    .click('@searchIcon')
    },
    'Então o título buscado deve ser exibido na lista': function (browser) {
        let searchMovie = browser.page.busca()
            searchMovie
                        .waitForElementPresent('@tableTr', 10000)
                        .expect.elements('@tableTr').count.to.equal(1)
            searchMovie
                        .assert.containsText('@tableTr', movieData.title, 'O Teste de busca de filme passou com sucesso')
                        
    }

}