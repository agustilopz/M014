# Projecte AEA03 i AEA05

Aquest repositori conté dos projectes d'exemple per a la gestió d'usuaris i autenticació bàsica utilitzant Node.js, Express i EJS.

## Estructura del repositori

- **AEA03/**
  - `index.js`: Punt d'entrada de l'aplicació.
  - `config.js`: Configuració de variables globals.
  - `db.json`: Base de dades local (JSON).
  - `user-repository.js`: Gestió d'usuaris (creació, validació, etc.).
  - `views/`: Plantilles EJS per a la interfície d'usuari (`books.ejs`, `register.ejs`).
  - `db/User.json`: Fitxer on es guarden els usuaris.
  - `styles.css`: Full d'estils per a la interfície.
  - `request.http`: Exemple de peticions HTTP.

- **AEA05/**
  - `index.js`: Punt d'entrada de l'aplicació Express.
  - `config.js`: Configuració de variables globals (port, claus, etc.).
  - `user-repository.js`: Gestió d'usuaris (registre, validació, xifrat de contrasenyes amb bcrypt, etc.).
  - `db/user.json`: Fitxer on es guarden els usuaris.
  - `public/style.css`: Full d'estils per a la interfície.
  - `views/`: Plantilles EJS per a la interfície d'usuari (`login.ejs`, `register.ejs`).

## Funcionalitats bàsiques

- **Registre d'usuaris:**
  - Formulari de registre que desa l'usuari a la base de dades local amb la contrasenya xifrada.
  - Validació bàsica de camps (nom d'usuari i contrasenya).

- **Login d'usuaris:**
  - Formulari de login (pendent d'implementar la lògica al backend).

- **Plantilles EJS:**
  - Interfície d'usuari senzilla per a registre i login.

- **Base de dades local:**
  - Les dades dels usuaris es guarden en fitxers JSON dins la carpeta `db/`.

## Com executar el projecte

1. Instal·la les dependències:
   ```bash
   npm install
   ```
2. Executa el servidor:
   ```bash
   node index.js
   ```
3. Accedeix a l'aplicació des del navegador a `http://localhost:<PORT>`.

## Notes
- El projecte utilitza mòduls ECMAScript (`import/export`).
- La funcionalitat de login encara està pendent d'implementar completament.
- El xifrat de contrasenyes es fa amb `bcryptjs`.

---
Projecte per a pràctiques de DAW2 - M14
