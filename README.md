# Debate Timer & Argument Mapper

> A real-time collaborative debate platform that tracks speaking time and visualizes argument structures through an interactive node-based graph.

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Node](https://img.shields.io/badge/Node.js-16%2B-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4%2B-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Real-Time Events](#real-time-events)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🎯 Overview

**Debate Timer & Argument Mapper** is a full-stack MERN application designed to bring structure and clarity to debates. Whether you're managing classroom discussions, corporate strategy meetings, or political forums, this platform ensures fair speaking time and visualizes complex argument relationships in real-time.

### Why This Matters

Traditional debates face several challenges:
- **Time Inequality**: Dominant speakers monopolize the conversation
- **Lost Arguments**: Important points get buried in discussions
- **Passive Participation**: Quiet voices are never heard
- **No Structure**: Hard to follow the logical flow
- **Subjective Assessment**: No objective data on participation

This platform solves all of these problems.

### Key Highlights

- ⏱️ **Precision Timer**: Track speaking time down to the second
- 🗺️ **Visual Argument Map**: See how arguments connect in real-time
- 👥 **Multi-User Collaboration**: Instant updates via WebSocket
- 🔐 **Secure Authentication**: JWT-based user management
- 📊 **Analytics**: Track participation and time usage
- 🎨 **Modern UI**: Clean, responsive design

---

## 🌟 Features

### Core Functionality

#### 1. Real-Time Debate Rooms
- Create unlimited debate rooms with custom topics
- Set configurable time limits per speaker (30 seconds to 1 hour)
- Support for multiple simultaneous participants
- Automatic synchronization across all connected clients
- WebSocket-based instant updates (no page refresh needed)
- Room-based isolation (debates don't interfere with each other)

#### 2. Speaking Timer
- **Start/Stop Timer**: Single-click control with instant feedback
- **Visual Progress Bar**: Color-coded to show time usage
  - Green: Within limit
  - Yellow: Approaching limit (80%+)
  - Red: Exceeded limit
- **Per-Participant Tracking**: Individual time totals for each speaker
- **Historical Segments**: Records every speaking interval
- **Time Aggregation**: Automatic calculation of total speaking time
- **Real-Time Sync**: All users see timer updates simultaneously

#### 3. Argument Mapping
- **Interactive Node-Based Graph**: Powered by ReactFlow
- **Four Argument Types**:
  - 🔵 **Claim**: Main propositions and assertions
  - 🟢 **Evidence**: Supporting facts and data
  - 🟠 **Rebuttal**: Counterarguments to existing claims
  - 🔴 **Counter**: Alternative perspectives
- **Visual Relationships**: Lines connect related arguments
- **Drag-and-Drop**: Rearrange nodes for better visualization
- **Zoom & Pan**: Navigate complex argument trees
- **Mini-Map**: Bird's-eye view for large debates
- **Auto-Layout**: Smart positioning algorithm

#### 4. User Management
- **Secure Registration**: Username, email, password with validation
- **JWT Authentication**: Token-based session management
- **User Profiles**: Avatar, bio, debate history
- **Session Persistence**: Stay logged in across browser sessions
- **Password Security**: bcrypt hashing with salt rounds

#### 5. Debate Management
- **Create Debates**: Custom titles, topics, and time limits
- **Join Debates**: Choose your side (Pro, Con, Neutral)
- **Four Debate States**:
  - 🟡 **Waiting**: Participants joining
  - 🟢 **Active**: Debate in progress
  - 🟠 **Paused**: Temporarily stopped
  - ⚪ **Completed**: Debate finished
- **Creator Controls**: Start, pause, resume, end debates
- **Participant List**: See all participants with their sides
- **Real-Time Status**: Instant updates when status changes

### User Interface

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Clean Dashboard**: View all available debates at a glance
- **Intuitive Controls**: Easy-to-use timer and argument submission
- **Color-Coded Elements**: Visual distinction between types and states
- **Real-Time Indicators**: See who's currently speaking
- **Participant Panel**: Track all participants and their time
- **Argument Form**: Simple interface for adding arguments

---



### Sample Use Cases

1. **Educational Debates**: 
   - Professor creates "Climate Policy Debate"
   - 23 students join (10 Pro, 10 Con, 3 Neutral)
   - 100% participation achieved in 45 minutes
   - 23 arguments mapped with clear connections

2. **Corporate Meetings**:
   - Product manager creates "Q4 Strategy Discussion"
   - 8 team members join and contribute equally
   - Visual map shows all concerns and solutions
   - 30% reduction in meeting time

3. **Community Forums**:
   - Town hall on "New Park Development"
   - 50+ residents participate fairly
   - All viewpoints captured and visualized
   - Transparent time allocation

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | JavaScript runtime | 16+ |
| **Express.js** | Web application framework | 4.18+ |
| **MongoDB** | NoSQL database | 4.4+ |
| **Mongoose** | MongoDB object modeling | 8.0+ |
| **Socket.IO** | Real-time bidirectional communication | 4.6+ |
| **JWT** | JSON Web Token authentication | 9.0+ |
| **bcryptjs** | Password hashing | 2.4+ |

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | 18+ |
| **React Router** | Client-side routing | 6+ |
| **ReactFlow** | Node-based graph visualization | 11+ |
| **Socket.IO Client** | Real-time updates | 4.6+ |
| **Axios** | HTTP client | 1.6+ |
| **date-fns** | Date formatting | 3.0+ |
| **Lucide React** | Icon library | 0.294+ |

### Development Tools
- **nodemon**: Auto-restart development server
- **React Scripts**: Build tooling
- **dotenv**: Environment variables

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- ✅ **npm** or **yarn** - Comes with Node.js
- ✅ **Git** - For cloning the repository

### Step-by-Step Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Mehulposh/Debate-Room.git
cd debate-mapper
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
```

**Configure `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/debate-room
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

#### 3. Start MongoDB

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Linux (systemd):**
```bash
sudo systemctl start mongod
```

**Windows:**
```bash
net start MongoDB
```

#### 4. Start Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

#### 5. Frontend Setup

Open a **new terminal window**:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The application will automatically open at `http://localhost:8080`

### Docker Installation (Optional)

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🚀 Usage

### Creating Your First Debate

#### Step 1: Register an Account

1. Navigate to `http://localhost:8080/register`
2. Fill in the registration form:
   - **Username**: Choose a unique username (3-30 characters)
   - **Email**: Your email address
   - **Password**: Secure password (minimum 6 characters)
3. Click **"Register"**
4. You'll be automatically logged in and redirected to the debates page

#### Step 2: Create a Debate

1. Click the **"Create New Debate"** button
2. Fill in the debate form:
   - **Title**: Short, descriptive name (e.g., "Climate Policy Discussion")
   - **Topic**: The question or statement to debate (e.g., "Should carbon taxes be implemented?")
   - **Time Limit**: Seconds per speaker (default: 300 = 5 minutes)
3. Click **"Create Debate"**
4. You'll be taken to the debate room

#### Step 3: Share with Participants

- Copy the debate URL from your browser
- Share it with participants via email, Slack, etc.
- Participants can join as **Pro**, **Con**, or **Neutral**

#### Step 4: Start the Debate

As the debate creator:
1. Wait for participants to join
2. Click **"Start Debate"** when ready
3. The status changes to **Active** for all users

### Using the Timer

#### For Speakers:

**Starting Your Turn:**
1. Click the green **"Start Speaking"** button
2. The timer begins counting up
3. Progress bar shows time usage vs. limit
4. All participants see you're currently speaking

**Ending Your Turn:**
1. Click the red **"Stop Speaking"** button
2. Timer stops and records your segment
3. Total time updates automatically

**Time Indicators:**
- 🟢 **Green Progress Bar**: Within limit (0-79%)
- 🟡 **Yellow Progress Bar**: Approaching limit (80-99%)
- 🔴 **Red Progress Bar**: Exceeded limit (100%+)
- ⚠️ **Warning Message**: Displayed when over time

### Adding Arguments

#### Step 1: Select Argument Type

Choose from four types:
- **Claim**: Your main point or assertion
- **Evidence**: Supporting data, facts, or studies
- **Rebuttal**: Counter someone else's argument
- **Counter**: Alternative perspective or solution

#### Step 2: Write Your Argument

- Clear, concise statement (max 500 characters by default)
- Include specific facts or examples when possible
- Reference other arguments if needed

#### Step 3: Link to Parent (Optional)

- For **Evidence**, **Rebuttal**, or **Counter** types
- Select which argument you're responding to
- Creates visual connection in the map

#### Step 4: Submit

- Click **"Submit Argument"**
- Argument appears in the graph instantly
- All participants see it in real-time

### Navigating the Argument Map

**Controls:**
- 🖱️ **Pan**: Click and drag the background
- 🔍 **Zoom**: Mouse wheel or +/- buttons
- 👆 **Move Nodes**: Click and drag individual arguments
- 🎯 **Fit View**: Reset to see all arguments
- 🗺️ **Mini-Map**: Click to jump to specific area

**Understanding the Graph:**
- Each argument is represented as a **node**
- **Lines (edges)** show relationships between arguments
- **Node colors** indicate argument type:
  - 🔵 Blue = Claim
  - 🟢 Green = Evidence
  - 🟠 Orange = Rebuttal
  - 🔴 Pink = Counter
- **Arrows** show direction of relationship (parent → child)

### Managing Debates

#### As Debate Creator:

**Start**: Begin the debate when participants are ready
- Changes status from **Waiting** → **Active**
- Enables timers and argument submission

**Pause**: Temporarily stop the debate
- Changes status to **Paused**
- Timers are disabled
- Can still view arguments

**Resume**: Continue after pause
- Changes status back to **Active**
- Re-enables all features

**End**: Complete the debate
- Changes status to **Completed**
- All features become read-only
- Data is preserved for review

**Delete**: Remove the debate permanently
- ⚠️ Warning: This cannot be undone
- Removes all arguments and time data

#### As Participant:

**Join**: Choose your side before debate starts
- Pro, Con, or Neutral observer
- Can change side before debate starts (in Waiting status)

**Participate**: Use timer and add arguments
- Only available when status is **Active**

**Leave**: Exit the debate at any time
- Your arguments and time remain recorded

---

## 📁 Project Structure

```
debate-mapper/
│
├── backend/                    # Node.js/Express server
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── authController.js  # User authentication logic
│   │   └── debateController.js # Debate CRUD operations
│   │
│   ├── middleware/
│   │   └── auth.js            # JWT verification middleware
│   │
│   ├── models/
│   │   ├── User.js            # User schema & methods
│   │   └── Debate.js          # Debate schema with subdocuments
│   │
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication endpoints
│   │   └── debateRoutes.js    # Debate endpoints
│   │
│   ├── utils/
│   │   └── generateToken.js   # JWT token generator
│   │
│   ├── .env.example           # Environment template
│   ├── .gitignore             # Git ignore rules
│   ├── package.json           # Dependencies & scripts
│   └── server.js              # Entry point + Socket.IO setup
│
├── frontend/                   # React application
│   ├── public/
│   │   └── index.html         # HTML template
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ArgumentForm.js      # Add argument UI
│   │   │   ├── ArgumentMapper.js    # ReactFlow graph
│   │   │   ├── Navbar.js            # Top navigation
│   │   │   ├── ParticipantsList.js  # Participants panel
│   │   │   ├── PrivateRoute.js      # Route protection
│   │   │   └── Timer.js             # Speaking timer UI
│   │   │
│   │   ├── contexts/
│   │   │   ├── AuthContext.js       # Auth state management
│   │   │   └── SocketContext.js     # WebSocket connection
│   │   │
│   │   ├── pages/
│   │   │   ├── DebateRoom.js        # Main debate interface
│   │   │   ├── Debates.js           # Debate list/create
│   │   │   ├── Login.js             # Login form
│   │   │   ├── Profile.js           # User profile
│   │   │   └── Register.js          # Registration form
│   │   │
│   │   ├── App.js                   # Main app component
│   │   ├── index.css                # Global styles
│   │   └── index.js                 # React entry point
│   │
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Dependencies & scripts
│   └── README.md                    # Frontend documentation
│
├── .gitignore                       # Root git ignore
└── README.md                        # This file
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

Request Body:
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123"
}

Response: 201 Created
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "johndoe",
  "email": "john@example.com",
  "avatar": "https://via.placeholder.com/150",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "securepass123"
}

Response: 200 OK
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "johndoe",
  "email": "john@example.com",
  "avatar": "https://via.placeholder.com/150",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get User Profile
```http
GET /auth/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "johndoe",
  "email": "john@example.com",
  "avatar": "https://via.placeholder.com/150",
  "debatesParticipated": ["607f1f77bcf86cd799439012"],
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Update User Profile
```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "username": "johndoe_updated",
  "avatar": "https://example.com/new-avatar.jpg"
}

Response: 200 OK
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "johndoe_updated",
  "email": "john@example.com",
  "avatar": "https://example.com/new-avatar.jpg",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Debate Endpoints

#### Get All Debates
```http
GET /debates
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "_id": "607f1f77bcf86cd799439012",
    "title": "Climate Policy Debate",
    "topic": "Should governments implement carbon taxes?",
    "status": "active",
    "creator": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "avatar": "https://via.placeholder.com/150"
    },
    "participants": [...],
    "arguments": [...],
    "createdAt": "2024-01-15T14:00:00Z"
  }
]
```

#### Get Single Debate
```http
GET /debates/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "_id": "607f1f77bcf86cd799439012",
  "title": "Climate Policy Debate",
  "topic": "Should governments implement carbon taxes?",
  "status": "active",
  "timeLimit": 300,
  "creator": { ... },
  "participants": [ ... ],
  "speakerTimes": [ ... ],
  "arguments": [ ... ],
  "rules": { ... },
  "startedAt": "2024-01-15T14:10:00Z",
  "createdAt": "2024-01-15T14:00:00Z"
}
```

#### Create Debate
```http
POST /debates
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "title": "AI Ethics Debate",
  "topic": "Should AI development be regulated?",
  "timeLimit": 300,
  "rules": {
    "timePerSpeaker": 300,
    "allowInterruptions": false,
    "maxArgumentLength": 500
  }
}

Response: 201 Created
{
  "_id": "707f1f77bcf86cd799439013",
  "title": "AI Ethics Debate",
  "topic": "Should AI development be regulated?",
  "status": "waiting",
  "creator": "507f1f77bcf86cd799439011",
  "participants": [
    {
      "user": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "side": "pro",
      "joinedAt": "2024-01-15T15:00:00Z"
    }
  ],
  "createdAt": "2024-01-15T15:00:00Z"
}
```

#### Join Debate
```http
POST /debates/:id/join
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "side": "pro"  // "pro", "con", or "neutral"
}

Response: 200 OK
{
  "_id": "607f1f77bcf86cd799439012",
  "participants": [
    {
      "user": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "side": "pro",
      "joinedAt": "2024-01-15T14:00:00Z"
    },
    {
      "user": "607f1f77bcf86cd799439014",
      "username": "janedoe",
      "side": "con",
      "joinedAt": "2024-01-15T14:05:00Z"
    }
  ]
}
```

#### Add Argument
```http
POST /debates/:id/arguments
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "content": "Carbon taxes effectively reduce emissions",
  "type": "claim",  // "claim", "evidence", "rebuttal", "counter"
  "parentId": null,  // Optional: ID of parent argument
  "position": { "x": 100, "y": 50 }  // Optional: position on map
}

Response: 201 Created
{
  "_id": "607f1f77bcf86cd799439012",
  "arguments": [
    {
      "id": "arg_1705329600_abc123",
      "speaker": "507f1f77bcf86cd799439011",
      "speakerName": "johndoe",
      "content": "Carbon taxes effectively reduce emissions",
      "type": "claim",
      "parentId": null,
      "position": { "x": 100, "y": 50 },
      "timestamp": "2024-01-15T14:15:00Z"
    }
  ]
}
```

#### Update Debate Status
```http
PUT /debates/:id/status
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "status": "active"  // "waiting", "active", "paused", "completed"
}

Response: 200 OK
{
  "_id": "607f1f77bcf86cd799439012",
  "status": "active",
  "startedAt": "2024-01-15T14:10:00Z"
}
```

#### Update Speaker Time
```http
PUT /debates/:id/speaker-time
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "userId": "507f1f77bcf86cd799439011",
  "timeSegment": {
    "start": "2024-01-15T14:10:00Z",
    "end": "2024-01-15T14:12:05Z",
    "duration": 125000  // milliseconds
  }
}

Response: 200 OK
{
  "_id": "607f1f77bcf86cd799439012",
  "speakerTimes": [
    {
      "userId": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "totalTime": 125000,
      "segments": [
        {
          "start": "2024-01-15T14:10:00Z",
          "end": "2024-01-15T14:12:05Z",
          "duration": 125000
        }
      ]
    }
  ]
}
```

#### Delete Debate
```http
DELETE /debates/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Debate removed"
}
```

### Error Responses

All endpoints may return the following error responses:

```http
400 Bad Request
{
  "message": "Error description"
}

401 Unauthorized
{
  "message": "Not authorized, no token" 
}

404 Not Found
{
  "message": "Resource not found"
}

500 Internal Server Error
{
  "message": "Server error description"
}
```

---

## 🔄 Real-Time Events (Socket.IO)

### Connection

```javascript
// Client connects to Socket.IO server
const socket = io('http://localhost:5000');

// Server accepts connection
socket.on('connect', () => {
  console.log('Connected:', socket.id);
});
```

### Client → Server Events

#### Join Debate Room
```javascript
socket.emit('join-debate', debateId);
// Joins the specified debate room
// Multiple users can be in the same room
```

#### Leave Debate Room
```javascript
socket.emit('leave-debate', debateId);
// Leaves the debate room
// Automatic on disconnect
```

#### Start Timer
```javascript
socket.emit('start-timer', {
  debateId: '607f1f77bcf86cd799439012',
  userId: '507f1f77bcf86cd799439011',
  username: 'johndoe'
});
// Notifies all users that speaker started
```

#### Stop Timer
```javascript
socket.emit('stop-timer', {
  debateId: '607f1f77bcf86cd799439012',
  userId: '507f1f77bcf86cd799439011'
});
// Notifies all users that speaker stopped
```

#### New Argument
```javascript
socket.emit('new-argument', {
  debateId: '607f1f77bcf86cd799439012',
  argument: { ... }
});
// Broadcasts new argument to all users
```

#### Debate Status Change
```javascript
socket.emit('debate-status-change', {
  debateId: '607f1f77bcf86cd799439012',
  status: 'active'
});
// Broadcasts status change to all users
```

### Server → Client Events

#### Participant Joined
```javascript
socket.on('participant-joined', (data) => {
  console.log('New participant:', data.socketId);
  // Refresh participant list
});
```

#### Participant Left
```javascript
socket.on('participant-left', (data) => {
  console.log('Participant left:', data.socketId);
  // Update participant list
});
```

#### Timer Started
```javascript
socket.on('timer-started', (data) => {
  console.log('Timer started:', data);
  // data = { userId, username, timestamp }
  // Start local timer display
});
```

#### Timer Stopped
```javascript
socket.on('timer-stopped', (data) => {
  console.log('Timer stopped:', data);
  // data = { userId, duration, timeSegment }
  // Stop local timer display
  // Update total time
});
```

#### Argument Added
```javascript
socket.on('argument-added', (argument) => {
  console.log('New argument:', argument);
  // Add node to argument map
  // Update graph visualization
});
```

#### Status Changed
```javascript
socket.on('status-changed', (status) => {
  console.log('Debate status:', status);
  // Update UI based on new status
  // Enable/disable features
});
```

### Room Architecture

```
Debate Room: "607f1f77bcf86cd799439012"
├── Socket 1 (User A) - watching, not speaking
├── Socket 2 (User B) - currently speaking
├── Socket 3 (User C) - waiting to speak
└── Socket 4 (User D) - just added argument
```

- Each debate is a **Socket.IO room**
- Room ID = Debate ID
- Broadcasts only reach users in the same room
- Efficient targeting (no unnecessary network traffic)

---

## 📸 Screenshots

### Dashboard - View All Debates
![Dashboard](docs/images/dashboard.png)

### Debate Room - Main Interface
![Debate Room](docs/images/debate-room.png)

### Speaking Timer - Active State
![Timer](docs/images/timer.png)

### Argument Map - Visual Graph
![Argument Map](docs/images/argument-map.png)

### Participants Panel
![Participants](docs/images/participants.png)

### Mobile Responsive View
![Mobile](docs/images/mobile.png)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork the Repository**
   ```bash
   git fork https://github.com/yourusername/debate-mapper.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   # Backend tests
   cd backend
   npm test
   
   # Frontend tests
   cd frontend
   npm test
   ```

5. **Commit Your Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

6. **Push to Your Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Wait for code review

### Code Style Guidelines

**Backend (JavaScript/Node.js):**
- Use ES6+ syntax
- Async/await over callbacks
- Descriptive variable names
- Add JSDoc comments for functions

**Frontend (React):**
- Functional components with hooks
- Use Context API for state management
- Descriptive component names
- PropTypes for type checking

### Commit Message Format

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Example:**
```
feat(timer): add pause functionality

Add ability to pause timer mid-session
Store paused time and resume from same point

Closes #123
```

### Reporting Bugs

**Before submitting a bug report:**
- Check existing issues
- Test on latest version
- Gather reproduction steps

**Include in bug report:**
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

### Feature Requests

**Include in feature request:**
- Clear use case
- Proposed solution
- Alternative solutions considered
- Mockups or examples (if applicable)

---

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

#### 2. Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Find process using the port
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

#### 3. JWT Token Invalid

**Error:**
```
401 Unauthorized: Not authorized, token failed
```

**Solution:**
1. Clear browser localStorage
2. Log in again
3. Verify JWT_SECRET is consistent in .env
4. Check token expiration time

#### 4. Socket Not Connecting

**Error:**
```
WebSocket connection failed
```

**Solution:**
1. Check CORS settings in `server.js`
2. Verify Socket.IO client version matches server
3. Check firewall settings
4. Test on localhost first

#### 5. Arguments Not Appearing in Map

**Possible Causes:**
- Socket.IO not connected
- Debate status not "active"
- User not joined debate
- Browser console errors

**Solution:**
1. Check browser console for errors
2. Verify debate status is "active"
3. Confirm Socket.IO connection
4. Reload page and try again

#### 6. Timer Not Syncing

**Possible Causes:**
- Multiple tabs open
- Network latency
- Socket.IO connection lost

**Solution:**
1. Close duplicate tabs
2. Check network connection
3. Verify Socket.IO is connected
4. Check server logs for errors

### Debug Mode

Enable detailed logging:

**Backend:**
```javascript
// server.js
const DEBUG = true;

if (DEBUG) {
  console.log('Socket event:', eventName, data);
}
```

**Frontend:**
```javascript
// SocketContext.js
socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.onAny((event, ...args) => {
  console.log('Socket event:', event, args);
});
```

### Performance Issues

**Large debates (50+ arguments):**
- Enable virtualization in ReactFlow
- Limit visible nodes
- Implement pagination

**High latency:**
- Check network speed
- Use production build
- Enable compression
- Consider CDN for static assets

### Getting Help

**Resources:**
- 📚 [Full Documentation]
- 💬 [Discord Community](https://discord.gg/debatemapper)
- 🐛 [Issue Tracker](https://github.com/Mehulposh/Debate-Room/issues)
- 📧 [Email Support](mehulposhattiwar4995@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

✅ **Permissions:**
- Commercial use
- Modification
- Distribution
- Private use

❌ **Limitations:**
- Liability
- Warranty

📋 **Conditions:**
- License and copyright notice

---

## 🙏 Acknowledgments

### Technologies
- **ReactFlow** - Excellent graph visualization library
- **Socket.IO** - Making real-time communication simple
- **MongoDB** - Flexible document storage
- **Express.js** - Minimal and robust web framework

### Inspiration
- Academic debate platforms
- Argument mapping software
- Collaborative whiteboarding tools

### Contributors
Thanks to all contributors who have helped improve this project!

[View Contributors](https://github.com/Mehulposh/Debate-Room/graphs/contributors)

---

## 🌐 Links

- **GitHub**: [https://github.com/Mehulposh/Debate-Room]https://github.com/Mehulposh/Debate-Room)
- **Issue Tracker**: [https://github.com/Mehulposh/Debate-Room/issues](https://github.com/Mehulposh/Debate-Room/issues)

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/debate-mapper?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/debate-mapper?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/debate-mapper)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/debate-mapper)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/debate-mapper)

---

<div align="center">

**Built with ❤️ using the MERN stack**

*Made by developers, for debaters*

[⬆ Back to Top](#debate-timer--argument-mapper)

</div>
