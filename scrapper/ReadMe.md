
# Virtual Lawyer Scraper

This project is a web scraper built using TypeScript, Express, and Puppeteer. It retrieves and processes legislation data, which can then be used as part of a larger LangChain agent project. The project was created for self-learning purposes.
The main idea is keeping that project in a private network, so the scraper will be used to retrieve the data and send it to the agent. For that reason, there is no authentication in the API.

### TODO
The project is still in development, so there are some features that need to be implemented:
- [ ] to handle multiple requests at the same time add a queue system
- [ ] to handle the queue system, add a database to store the requests, return back a request id, and then the agent can check the status of the request
- [ ] implement Docker support to containerize the application for easier deployment and scalability. This includes creating a `Dockerfile` and a `docker-compose.yml` file for local development and production environments.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)

## Installation

Follow these steps to set up the project:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file based on the example `.env.example` provided in the repository.

## Usage

To run the project in development mode, use the following command:

```bash
npm run dev
```

This will start the server with `nodemon`, so it automatically restarts when you make changes to the source code.

For production, you can build the project with:

```bash
npm run build
npm start
```

## API Endpoints
You can find the API documentation via [openApi.json](openApi.json) file in the root directory.

## Project Structure

```
virtual_lawyer/
├── scrapper/
│   ├── app/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── enums/
│   │   ├── models/
│   │   ├── helpers/
│   ├── tests/
│   ├── req/
│   ├── tsconfig.json
│   ├── package.json
│   ├── openApi.json
│   ├── Readme.md
```

### Folder Details
- `app/`: Contains all application logic (controllers, services, enums, routes).
  - `controllers/`: Defines the application logic for handling requests.
  - `services/`: Contains the business logic for processing legislation data.
  - `routes/`: Defines the API routes.
  - `enums/`: Contains enums used within the project.
  - `models/`: Defines the data models used within the project.
  - `helpers/`: Contains helper functions that assist in processing legislation data.
- `tests/`: Contains test files for verifying the functionality of the API.
- `req/`: Defines API request examples.
- `tsconfig.json`: TypeScript compiler configuration.
- `package.json`: Project dependencies and scripts.
