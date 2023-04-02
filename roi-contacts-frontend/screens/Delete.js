import { useNavigation, useRoute } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { PrimaryButton, SecondaryButton } from '../components/Button'

export const Delete = () => {
    const route = useRoute()
    const { person } = route.params
    const navigation = useNavigation()

    const submit = () => {
        fetch(`http://localhost:3000/contacts/${person._id}`, { method: 'DELETE' })
            .then((r) => navigation.navigate('List', { action: 'delete', data: person }))
            .catch((e) => console.error(e.message))
    }

    return (
        <View style={styles.contentContainer}>
            <Text>
                Are you sure you want to delete {person.firstName} {person.lastName}
            </Text>
            <SecondaryButton
                onPress={submit}
                label={'Delete'}
            />
            <PrimaryButton
                onPress={navigation.goBack}
                label={'Go Back'}
                // style={{ backgroundColor: 'orange' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 20,
        marginLeft: 20,
        alignItems: 'center'
    }
})
