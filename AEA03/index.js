import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.use(express.static("public"));//carpeta publica pel css
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

// ----------- FUNCIONS AUXILIARS -----------

// Llegir informació del fitxer db.json
const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return { books: [] };
  }
};

// Escriure informació al fitxer db.json
const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Validar llibre abans d’afegir-lo
const validateBook = (name, author, books) => {
  if (!name || !author) {
    return "Títol i autor són obligatoris";
  }

  const exists = books.some(
    (b) =>
      b.name.toLowerCase() === name.toLowerCase() &&
      b.author.toLowerCase() === author.toLowerCase()
  );

  if (exists) {
    return "Aquest llibre ja existeix";
  }

  return null;
};

// ----------- ENDPOINTS -----------

app.get("/", (req, res) => {
  //res.send("Welcome to my improved API with Node.js");
  //const {user}=req.session
  res.render('register', user);
});

// GET: obtenir tots els llibres
app.get("/books", (req, res) => {
  const data = readData();
  res.json(data.books);
});

// GET: obtenir llibre per id
app.get("/books/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const book = data.books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({ error: "Llibre no trobat" });
  }

  res.json(book);
});

// POST: afegir un llibre nou
app.post("/books", (req, res) => {
  const data = readData();
  const { name, author } = req.body;

  const validationError = validateBook(name, author, data.books);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const newBook = {
    id: data.books.length ? data.books[data.books.length - 1].id + 1 : 1,
    name,
    author,
  };

  data.books.push(newBook);
  writeData(data);

  res.status(201).json(newBook);
});

// PUT: modificar llibre
app.put("/books/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const bookIndex = data.books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Llibre no trobat" });
  }

  const body = req.body;
  data.books[bookIndex] = {
    ...data.books[bookIndex],
    ...body,
  };

  writeData(data);
  res.json({ message: "Book updated successfully", book: data.books[bookIndex] });
});

// DELETE: eliminar llibre
app.delete("/books/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const bookIndex = data.books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Llibre no trobat, no es pot eliminar" });
  }

  const deletedBook = data.books.splice(bookIndex, 1);
  writeData(data);

  res.json({ message: "Book deleted successfully", book: deletedBook[0] });
});

// Middleware per rutes no trobades
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no trobada" });
});

// ----------- INICI SERVIDOR -----------
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});


// ENDPOINTS

app.post('/register', (req, res) => {
  const {username, password} = req.body;
})