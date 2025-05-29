# Average Calculator Microservice

This is a Node.js and Express-based microservice that fetches numbers (primes, Fibonacci, even, random) from a third-party API, maintains a sliding window of the last 10 unique values, and returns the current and previous window state along with the average.

---

## Features

- Fetches numbers from a third-party API
- Supports multiple number types:
  - `p` → Prime Numbers
  - `f` → Fibonacci Numbers
  - `e` → Even Numbers
  - `r` → Random Numbers
- Maintains a fixed-size window of last 10 unique numbers
- Calculates the average of numbers in the window
- Auto timeout in 500ms if the third-party API is slow

---

## Tech Stack

- Node.js
- Express.js
- Axios
- dotenv

---

## 🛠 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/average-microservice.git
cd average-microservice
