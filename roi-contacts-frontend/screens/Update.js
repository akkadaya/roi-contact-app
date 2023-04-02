import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { FormField } from '../components/FormField'

export const Update = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { person } = route.params

    const [form, setForm] = useState({
        firstName: person?.firstName,
        lastName: person?.lastName,
        number: person?.address?.number,
        street: person?.address?.street,
        postcode: person?.address?.postcode
    })

    const fields = [
        { label: 'First Name', stateField: 'firstName' },
        { label: 'Last Name', stateField: 'lastName' },
        { label: 'Street Number', stateField: 'number' },
        { label: 'Street Name', stateField: 'street' },
        { label: 'Postcode', stateField: 'postcode' }
    ]

    const onSave = () => {
        const data = {
            // _id: person?._id,
            firstName: form.firstName,
            lastName: form.lastName,
            address: {
                number: form.number,
                street: form.street,
                postcode: form.postcode
            }
        }

        fetch(`http://localhost:3000/contacts/${person._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((p) => navigation.navigate('List', { data: p, action: 'update' }))
            .catch((e) => console.error('Error:', e))
    }

    return (
        <ScrollView>
            <View style={styles.contentContainer}>
                <View style>
                    {fields.map((field, index) => (
                        <FormField
                            key={index}
                            form={form}
                            setForm={setForm}
                            label={field.label}
                            stateField={field.stateField}
                        />
                    ))}
                </View>
                <PrimaryButton
                    label={'Update'}
                    onPress={onSave}
                />
                <SecondaryButton
                    label={'Cancel'}
                    onPress={navigation.goBack}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 20,
        marginLeft: 20
    },
    label: {
        fontSize: 16
    },
    textInput: {
        maxWidth: 200,
        borderRadius: 5,
        borderWidth: 1
    }
})
