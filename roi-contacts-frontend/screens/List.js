import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ThemeContext } from '../ThemeContext'
import { getPeople } from '../services'

export const List = () => {
    const { navigate } = useNavigation()
    const { params } = useRoute()
    const style = useContext(ThemeContext)

    const [people, setPeople] = useState([])

    useEffect(() => {
        switch (params?.action) {
            case 'create':
                setPeople((prev) => [...prev, params.data])
                break
            case 'update':
                setPeople((prev) => prev.map((p) => (p._id == params.data._id ? params.data : p)))
            case 'delete':
                setPeople((prev) => prev.filter((p) => p._id != params.data._id))
                break
            default:
                getPeople().then((json) => setPeople(json))
                break
        }
    }, [params])

    return (
        <View style={style.appBackground}>
            <Pressable
                onPress={() => navigate('Create')}
                style={styles.addContactButton}
            >
                <Text style={styles.addContactButtonText}>Add Contact</Text>
            </Pressable>
            {people.map((person) => (
                <ContactTile
                    key={person._id}
                    person={person}
                />
            ))}
        </View>
    )
}

const ContactTile = (props) => {
    const { navigate } = useNavigation()
    const style = useContext(ThemeContext)

    const { person } = props

    return (
        <View style={styles.contactTile}>
            <Text>
                {person.lastName}, {person.firstName}
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <Pressable
                    onPress={() => navigate('Details', person)}
                    style={styles.contactButton}
                >
                    <MaterialCommunityIcons
                        name='account-details'
                        size={24}
                        color='black'
                    />
                </Pressable>
                <Pressable
                    onPress={() => navigate('Update', person)}
                    style={styles.contactButton}
                >
                    <MaterialCommunityIcons
                        name='account-edit'
                        size={24}
                        color='black'
                    />
                </Pressable>
                <Pressable
                    onPress={() => navigate('Delete', person)}
                    style={styles.contactButton}
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

const styles = StyleSheet.create({
    contactTile: {
        backgroundColor: '#fff',
        color: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 5,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        shadowOffset: { height: 5, width: 5 },
        shadowOpacity: 0.4,
        shadowColor: '#000'
    },
    contactButton: {
        padding: 10,
        margin: 5,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10
    },
    addContactButton: {
        padding: 10,
        margin: 5,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: '#ff6a00'
    },
    addContactButtonText: {
        fontSize: 32,
        textAlign: 'center'
    }
})
