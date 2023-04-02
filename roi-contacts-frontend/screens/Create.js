import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { FormField } from '../components/FormField'
import { createPerson } from '../services'

export const Create = () => {
    const navigation = useNavigation()

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        password: '',
        number: '',
        street: '',
        postcode: ''
    })

    const onSave = () => {
        const data = {
            firstName: form.firstName,
            lastName: form.lastName,
            address: {
                number: form.number,
                street: form.street,
                postcode: form.postcode
            }
        }

        createPerson(data)
            .then((j) => navigation.navigate('List', { data: j, action: 'create' }))
            .catch((e) => console.error('Error:', e))
    }

    const fields = [
        { label: 'First Name', stateField: 'firstName' },
        { label: 'Last Name', stateField: 'lastName' },
        { label: 'Street Number', stateField: 'number' },
        { label: 'Street Name', stateField: 'street' },
        { label: 'Postcode', stateField: 'postcode' }
    ]

    return (
        <ScrollView>
            <View style={styles.contentContainer}>
                {fields.map((field, index) => (
                    <FormField
                        key={index}
                        form={form}
                        setForm={setForm}
                        label={field.label}
                        stateField={field.stateField}
                    />
                ))}

                <PrimaryButton
                    label={'Save'}
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
    }
})
