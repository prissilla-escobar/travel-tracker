let currentUser

const getUserData = ((userId, dataList) => {
    let filteredByID = dataList.travelers.find(user => user.id === userId)

    if (!filteredByID) {
        return 'Invalid User'
    }

    currentUser = filteredByID
    return currentUser
})

// const userTripsData = ((currentUser, destinationsDataList, tripsDataList) => {
//     let filteredByID = destinationsDataList.destinations.reduce((acc, curr) => {
//         if (curr.id === tripsDataList.trips.destinationID && currentUser.id === tripsDataList.trips.userID) {
//             acc.push(currentUser.destinations = {
//                 past: [],
//                 pending: [],
//                 upcoming: []
//             })
//             currentUser.destinations.past.push(curr)
//         }
//         // return acc
//         console.log(acc)
//     }, [])
//     return filteredByID
// })

const getUserPastDestinations = ((userID, dataList) => {
    if (!dataList.trips.some(trip => trip.userID === userID)) {
        return 'Invalid User'
    }
    const pastDestinations = dataList.trips.filter(trip => {
         return trip.userID === userID && new Date(trip.date) < new Date()
    })
    const sortedPastDestinations = pastDestinations.sort((a,b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateB - dateA
    })
    
    return sortedPastDestinations
})

const getUserPendingDestinations = ((userID, dataList) => {
    if (!dataList.trips.some(trip => trip.userID === userID)) {
        return 'Invalid User'
    }
    const pendingDestinations = dataList.trips.filter(trip => {
        return trip.userID === userID && trip.status === 'pending'
    })

    if (pendingDestinations.length === 0) {
        return 'You do not have any pending explorations!'
    }

    const sortedPendingDestinations = pendingDestinations.sort((a,b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateA - dateB
    })
    return sortedPendingDestinations
})

const getUserUpcomingDestinations = ((userID, dataList) => {
    if (!dataList.trips.some(trip => trip.userID === userID)) {
        return 'Invalid User'
    }
    const upcomingDestinations = dataList.trips.filter(trip => {
        return trip.userID === userID && trip.status === 'approved' && new Date(trip.date) > new Date()
    })

    if (upcomingDestinations.length === 0) {
        return 'You do not have any upcoming explorations! Time to start exploring!'
    }

    const sortedUpcomingDestinations = upcomingDestinations.sort((a,b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateA - dateB
    })
    return sortedUpcomingDestinations
})

const calculateYearlyCost = (userID, dataList, destinations) => {
    if (!dataList.trips.some(trip => trip.userID === userID)) {
        return 'Invalid User'
    }
    const tripsYearToDate = dataList.trips.filter(trip => {
            return (
                trip.userID === userID &&
                trip.status === 'approved' &&
                new Date(trip.date) < new Date() &&
                new Date(trip.date) > new Date('2023/01/01')
                )
        })
    
    if (tripsYearToDate.length === 0) {
        return '$0 - Time to start booking!'
    }
    
    const totalCost = tripsYearToDate.reduce((acc, trip) => {
        const dest = destinations.destinations.find(place => trip.destinationID === place.id)

        if (dest) {
            const tripCost =
                (trip.travelers * dest.estimatedFlightCostPerPerson) +
                (trip.duration * dest.estimatedLodgingCostPerDay)
            return acc + tripCost
        } else {
            return acc
        }
    }, 0);
        return totalCost * 1.1
}

export {
    getUserData,
    getUserPastDestinations,
    getUserPendingDestinations,
    getUserUpcomingDestinations,
    calculateYearlyCost,
    // userTripsData,
    currentUser,
}



