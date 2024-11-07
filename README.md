# movieGig

**movieGig** is a movie tracking app that allows users to explore, track, and save movies to their watchlist.

## Getting Started

Follow the instructions below to set up and start the project.

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed.
- [TMDb API Key](https://www.themoviedb.org/documentation/api) (for frontend).

### Setup

- **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd movieGig```
   

-  **Backend Configuration:**

    - In the root folder, create a .env file and add the following environment variables:
        ```bash
        DATABASE_URL=your_database_url
        JWT_SECRET=your_jwt_secret
        NODE_ENV=development
        ```

- **Frontend Configuration:**
    - Navigate to the frontend folder and create a .env file.
    - Add the following environment variable:
        ```bash 
        VITE_API_KEY=your_tmdb_api_key
        ```
    ***Note: You can get your TMDb API Key from the [TMDb website](https://developer.themoviedb.org/docs/getting-started).***

- **Install Dependencies:**
    - In the root folder, install all dependencies:
        ```bash
        npm install
        ```

-  **Setup Database Schema:**
    - Run the following command to apply the database migrations in backend directory:
        ```bash
        npx prisma migrate dev
        ```

-  **Run the Application:**
    - To start the backend, in the root folder, run:
        ```bash
        npm run dev
        ```
    - Start the frontend, navigate to the frontend folder and run:
        ```bash
        npm run dev
        ```


