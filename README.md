# Work Note

Hi, and welcome to my **Work Note** project.

This is a practice project based on a real-world scenario, where I am simulating real requirements and following a professional development process from planning and user stories through implementation, testing, documentation, and deployment.

---

## Overview

**Work Note** is a MERN stack web application designed to replace traditional handwritten work notes used in the work environment.

The application provides a centralized digital workspace where users can record, organize, update, and review information related to their daily work activities.

The main goal is to make work notes easier to create, search, update, and maintain compared with traditional paper-based notes.

---

## Project Status

🚧 **Development in Progress**

The project is currently in the development stage.

Some functionality has already been implemented, while other features are still being developed and refined.

The `USER_STORIES.md` file is used as the main functional roadmap for completing the project.

---

## Main Objectives

The application aims to:

* Replace handwritten work notes with digital records.
* Keep work information organized in one place.
* Allow users to create and manage work notes.
* Make previous notes easy to find and review.
* Allow notes to be edited when information changes.
* Provide a simple and practical interface for daily work use.
* Store information securely in a database.
* Provide a foundation for future features such as searching, filtering, categorization, attachments, and reporting.

---

## Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS
* Tailwind CSS
* React Router
* Redux Toolkit / RTK Query (where applicable)

### Backend

* Node.js
* Express.js
* JavaScript
* REST API

### Database

* MongoDB
* Mongoose

### Development Tools

* Git
* GitHub
* VS Code
* Postman

### Deployment

The application is intended to be deployed using separate Render services:

* Frontend → Render Static Site
* Backend → Render Web Service

Both services can be deployed from this single GitHub repository.

---

## Project Structure

```text
work-note/
│
├── client/                    # React / Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── server/                    # Node / Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── ...
│
├── docs/
│   └── USER_STORIES.md
│
├── README.md
└── .gitignore
```

> The exact folder structure may change as development continues.

---

## Core Application Concept

A **Work Note** represents a digital record of information that would normally be written in a physical notebook or paper note.

A note may contain information such as:

* Date
* Subject
* Description
* Work activity
* Important observations
* Actions required
* Follow-up information
* Status
* Category
* Related information

The exact fields will depend on the final application design.

---

## Functional Areas

The application is expected to contain the following functional areas.

### 1. Authentication

Users should be able to:

* Register
* Log in
* Log out
* Maintain an authenticated session
* Access protected functionality

### 2. Work Notes

Users should be able to:

* Create a note
* View notes
* View individual note details
* Edit notes
* Delete notes
* Track important work information

### 3. Organization

Notes should eventually be organized using appropriate mechanisms such as:

* Categories
* Status
* Dates
* Tags
* Search
* Filtering

### 4. User Interface

The frontend should provide:

* Simple navigation
* Responsive layout
* Clear note creation/editing forms
* Notes list
* Note details
* Useful feedback messages
* Loading states
* Error handling

### 5. Backend API

The server provides REST API endpoints for:

* Authentication
* Users
* Work notes
* Categories
* Other application resources

The frontend communicates with the backend through HTTP requests.

---

## Data Flow

The basic application flow is:

```text
User
  ↓
React Frontend
  ↓
HTTP Request
  ↓
Express API
  ↓
Controller
  ↓
Mongoose Model
  ↓
MongoDB
```

For a response:

```text
MongoDB
  ↓
Mongoose
  ↓
Controller
  ↓
Express API
  ↓
React Frontend
  ↓
User
```

---

## Local Development

### Prerequisites

Install the following before running the project:

* Node.js
* npm
* MongoDB or a MongoDB Atlas database
* Git

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

Check Git:

```bash
git --version
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project:

```bash
cd work-note
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

Open another terminal or return to the project root:

```bash
cd ../server
npm install
```

---

## Environment Variables

Environment variables must not be committed to Git.

The backend may require variables similar to:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
NODE_ENV=development
```

The frontend may require variables such as:

```env
VITE_API_URL=http://localhost:5000
```

The actual variables used by the project should be documented here as development continues.

### Important

Never commit:

```text
.env
.env.local
.env.production
```

or any file containing passwords, API keys, database credentials, tokens, or other secrets.

---

## Running the Application

### Start the Backend

```bash
cd server
npm run dev
```

The backend will normally run on:

```text
http://localhost:5000
```

### Start the Frontend

In another terminal:

```bash
cd client
npm run dev
```

Vite will normally provide a local URL similar to:

```text
http://localhost:5173
```

---

## API

The backend exposes REST API endpoints used by the React frontend.

Example structure:

```text
/api/auth
/api/users
/api/notes
/api/categories
```

The exact endpoints will be documented here as the API becomes finalized.

---

## Development Workflow

The project should be developed feature by feature.

The main workflow is:

```text
User Story
    ↓
Development Task
    ↓
Implementation
    ↓
Testing
    ↓
Git Commit
    ↓
Next User Story
```

The `USER_STORIES.md` file should be updated as functionality is completed.

---

## Git Workflow

A typical development cycle:

```bash
git status
```

Review changes:

```bash
git diff
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Add work note creation"
```

Push:

```bash
git push
```

Commit messages should describe the functionality being added or changed.

Examples:

```text
Add user authentication
Add work note creation
Add note editing
Fix note API validation
Update note list UI
Add note search
```

---

## Deployment

The project uses a single GitHub repository containing both applications.

Render can use the same repository to create separate services.

### Frontend

```text
Repository: work-note
Root Directory: client
Service Type: Static Site
```

### Backend

```text
Repository: work-note
Root Directory: server
Service Type: Web Service
```

This allows the frontend and backend to be deployed independently while remaining part of the same project repository.

---

## Security

The following rules should always be followed:

* Never commit `.env` files.
* Never commit passwords or API keys.
* Never expose database credentials in frontend code.
* Validate data on the backend.
* Protect authenticated routes.
* Validate user input.
* Use appropriate authentication and authorization mechanisms.
* Configure CORS correctly for production.
* Use secure environment variables in deployment.

---

## Testing

Testing will be added progressively during development.

Potential testing areas include:

* Authentication
* API endpoints
* Note creation
* Note editing
* Note deletion
* Search and filtering
* Form validation
* Error handling
* Frontend components
* Integration between frontend and backend

---

## Future Development

Potential future features include:

* Advanced search
* Filtering
* Tags
* Categories
* Note priorities
* Attachments
* Images
* Work reminders
* Notifications
* Activity history
* Dashboard
* Reports
* Exporting notes
* User roles and permissions
* Mobile-friendly improvements
* Progressive Web App functionality

These features should only be added when they are defined as actual requirements.

---

## Project Documentation

### User Stories

The functional requirements and development roadmap are maintained in:

```text
USER_STORIES.md
```

The user stories define:

* What the user needs
* Why the feature is needed
* Acceptance criteria
* Development status
* Future functionality

---

## Development Principle

The objective is not simply to build a technically correct MERN application.

The application should solve a real problem in the work environment:

> **Replace scattered handwritten work notes with an organized, searchable, and maintainable digital work-note system.**

The interface should therefore remain practical, fast, and easy to use during normal work activities.

---

## License

This project is currently a personal/private development project.

License information can be added when the project is ready for public distribution.
