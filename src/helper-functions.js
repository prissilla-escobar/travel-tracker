import {
    dataModel
  } from '../src/scripts'

const destinations = []
  
const getDestinationsList = () => {
  let destinationsArray = dataModel.destinations.destinations
  destinationsArray.map((destination) => {
      if(destination.destination) {
          destinations.push(destination.destination)
      }
      destinations.sort()
  })
  return destinations
}

  export {
    getDestinationsList,
    destinations,
  }