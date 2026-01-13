# TypeStrike.Ai

A real-time multiplayer typing speed testing platform where users can compete against each other or AI bots, track their progress, and improve their typing skills.

## Overview

TypeStrike.Ai is a full-stack typing test application that solves the problem of practicing typing in isolation. Instead of just testing yourself, you can now race against friends in real-time multiplayer rooms or challenge AI opponents at different difficulty levels. It's built for anyone who wants to improve their typing speed in a fun, competitive environment.

**How it works:**
- Create or join multiplayer rooms using 6-character codes
- Race against other players in real-time typing tests
- Challenge AI bots at easy (35-45 WPM), medium (55-70 WPM), or hard (80-100 WPM) difficulty
- Track your performance over time with detailed statistics and game history
- Analyze which words you struggle with most

The app uses Socket.IO for real-time synchronization, so all players see each other's progress as they type. Game results are saved to MongoDB and can be viewed in your personal dashboard.

## Tech Stack

### Backend
- **Node.js** (ES modules)
- **Express 5.1.0** - REST API server
- **Socket.IO 4.8.1** - Real-time multiplayer synchronization
- **MongoDB** with **Mongoose 8.16.0** - Database
- **JWT** (jsonwebtoken 9.0.2) - Authentication tokens
- **bcrypt 6.0.0** - Password hashing
- **cookie-parser** - HTTP-only cookie handling
- **CORS** - Cross-origin configuration
- **UUID 13.0.0** - Room ID generation

### Frontend
- **React 19** - UI framework
- **Vite 6.5.5** - Build tool and dev server
- **TailwindCSS 4.1.11** - Styling
- **Redux Toolkit 2.9.0** - State management (auth)
- **TanStack Router 1.121.41** - Client-side routing
- **Socket.IO Client 4.8.1** - Real-time communication
- **Axios 1.11.0** - HTTP client
- **Recharts 3.0.2** - Data visualization (graphs, charts)
- **Framer Motion 12.23.12** - Animations
- **GSAP 3.13.0** - Advanced animations
- **Lucide React** - Icons

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB database (local or Atlas)
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd BACKEND
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `BACKEND` directory:
```env
MONGO_URI=mongodb://localhost:27017/typestrike
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/typestrike

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode (with nodemon auto-reload)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000` by default.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd FRONTEND
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `FRONTEND` directory:
```env
VITE_BACKEND_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

### Database Setup

1. **Local MongoDB:**
   - Install MongoDB locally or use Docker
   - Make sure MongoDB is running
   - Update `MONGO_URI` in backend `.env` to point to your local instance

2. **MongoDB Atlas (Cloud):**
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Get your connection string
   - Update `MONGO_URI` in backend `.env` with your Atlas connection string

3. **Database will be created automatically** when you first run the backend server

### Running Locally

1. Start MongoDB (if running locally)
2. Start the backend server:
```bash
cd BACKEND
npm run dev
```
3. Start the frontend (in a new terminal):
```bash
cd FRONTEND
npm run dev
```
4. Open `http://localhost:5173` in your browser

### Common Errors & Fixes

**"MongoDB connection failed"**
- Check that MongoDB is running
- Verify `MONGO_URI` in `.env` is correct
- For Atlas: Make sure your IP is whitelisted in Network Access

**"CORS error" or "Not allowed by CORS"**
- Backend only allows `http://localhost:5173` and `https://typestrike.vercel.app` by default
- Add your frontend URL to `allowedOrigins` array in `BACKEND/server.js`

**"JWT_SECRET is missing"**
- Make sure `.env` file exists in `BACKEND` directory
- Verify `JWT_SECRET` is set in the file

**"Socket connection failed"**
- Check that backend is running
- Verify `VITE_BACKEND_URL` in frontend `.env` matches backend URL
- Check browser console for detailed error messages

**"Room not found" or "Invalid room code"**
- Rooms are stored in memory (not persisted to DB yet)
- If backend restarts, all active rooms are lost
- Make sure backend hasn't crashed or restarted

**Port already in use**
- Change `PORT` in backend `.env` or kill the process using port 5000
- For frontend, Vite will automatically use the next available port

## Features

### Authentication
- User registration with email and password
- Login with email/password
- JWT tokens stored in httpOnly cookies (XSS protection)
- Protected routes for authenticated users
- Session persistence across page reloads
- Logout functionality

### Solo Typing Tests
- Typing speed tests with customizable word counts
- Real-time WPM and accuracy calculation
- Error tracking (correct/incorrect characters)
- Mode support: words, time, quote, numbers
- Results automatically saved to user history

### Multiplayer Rooms
- Create private rooms with custom names
- 6-character alphanumeric room codes for easy sharing
- Join rooms by code or room ID
- Real-time progress tracking for all players
- Room chat functionality
- Ready/idle status for players
- Host can remove players from room
- Minimum 2 players required to start (except bot mode)
- Race countdown before start
- Synchronized race start for all players

### AI Bot Mode
- Race against AI opponents
- Three difficulty levels:
  - Easy: 35-45 WPM, 88-92% accuracy
  - Medium: 55-70 WPM, 93-96% accuracy
  - Hard: 80-100 WPM, 97-99% accuracy
- Configurable word counts (10, 25, 50, 100)
- Bot typing simulation with realistic timing and error rates
- Works with single player (no need for 2+ players)

### Game Results & Statistics
- Automatic saving of all game results
- Dashboard with overview statistics:
  - Total games played
  - Average WPM
  - Average accuracy
  - Best WPM achieved
- Detailed game history with last 20 matches
- Individual game detail pages
- Word error tracking (which words you struggle with most)
- Recommended words for practice based on errors
- Game mode tracking (solo, multiplayer, bot)

### Real-time Features
- Live progress updates during races
- Position tracking as players finish
- Leaderboard updates in real-time
- Player status indicators (ready/idle/finished)
- Race completion events
- Graph visualization of race progress
- Multiple result view modes (graph, leaderboard, podium, statistics)

## Folder Structure

```
TypeStrike.Ai/
├── BACKEND/
│   ├── server.js                 # Main server file with Socket.IO setup
│   ├── package.json
│   └── src/
│       ├── config/
│       │   ├── mongo.config.js   # MongoDB connection
│       │   ├── cookieConfig.js   # Cookie settings (httpOnly, secure, sameSite)
│       │   └── cookieOptions.js  # JWT token options
│       ├── controller/
│       │   ├── auth.controller.js    # Login, register, logout handlers
│       │   ├── dashboard.controller.js  # Dashboard data retrieval
│       │   └── typing.controller.js     # Typing result save/get handlers
│       ├── DAO/
│       │   └── user.dao.js       # Database access layer (CRUD operations)
│       ├── middleware/
│       │   ├── auth.js           # JWT authentication middleware
│       │   └── globalError.middleware.js  # Error handling
│       ├── models/
│       │   ├── user.model.js     # User schema (auth, typingHistory, games)
│       │   └── multiplayer.model.js  # Multiplayer room schema (currently unused)
│       ├── routes/
│       │   ├── auth.route.js     # /api/auth routes
│       │   ├── dashboard.route.js   # /api/user/dashboard routes
│       │   └── typing.route.js      # /api/typing routes
│       ├── services/
│       │   └── user.service.js   # Business logic (register, login)
│       └── utils/
│           ├── appError.js       # Custom error class
│           ├── helper.js         # JWT sign/verify utilities
│           └── TryCatchWrapper.js  # Async error wrapper
│
├── FRONTEND/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx              # App entry point
│       ├── App.jsx               # Root component with Redux setup
│       ├── routes.jsx            # TanStack Router configuration
│       ├── apis/
│       │   ├── client.js         # Axios instance with base URL
│       │   ├── auth.js           # Auth API calls (empty currently)
│       │   ├── dashboard.js      # Dashboard API calls
│       │   ├── typing.js         # Typing result API calls
│       │   └── user.js           # User API calls
│       ├── components/
│       │   ├── auth/             # Login/register components
│       │   └── components/
│       │       ├── multiplayer/  # Multiplayer UI components
│       │       │   ├── Lobby/InRoom.jsx  # Main room/lobby interface
│       │       │   ├── RaceResultViews/  # Results visualization
│       │       │   └── ...
│       │       ├── TypingArea.jsx    # Typing test interface
│       │       ├── ShowWpm.jsx       # WPM display component
│       │       ├── TypingStats.jsx   # Statistics display
│       │       └── ...
│       ├── context/
│       │   ├── MultiplayerContext.jsx   # Multiplayer state (legacy)
│       │   ├── ThemeContext.jsx        # Theme management
│       │   ├── TypingGameContext.jsx   # Typing game state
│       │   └── Layout.jsx              # Main layout wrapper
│       ├── features/
│       │   └── auth/
│       │       └── authSlice.js   # Redux auth slice
│       ├── hooks/
│       │   ├── useAuth.js        # Auth hook
│       │   └── useRoomSocket.jsx # Socket.IO room management hook
│       ├── pages/
│       │   ├── Dashboard.jsx         # User dashboard page
│       │   ├── BotModePage.jsx       # AI bot race setup
│       │   ├── CreateJoinRoomPage.jsx # Multiplayer room creation/joining
│       │   ├── MultiplayerTypingArea.jsx  # Multiplayer race interface
│       │   └── ...
│       ├── redux/
│       │   └── store.js          # Redux store configuration
│       ├── styles/
│       │   ├── themes.css        # Theme styles
│       │   └── type.css          # Typing interface styles
│       └── utils/
│           ├── ProtectedRoute.jsx    # Route protection wrapper
│           └── generateRaceWords.js  # Word generation for races
│
└── README.md
```

## API Overview

All API endpoints are prefixed with `/api`.

### Authentication (`/api/auth`)
- `POST /register` - Register new user
  - Body: `{ email, password, name }`
  - Returns: `{ user, token }`
  - Sets httpOnly cookie with JWT token

- `POST /login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ user }`
  - Sets httpOnly cookie with JWT token

- `GET /me` - Get current user from token
  - Requires: Cookie with `accessToken`
  - Returns: `{ user: { id, email, name } }`

- `POST /logout` - Logout user
  - Clears `accessToken` cookie

### Typing Results (`/api/typing`)
- `POST /save` - Save solo typing test result
  - Requires: Authenticated (cookie)
  - Body: `{ wpm, accuracy, errors, correctChars, incorrectChars, totalChars, time, mode, wordCount, words, wordErrors }`
  - Saves to `typingHistory` and `games` array

- `GET /history` - Get user's typing history
  - Requires: Authenticated
  - Returns: `{ history: [...] }`

- `POST /race/save` - Save multiplayer race result (legacy, now handled by Socket.IO)
  - Requires: Authenticated
  - Body: `{ roomId, roomName, wpm, accuracy, errors, position, totalPlayers }`

- `GET /race/history` - Get race history (legacy)

### Dashboard (`/api/user/dashboard`)
- `GET /` - Get dashboard statistics
  - Requires: Authenticated
  - Returns: `{ totalGames, avgWpm, avgAccuracy, bestWpm, lastMatches: [...] }`

- `GET /game/:id` - Get detailed game information
  - Requires: Authenticated
  - Returns: `{ ...gameData, recommendedWords: [...] }`
  - Includes word errors analysis

## Authentication Flow

1. **Registration:**
   - User submits email, password, name
   - Backend hashes password with bcrypt (10 rounds)
   - Creates user in MongoDB
   - Generates JWT token with user ID payload
   - Sets httpOnly cookie with token (7 day expiration)
   - Returns user data and token

2. **Login:**
   - User submits email and password
   - Backend finds user by email
   - Compares password with bcrypt
   - Generates JWT token
   - Sets httpOnly cookie
   - Returns user data

3. **Token Verification:**
   - Client sends request with cookie
   - Backend reads `accessToken` from cookies
   - Verifies JWT signature using `JWT_SECRET`
   - Extracts user ID from token
   - Fetches user from database
   - Attaches user to `req.user`

4. **Protected Routes:**
   - Uses `isAuthenticated` middleware
   - Checks for token in cookies
   - Verifies token and user exists
   - Returns 401 if unauthorized

5. **Frontend Auth State:**
   - Redux store manages auth state
   - On app load, calls `/api/auth/me` to check session
   - Stores user in localStorage as fallback
   - `ProtectedRoute` component checks auth before rendering

6. **Socket.IO Authentication:**
   - Currently socket connections don't require auth
   - Socket IDs are used as user identifiers in rooms
   - User IDs from auth are stored in `userSocketMap` for game saving

## Performance & Architecture Notes

### Backend
- **Room Storage:** Rooms are stored in-memory (`Map` objects) for fast access. This means:
  - Rooms are lost on server restart
  - No database queries for active rooms (very fast)
  - Room cleanup happens on disconnect
  - Not suitable for horizontal scaling without Redis

- **Socket.IO:** 
  - Rooms are Socket.IO namespaces for efficient broadcasting
  - Player progress updates are throttled by client-side rate limiting
  - Bot typing uses `setTimeout` intervals (could be optimized with a queue system)

- **Database:**
  - Games are stored in user document arrays (no separate collection)
  - This works well for small-medium user bases but may need indexing for large datasets
  - Typing history and race history are separate arrays (could be unified)
  - Word errors stored as Maps in MongoDB (serialized to objects)

### Frontend
- **State Management:**
  - Redux for auth (small state, well-suited)
  - Context API for multiplayer and typing game state
  - Socket.IO hook manages connection lifecycle

- **Performance:**
  - Recharts used for graphs (handles large datasets well)
  - Framer Motion for smooth animations
  - Component re-renders controlled with `useMemo` and `useCallback`
  - Progress updates from Socket.IO trigger targeted state updates

- **Build:**
  - Vite for fast HMR and optimized production builds
  - TailwindCSS with JIT compilation
  - Code splitting handled by TanStack Router

### Known Limitations
- Rooms are not persisted (lost on server restart)
- No rate limiting on API endpoints
- Socket connections don't require authentication (anyone can connect)
- No pagination for game history (could be slow with many games)
- Word generation is client-side (could be moved to backend for consistency)

## TODO

### High Priority
- [ ] Add authentication to Socket.IO connections
  - Currently anyone can connect and create rooms
  - Need to verify JWT on socket connection
  - Store user info in socket handshake

- [ ] Persist rooms to database
  - Rooms disappear on server restart
  - Need to save room state and restore on reconnect
  - Maybe use Redis for active rooms + MongoDB for persistence

- [ ] Fix duplicate chat array in `joinByCode` socket handler
  - Line 675-676 has `chat` twice in response object
  - Should clean this up

- [ ] Add rate limiting to API endpoints
  - Prevent abuse of registration/login endpoints
  - Use express-rate-limit or similar

### Medium Priority
- [ ] Paginate dashboard game history
  - Currently only shows last 20 matches
  - Should add pagination or infinite scroll
  - Loading states needed

- [ ] Move word generation to backend
  - Currently client generates words for races
  - Should be server-side for consistency and anti-cheat
  - Could add word difficulty scoring

- [ ] Add room settings/configuration
  - Max players limit
  - Privacy settings (public/private)
  - Custom word lists or themes
  - Time limits for races

- [ ] Improve bot AI behavior
  - Bots currently type character-by-character with fixed delays
  - Could add word-level thinking time
  - Make error patterns more realistic (common typos)

- [ ] Add user profiles
  - Profile pages with public stats
  - Avatar uploads
  - Friend system
  - Match history between users

### Low Priority / Nice to Have
- [ ] Add quote mode to multiplayer
  - Currently only word mode works
  - Need to handle longer text passages
  - Different UI for quote display

- [ ] Spectator mode
  - Allow users to watch races without participating
  - Read-only access to room

- [ ] Tournament/league system
  - Bracket-style competitions
  - Seasonal leaderboards
  - Rankings and divisions

- [ ] Mobile app optimization
  - Touch keyboard support
  - Mobile-friendly UI adjustments
  - PWA support

- [ ] Analytics dashboard for admins
  - User activity metrics
  - Popular game modes
  - Server health monitoring

### Technical Debt
- [ ] Clean up duplicate code in socket handlers
  - Lots of repeated user data mapping
  - Could create helper functions

- [ ] Refactor multiplayer model (currently unused)
  - `multiplayer.model.js` exists but isn't used
  - Either implement it or remove it

- [ ] Standardize error responses
  - Some endpoints return different error formats
  - Should use consistent error structure

- [ ] Add comprehensive logging
  - Currently mostly `console.log`
  - Should use proper logging library (Winston, Pino)
  - Log levels, file rotation, etc.

- [ ] Write unit tests
  - No tests currently exist
  - Start with API endpoints
  - Add socket event tests

- [ ] TypeScript migration
  - Would catch many bugs at compile time
  - Start with backend, then frontend
  - Or just add JSDoc types for now

### UX Improvements
- [ ] Better error messages
  - Some errors are too technical for users
  - Add user-friendly error messages
  - Toast notifications instead of alerts

- [ ] Loading states everywhere
  - Some operations don't show loading indicators
  - Dashboard, game detail pages need skeletons

- [ ] Keyboard shortcuts
  - `Ctrl/Cmd + Enter` to start race
  - `Esc` to leave room
  - Common shortcuts for better UX

- [ ] Sound effects (optional)
  - Typing sounds
  - Race start countdown
  - Finish celebration
  - Toggle in settings

- [ ] Better mobile experience
  - Touch typing is awkward on mobile
  - Maybe disable on mobile or add warning
  - Or optimize for tablet use

### Scaling Considerations
- [ ] Redis for room storage
  - Current in-memory Map won't work with multiple servers
  - Need shared state for Socket.IO rooms
  - Use Redis adapter for Socket.IO

- [ ] Database indexing
  - Add indexes on frequently queried fields
  - Email, user ID, game dates
  - Room codes if we persist them

- [ ] CDN for static assets
  - Frontend build should be served from CDN
  - Images and fonts
  - Reduce server load

- [ ] WebSocket load balancing
  - Sticky sessions required for Socket.IO
  - Or use Redis adapter with multiple servers
  - Plan for horizontal scaling

- [ ] Caching layer
  - Cache user dashboard data
  - Cache game history (with invalidation)
  - Reduce database queries

### Half-Finished Features
- [ ] Pricing plans component exists but not connected
  - `PricingPlans.jsx` in components but no route
  - Either implement or remove

- [ ] Coming soon page exists but needs content
  - Generic placeholder page
  - Should list planned features or redirect

- [ ] Quote mode partially implemented
  - Backend supports it in model
  - Frontend typing area needs quote UI
  - Not fully tested

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes:**
   - Follow existing code style
   - Test your changes locally
   - Update documentation if needed

4. **Commit your changes:**
   ```bash
   git commit -m "Add: description of your feature"
   ```
   - Use clear commit messages
   - Reference issues if applicable

5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request:**
   - Describe what your PR does
   - Reference any related issues
   - Include screenshots for UI changes

### Development Guidelines

- **Backend:** Use ES modules (import/export), follow existing controller → service → DAO pattern
- **Frontend:** Use functional components with hooks, keep components small and focused
- **Git:** Write clear commit messages, don't commit `.env` files
- **Testing:** Test your changes in both development and production-like environments
- **Documentation:** Update README if you add new features or change setup

### Reporting Bugs

If you find a bug:
1. Check if it's already in the TODO section
2. Open an issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/Node version if relevant
   - Screenshots if applicable

## License

ISC License

Copyright (c) 2024

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
