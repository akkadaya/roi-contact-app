let token

export const login = async (data) =>
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((j) => {
            token = j.token
            return token
        })

export const createPerson = async (data) =>
    fetch('http://localhost:3000/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
    }).then((response) => response.json())

export const getPeople = async () =>
    fetch('http://localhost:3000/contacts', {
        headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.json())
