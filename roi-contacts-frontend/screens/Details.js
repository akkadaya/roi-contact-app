import { useRoute } from '@react-navigation/native'
import { Text, View } from 'react-native'

export const Details = () => {
    const route = useRoute()
    let p = route.params

    return (
        <View>
            <Text>Contact Information</Text>
            <Text>ID: {p._id}</Text>
            <Text>Email: {p.email}</Text>
            <Text>
                Name: {p.firstName} {p.lastName}
            </Text>
            <Text>Age: {p.age}</Text>
        </View>
    )
}
