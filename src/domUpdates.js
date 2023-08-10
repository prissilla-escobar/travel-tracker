import {
    destinations
  } from './helper-functions'

  import {
    calculateYearlyCost,
    getUserTripsData,
    estimateTripCost,
    findRecentPostDesination
  } from './data-model'
import { dataModel } from './scripts'

  var destinationOptions = document.querySelector('#destinations')
  var welcome = document.querySelector('.lets-explore')
  var totalCost = document.querySelector('.total-cost')
  var pastTrips = document.querySelector('.display-past-trips')
  var pendingTrips = document.querySelector('.display-pending-trips')
  var upcomingTrips = document.querySelector('.display-upcoming-trips')
  var estimationContainer = document.querySelector('.estimation-container')
  var startingDate = new Date(document.getElementById('date-selection').value)
  var totalDays = document.getElementById('days-count').value
  var travelerCount = document.getElementById('traveler-count').value
  var destination = document.getElementById('destination-list').value

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

    welcome.innerText = `Where to next, ${firstNameOnly[0]}?!`
  }

  const displayTotalCost = (currentUser, dataModel) => {
    const cost = calculateYearlyCost(currentUser, dataModel)
    totalCost.innerText = ''
    totalCost.innerText += `${cost}`
  }

  const displayTrips = (currentUser, dataModel) => {
    const places = getUserTripsData(currentUser, dataModel)
    const pastPlaces = places.destinations.past.map(dest => {return dest.destination}).map(place => `> ${place} <br>`).join('')

    const pendingPlaces = places.destinations.pending.map(dest => {return dest.destination}).map(place => `> ${place} <br>`).join('')
    const upcomingPlaces = places.destinations.upcoming.map(dest => {return dest.destination}).map(place => `> ${place} <br>`).join('')
    
    pastTrips.innerHTML = ''
    if (pastPlaces.length === 0) {
      pastTrips.innerHTML = `You do not have any past explorations! <br> Don\'t let this box be empty anymore, go explore!`
    } else {
      pastTrips.innerHTML += `
       ${pastPlaces}
      `
    }
    pendingTrips.innerHTML = ''
    if (pendingPlaces.length === 0) {
      pendingTrips.innerHTML += 'You do not have any pending explorations!'
      } else {
        pendingTrips.innerHTML += `
       ${pendingPlaces}
      `
      }

    upcomingTrips.innerHTML = ''
    if (upcomingPlaces.length === 0) {
          upcomingTrips.innerHTML += `You do not have any upcoming explorations!<br> Time to start exploring!`
      } else {
        upcomingTrips.innerHTML += `
        ${upcomingPlaces}
        `
      }
  }

  const displayEstimatedTripRequestCost = (dataModel) => {
    const estimatedCost = estimateTripCost(dataModel)
    const destination = findRecentPostDesination(dataModel)
    const agentFee = estimatedCost * 0.1
    const total = agentFee + estimatedCost
    estimationContainer.innerHTML = ''
    estimationContainer.innerHTML += `
      <div class="estimation-title">Estimated Cost for ${destination} Trip:</div>
      <div>
        <text>Subtotal: $${estimatedCost}<text><br>
        <text>Agent Fee: $${agentFee}<text><br>
        <text>Grand Total: $${total}<text>
      </div>
      `
  }

  const renderPageLoad = (dataModel) => {
    displayDestinationOptions()
    displayUser(dataModel.currentUser)
    displayTotalCost(dataModel.currentUser, dataModel)
    displayTrips(dataModel.currentUser, dataModel)
    displayEstimatedTripRequestCost(dataModel)
  }
  
  export {
    displayDestinationOptions,
    displayUser,
    displayTotalCost,
    displayTrips,
    renderPageLoad,
    displayEstimatedTripRequestCost,
    startingDate,
    totalDays,
    travelerCount,
    destination
  }