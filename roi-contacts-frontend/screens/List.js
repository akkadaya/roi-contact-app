import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { ThemeContext } from '../App'
import { getPeople } from '../services'

export const List = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const style = useContext(ThemeContext)

    const [people, setPeople] = useState([])

    useEffect(() => {
        switch (route.params?.action) {
            case 'create':
                setPeople((prev) => [...prev, route.params.data])
                break
            case 'update':
                setPeople((prev) => prev.map((p) => (p._id == route.params.data._id ? route.params.data : p)))
            case 'delete':
                setPeople((prev) => prev.filter((p) => p._id != route.params.data._id))
                break
            default:
                getPeople().then((json) => setPeople(json))
                break
        }
    }, [route.params])

    return (
        <View>
            <Pressable
                onPress={() => navigation.navigate('Create')}
                style={{ padding: 10, margin: 5, borderColor: '#000', borderWidth: 1 }}
            >
                <Text>Add Contact</Text>
            </Pressable>
            {people.map((p) => (
                <ContactButton
                    key={p._id}
                    person={p}
                />
            ))}
        </View>
    )
}

const ContactButton = (props) => {
    const navigation = useNavigation()
    const style = useContext(ThemeContext)

    let p = props.person
    return (
        <View style={style.contactTile}>
            <Text>
                {p.firstName} , {p.lastName}
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <Pressable
                    onPress={() => navigation.navigate('Details', p)}
                    style={{ padding: 10, margin: 5, borderColor: '#000', borderWidth: 1 }}
                >
                    <MaterialCommunityIcons
                        name='account-details'
                        size={24}
                        color='black'
                    />
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('Update', p)}
                    style={{ padding: 10, margin: 5, borderColor: '#000', borderWidth: 1 }}
                >
                    <MaterialCommunityIcons
                        name='account-edit'
                        size={24}
                        color='black'
                    />
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('Delete', p)}
                    style={{ padding: 10, margin: 5, borderColor: '#000', borderWidth: 1 }}
                >
                    <MaterialCommunityIcons
                        name='delete-forever'
                        size={24}
                        color='black'
                    />
                </Pressable>
            </View>
        </View>
    )
}
