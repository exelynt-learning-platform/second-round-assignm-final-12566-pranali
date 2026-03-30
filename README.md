#  AI Chatbox Application

A responsive chatbox application built using React and Redux Toolkit that integrates with an AI API (Gemini/OpenAI) to provide real-time conversational responses.

---

##  Features

*  Real-time chat with AI
*  Redux Toolkit for state management
*  Async API handling using createAsyncThunk
*  Loading indicator while waiting for response
*  Error handling for API failures
*  Fully responsive (Mobile + Desktop)
*  Unit testing using Jest & React Testing Library

---

##  Tech Stack

* React.js
* Redux Toolkit
* Axios
* CSS (Responsive Design)
* Jest + React Testing Library

---

## Project Structure

```
src/
 ├── components/
 │    ├── ChatBox.js
 │    ├── Message.js
 │    ├── Loader.js
 │    └── __tests__/
 ├── features/chat/
 │    └── chatSlice.js
 ├── App.js
 ├── App.css
 └── setupTests.js
```

---

##  Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/pra-nali1812/second-round-assignm-final-12566-pranali.git
cd chatbox-app
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Add environment variables

Create a `.env` file in root:

```
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

---

##  Run the App

```
npm start
```

App will run at:
http://localhost:3000

---

##  Run Tests

```
npm test
```

---

## Security

* API key is stored using environment variables
* `.env` file is excluded from GitHub using `.gitignore`

---

##  UI Highlights

* User messages aligned to the right
* AI responses aligned to the left
* Smooth scrolling chat interface
* Mobile-friendly layout

---

## Assignment Highlights

* Implemented Redux for managing:

  * Messages
  * Loading state
  * Error handling
* Integrated AI API for dynamic responses
* Built responsive UI
* Added unit tests for components

---



## Submission

This project is submitted as part of the Second Round Assignment.
