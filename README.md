# URL Shortener

A full-stack web application for shortening URLs, managing user accounts, and tracking link analytics. Built with Node.js, Express, MongoDB, EJS, and Cloudinary for avatar uploads.

## Features

- **User Authentication:** Sign up, log in, and manage your account securely.
- **URL Shortening:** Generate short links for any valid URL.
- **Link Management:** View, edit, and delete your shortened URLs.
- **Analytics:** Track the number of clicks for each short URL.
- **Profile Management:** Update your profile and upload avatars (Cloudinary integration).
- **Flash Messages:** User-friendly notifications for actions and errors.
- **Responsive UI:** Clean, modern interface using EJS and SCSS.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** EJS templates, SCSS/CSS
- **Authentication:** Sessions, Cookies
- **File Uploads:** Multer, Cloudinary
- **Other:** dotenv, connect-flash

## Folder Structure

```
URL-shortner/
│
├── config/         # Configuration files (Cloudinary, MongoDB)
├── controllers/    # Route controllers (profile, url, user)
├── middlewares/    # Custom middleware (auth, upload, utils)
├── models/         # Mongoose schemas (User, URL)
├── public/         # Static assets (images, styles)
├── routes/         # Express route definitions
├── services/       # Service logic (auth)
├── views/          # EJS templates (pages, partials)
├── .env            # Environment variables
├── index.js        # Main server entry point
├── package.json    # Project metadata and dependencies
└── README.md       # Project documentation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)
- [Cloudinary](https://cloudinary.com/) account for avatar uploads

### Installation

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
   - Create a `.env` file in the root directory and add:
     ```
     MONGO_URI=your_mongodb_connection_string
     SESSION_SECRET=your_session_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

4. **Start the server:**
   ```sh
   npm run dev
   ```
   The app will run at [http://localhost:8001](http://localhost:8001).

## Usage

- Register a new account or log in.
- Shorten URLs from the dashboard.
- Manage your links and view analytics.
- Update your profile and upload a custom avatar.

## Scripts

- `npm run dev` — Start the server with nodemon for development.
- `npm start` — Start the server in production mode.

## License

MIT

---

**Made with ❤️ by Celina**