
// calculates the worldwide total cases in app.js
export const calculateWorldwideTotalCases = obj => {
    if (obj === undefined) {
      return null
    } else {
      const arrayObject = obj.map(result => {
        return result.cases.total
      })
      // console.log(arrayObject)
      const total = arrayObject.reduce((a, b) => a + b / 2)
      const roundedTotal = Math.round(total).toLocaleString()
      return roundedTotal
    }
  }

// calculates worldwide total deaths in app.js
  export const calculateWorldwideTotalDeaths = obj => {
    if (obj === undefined) {
      return null
    } else {
      const arrayObject = obj.map(result => {
        return result.deaths.total
      })
      const deathTotal = arrayObject.reduce((a, b) => a + b / 2)
      const roundedDeathTotal = Math.round(deathTotal).toLocaleString()
      return roundedDeathTotal
    }
  }

  // takes in api ?country=${query} object response, converts to an array, reverses it, then creates new array
  export const convertObject = obj => {
    if (obj === undefined) {
        return null
    } else {
        const objectArray = Object.entries(obj).slice(0, 75).reverse()
        const arrayObject = objectArray.map(([key, value]) => {
            return value
        })
        return arrayObject
    }
}