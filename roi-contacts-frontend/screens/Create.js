import { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createPerson } from '../services'

export const Create = () => {
    const navigation = useNavigation()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')
    const [street, setStreet] = useState('')
    const [postcode, setPostcode] = useState('')

    const save = () => {
        let data = {
            firstName,
            lastName,
            password,
            address: {
                number,
                street,
                postcode
            }
        }

        createPerson(data)
            .then((j) => navigation.navigate('List', { data: j, action: 'create' }))
            .catch((e) => console.error('Error:', e))
    }

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
            <Text>Password:</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
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
