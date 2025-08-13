# Product Management App

A full-stack product management application with React frontend, Node.js/Express backend, and MySQL database.

---

## Demo

- **Frontend:** [https://product-management-smoky-chi.vercel.app/](https://product-management-smoky-chi.vercel.app/)
- **Backend API:** [https://productmanagement-6y49.onrender.com/](https://productmanagement-6y49.onrender.com/)
- **Database:** MySQL (Aiven Cloud)

---

## Features
## Product Management App

A full-stack product management application with React frontend, Node.js/Express backend, and MySQL database.

---

## Features

- Add, update, delete products
- Search and sort products by name, description, or price
- Responsive, modern UI
- RESTful API with robust error handling

---

## Database Info

Table schema:
```sql
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  stocks INT NOT NULL
);
```

---

## How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/dark-wizz/ProductManagement.git
cd ProductManagement
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=productdb
DB_PORT=3306
```

Start your local MySQL server and create the database if it doesn't exist:
```sql
CREATE DATABASE productdb;
```

Start the backend:
```bash
npm start
# or
node server.js
```

The backend will run on [http://localhost:5000](http://localhost:5000)

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` folder:
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## Tech Stack
- React (Vite)
- Bootstrap
- Axios
- Node.js
- Express.js
- MySQL

---

## Author
- Interview Project by Barath
