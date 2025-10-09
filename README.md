# URL Shortener

A full-stack web application for shortening URLs, managing user accounts, and tracking link analytics. Built with Node.js, Express, MongoDB, EJS, and Cloudinary for avatar uploads. Now with Docker support and enhanced security features including encryption.

---

## Features

- **User Authentication:** Sign up, log in, and manage your account securely.
- **URL Shortening:** Generate short links for any valid URL.
- **Link Management:** View, edit, and delete your shortened URLs.
- **Analytics:** Track the number of clicks for each short URL.
- **Profile Management:** Update your profile and upload avatars (Cloudinary integration).
- **Flash Messages:** User-friendly notifications for actions and errors.
- **Responsive UI:** Clean, modern interface using EJS and SCSS.
- **Rate Limiting & Input Sanitization:** Protects against abuse and malicious input.
- **Encryption:** Sensitive data is encrypted for enhanced security.
- **Dockerized:** Easily run the app in any environment using Docker.

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** EJS templates, SCSS/CSS
- **Authentication:** Sessions, Cookies
- **File Uploads:** Multer, Cloudinary
- **Security:** Encryption, Rate Limiting, Input Sanitization
- **Other:** dotenv, connect-flash, Docker

---

## Folder Structure

```
URL-shortner/
│
├── config/         # Configuration files (Cloudinary, MongoDB)
├── controllers/    # Route controllers (profile, url, user)
├── middlewares/    # Custom middleware (auth, upload, utils, rate-limiter, sanitize, flash)
├── models/         # Mongoose schemas (User, URL)
├── public/         # Static assets (images, styles)
├── routes/         # Express route definitions
├── services/       # Service logic (auth, encrypt, logger)
├── uploads/        # Uploaded files (avatars, etc.)
├── views/          # EJS templates (pages, partials)
├── .env            # Environment variables
├── .env.example    # Example environment variables file
├── Dockerfile      # Docker build instructions
├── compose.yaml    # Docker Compose configuration
├── index.js        # Main server entry point
├── package.json    # Project metadata and dependencies
└── README.md       # Project documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)
- [Cloudinary](https://cloudinary.com/) account for avatar uploads
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

---

### Local Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/URL-shortner.git
   cd URL-shortner
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`:
     ```sh
     cp .env.example .env
     ```
   - Edit `.env` and fill in your values for all required variables.  
     See `.env.example` for the full list of required environment variables, such as:
     ```
     PORT=your_port
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRES=your_jwt_expires
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     EXPRESS_SESSION_SECRET=your_express_session_secret
     ```

4. **Start the server:**
   ```sh
   npm run dev
   ```
   The app will run at [http://localhost:8001](http://localhost:8001).

---

### Docker Deployment

1. **Build and run with Docker Compose:**
   ```sh
   docker compose up --build
   ```
   This will start the app in containers.  
   Make sure your `.env` file is present and configured as described above.

2. **Stop the containers:**
   ```sh
   docker compose down
   ```

For more details, see [`README.Docker.md`](README.Docker.md).

---

## Usage

- Register a new account or log in.
- Shorten URLs from the dashboard.
- Manage your links and view analytics.
- Update your profile and upload a custom avatar.

---

## Scripts

- `npm run dev` — Start the server with nodemon for development.
- `npm start` — Start the server in production mode.
- `docker compose up` — Start the app and MongoDB using Docker.

---

## Security

- **Encryption:** Sensitive data is encrypted using the key in `ENCRYPTION_KEY`.
- **Rate Limiting:** Prevents abuse of the API.
- **Input Sanitization:** Protects against XSS and injection attacks.

---

## Environment Variables

All required environment variables are listed in the `.env.example` file.  
**Always use `.env.example` as a reference when setting up your `.env` file.**

---

## License

MIT

---
