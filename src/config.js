// API DOMAINS

let backendHost
let frontendHost

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  backendHost = 'https://interviewapi3.apiblueprint.org'
  frontendHost = 'http://localhost:4000'

} else if (hostname === 'dev.fair.com') {
  backendHost = 'https://interviewapi3.apiblueprint.org'

} else if (hostname === 'test.fair.com') {
  backendHost = 'https://interviewapi3.apiblueprint.org'

} else if (hostname === 'fair.com') {
  backendHost = 'https://interviewapi3.apiblueprint.org'
}

export const API_HOST = `${backendHost}`
export const UI_HOST = `${frontendHost}`
