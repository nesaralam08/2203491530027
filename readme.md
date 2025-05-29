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

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/nesaralam08/2203491530027.git
cd Average_Calculator
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Setup Environment Variables
- Create a .env file in the root directory and add:
- PORT=4000
- TOKEN=Bearer your_actual_token_here
- Replace your_actual_token_here with the real token you received.
### 4. Start the Server
```bash
node app.js / npm start
```
### 5. Test the API Using Postman
```bash
GET http://localhost:4000/numbers/:id
```
- Use any of the following values for :id:
| ID | Description       |
| -- | ----------------- |
| p  | Prime numbers     |
| f  | Fibonacci numbers |
| e  | Even numbers      |
| r  | Random numbers    |

### 6. Sample Response
```bash
{
  "windowPrevState": [2, 4],
  "windowCurrState": [2, 4, 6],
  "numbers": [6],
  "avg": 4
}
```
