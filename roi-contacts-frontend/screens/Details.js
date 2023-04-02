import { useRoute } from '@react-navigation/native'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export const Details = () => {
    const route = useRoute()
    const { person } = route.params

    return (
        <ScrollView>
            <View style={styles.contentContainer}>
                <Text style={styles.header}>Contact Information</Text>
                <View>
                    <Text style={styles.label}>ID: {person._id}</Text>
                    <Text>Email: {person.email}</Text>
                    <Text>
                        Name: {person.firstName} {person.lastName}
                    </Text>
                    <Text>Age: {person.age}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        margin: 20
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10
    },
    detailsContent: {},
    label: {
        fontSize: 16,
        fontWeight: '500'
    }
})
