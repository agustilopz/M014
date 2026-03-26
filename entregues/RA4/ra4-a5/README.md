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
   - Navegació amb Drawer (`src/layouts/MainLayout.vue`).
   - Llistat i gestió del recurs (pel·lícules) a `src/pages/MoviesPage.vue` amb formularis en QDialog per Crear/Editar/Eliminar.

---

## Fitxers importants i on trobar la funcionalitat

- Frontend (Quasar app)
  - `src/pages/LoginPage.vue` - Pantalla de login
  - `src/pages/RegisterPage.vue` - Pantalla de registre
  - `src/pages/MoviesPage.vue` - Llistat i gestió de pel·lícules (abans `AdminPage.vue`)
  - `src/layouts/MainLayout.vue` - Drawer / menú lateral que mostra opcions segons sessió
  - `src/components/ProtectedView.vue` - Mostra missatge d'accés restringit o el contingut protegit
  - `src/composables/useUserSession.js` - Gestió de la sessió: login, logout, check, OAuth i estat `loggedIn`
  - `src/router/index.js`, `src/router/routes.js` - Rutes i guards (meta.requiresAuth)
  - `src/boot/axios.js` - Configuració d'Axios (env, send credentials, baseURL adaptatiu)

- Backend (Nuxt, dins del repo pare)
  - `nuxt-project/server/middleware/cors.ts` - Middleware CORS adaptat per permetre orígens de desenvolupament i l'emulador
  - `nuxt-project/server/routes/auth/me.get.ts` - Endpoint `/auth/me` retornant `{ user: ... }` o `{ user: null }` per coherència amb frontend

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
   - Assegura't que el servidor Nuxt escolta a `http://localhost:3000` (o la porta definida)

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

- L'app utilitza el backend Nuxt que originalment feia servir cookies http-only (nuxt-auth-utils).
- `src/composables/useUserSession.js` encapsula l'estat de sessió:
  - `login(credentials)`: fa la petició al backend i, si és correcte, actualitza `loggedIn` i `user`.
  - `logout()`: esborra la sessió al backend i al client.
  - `checkSession()`: crida `/auth/me` per obtenir l'usuari actual.
- Boot d'Axios (`src/boot/axios.js`) està configurat amb `withCredentials: true` i detecta si està corrent dins l'emulador per posar la baseURL correcta (10.0.2.2).
- Backend: s'ha adaptat `/auth/me` a retornar `{ user: ... }` o `{ user: null }` per coherència amb el frontend.

Opcions si hi ha problemes amb cookies http-only a entorns natius:
- Ajustar CORS i `credentials` al servidor (ja s'ha fet en `nuxt-project/server/middleware/cors.ts`).
- Alternativa: canviar a autenticació basada en JWT (el servidor retornaria token i el client l'enviaria en Authorization). Això no s'ha imposat però està documentat com a opció.

---

## CORS i problemes d'origen

- S'ha creat/ajustat `nuxt-project/server/middleware/cors.ts` per permetre múltiples orígens en desenvolupament (localhost, 10.0.2.2, etc.) i permetre credencials (cookies).
- Això resol errors comuns quan l'emulador intenta contactar l'API i també quan el client nadiu no rep cookies a causa de polítiques SameSite.

---

## Protecció de rutes i gestió de l'estat d'usuari

- Rutes amb `meta: { requiresAuth: true }` estan protegides amb un guard global a `src/router/index.js`.
- `ProtectedView.vue` mostra un missatge d'accés denegat quan l'usuari no està autenticat i evita que components facin crides a l'API si no cal.
- El frontend evita fer peticions GET/POST/PUT/DELETE cap a `/api/movies` quan l'usuari no és `loggedIn` (evita 401 no desitjats). Aquesta mesura va resoldre un error recidiu "Error afegint pel·lícules de mostra, Request failed with status code 401".

---

## Millores i correccions importants aplicades

- Migració de pàgines Nuxt (login, register, admin) a Quasar com a `LoginPage.vue`, `RegisterPage.vue`, `MoviesPage.vue`.
- `useUserSession` composable: centralitza login/logout/check i facilita la notificació d'estat a la UI.
- Axios boot amb detecció d'entorn i `withCredentials: true` per enviar cookies al backend.
- CORS middleware al backend per permetre 10.0.2.2 i altres orígens en dev.
- Rutes protegides (meta.requiresAuth) i component `ProtectedView.vue` per mostrar contingut restringit i evitar crides automàtiques quan no s'està autenticat.
- UI de Movies millorada: formularis en QDialog, seed automàtic només si la llista està buida i l'usuari està autenticat, eliminar botons manuals de seed.
- Correció: endpoint `/auth/me` retorna objecte coherent `{ user: ... }` o `{ user: null }`.
- Neteja d'advertències d'ESLint i eliminació de funcions no utilitzades.

---

## Proves i debugging

- Si reps 401 quan intentes fer operacions al backend des de l'app:
  - Assegura't que el backend està actiu i que la URL base és correcta (emulador: `10.0.2.2`).
  - Revisa que `withCredentials` estigui activat i que el CORS del servidor permeti `credentials`.
  - Comprovacions útils:
    - Crida manual a `/auth/me` des del navegador (inspector) o amb `curl` per veure si la sessió existeix.
    - Revisa la consola del backend per errors d'autenticació.

---

## Tasques pendents i millores opcionals

- Eliminar fitxers antics com `AdminPage.vue` si encara existeixen en alguna branca (per neteja final).
- Millorar validacions de formulari i feedback (indicadors de càrrega més detallats al CRUD).
- Implementar JWT com a alternativa a cookies per entorns natius si segueixen els problemes amb http-only cookies.
- Afegir tests automatitzats o script per seed controlat.

---
.
