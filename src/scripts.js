import './css/styles.css';
import './images/pin.png'

import {
    promises,
    fetchUserData,
    // fetchTravelerById
  } from './apiCalls'

  import {
    displayDestinationOptions,
  } from './domUpdates'

  import {
    getDestinationsList,
  } from './helper-functions'

  var dataModel = {}

  window.addEventListener('load', () => {
    Promise.all(promises)
    .then(response => {
      dataModel.traveler = response[0]
      dataModel.trips = response[1]
      dataModel.destinations = response[2]
      // dataModel.currentUser = findUser(dataModel.traveler.id)
  })
    .then(data => {
      getDestinationsList()
      displayDestinationOptions()
    })
  })

  export { dataModel }