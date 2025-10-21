import express from 'express';
import fs from 'fs';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth); // totes protegides

// Helpers per llegir/escriure dades
const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 2));

// 🟢 Llistar tots els mangas
router.get('/', (req, res) => {
    const data = readData();
    const htmlMessage = `<a href="/protected">🏠 Tornar al panell</a>`;
    res.render('mangas', { user: req.session.user, data, htmlMessage });
});

// 🟡 Formulari per crear nou manga
router.get('/new', (req, res) => {
    const htmlMessage = `<a href="/mangas">📚 Tornar al llistat</a>`;
    res.render('new_manga', { user: req.session.user, htmlMessage });
});

// 🟢 Crear nou manga
router.post('/', (req, res) => {
    const data = readData();
    const { title, author, year, genre, volumes } = req.body;

    if (!title || !author || !year) {
        return res.status(400).send('Falten camps obligatoris');
    }

    const newManga = {
        id: data.mangas.length > 0 ? data.mangas[data.mangas.length - 1].id + 1 : 1,
        title,
        author,
        year: parseInt(year),
        genre,
        volumes: parseInt(volumes) || null
    };

    data.mangas.push(newManga);
    writeData(data);
    res.redirect('/mangas');
});

// 🟡 Formulari d’edició
router.get('/edit/:id', (req, res) => {
    const data = readData();
    const manga = data.mangas.find(m => m.id === parseInt(req.params.id));
    if (!manga) return res.status(404).send('Manga no trobat');

    const htmlMessage = `<a href="/mangas">📚 Tornar al llistat</a>`;
    res.render('edit_manga', { user: req.session.user, manga, htmlMessage });
});

// 🟢 Actualitzar manga
router.post('/edit/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.mangas.findIndex(m => m.id === id);
    if (index === -1) return res.status(404).send('Manga no trobat');

    data.mangas[index] = { ...data.mangas[index], ...req.body, year: parseInt(req.body.year), volumes: parseInt(req.body.volumes) };
    writeData(data);
    res.redirect('/mangas');
});

// 🔴 Eliminar manga
router.post('/delete/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    data.mangas = data.mangas.filter(m => m.id !== id);
    writeData(data);
    res.redirect('/mangas');
});

export default router;
