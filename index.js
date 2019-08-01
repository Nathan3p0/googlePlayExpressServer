const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8000;
app.use(morgan('common'));

const apps = require('./playstore');

app.get('/apps', (req, res) => {
    const { sort, genres } = req.query;

    let results = apps;

    if (sort) {
        if (!['rating', 'app'].includes(sort.toLowerCase())) {
            return res.status(400).send('Please enter a sort value of either Rating or App')
        }
    }

    if (genres) {
        if (!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres.toLowerCase())) {
            return res.status(400).send('Please enter genre of either Action, Puzzle, Strategy, Casual, Arcade, or Card')
        }
        results = apps.filter(app => app.Genres.toLowerCase().includes(genres.toLowerCase()));
    }

    const capitalize = (s) => {
        if (typeof s !== 'string') return s
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    if (sort) {
        results.sort((a, b) => {
            return a[capitalize(sort)] > b[capitalize(sort)] ? 1 : a[capitalize(sort)] < b[capitalize(sort)] ? -1 : 0;
        });
    }

    res.json(results);
});

module.exports = {
    app: app,
    port: port
}
// app.listen(port, () => {
//     console.log(`Server is listening on Port ${port}`);
// })
