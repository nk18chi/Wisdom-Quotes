# Lerna-MERN-Stack-BoilerPlate

https://github.com/nk18chi/lerna-mern-stack-boilerplate/assets/42604585/b4bbc605-a1fe-4464-acf1-40a9c668b232

## Requirements

Node: v20.10.0

## Tech Stack

- Typescript
- Github Actions
- Lerna

### Components

- Storybook
- Material UI
- Emotion (CSS in JS)
- Jest
- React Testing Library

### Frontend

- Next
- React
- Vitest
- React Testing Library
- Playwright

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

Please replace @nk18chi with your github account in an entire repository
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
