import express from 'express';
import fs from 'fs';
import { requireAuth } from '../middleware/auth.js';


const router = express.Router();

// Protegeix totes les rutes d'aquest fitxer
router.use(requireAuth);


// Read/write JSON file
const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 2));

// Route: GET /movies
router.get('/', (req, res) => {
    const user = { name: "Agusti" };
    const htmlMessage = `<p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
                         <a href="/">Home</a>`;
    const data = readData();
    res.render("movies", { user, data, htmlMessage });
});

// Route: GET /movies/editMovie/:id
router.get('/editMovie/:id', (req, res) => {
    const user = { name: "Agusti" };
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="/movies">Llistat de pel·lícules</a>`;
    
    const data = readData();
    const movie = data.movies.find(m => m.id === parseInt(req.params.id));
    
    if (!movie) return res.status(404).send('Movie not found');

    res.render("edit_movie", { user, movie, htmlMessage });
});

// Route: GET /movies/new
router.get('/new', (req, res) => {
    const user = { name: "Agusti" };
    const htmlMessage = `<a href="/movies">Tornar al llistat de pel·lícules</a>`;
    res.render("new_movie", { user, htmlMessage });
});


// Route: GET /movies/:id
router.get('/:id', (req, res) => {
    const user = { name: "Agusti" };
    const htmlMessage = `<p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
                         <a href="/movies">Llistat de pel·lícules</a>`;
    const data = readData();
    const movie = data.movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');
    res.render("movie", { user, movie, htmlMessage });
});

// Route: POST /movies
router.post('/', (req, res) => {
    const data = readData();
    const { title, year, country, director, runtime, poster_path } = req.body;

    if (!title || !year || !country || !director || !runtime)
        return res.status(400).send('All fields are required');

    const newMovie = {
        id: data.movies.length > 0 ? data.movies[data.movies.length - 1].id + 1 : 1,
        title,
        year: parseInt(year),
        country,
        director,
        runtime: parseInt(runtime)
    };

    data.movies.push(newMovie);
    writeData(data);
   // res.json(newMovie);
    res.redirect('/movies');
});

// Route: PUT /movies/:id
router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const movieIndex = data.movies.findIndex(m => m.id === id);

    if (movieIndex === -1) return res.status(404).send('Movie not found');

    data.movies[movieIndex] = { ...data.movies[movieIndex], ...req.body };
    writeData(data);
    res.redirect('/movies');
});

// Route: DELETE /movies/:id
router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const movieIndex = data.movies.findIndex(m => m.id === id);

    if (movieIndex === -1) return res.status(404).send('Movie not found');

    data.movies.splice(movieIndex, 1);
    writeData(data);
    //res.json({ message: 'Movie deleted successfully' });
    res.redirect('/movies');

});

export default router;
