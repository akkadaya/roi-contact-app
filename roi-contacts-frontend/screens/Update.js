import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { FormField } from '../components/FormField'
import { updatePerson } from '../services'

export const Update = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { person } = route.params

    const [form, setForm] = useState({
        name: person.name,
        phone: person.phone,
        department: person.department,
        street: person.address.street,
        city: person.address.city,
        state: person.address.state,
        postcode: person.address.postcode,
        country: person.address.country
    })

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

    const onSave = () => {
        const data = {
            name: form.name.trim(),
            phone: form.phone.replace(/ /g, ''),
            department: form.department.trim(),
            address: {
                street: form.street.trim(),
                city: form.city.trim(),
                state: form.state.trim(),
                postcode: form.postcode.trim(),
                country: form.country.trim()
            }
        }

        updatePerson(person._id, data)
            .then((p) => navigation.navigate('List', { data: p, action: 'update' }))
            .then(alert(`${person.name} Updated successfully!`))
            .catch((e) => console.error('Error:', e))
    }

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
        marginLeft: 20,
        alignItems: 'center'
    }
})
