# Lerna-MERN-Stack-BoilerPlate

## Requirements

Node: v20.10.0

## Tech Stack

- Typescript
- Docker
- Github Actions
- Lerna

### Components

- Storybook
- Material UI
- Emotion (CSS in JS)
- React Testing Library

### Frontend

- Next
- React
- React Testing Library
- Cypress

### Backend

- Nest
- GraphQL
- Prisma
- MongoDB
- Jest
- mongodb-memory-server

## Initialization

```
nvm use v20
npm install lerna -g
git clone git@github.com:nk18chi/lerna-mern-stack-boilerplate.git
npm install
lerna run dev
```

## Development

```
nvm use v20
lerna run dev --parallel

components: http://localhost:6006/
frontend: http://localhost:3000/
backend: http://localhost:4000/
```

## Add a New Package
```
lerna create ${packageName}
```