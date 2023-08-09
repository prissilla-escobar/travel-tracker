import './css/styles.css';
import './images/pin.png'

import {
    promises,
    fetchUserData,
    // fetchTravelerById
  } from './apiCalls'

  import {
    displayDestinationOptions,
    displayUser,
    displayTotalCost,
    displayTrips,
  } from './domUpdates'

  import {
    getDestinationsList,
  } from './helper-functions'

  import {
    getUserData,
    currentUser,
    getUserPastDestinations,
    getUserPendingDestinations,
    getUserUpcomingDestinations,
    calculateYearlyCost
  } from './data-model'

  var dataModel = {}

  window.addEventListener('load', () => {
    Promise.all(promises)
    .then(response => {
      dataModel.traveler = response[0]
      dataModel.trips = response[1]
      dataModel.destinations = response[2]
      dataModel.currentUser = getUserData(48, response[0])
      getUserPastDestinations(48, response[1])
      getUserPendingDestinations(48, response[1])
      getUserUpcomingDestinations(48, response[1])
      calculateYearlyCost(48, response[1], response[2])
  })
    .then(data => {
      getDestinationsList()
      displayDestinationOptions()
      displayUser(dataModel.currentUser)
      displayTotalCost(dataModel.currentUser)
      displayTrips(dataModel)
    })
    .catch(error => console.log('ERROR', error))
  })

  document.addEventListener('click', (e) => {
    e.preventDefault()
    const targetElement = e.target
    if (targetElement.id === 'exploration-request-submit') {

      const startingDate = new Date(document.getElementById('date-selection').value)
      const totalDays = document.getElementById('days-count').value
      const travelerCount = document.getElementById('traveler-count').value
      const destination = document.getElementById('destination-list').value

      const destinationObject = dataModel.destinations.destinations.find(dest => dest.destination === destination);
      const destinationID = destinationObject ? destinationObject.id : null;

      const formattedDate = startingDate.toISOString().substring(0, 10).replace(/-/g, '/')


      let newTrip = {
        id: dataModel.trips.trips.length + 1,
        userID: dataModel.currentUser.id,
        destinationID: destinationID ,
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
            displayTrips(dataModel.currentUser)
        })
    })
    .catch(error => console.log('ERROR', error))
  }

  export { dataModel }