# 📚 API REST – Depuració i Millora

## 👥 Membres del grup
- Martí Vilàs  
- Asad Saidi  
- Gerard Calvo  

---

## 🎯 Objectiu
Activitat d'ABP de l’assignatura: **Depuració i millora d'una API REST**.  
L’objectiu és analitzar, corregir i millorar una API bàsica en **Node.js + Express**, amb persistència de dades en un fitxer `db.json`.

---

## 🛠️ Fases del treball

### 🔎 Fase 1: Anàlisi del problema
Errors detectats a la API inicial:
- ❌ `GET /books/:id` podia fallar si l’ID no existia.  
- ❌ `POST /books` no tenia validació i permetia afegir llibres buits o duplicats.  
- ❌ `DELETE /books/:id` podia fallar si l’ID no existia.  
- ❌ Missatges d’error poc clars i sense codis d’estat adequats.  
- ❌ No hi havia middleware per rutes inexistents.

### 💡 Fase 2: Proposta de solució
- ✔️ Afegir validació de camps obligatoris (`title`, `author`) i evitar duplicats.  
- ✔️ Controlar si un llibre amb l’ID passat existeix abans de consultar-lo, modificar-lo o eliminar-lo.  
- ✔️ Retornar **missatges d’error clars** i codis HTTP adequats (`400`, `404`, `201`, etc.).  
- ✔️ Afegir middleware per gestionar rutes inexistents.  
- ✔️ Millorar la llegibilitat i modularitat del codi.

### 💻 Fase 3: Implementació i testing
- S’han aplicat totes les millores anteriors.  
- L’API s’ha provat amb **Postman** i funciona correctament en totes les operacions CRUD (*Create, Read, Update, Delete*).  

### 📢 Fase 4: Presentació i discussió
- Es presenten els **errors detectats**, les **solucions aplicades** i les **dificultats trobades** (sobretot en la validació de dades i el control d’errors).  
- La solució final és una API estable, amb control d’errors i missatges clars.

---
