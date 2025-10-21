# Sistema Complet amb Autenticació i CRUD

---

## 1. Descripció del projecte
Aquest projecte és una aplicació web desenvolupada amb **Node.js** i **Express** que permet:

- Gestionar **usuaris** amb registre i login.
- Gestionar **pel·lícules** i **mangues** amb operacions **CRUD** (Crear, Llegir, Actualitzar, Eliminar).
- Autenticació i autorització mitjançant **JSON Web Tokens (JWT)**.
- Interfície amb **EJS** i estil senzill amb CSS.

---

## 2. Requeriments
- **Node.js** $\ge 18$
- **npm**
- **Paquets:** `express`, `cookie-parser`, `bcrypt`, `jsonwebtoken`, `method-override`, `ejs`

---

## 3. Instal·lació

1.  Clonar el repositori:
    ```bash
    git clone <URL_REPO>
    cd <PROJECT_FOLDER>
    ```

2.  Instal·lar dependències:
    ```bash
    npm install
    ```

3.  Crear fitxer de configuració **`.env`** o **`config.js`** amb:
    ```js
    export const PORT = 3000;
    export const SECRET_JWT_KEY = 'una_clau_secreta'; // Canviar per una clau segura
    export const SALT_ROUNDS = 10;
    ```

4.  Executar el servidor:
    ```bash
    npm start
    ```
    El servidor s’executarà a: **http://localhost:3000**

---

## 4. Rutes i funcionalitats

### 4.1 Autenticació

| RUTA | MÈTODE | Descripció |
| :--- | :--- | :--- |
| `/register` | `POST` | Registra un nou usuari. Accepta `{ username, password }` |
| `/login` | `POST` | Login d’usuari existent. Accepta `{ username, password }` i retorna JWT en cookie |
| `/logout` | `POST` | Tanca la sessió i elimina cookie JWT |
| `/protected` | `GET` | Home / Panell privat, accessible només si l’usuari està logejat |

**Seguretat:**
- Contrasenyes encriptades amb **bcrypt**.
- Tokens **JWT** emmagatzemats en cookie **`httpOnly`** i **`sameSite`**.
- Tokens expiren a **1 hora**.

### 4.2 CRUD de Pel·lícules

| RUTA | MÈTODE | Descripció |
| :--- | :--- | :--- |
| `/movies` | `GET` | Llista totes les pel·lícules |
| `/movies` | `POST` | Crea una nova pel·lícula |
| `/movies/:id` | `GET` | Mostra detall d’una pel·lícula |
| `/movies/:id` | `PUT` | Actualitza una pel·lícula |
| `/movies/:id` | `DELETE` | Elimina una pel·lícula |

> ⚠️ **Nota:** Les rutes estan protegides; només usuaris autenticats poden accedir-hi.

### 4.3 CRUD de Mangues

| RUTA | MÈTODE | Descripció |
| :--- | :--- | :--- |
| `/mangas` | `GET` | Llista tots els mangues |
| `/mangas/new` | `GET` | Formulari per afegir manga |
| `/mangas` | `POST` | Crea un manga |
| `/mangas/edit/:id` | `GET` | Formulari d’edició d’un manga |
| `/mangas/edit/:id` | `POST` | Actualitza un manga |
| `/mangas/delete/:id` | `POST` | Elimina un manga |

---

## 5. Dades d’exemple
Fitxer **`db/db.json`**:

