# GitaFood Frontend - AngularJS 1.8

A simple AngularJS 1.8 frontend with Bootstrap 5 for the GitaFood application.

## Project Structure

```
frontend/
├── index.html              # Main entry point
├── package.json            # Project dependencies
├── js/
│   ├── app.js              # AngularJS app and routing
│   └── controllers/
│       └── mainController.js
├── css/
│   └── style.css           # Custom styles
└── views/
    ├── home.html           # Login page
    └── dashboard.html      # Dashboard page
```

## Setup

1. **Install dependencies** (optional, for local development server):
   ```bash
   npm install
   npm start
   ```

2. **Run directly** (if using a web server):
   - Place the `frontend` folder in your web root
   - Open `http://localhost/frontend/` in your browser

3. **For local development**:
   ```bash
   cd frontend
   npx http-server -p 8080
   ```

   Then visit `http://localhost:8080`

## Features

- **Login Page**: Email/password authentication
- **Dashboard**: Displays logged-in user info
- **Token Management**: Stores API token in localStorage
- **HTTP Interceptor**: Automatically includes token in API requests
- **Bootstrap 5**: Responsive UI components
- **AngularJS Routing**: Single-page application with ngRoute

## Backend API Configuration

Update the API endpoint in `js/controllers/mainController.js`:

```javascript
$http.post('http://localhost:8000/api/login', {...})
```

Change `localhost:8000` to your actual backend URL.

## Login Credentials

```
Email: admin@example.com
Password: admin
```

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Notes

- The frontend uses localStorage to store the API token
