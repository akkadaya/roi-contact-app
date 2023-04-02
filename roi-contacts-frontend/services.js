export const createPerson = async (data) =>
    fetch('http://localhost:3000/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then((response) => response.json())

export const getPeople = async () =>
    fetch('http://localhost:3000/contacts').then((response) => response.json())

export const updatePerson = (id, data) =>
    fetch(`http://localhost:3000/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then((response) => response.json())

export const deletePerson = (id) =>
    fetch(`http://localhost:3000/contacts/${id}`, { method: 'DELETE' })
