# 🚀 Simple HTTP JSON API Server

A clean, beginner‑friendly **Node.js HTTP server** that exposes a REST‑style API endpoint and returns JSON data from a database layer.

This project is designed to help you **understand HTTP, APIs, status codes, headers, and JSON** without hiding details behind frameworks like Express.

---

## ✨ Features

* Built using **Node.js native `http` module** (no frameworks)
* Clean **REST-style GET endpoint**
* Proper use of **HTTP status codes**
* Explicit **Content-Type headers**
* Async database abstraction
* Beginner-readable, production-minded structure

---

## 📁 Project Structure

```
├── server.js        # HTTP server
├── db.js            # Database logic (mock or real)
├── package.json
└── README.md
```

---

## 🔌 API Endpoint

### GET `/api/places`

Returns a list of destinations from the database.

#### ✅ Successful Response

**Status:** `200 OK`

```json
[
  {
    "name": "Paris",
    "country": "France"
  },
  {
    "name": "Tokyo",
    "country": "Japan"
  }
]
```

---

## 🧠 How It Works (High Level)

1. Client sends an **HTTP GET request**
2. Server checks the route and method
3. Data is fetched asynchronously from the database
4. Server responds with:

   * Correct **status code**
   * Proper **Content-Type header**
   * JSON‑formatted response body

---

## 🧩 Server Code Example

```js
import http from "node:http";
import { getDataFromDB } from "./db.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/api/places") {
        try {
            const destinations = await getDataFromDB();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(destinations));
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Server error" }));
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## 🛠️ How to Run Locally

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start the server

```bash
node server.js
```

### 3️⃣ Test the API

Open your browser or use `curl`:

```bash
curl http://localhost:8000/api/places
```

---

## 🎯 Learning Goals

This project helps you understand:

* What HTTP **really** is
* How clients and servers communicate
* Why headers and status codes matter
* How JSON fits into APIs
* How servers respond based on request intent

---

## 📌 Why No Express?

This project intentionally avoids Express to:

* Show what frameworks abstract away
* Build strong HTTP fundamentals
* Make debugging intuitive
* Strengthen backend understanding

---

## 🚧 Future Improvements

* Add query parameters (e.g. `/api/places?country=Canada`)
* Add POST endpoint
* Add input validation
* Add logging middleware
* Migrate to Express (for comparison)

---

## 📜 License

MIT License — free to learn, modify, and share.

---

## 💬 Final Note

> This project is not about speed — it’s about **clarity**.
> If you understand this server, frameworks become easy.

Happy hacking ⚡
