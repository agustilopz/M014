# Quasar Android App (ra4-a5)

Documentació breu del projecte i comprovació d'exigències de l'Activitat 5: Evolució a App Mòbil Android amb Quasar.

---

## Resum del projecte

Aquest repositori conté la versió frontend mòbil de l'aplicació (Quasar + Vue 3) que consumeix l'API backend desenvolupada amb Nuxt (ubicada a la carpeta `../nuxt-project`). L'objectiu és portar l'app web anterior a Android (Capacitor) mantenint el backend Nuxt i oferint autenticació i CRUD del recurs principal (pel·lícules).

Aquest README explica com executar el projecte, quines parts del codi fan què, problemes resolts relacionats amb autenticació/CORS i com generar un APK.

---

## Com l'entrega compleix l'enunciat

1. Frontend mòbil amb Quasar
   - Projecte Quasar + Vite utilitzant components Quasar (QLayout, QCard, QForm, QInput, QDialog, Notify, etc.).
2. Compilació per Android
   - Capacitor integrable; instruccions de build a la secció "Build Android / APK".
3. Backend Nuxt
   - L'API Nuxt es manté separada a `../nuxt-project` i s'ha adaptat la política CORS per suportar entorns d'emulador i múltiples orígens.
4. UI requerida
   - Pantalla de Login / Registre (`src/pages/LoginPage.vue`, `src/pages/RegisterPage.vue`).
   - Navegació con Drawer (`src/layouts/MainLayout.vue`).
   - Llistat i gestió del recurs (pel·lícules) a `src/pages/MoviesPage.vue` amb formularis en QDialog per Crear/Editar/Eliminar.

---

## Fitxers importants i on trobar la funcionalitat

- Frontend (Quasar app)
  - `src/pages/LoginPage.vue` - Pantalla de login
  - `src/pages/RegisterPage.vue` - Pantalla de registre
  - `src/pages/MoviesPage.vue` - Llistat i gestió de pel·lícules (abans `AdminPage.vue`)
  - `src/layouts/MainLayout.vue` - Drawer / menú lateral que mostra opcions segons sessió
  - `src/components/ProtectedView.vue` - Mostra missatge d'accés restringit o el contingut protegit
  - `src/composables/useUserSession.js` - Gestió de la sessió: login, logout, check, OAuth i estat `loggedIn` (ara amb suport opcional per JWT)
  - `src/router/index.js`, `src/router/routes.js` - Rutes i guards (meta.requiresAuth)
  - `src/boot/axios.js` - Configuració d'Axios (env, send credentials, baseURL adaptatiu i suport opcional per Authorization Bearer)

- Backend (Nuxt, dins del repo pare)
  - `nuxt-project/server/middleware/cors.ts` - Middleware CORS adaptat per permetre orígens de desenvolupament i l'emulador
  - `nuxt-project/server/middleware/jwtAuth.ts` - Middleware que processa Authorization: Bearer <token> i exposa l'usuari al context
  - `nuxt-project/server/utils/jwt.ts` - Helpers per signar i verificar JWT
  - `nuxt-project/server/routes/auth/*.post.ts` i `me.get.ts` - Endpoints d'autenticació; ara poden retornar token JWT si s'activa la funcionalitat

---

## Implementació: JWT com a alternativa a cookies (ara per defecte)

S'ha implementat l'ús de JWT com a mecanisme per defecte per a l'autenticació del client, tot mantenint la creació de sessió basada en cookie al servidor per compatibilitat.

Com funciona (resum):
- Server-side (Nuxt)
  - S'ha afegit `server/utils/jwt.ts` per signar i verificar tokens amb la biblioteca `jsonwebtoken`.
  - Els endpoints d'autenticació (`/auth/login`, `/auth/register`) retornen ara `{ user, token }` amb un JWT signat; la sessió basada en cookies segueix creant-se per compatibilitat amb clients que la prefereixin.
  - S'ha afegit `server/middleware/jwtAuth.ts` que comprova l'encapçalament `Authorization: Bearer <token>` i exposa l'usuari decodificat a `event.context.jwtUser`. L'endpoint `/auth/me` prioritza `event.context.jwtUser` si existeix.

- Client-side (Quasar)
  - `src/boot/axios.js` pot configurar l'encapçalament `Authorization` llegint `localStorage` (clau `api_jwt`) si hi ha un token guardat.
  - `src/composables/useUserSession.js` desa automàticament el token retornat al fer `login` i configura Axios per enviar-lo; el client utilitza aquest token per defecte en totes les peticions següents.
  - El comportament antic basat en cookies continua disponible al servidor i al client com a fallback.

Com activar / requisits (pasos mínims):
1) Instal·lar `jsonwebtoken` al servidor Nuxt:
   ```bash
   cd entregues/RA4/nuxt-project
   npm install jsonwebtoken
   ```
2) Definir la clau secreta per signar JWT (recomanat):
   - `JWT_SECRET=una_clau_molt_llarga` en el teu .env o entorn d'execució

Nota: no cal cap variable d'entorn addicional perquè el client faci servir el token — el client l'emmagatzemarà i l'enviarà per defecte quan es logegi.

---

## Com executar el projecte (desenvolupament)

Prerequisits:
- Node.js 18+ i npm / yarn
- Quasar CLI (opcional per comoditat): `npm i -g @quasar/cli`
- Android Studio i l'emulador configurat (si vols provar APK)

1) Executar el backend Nuxt (en una terminal separada)
   - Navega a la carpeta del backend (ex: `cd entregues/RA4/nuxt-project`)
   - Instal·la dependències i arrenca:
     ```bash
     npm install
     npm run dev
     ```
   - Si vols provar JWT, instal·la `jsonwebtoken` i arrenca amb `API_RETURN_JWT=1` tal com s'exposa més amunt.

2) Executar la Quasar App en dev (desktop o web)
   - Des del directori d'aquest projecte Quasar:
     ```bash
     npm install
     quasar dev
     ```
   - Per provar en el navegador la comunicació amb el backend en la mateixa màquina, la configuració d'Axios usa `localhost` per defecte.

3) Provar en l'emulador Android (important)
   - IMPORTANT: quan l'app corre dins l'emulador, l'adreça pel host de dev és `http://10.0.2.2:3000` en comptes de `localhost`.
   - `src/boot/axios.js` ja detecta l'entorn i utilitza aquesta adreça quan cal (si estàs executant dins Capacitor/emulador).

---

## Build Android / APK (Capacitor)

1) Preparar l'app Quasar per producció i integrar Capacitor (resum):
   ```bash
   quasar build -m capacitor -T android
   # o si prefereixes fer-ho pas a pas:
   quasar build
   npx cap add android
   npx cap copy android
   npx cap open android
   ```
2) Obrir el projecte a Android Studio (`npx cap open android`) i construir l'APK o executar a l'emulador/ dispositiu.

(Assegura't que el backend Nuxt està actiu i accessible des de l'emulador — recorda `10.0.2.2`).

---

## Com funciona l'autenticació i com s'ha resolt

- L'app original utilitzava cookies http-only (nuxt-auth-utils). Ara hi ha una opció per retornar un JWT al fer login/registre i que el client l'emmagatzemi per enviar-lo en l'encapçalament Authorization.
- `src/composables/useUserSession.js` encapsula l'estat de sessió i exposa el mètode `login(credentials)` que gestiona tant el flux de cookies com el de token si el servidor el retorna.
- Si no habilites `API_CLIENT_JWT` al client, el comportament segueix sent basat en cookies (ambCredentials).

---

## CORS i problemes d'origen

- S'ha creat/ajustat `nuxt-project/server/middleware/cors.ts` per permetre múltiples orígens en desenvolupament (localhost, 10.0.2.2, etc.) i permetre credencials (cookies) i l'encapçalament `Authorization`.

---

## Protecció de rutes i gestió de l'estat d'usuari

- Rutes amb `meta: { requiresAuth: true }` estan protegides amb un guard global a `src/router/index.js`.
- `ProtectedView.vue` mostra un missatge d'accés denegat quan l'usuari no està autenticat i evita que components facin crides a l'API si no cal.
- El frontend evita fer peticions GET/POST/PUT/DELETE cap a `/api/movies` quan l'usuari no és `loggedIn` (evita 401 no desitjats). Aquesta mesura va resoldre un error recidiu "Error afegint pel·lícules de mostra, Request failed with status code 401".

---

## Millores i correccions importants aplicades

- Migració de pàgines Nuxt (login, register, admin) a Quasar com a `LoginPage.vue`, `RegisterPage.vue`, `MoviesPage.vue`.
- `useUserSession` composable: centralitza login/logout/check i facilita la notificació d'estat a la UI. Ara inclou suport opcional per JWT.
- Axios boot amb detecció d'entorn i `withCredentials: true` per enviar cookies al backend; suport per Authorization Bearer quan `API_CLIENT_JWT=1`.
- CORS middleware al backend per permetre 10.0.2.2 i altres orígens en dev i exposar l'encapçalament Authorization.
- Rutes protegides (meta.requiresAuth) i component `ProtectedView.vue` per mostrar contingut restringit i evitar crides automàtiques quan no s'està autenticat.
- UI de Movies millorada: formularis en QDialog, seed automàtic només si la llista està buida i l'usuari està autenticat, eliminar botons manuals de seed.
- Correció: endpoint `/auth/me` retorna objecte coherent `{ user: ... }` o `{ user: null }` i prioritza JWT si s'envia.
- Neteja d'advertències d'ESLint i eliminació de funcions no utilitzades.

---

## Proves i debugging

- Si reps 401 quan intentes fer operacions al backend des de l'app:
  - Assegura't que el backend està actiu i que la URL base és correcta (emulador: `10.0.2.2`).
  - Revisa que `withCredentials` estigui activat si fas servir cookies i que el CORS del servidor permeti `credentials` i `Authorization`.
  - Si utilitzes JWT, comprova que el token és present a `localStorage` (clau `api_jwt`) i que `API_CLIENT_JWT=1` està actiu al client.
  - Comprovacions útils:
    - Crida manual a `/auth/me` des del navegador (inspector) o amb `curl` per veure si la sessió existeix o si el JWT funciona.
    - Revisa la consola del backend per errors d'autenticació.

---

## Vídeo Demo

<video controls width="100%" style="max-width:720px;">
  <source src="demo-quasar.webm" type="video/webm">
  El teu navegador no suporta la reproducció de vídeo. Descarrega el vídeo <a href="demo-quasar.webm">aquí</a>.
</video>


---
