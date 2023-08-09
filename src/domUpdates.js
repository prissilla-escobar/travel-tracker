import {
    destinations
  } from './helper-functions'

  import {
    calculateYearlyCost,
    getUserTripsData,
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

  const renderPageLoad = (dataModel) => {
    displayDestinationOptions()
    displayUser(dataModel.currentUser)
    displayTotalCost(dataModel.currentUser, dataModel)
    displayTrips(dataModel.currentUser, dataModel)
  }
  
  export {
    displayDestinationOptions,
    displayUser,
    displayTotalCost,
    displayTrips,
    renderPageLoad
  }