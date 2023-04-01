import { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

export const Update = () => {
    //navigation
    const navigation = useNavigation()
    const route = useRoute()
    let p = route.params
    //state
    const [firstName, setFirstName] = useState(p.firstName)
    const [lastName, setLastName] = useState(p.lastName)
    const [number, setNumber] = useState(p.address.number)
    const [street, setStreet] = useState(p.address.street)
    const [postcode, setPostcode] = useState(p.address.postcode)
    //functions
    const save = () => {
        let data = { _id: p._id, firstName, lastName, address: { number, street, postcode } }

        fetch(`http://localhost:3000/contacts/${p._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((j) => navigation.navigate('List', { data: j, action: 'update' }))
            .catch((e) => console.error('Error:', e))
    }
    //JSX
    return (
        <View>
            <Text>First Name:</Text>
            <TextInput
                value={firstName}
                onChangeText={setFirstName}
            />

            <Text>Last Name:</Text>
            <TextInput
                value={lastName}
                onChangeText={setLastName}
            />
            <Text>ADDRESS:</Text>
            <Text>Number:</Text>
            <TextInput
                value={number}
                onChangeText={setNumber}
            />
            <Text>Street:</Text>
            <TextInput
                value={street}
                onChangeText={setStreet}
            />
            <Text>Postcode:</Text>
            <TextInput
                value={postcode}
                onChangeText={setPostcode}
            />

            <Pressable onPress={save}>
                <Text>Save</Text>
            </Pressable>
        </View>
    )
}
