import './css/styles.css'
import './images/pin.png'

import {
    promises,
    fetchUserData,
    // fetchTravelerById
  } from './apiCalls'

  import {
    renderPageLoad,
  } from './domUpdates'

  import {
    getDestinationsList,
  } from './helper-functions'

  import {
    getUserData,
    calculateYearlyCost,
    getUserTripsData,
    estimateTripCost,
    findRecentPostDesination
  } from './data-model'

  var dataModel = {}

  window.addEventListener('load', () => {
    Promise.all(promises)
    .then(response => {
      dataModel.traveler = response[0]
      dataModel.trips = response[1]
      dataModel.destinations = response[2]
      dataModel.currentUser = getUserData(37, response[0])
      calculateYearlyCost(dataModel.currentUser, dataModel)
      getUserTripsData(dataModel.currentUser, dataModel)
      getDestinationsList()
      estimateTripCost(dataModel)
      findRecentPostDesination(dataModel)
  })
    .then(data => {
      renderPageLoad(dataModel)
    })
    .catch(error => console.log('ERROR', error))
  })

  document.addEventListener('click', (e) => {
    e.preventDefault()
    const targetElement = e.target
    if (targetElement.id === 'exploration-request-submit') {
      
      var startingDate = new Date(document.getElementById('date-selection').value)
      var totalDays = document.getElementById('days-count').value
      var travelerCount = document.getElementById('traveler-count').value
      var destination = document.getElementById('destination-list').value

      const destinationObject = dataModel.destinations.destinations.find(dest => dest.destination === destination)
      const destinationID = destinationObject ? destinationObject.id : null

      const formattedDate = startingDate.toISOString().substring(0, 10).replace(/-/g, '/')

      let newTrip = {
        id: dataModel.trips.trips.length + 1,
        userID: dataModel.currentUser.id,
        destinationID: destinationID,
        travelers: travelerCount,
        date: formattedDate,
        duration: totalDays,
        status: 'pending',
        suggestedActivities: []
      }
      postTripRequest(newTrip)
    }
  })

  const postTripRequest = (newTrip) => {
    return fetch('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(newTrip),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response from server', data)
        fetchUserData('trips')
        .then(data => {
            dataModel.trips = data
            renderPageLoad(dataModel)
        })
    })
    .catch(error => console.log('ERROR', error))
  }

  export { dataModel }