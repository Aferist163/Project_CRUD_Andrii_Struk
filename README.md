# Project_CRUD_Andrii_Struk

Projekt CRUD (React + Node + SQLite)

![Project Screenshot](https://github.com/user-attachments/assets/b24a8119-a3ce-4b33-a5e9-fe2348e4c8e0)

---

## Jak uruchomić projekt CRUD

Poniższa instrukcja pokaże, jak uruchomić projekt lokalnie, gdy masz dwie osobne foldery: `backend` i `frontend`.

## 1. Sklonuj repozytorium

## 2. Uruchomienie backendu

1.  Wejdź do folderu `backend`
2.  Otwyrz terminal
3.  Zainstaluj zależności: npm install
4.  Uruchom serwer Node: npx nodemon server.js

## 2. Uruchomienie frontendu

1.  Wejdź do folderu `frontend`
2.  Otwyrz terminal
3.  Zainstaluj zależności: npm install
4.  Uruchom serwer Node: npm run dev

# Project structure

<img width="294" height="593" alt="image" src="https://github.com/user-attachments/assets/e83e116d-364e-4a23-8c75-d5f13eb1852a" />

---

## 🪐 Nowe funkcjonalności

Do formularza dodano dwa nowe atrybuty:

Waga planety (masa) – określa masę planety w jednostkach wagowych.

Promień planety (radius) – określa promień planety w kilometrach.

Dzięki tym polom możliwe jest bardziej szczegółowe zapisywanie danych o planetach w bazie danych.

---

# Opis endpointów

## 1. GET /planets

### Opis:

1. Pobiera wszystkie planety z bazy danych.

### Błędy:

1. 500 – błąd serwera przy odczycie z bazy.

## 2. POST /planets

### Opis:

1. Pobiera wszystkie planety z bazy danych.

### Walidacja:

1. Wszystkie pola są wymagane.
2. Populacja musi być liczbą.

### Błędy:

1. 500 – błąd serwera przy odczycie z bazy.
2. 400 – brakujące pola lub niepoprawna populacja.

## 2. PUT /planets/:id

### Opis:

1. Aktualizuje istniejącą planetę o podanym id.

### Parametry URL:

1. id – ID planety do edycji.

### Błędy:

1. 500 – błąd serwera przy odczycie z bazy.
2. 404 – planeta o podanym ID nie istnieje.
3. 400 – brakujące pola lub niepoprawna populacja.

## 2. DELETE /planets/:id

### Opis:

1. Usuwa planetę o podanym id.

### Parametry URL:

1. id – ID planety do usunięcia.

### Błędy:

1. 500 – błąd serwera przy odczycie z bazy.
2. 404 – planeta o podanym ID nie istnieje.
