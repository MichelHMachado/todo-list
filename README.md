# ToDo Application

## Description

This repository contains the code for a ToDo application built using Vue.js 2, Vuex, Bootstrap, Node.js, and Postgres. The project was extended beyond the basic requirements to include JWT authentication, token refresh, and a database to persist tasks and user data.

### Objectives

Develop a ToDo application with Vue.js 2 that allows users to manage a list of tasks with features like creating, editing, deleting, filtering, and database storage. The challenge also focuses on state management with Vuex and performance optimization techniques.

### Technical decisions

- **State Management**: The application uses Vuex to manage the state, actions, and mutations, improving state handling and data flow across the project.
- **Modularization**: Organize actions, mutations, and state into two modules (auth and tasks) for clarity.
- **Authentication**: JWT authentication is implemented following security best practices, including token refresh functionality. However, some advanced security measures were not implemented due to the project's simplicity.
- **Data Persistence**: Task data is persisted in postgres database since the job description mentioned the use of SQL databases. All task interaction is handled in database, since creation to updating competition status.

### Bonus Points

1. **Large Data Set Simulation**: Implement mock tasks functionality to enable testers to observe how the application handles large data sets.
2. **Search Feature**: Allow the user to quick search for a task.
3. **Optimized Rendering**: Use RecycleScroller from vue-virtual-scroller to improve large data rendering. And lazy loading for components.

### Technologies Used

- Frontend: Vue.js 2, Vuex, Vue Router, BootstrapVue, vue-virtual-scroller.
- Backend: Node.js, Express.js, Sequelize, JWT, Postgres.
- Docker: Docker Compose for containerized development.

### Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/MichelHMachado/todo-list.git
   cd todo-list
   ```
2. Run with docker
   ```
   docker-compose up --build
   ```

The frontend will be accessible on http://localhost:8080
The backend will be accessible on http://localhost:5000

### For running outside docker:

1. Navigate to the frontend directory:
   cd backend

2. Install dependencies
   run npm install

3. Run the backend app:
   npm run start

4. The server will be accessible on http://localhost:5000

5. Navigate to root directory
   cd ..

6. Navigate to frontend
   cd Front

7. Install dependencies
   run npm install

8. Run the frontend app:
   npm run serve

9. The frontend will be accessible on http://localhost:8080

### Contact

- Email: michelhmachado@gmail.com
