
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

  // calculates the worldwide critical cases in app.js
export const calculateWorldwideCriticalCases = obj => {
  if (obj === undefined) {
    return null
  } else {
    const arrayObject = obj.map(result => {
      return result.cases.critical
    })
    // console.log(arrayObject)
    const total = arrayObject.reduce((a, b) => a + b / 2)
    const roundedTotalActiveCases = Math.round(total).toLocaleString()
    return roundedTotalActiveCases
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

  export const calculateWorldwideActiveCases = obj => {
    if (obj === undefined) {
      return null
    } else {
      const arrayObject = obj.map(result => {
        return result.cases.active
      })
      const activeCases = arrayObject.reduce((a, b) => a + b / 2)
      const roundedTotalActiveCases = Math.round(activeCases).toLocaleString()
      return roundedTotalActiveCases
    }
  }

  // export const calculateLast7DaysofWorldwideActiveCases = obj => {
  //   if (obj === undefined) {
  //     return null
  //   } else {
  //     const arrayObject = obj.map(result => {
  //       return result.cases.active
  //     })
  //     const activeCases = arrayObject.reduce((a, b) => a + b / 2)
  //     const roundedTotalActiveCases = Math.round(activeCases).toLocaleString()
  //     return roundedTotalActiveCases
  //   }
  // }

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