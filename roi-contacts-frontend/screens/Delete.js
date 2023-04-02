import { useNavigation, useRoute } from '@react-navigation/native'
import { Pressable, Text, View } from 'react-native'

export const Delete = () => {
    const route = useRoute()
    let p = route.params
    const navigation = useNavigation()

    const submit = () => {
        fetch(`http://localhost:3000/contacts/${p._id}`, { method: 'DELETE' })
            .then((r) => navigation.navigate('List', { action: 'delete', data: p }))
            .catch((e) => console.error(e.message))
    }

    return (
        <View>
            <Text>
                Are you sure you want to delete {p.firstName} {p.lastName}
            </Text>
            <Pressable onPress={submit}>
                <Text>Delete</Text>
            </Pressable>
        </View>
    )
}
