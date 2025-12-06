# Airbnb Backend (Node.js + Express + MongoDB)

## 🚀 Live Backend URL: https://mernbackend-1-8paw.onrender.com

This is a backend project inspired by Airbnb.  
It is built with **Node.js, Express, MongoDB (Atlas), EJS, sessions, and multer**.  
The app supports:

- User authentication (login, signup, logout, reset password)
- Host flow (add / edit homes, manage listings) – protected by login
- Store flow (browse homes, favourite homes, view home details)
- File upload for home photos
- Server-side rendered views using EJS templates
- Secure HTTP headers (Helmet), compression, and logging

This README explains **how to set up the project locally**  
and what you need to deploy it (e.g., on Render).

---

## 1. Tech Stack

- **Runtime:** Node.js (v18+ recommended)
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Template Engine:** EJS
- **Session Store:** connect-mongodb-session
- **File Uploads:** multer
- **Styling / Assets:** Tailwind CSS (compiled to `public/styles/output.css`)
- **Security & Performance:**
  - helmet
  - compression
  - morgan (HTTP logging)

---

## 2. Project Structure

High-level folder structure:

```txt
MernBackend/
├─ app.js                 # Main Express app
├─ package.json
├─ controllers/           # Route handlers (auth, host, store, error)
├─ models/                # Mongoose models (User, Home, etc.)
├─ routers/               # Express routers (auth, host, store)
├─ views/                 # EJS templates (auth, store, host, 404, partials)
├─ public/                # Static assets (CSS, images)
├─ uploads/               # Uploaded home photos (multer destination)
├─ util/                  # Utility modules (path, file helpers)
├─ rules/                 # PDF or other static docs (e.g., Airbnb rules)
├─ .env.example           # Example env file (for reference only)
└─ .gitignore             # Ignores node_modules, .env*, etc.

3. Prerequisites

Node.js (18+ recommended)

npm (comes with Node)

MongoDB Atlas account

SendGrid API key (optional for password reset)


4. Setup MongoDB Atlas

Login → Create free cluster

Browse Collections → database name: airbnb

Database Access → create user:

5. Environment Variables
Local .env.development
MONGO_DB_URL=
FROM_EMAIL=
SEND_GRID_KEY=

6. Install Dependencies
npm install
7. Running Locally
Development Mode
npm run dev

http://localhost:000


8. Main Routes
Public / Store

GET /

GET /homes

GET /homes/:homeId

POST /favourites

Auth

GET /login

POST /login

GET /signup

POST /signup

POST /logout

GET /forgot

POST /forgot

GET /reset/:token

POST /reset

Host (Protected)

GET /host/homes

GET /host/add-home

POST /host/add-home

GET /host/edit-home/:id

POST /host/edit-home

POST /host/delete-home


9. File Upload (Multer)

Uploads stored in /uploads

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});


10. Sessions
const MongoDbStore = mongodb_session(session);
const sessionStore = new MongoDbStore({
  uri: process.env.MONGO_DB_URL,
  collection: "sessions",
});


Protected route example:

app.use("/host", (req, res, next) => {
  if (!req.session.isLoggedIn) return res.redirect("/login");
  next();
});


11. Logging & Security

helmet – secure headers

compression – gzip

morgan – logs stored in access.log


12. Deployment on Render
Settings:
Key	Value
Environment	Node
Build Command	npm install
Start Command	node app.js
Instance Type


13. Useful Commands
npm install
npm run dev
npm start


14. Future Improvements

Replace EJS UI with React frontend

Razorpay integration for booking payment

Cloudinary image upload

JWT authentication

Docker support
