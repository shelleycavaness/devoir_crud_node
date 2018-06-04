const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/formation';

let connection;
MongoClient.connect(url, (err, db) => {
    if(err)
        throw err;
    console.log('Connexion à la base OK');
    connection = db;
})

module.exports = {
    getArticle: getArticle,
    getArticles: getArticles,
    addArticle: addArticle,
    deleteArticle: deleteArticle,
    setArticle: setArticle
}

function getArticle(ref, callback, callbackerr) {
    connection.collection('articles')
                .findOne({reference: ref}, (err, resultat) => {
                    if(err) {
                        callbackerr();
                        return;
                    }
                    console.log(resultat);
                    callback(resultat);
                }
            );
}

function getArticles(callback, callbackerr) {
    connection.collection('articles')
        .find({}).toArray( (err, resultat) => {
            if(err) {
                callbackerr();
                return;
            }
            console.log(resultat);
            callback(resultat);
        }
    );
}

function setArticle(ref, article, callback, callbackerr) {
    connection.collection('articles')
        .updateOne({reference: ref}, article, (err, resultat) => {
            if(err) {
                callbackerr();
                return;
            }
            console.log(resultat);
            callback();
        });
}

function addArticle(article, callback, callbackerr) {
    connection.collection('articles')
        .insertOne(article, (err, resultat) => {
            if(err) {
                callbackerr();
                return;
            }
            console.log(resultat);
            callback();
        });
}

function deleteArticle(ref, callback, callbackerr) {
    connection.collection('articles')
        .deleteOne({reference: ref}, (err, resultat) => {
            if(err) {
                callbackerr();
                return;
            }
            console.log(resultat);
            callback();
        });
}