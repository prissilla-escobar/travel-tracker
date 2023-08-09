import {
    dataModel
  } from '../src/scripts'

  import {
    destinations
  } from './helper-functions'

  import {
      calculateYearlyCost,
    currentUser, getUserPastDestinations
  } from './data-model'

  var destinationOptions = document.querySelector('#destinations')
  var welcome = document.querySelector('.lets-explore')
  var totalCost = document.querySelector('.total-cost')
  var pastTrips = document.querySelector('.display-past-trips')
  var pendingTrips = document.querySelector('.display-pending-trips')
  var upcomingTrips = document.querySelector('.display-upcoming-trips')

  const displayDestinationOptions = () => {
    destinations.forEach(place => {
        destinationOptions.innerHTML += `
        <option value="${place}">
        `
    })
  }

  const displayUser = (currentUser) => {
    let wholeName = currentUser.name
    let firstNameOnly = wholeName.split(' ')

    welcome.innerText = `Where to next, ${firstNameOnly[0]}`
  }

  const displayTotalCost = (currentUser) => {
    const cost = calculateYearlyCost(currentUser.id, dataModel.trips, dataModel.destinations)
    totalCost.innerText = ''
    totalCost.innerText += `${cost}`
  }

  const displayTrips = (dataModel) => {
    const past = getUserPastDestinations(dataModel.currentUser.id, dataModel.trips)
    console.log(past)

    const pastTripsData = past.map(user => user.destinationID)
    console.log(pastTripsData)
  
    const ubicaciones = dataModel.destinations.destinations.filter(trip => {
        let ubicacion = []
        const test = pastTripsData.forEach(id => {
            if (currentUser.destinationID === id) {
            ubicacion.push(trip)
            }
        })
    })
    console.log(ubicaciones)

    pastTrips.innerHTML = ''
    pastTrips.innerHTML = `${pastTripsData}<br>`
    
}

  export {
    displayDestinationOptions,
    displayUser,
    displayTotalCost,
    displayTrips
  }