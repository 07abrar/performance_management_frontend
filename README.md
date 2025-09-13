# Performance Management Frontend

This repository contains the **frontend** for the Performance Management application.  
The frontend is built with **React + TypeScript** (via Create React App) and runs inside a **Docker container** with Yarn as the package manager.

---

## Prerequisites
- [Node.js](https://nodejs.org) (for local dev if not using Docker)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

### Install Yarn
If Yarn is not installed, install it globally using npm:
```bash
npm install -g yarn
```
Verify installation:
```bash
yarn --version
```

---

## Project Setup

### 1. Initialize React App
Inside the empty cloned repo:
```bash
yarn create react-app . --template typescript
```

This generates:
- `package.json` and `yarn.lock`
- `src/` and `public/` folders
- CRA scripts:  
  - `yarn start` → start dev server  
  - `yarn build` → production build  
  - `yarn test` → run tests  

Verify locally:
```bash
yarn start
```
Open <http://localhost:3000>.

---

### 2. Dockerize the App

#### `.dockerignore`
```gitignore
node_modules
.git
.gitignore
npm-debug.log
yarn-error.log
dist
build
```

#### `Dockerfile`
```dockerfile
FROM node:20
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
```

#### `docker-compose.yml`
```yaml
version: "3.9"
services:
  frontend:
    build: .
    container_name: performance-frontend
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    stdin_open: true
    tty: true
```

---

### 3. Run with Docker
Build and start the container:
```bash
docker compose up --build
```
Visit <http://localhost:3000> to see the app.

Stop with:
```bash
docker compose down
```

---

### 4. Git Setup
Add and commit files:
```bash
git add .
git commit -m "Initialize React frontend with Docker setup"
git push origin main
```

---

## Next Steps
- Add backend service (FastAPI + PostgreSQL).
- Integrate API calls into the frontend.
- Add CI/CD workflows.
