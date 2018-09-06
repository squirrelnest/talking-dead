# Autopia

React web app for merchandising automobiles

## Features Implemented

- [x] Car Listing Page
  - [x] The car listing page displays a list of cars retrieved from the vehicle index API endpoint provided. At least the following information should be made available to the user:
    - [x] Vehicle Make, Model, Trim, and Year
    - [x] Car Image
    - [x] Start Fee and Monthly Fee
  - [x] Pagination with Infinite Scrolling
  - [x] When clicking on a specific car, redirect the user to the car detail page.
- [x] Car Detail Page
  - [x] Load the vehicle data from the vehicle specific API endpoint
    - [x] Only two of the vins have valid stubs. For other requests, implement proper API error handling.
  - [x] Showcase the vehicle
  - [x] Images gallery for browsing through all images of the car
  - [x] Mileage slider to allow viewing of different prices based on mileage selected
  - [x] Placeholders for car image urls that are no longer working
- [x] Vehicle Favoriting
  - [x] User is able to favorite and unfavorite cars on the car listing and car details page
  - [x] Favorites are tracked and persisted locally
  - [x] The favorites on the car listing and vehicle detail page are in sync
- [x] Cool UX Animation
  - [x] Progress Loading Indicator
  - [x] Hover States
- [x] Responsive Design for optimal viewing on desktop or mobile
- [ ] Logging with Google Analytics
- [ ] Automated Testing
  - [ ] Unit tests
  - [ ] Integration tests

## Technical Tradeoffs

1) Cars data is stored as an array, rather than object, mainly so I can show off the infinite scrolling/pagination feature.

  Rationale: Because the API sends data with non-unique keys, merging new data with the old data produces no increase in the number of elements to display in the car listing, obviating the need for pagination. Furthermore, the use case for the car listing is to show cars - not update or delete cars. Hence, it is okay in this case to use an array. However, if the API had more unique records or our use case changed to require finding cars by ID, I would prefer to use an object containing car objects keyed to their VIN (or other unique identifier).

  Downsides: Duplicate records are shown. Arrays require iteration to find the desired element, which is slower and less performant with large amounts of data than selecting an element from an object by its key.

  Upsides: I'm able to demo the infinite scrolling/pagination feature. And fetching more cars is faster because I don't have to rename the keys to make sure they're all unique.

2) Storing favorites in localStorage rather than server-side

  Rationale: I don't have permissions to POST the favorites to the server-side database, which would be the best place to save user data that needs to persist across sessions, pages, and devices. I could save the favorites in global state, but the Redux store loses favorites on refresh unless I save global state to localStorage and rehydrate the app with data from localStorage. Either way, I'd have to store favorites in localStorage. If storing favorites in the backend were possible, I would abstract storage from business logic and denormalize favorites data into the cars data. This would mean adding 'favorite' and 'unfavorite' actions that update the server-side database, adding a 'favorited' key to the car objects and optionally serializing that key into the Redux store.

  Downsides: Favorites are not shared across the user's other devices because they are saved on the local machine.

  Upside: Favorites are synchronized across the Car Listing and Car Detail pages. Separation of concerns - the redux side of the app is concerned solely with managing global state and getting data to and from external sources.

## Risks / Todos

Scalability
  - may need sass in the future if visual design choices change frequently
  - favorites are not shared across the user's other devices

Security
  - no user authentication

Accuracy
  - will need to replace placeholder formula with actual pricing formula based on mileage

Test Coverage
  - only partial coverage was given due to time constraints

UX
  - have not checked for aria compliance
  - have not checked for cross-browser compatibility

Build
  - might need to eject CRA (create-react-app) if we need custom build configuration
  - API endpoints should be moved to a config file as it's likely the hostname differs based on environment

Backend
  - should filter out broken image URLS before sending data out to frontend
  - VINS should be unique - don't send out duplicate data

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
