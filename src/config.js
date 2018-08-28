// API DOMAINS

let backendHost

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  backendHost = 'https://interviewapi3.apiblueprint.org'

} else if (hostname === 'dev.fair.com') {
  backendHost = 'https://interviewapi3.apiblueprint.org'

} else if (hostname === 'test.fair.com') {
  backendHost = 'https://interviewapi3.apiblueprint.org'

} else if (hostname === 'fair.com') {
  backendHost = 'https://interviewapi3.apiblueprint.org'
}

export const API_HOST = `${backendHost}`
