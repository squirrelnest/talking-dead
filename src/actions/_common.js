/* HELPER FUNCTIONS SHARED BY MULTIPLE ACTIONS AND REDUCERS */

export function checkHttpStatus(response) {
  if (!response.ok) {
      throw new xhrError({
        type: response.status,
        message: 'Http Status not OK',
        response,
      })
    }
  return response
}

export default class xhrError extends Error {
  constructor({ type, message, response = {} }) {
    super({ type, message, response })
    this.type = type
    this.message = message
    this.response = response

    this.name = 'xhrError'
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

export function alphabetized(a, b) {
  if (a.id > b.id) {
    return 1
  } else if (a.id < b.id) {
    return -1
  } else {
    return 0
  }
}

export function formatDate(date) {

  var dateObject = new Date(date)
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return `${monthNames[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`

}

export function formatDateTime(dateTime) {

  var dateObject = new Date(dateTime)
  var ampm = dateObject.getHours() < 12 ? 'AM' : 'PM'
  var hoursBase12 = dateObject.getHours() % 12 || 12
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return `${hoursBase12}:${dateObject.getMinutes()}${ampm} ${monthNames[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`

}

export function flattenArray(array) {
    var result = []
    array.forEach(function (a) {
        result.push(a)
        if (Array.isArray(a.children)) {
            result = result.concat(flattenArray(a.children))
        }
    });
    return result
}

export function flattenObject(object) {
	var toReturn = {}

	for (var i in object) {
		if (!object.hasOwnProperty(i)) continue

		if ((typeof object[i]) === 'object') {
			var flatObject = flattenObject(object[i])
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue

				toReturn[i + '.' + x] = flatObject[x]
			}
		} else {
			toReturn[i] = object[i]
		}
	}
	return toReturn
}
