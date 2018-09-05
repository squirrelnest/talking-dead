# Autopia

React web app for merchandising automobiles

## Features Implemented

- [x] A Car Listing Page
  - [x] The car listing page displays a list of cars retrieved from the vehicle index API endpoint provided. At least the following information should be made available to the user:
    - [x] Vehicle Make, Model, Trim, and Year
    - [x] Car Image
    - [x] Start Fee and Monthly Fee
  - [x] Pagination with Infinite Scrolling
  - [x] When clicking on a specific car, redirect the user to the car detail page.
- [x] Car Detail Page
  - [x] Load the vehicle data from the vehicle specific API endpoint
    - [x] Only two of the vins have valid stubs. For other requests, implement proper API error handling.
  - [x] Showcase the vehicle.
  - [x] Implement a car images gallery for browsing through all images of the car.
  - [x] Implement a mileage slider to allow viewing of different prices based on mileage selected.
- [x] Vehicle Favoriting
  - [x] User is able to favorite and unfavorite cars on the car listing and car details page.
  - [x] Favorites are tracked and persisted locally.
  - [x] The favorites on the car listing and vehicle detail page are in sync.
- [x] Testing
  - [x] Unit tests
  - [x] Integration tests

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs dependencies.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

### `npm test`

Launches the unit test runner.

### `npm test:cypress`

Launches the integration test runner.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.<br>
The build is minified and the filenames include the hashes.<br>

### `npm run eject`

If you aren’t satisfied with the create-react-app build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project. This is a one-way operation that cannot be undone.
