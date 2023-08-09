import { expect } from 'chai';

import {
    getUserPastDestinations,
    getUserPendingDestinations,
    getUserUpcomingDestinations,
    calculateYearlyCost,
    // userTripsData
} from '../src/data-model'

import {sampleTripsData} from '../src/sample-data/sampleTripsData';
import { sampleDestinationsData } from '../src/sample-data/sampleDestinationsData';

describe('Trips Information', () => {
    let currentUser, invalidDataList, invalidDataListTest

    beforeEach(() => {
        invalidDataList = {users:[{}]}
    })

    it('Should return user past trips by ID', function() {
        let userOne = getUserPastDestinations(4, sampleTripsData)
        let userTwo = getUserPastDestinations(3, sampleTripsData)

        expect(userOne).to.be.an('array')
        expect(userOne[3].date).to.equal("2022/09/16")
        expect(userTwo).to.be.an('array')
        expect(userTwo[3]).to.deep.equal({id: 8, userID: 3, destinationID: 39, travelers: 6, date: "2022/02/07", duration: 4, status: "approved", suggestedActivities: []})
    })

    it('Should return Invalid User if user does not exist', () => {
        let invalidUser = getUserPastDestinations(62, sampleTripsData)
    
        expect(invalidUser).to.equal('Invalid User')
      })

      it('Should return user pending trips by ID', () => {
        let userOne = getUserPendingDestinations(5, sampleTripsData)

        expect(userOne).to.be.an('array')
        expect(userOne[0].date).to.equal("2023/10/04")
        expect(userOne[0]).to.deep.equal({id: 2, userID: 5, destinationID: 25, travelers: 5, date: "2023/10/04", duration: 18, status: "pending", suggestedActivities: []})
    })

    it('Should return Invalid User if user does not exist', () => {
        let invalidUser = getUserPendingDestinations(62, sampleTripsData)
    
        expect(invalidUser).to.equal('Invalid User')
      })

      it('Should return message if there are no pending trips', () => {
        let userOne = getUserPendingDestinations(4, sampleTripsData)

        expect(userOne).to.equal('You do not have any pending explorations!')
      })

      it('Should return user upcoming trips by ID', () => {
        let userOne = getUserUpcomingDestinations(1, sampleTripsData)

        expect(userOne).to.be.an('array')
        expect(userOne[0].date).to.equal("2024/02/12")
      })

    it('Should return Invalid User if user does not exist', () => {
        let invalidUser = getUserUpcomingDestinations(62, sampleTripsData)
    
        expect(invalidUser).to.equal('Invalid User')
      })

      it('Should return message if there are no pending trips', () => {
        let userOne = getUserUpcomingDestinations(4, sampleTripsData)

        expect(userOne).to.equal('You do not have any upcoming explorations! Time to start exploring!')
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

        expect(userOneCosts).to.equal('$0. Time to start booking!')
      })

    //   it('Should return an array of objects of destinations', () => {
    //     let userOneDestinations = userTripsData(1, sampleDestinationsData, sampleTripsData)

    //     expect(userOneDestinations).to.be.an('array')
    //   })
})