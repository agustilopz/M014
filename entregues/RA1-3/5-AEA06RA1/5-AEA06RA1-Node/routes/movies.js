import express from 'express';
import fs from 'fs';
import { requireAuth } from '../middleware/auth.js';


const router = express.Router();

// Protegeix totes les rutes d'aquest fitxer amb JWT
router.use(requireAuth);


// Read/write JSON file
const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 2));

// Route: GET /movies
router.get('/', (req, res) => {
    const data = readData();
    res.json({ movies: data.movies });
});

// Route: GET /movies/editMovie/:id
router.get('/editMovie/:id', (req, res) => {
    const data = readData();
    const movie = data.movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json({ movie });
});

// Route: GET /movies/new
router.get('/new', (req, res) => {
    res.json({ message: 'Ready to create a new movie' });
});

// Route: GET /movies/:id
router.get('/:id', (req, res) => {
    const data = readData();
    const movie = data.movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json({ movie });
});

// Route: POST /movies
router.post('/', (req, res) => {
    const data = readData();
    const { title, year, country, director, runtime, poster_path } = req.body;
    if (!title || !year || !country || !director || !runtime)
        return res.status(400).json({ error: 'All fields are required' });
    const newMovie = {
        id: data.movies.length > 0 ? data.movies[data.movies.length - 1].id + 1 : 1,
        title,
        year: parseInt(year),
        country,
        director,
        runtime: parseInt(runtime),
        poster_path
    };

    console.log('New movie data:', newMovie); // Debug log
    data.movies.push(newMovie);
    writeData(data);
    res.status(201).json({ movie: newMovie });
});

// Route: PUT /movies/:id
router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const movieIndex = data.movies.findIndex(m => m.id === id);
    if (movieIndex === -1) return res.status(404).json({ error: 'Movie not found' });
    data.movies[movieIndex] = { ...data.movies[movieIndex], ...req.body };
    writeData(data);
    res.json({ movie: data.movies[movieIndex] });
});

// Route: DELETE /movies/:id
router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const movieIndex = data.movies.findIndex(m => m.id === id);
    if (movieIndex === -1) return res.status(404).json({ error: 'Movie not found' });
    const deleted = data.movies.splice(movieIndex, 1);
    writeData(data);
    res.json({ message: 'Movie deleted successfully', movie: deleted[0] });
});

export default router;
