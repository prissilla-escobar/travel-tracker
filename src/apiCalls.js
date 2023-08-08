export const fetchUserData = (dataType) => {
    return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then(res => res.json())
}

export const fetchTravelerById = (userId) => {
    return fetch(`http://localhost:3001/api/v1/travelers/${userId}`)
}

export const promises = [
    fetchUserData('travelers'),
    fetchUserData('trips'),
    fetchUserData('destinations'),
    fetchUserData('travelers'),
    fetchTravelerById(userId)
]