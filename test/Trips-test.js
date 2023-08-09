import { expect } from 'chai'

import {
    calculateYearlyCost,
    getUserTripsData
} from '../src/data-model'

import {sampleTripsData} from '../src/sample-data/sampleTripsData';
import { sampleDestinationsData } from '../src/sample-data/sampleDestinationsData';

describe('Trips Information', () => {
    let currentUser, invalidDataList, invalidDataListTest

    beforeEach(() => {
        invalidDataList = {users:[{}]}
    })

      it('Should calculate total spent for the year', () => {
        let userOneCosts = calculateYearlyCost(1, sampleTripsData, sampleDestinationsData)

        expect(userOneCosts).to.equal(8580)
      })

      it('Should return Invalid User if user does not exist', () => {
        let invalidUser = calculateYearlyCost(62, sampleTripsData, sampleDestinationsData)
    
        expect(invalidUser).to.equal('Invalid User')
      })

      it('Should return message if there are no travels for the year', () => {
        let userOneCosts = calculateYearlyCost(3, sampleTripsData, sampleDestinationsData)

        expect(userOneCosts).to.equal('$0 - Time to start booking!')
      })

      it('Should return an array of objects of destinations', () => {
        let userOneDestinations = getUserTripsData(1, sampleDestinationsData, sampleTripsData)

        expect(userOneDestinations).to.be.an('object')
      })
})