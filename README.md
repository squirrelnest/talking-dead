# talking-dead

## Summary

Read garbled messages from beyond the grave with this responsive, infinite-scrolling, touch-enabled message viewer app made for mobile and desktop.

## Dependencies

* React 16
* Redux
* Redux-thunk
* create-react-app
* Babel
* Webpack
* NodeJS
* Cypress

## Usage

Visit https://bit.ly/2UdgKEo or https://talking-dead.firebaseapp.com/ to view in browser.
On mobile, swipe left or right to dismiss a message.
On desktop, hover over message and click the 'X' that appears in upper right corner of the card.
Scroll down or dismiss messages to load more messages.

## Setup Development Environment

1. Download source files
2. Navigate to project directory
3. run `npm install`
4. run `npm start`
7. If on desktop, open a browser and navigate to localhost:4000
8. If on mobile, connect your mobile device to the same wi-fi network as your local machine
9. Open a mobile browser and navigate to [your IP address]:4000

## My Process

1. Gather design and functional specs
2. Gather assets - images, icons, etc.
3. Layout elements with HTML
4. Define dynamically generated HTML DOM element objects with Javascript
5. Style elements with CSS to match mockups
6. Read MDN docs and blog posts on touch events
7. Attach event listeners
8. Define event handlers
9. Create CSS transitions and animations
10. Experiment with a few different interaction styles
11. Clean up unused or unnecessary code
12. Break up code into reusable chunks
13. Deploy to host server (in my case, Heroku)
14. Test remotely hosted app on mobile device
15. Make changes and test on locally hosted app before re-deploying to production

## TODO

This code is by no means polished or complete. Shortcuts were made due to time constraints.
Here are some areas for improvement:

* Add keyboard events to move between messages
* Support other browsers and devices - this app was only tested on Chrome browsers on Pixel 2, Pixel 3 XL, and a Mac laptop
* Handle vertical swipes
* Add unit testing
