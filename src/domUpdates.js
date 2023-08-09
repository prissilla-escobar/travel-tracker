import {
    dataModel
  } from '../src/scripts'

  import {
    destinations
  } from './helper-functions'

  var destinationOptions = document.querySelector('#destinations')

  const displayDestinationOptions = () => {
    destinations.forEach(place => {
        destinationOptions.innerHTML += `
        <option value="${place}">
        `
    })
  }

  export {
    displayDestinationOptions
  }