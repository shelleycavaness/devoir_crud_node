const express = require('express');
const bodyParser = require('body-parser');
const articles = require('./articles');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app
.get('/', function (req, res) {
    res.redirect('/index.html');
})
.get('/articles/:id',  (req, res) => {
    let article = articles.getArticle(req.params.id, 
                                (article) => res.json(article),
                                () => {
                                    res.status(500);
                                    res.json({error: true});                                    
                                }
                        );
    //res.json(article);
})
.delete('/articles/:id',  (req, res) => {
    articles.deleteArticle(req.params.id,
                                () => res.sendStatus(200),
                                () => {
                                    res.status(500);
                                    res.json({error: true});                                    
                                }
                        );
    // res.sendStatus(200);
})
.post('/articles', (req, res) => {
    articles.addArticle(req.body,
                                () => res.sendStatus(200),
                                () => {
                                    res.status(500);
                                    res.json({error: true});                                    
                                }
                        );
    //res.sendStatus(200);
})
.put('/articles/:id',  (req, res) => {
    articles.setArticle(req.params.id, req.body,
        () => res.sendStatus(200),
        () => {
            res.status(500);
            res.json({error: true});                                    
        }
);
    //res.sendStatus(200);
})
.get('/articles', (req, res) => {
    articles.getArticles((articles) => res.json(articles),
                            () => {
                                res.status(500);
                                res.json({error: true});                                    
                            }
                        );
})
.use(express.static('public'))
.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})