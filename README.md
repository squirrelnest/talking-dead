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
4. run `npm run dev`
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

## Explanation of Design Choices

I used React instead of React Native as I wanted this app to work on both mobile and desktop. Also, I had some homegrown UI components already built out from an earlier project that used React. Reusing these components and a preexisting project structure saved me time so I could focus on building out functionality.

I tried to adhere to the unidirectional, top-down data flow encouraged by React as it's easier to debug. However, I strayed from the unidirectional pattern when handling swipe interactions because I noticed state updates during touch events caused noticeable lags as the app would repeatedly re-render. I opted to bypass the virtual DOM and manipulate the underlying DOM nodes directly. This reduced stuttering and facilitated smoother swiping.

For CSS transforms, I used translate3d() instead of translate() because translate3d() activates hardware acceleration, resulting in faster rendering on most browsers. I chose to replicate the swipe gesture from Google Inbox as closely as possible. I set a threshold for swipes in order to prevent accidental dismissal of a message. The swipe needs to move a certain amount across the screen to register as a dismissive swipe. If I had more time, I would animate the remaining messages to slide up to fill the void left by a dismissed message.

As for application state, I used Redux instead of global variables to handle any external data (such as API responses) shared across multiple components. Redux's opinionated nature enforces one-way data flow - having a single source of truth for application data ensured no component consumes stale data from a previous instance of the data store. Redux also enables logging of actions and state to help identify points of failure.

I used an array to store each batch of messages returned by the API. Each batch is appended to the array and stored client-side, which risks exceeding the browser's memory or processing capacity. During testing, I encountered performance lags after having loaded a large number of cards. One possible solution would be to limit the amount of messages displayed in the DOM by discarding the first thousand or so DOM elements containing messages that the user had scrolled past. If the user scrolls back up to those older messages, we can retrieve the old messages from the Javascript engine's memory in batches and re-render them as DOM elements.

My simple password protection is not very secure (it's not even hashed). It was only meant to restrict traffic and the app does not hold any sensitive information at this stage of development. I initially used Firebase Authentication but replaced it when I learned that I cannot see or record the contact information of members on the review panel.

As for my infrastructure choices, I chose Firebase to host my app because it is free and I wanted to learn how to use Firebase.

## TODO

This code is by no means polished or complete. Shortcuts were made due to time constraints.
Here are some areas for improvement:

* Add keyboard events to move between messages
* Support other browsers and devices - this app was only tested on Chrome browsers on Pixel 2, Pixel 3 XL, and a Mac laptop
* Handle vertical swipes
* Add unit testing
* Order messages by date/time
* Animate remaining messages to slide up when filling the void left by a dismissed message
