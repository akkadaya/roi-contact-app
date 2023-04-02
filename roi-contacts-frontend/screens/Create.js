import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { FormField } from '../components/FormField'
import { createPerson } from '../services'

export const Create = () => {
    const navigation = useNavigation()

    const [form, setForm] = useState({
        name: '',
        phone: '',
        department: '',
        street: '',
        city: '',
        state: '',
        postcode: '',
        country: ''
    })

    const onSave = () => {
        const data = {
            name: form.name,
            phone: form.phone,
            department: form.department,
            address: {
                street: form.street,
                city: form.city,
                state: form.state,
                postcode: form.postcode,
                country: form.country
            }
        }

        createPerson(data)
            .then((j) => navigation.navigate('List', { data: j, action: 'create' }))
            .catch((e) => console.error('Error:', e))
    }

    const fields = [
        { label: 'Full Name', stateField: 'name' },
        { label: 'Phone', stateField: 'phone' },
        { label: 'Department', stateField: 'department' },
        { label: 'Street', stateField: 'street' },
        { label: 'City', stateField: 'city' },
        { label: 'State', stateField: 'state' },
        { label: 'Postcode', stateField: 'postcode' },
        { label: 'Country', stateField: 'country' }
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
