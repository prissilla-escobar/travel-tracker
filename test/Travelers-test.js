import { expect } from 'chai'

import {
    getUserData,
} from '../src/data-model'

import {sampleTravelersData} from '../src/sample-data/sampleTravelersData'

describe('User Information', () => {
    let currentUser, invalidDataList, invalidDataListTest

    beforeEach(() => {
        invalidDataList = {users:[{}]}
    })

    it('Should return user info by ID', function() {
        let userOne = getUserData(1, sampleTravelersData)
        let userTwo = getUserData(3, sampleTravelersData)

        expect(userOne).to.be.an('object')
        expect(userOne.name).to.equal("Ham Leadbeater")
        expect(userOne.travelerType).to.equal("relaxer")
        expect(userTwo).to.be.an('object')
        expect(userTwo.name).to.equal("Sibby Dawidowitsch")
        expect(userTwo.travelerType).to.equal("shopper")
    })

    it('Should return Invalid User if user does not exist', () => {
        let invalidUser = getUserData(62, sampleTravelersData)
    
        expect(invalidUser).to.equal('Invalid User')
      })
})
