# Project_CRUD_Andrii_Struk

![Project Screenshot](https://github.com/user-attachments/assets/b24a8119-a3ce-4b33-a5e9-fe2348e4c8e0)

---

## ⚙️ Tech Stack

- **Frontend:** <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="20"/> React powered by <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" height="20"/>
Vite for fast development and build performance.

- **Backend:** <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="20" /> Node.js with Express.js REST API.

- **Database:** <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" height="20" /> SQLite lightweight relational database.

---

## 🚀 Jak uruchomić projekt CRUD

### 🧩 Uruchomienie backendu
 1) Wejdź do folderu `backend`
 2) Otwyrz terminal 
 3) Zainstaluj zależności: `npm install`
 4) Uruchom serwer Node: `npx nodemon server.js`
    
 ```bash
    cd backend
    npm install
    npx nodemon server.js
 ```

### 💻 Uruchomienie frontendu
 1) Wejdź do folderu `frontend`
 2) Otwyrz terminal 
 3) Zainstaluj zależności: `npm install`
 4) Uruchom serwer Node: `npm run dev`
    
 ```bash
    cd frontend
    npm install
    npm run dev
 ```

---

# 🏗️ Project structure

<img height="400" alt="image" src="https://github.com/user-attachments/assets/e83e116d-364e-4a23-8c75-d5f13eb1852a" />

---

# 📑 Opis endpointów
## 1. 👀 GET /planets

 ***Opis:*** Pobiera wszystkie planety z bazy danych.  
 
 ***Błędy:*** 500 – błąd serwera przy odczycie z bazy.  


## 2. ➕ POST /planets

***Opis:*** Pobiera wszystkie planety z bazy danych.  

***Walidacja:***
- Wszystkie pola są wymagane.
- Populacja musi być liczbą.
  
***Błędy:***
- 500 – błąd serwera przy odczycie z bazy.  
- 400 – brakujące pola lub niepoprawna populacja.

## 3. ✏️ PUT /planets/:id

***Opis:*** Aktualizuje istniejącą planetę o podanym id.  

***Parametry URL:*** id – ID planety do edycji.  

***Błędy:***  
- 500 – błąd serwera przy odczycie z bazy.  
- 404 – planeta o podanym ID nie istnieje.  
- 400 – brakujące pola lub niepoprawna populacja.

## 4. ❌ DELETE /planets/:id

***Opis:*** Usuwa planetę o podanym id.  

***Parametry URL:*** id – ID planety do usunięcia.  

***Błędy:***  
- 500 – błąd serwera przy odczycie z bazy.  
- 404 – planeta o podanym ID nie istnieje.

---
