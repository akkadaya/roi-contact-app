import AsyncStorage from '@react-native-async-storage/async-storage'

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

export const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@contacts_key', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@contacts_key')
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        console.log(e)
    }
}
