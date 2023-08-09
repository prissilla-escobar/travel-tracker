let currentUser

const getUserData = ((userId, dataList) => {
    let filteredByID = dataList.travelers.find(user => user.id === userId)

    if (!filteredByID) {
        return 'Invalid User'
    }

    currentUser = filteredByID
    return currentUser
})

const getUserTripsData = (currentUser, dataModel) => {
    if (!dataModel.trips.trips.some(trip => trip.userID === currentUser.id)) {
        return 'Invalid User'
    }

    const filteredDestinations = dataModel.destinations.destinations.filter(dest => {
        return dataModel.trips.trips.some(trip => {
            return trip.destinationID === dest.id && trip.userID === currentUser.id
        })
    })

    const pastDestinations = filteredDestinations.filter(dest => {
        return dataModel.trips.trips.some(trip => {
            return trip.destinationID === dest.id && trip.userID === currentUser.id && trip.status === 'approved' && new Date(trip.date) < new Date()
        })
    })

    const pendingDestinations = filteredDestinations.filter(dest => {
        return dataModel.trips.trips.some(trip => {
            return trip.destinationID === dest.id && trip.userID === currentUser.id && trip.status === 'pending'
        })
    })

    const upcomingDestinations = filteredDestinations.filter(dest => {
        return dataModel.trips.trips.some(trip => {
            return trip.destinationID === dest.id && trip.userID === currentUser.id && trip.status === 'approved' && new Date(trip.date) >= new Date()
        })
    })

    if (!dataModel.trips.trips.some(trip => trip.userID === currentUser.id)) {
        return 'Invalid User'
    }

    const userTrips = {
        destinations: {
            past: pastDestinations,
            pending: pendingDestinations,
            upcoming: upcomingDestinations
        }
    }

    return userTrips
}

const calculateYearlyCost = (currentUser, dataModel) => {
    if (!dataModel || !Array.isArray(dataModel.trips.trips)) {
        return 'Invalid Data'
    }
    if (!dataModel.trips.trips.some(trip => trip.userID === currentUser.id)) {
        return 'Invalid User'
    }
    const tripsYearToDate = dataModel.trips.trips.filter(trip => {
            return (
                trip.userID === currentUser.id &&
                trip.status === 'approved' &&
                new Date(trip.date) < new Date() &&
                new Date(trip.date) > new Date('2023/01/01')
                )
        })
    
    if (tripsYearToDate.length === 0) {
        return '$0 - Time to start booking!'
    }
    
    const totalCost = tripsYearToDate.reduce((acc, trip) => {
        const dest = dataModel.destinations.destinations.find(place => trip.destinationID === place.id)

        if (dest) {
            const tripCost =
                (trip.travelers * dest.estimatedFlightCostPerPerson) +
                (trip.duration * dest.estimatedLodgingCostPerDay)
            return acc + tripCost
        } else {
            return acc
        }
    }, 0)
        return totalCost * 1.1
}

export {
    getUserData,
    calculateYearlyCost,
    getUserTripsData,
    currentUser,
}



