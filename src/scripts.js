import './css/styles.css';
import './images/turing-logo.png'

import {
    promises,
    fetchUserData,
    fetchTravelerById
  } from './apiCalls'

  var dataModel = {
    userId: userId,
    pastTrips: [],
    upcomingTrips: [],
    pendingTrips: [],
    totalSpent: totalSpent

  }

  export { dataModel }