// API DOMAINS

let backendHost
let frontendHost

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  backendHost = '//message-list.appspot.com'
  frontendHost = '//localhost:4000'
} else if (hostname === 'message-list.appspot.com') {
  backendHost = '//message-list.appspot.com'
}

export const API_HOST = `${backendHost}`
export const UI_HOST = `${frontendHost}`
