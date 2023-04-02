import { useNavigation, useRoute } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { deletePerson } from '../services'

export const Delete = () => {
    const route = useRoute()
    const { person } = route.params
    const navigation = useNavigation()

    const submit = () => {
        deletePerson(person?._id)
            .then((r) => {
                navigation.navigate('List', { action: 'delete', data: person })
                alert(`${person.name} Updated successfully!`)
            })
            .catch((e) => {
                alert(e.message)
                console.log(e.message)
            })
    }

    return (
        <View style={styles.contentContainer}>
            <Text style={styles.deleteMsg}>
                Are you sure you want to delete {'\n'}
                {person?.name}?
            </Text>
            <View style={styles.buttons}>
                <SecondaryButton
                    onPress={submit}
                    label={'Delete'}
                />
                <PrimaryButton
                    onPress={navigation.goBack}
                    label={'Go Back'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center'
    },
    deleteMsg: {
        fontSize: 24,
        marginTop: 20,
        marginBottom: 20
    },
    buttons: {
        width: '75%',
        alignItems: 'center'
    }
})
