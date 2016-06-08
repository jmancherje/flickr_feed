## Features
- **Flickr API Images** - 20 Images from Flickr updated every minute or by clicking a button.
- **Pagination** - Custom built pagination dynamic pagination that links to Redux state for displaying number of pages and items per page.
- **Authentication** - Certain routes and functionality protected using JWT and custom higher order Redux components.
- **User Content** - 'Favorite' images to save them in mongoDb database referenced by user profile.
- **Responsive** - Combination of custom media queries and bootstrap 4 classes for fully responsive design accross the app.
- **UX** - Utilize redux thunk, redux store, and local state to render spinners during async operations.
- **Testing Suite** - Unit testing suite testing reducers and logic.

## How to Run Locally
1. `npm install` (installs dependencies for client and server separately)
2. `npm start` (to start up the API on http://localhost:8787/)
3. `npm run dev` (to run webpack server)
3. Navigate to `http://localhost:8080` in your browser :+1:

## How to run Tests
**Run tests once with:**
- `npm run test`

**Keep tests running with:**
- `npm run test:watch`

## Tech Stack
**Client**
- React
- Redux
- Bootstrap 4

**Server**
- Node
- Express
- Mongodb with Mongoose

## Deployed Link
http://flickrfeed.herokuapp.com/