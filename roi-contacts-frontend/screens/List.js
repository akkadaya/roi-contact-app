import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { getData, getPeople, storeData } from '../services'

export const List = () => {
    const { navigate } = useNavigation()
    const { params } = useRoute()

    const [people, setPeople] = useState([])

    useEffect(() => {
        ;(async () => {
            switch (params?.action) {
                case 'create':
                    setPeople((prev) => [...prev, params.data])
                    storeData(people)
                    break
                case 'update':
                    setPeople((prev) =>
                        prev.map((p) => (p._id == params.data._id ? params.data : p))
                    )
                    storeData(people)
                    break
                case 'delete':
                    setPeople((prev) => prev.filter((p) => p._id != params.data._id))
                    storeData(people)
                    break
                default:
                    const cachedData = await getData()
                    setPeople(cachedData)
                    getPeople()
                        .then((fetchedData) => {
                            setPeople(fetchedData)
                            storeData(fetchedData)
                        })
                        .catch((e) => {
                            alert(e.message)
                            console.log(e.message)
                        })
                    break
            }
        })()
    }, [params])

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => navigate('Create')}
                style={styles.addContactButton}
            >
                <Text style={styles.addContactButtonText}>Add Contact</Text>
            </Pressable>
            <FlatList
                style={styles.flatList}
                data={people}
                renderItem={({ item }) => (
                    <ContactTile
                        key={item._id}
                        person={item}
                    />
                )}
                keyExtractor={(person) => person._id}
            />
        </View>
    )
}

const ContactTile = ({ person }) => {
    const { navigate } = useNavigation()

    return (
        <Pressable
            style={styles.contactTile}
            onPress={() => navigate('Details', { person })}
        >
            <Text style={styles.contactText}>{person.name}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Pressable
                    onPress={() => navigate('Details', { person })}
                    style={styles.contactButton}
                >
                    <MaterialCommunityIcons
                        name='account-details'
                        size={24}
                        color='black'
                    />
                </Pressable>
                <Pressable
                    onPress={() => navigate('Update', { person })}
                    style={styles.contactButton}
                >
                    <MaterialCommunityIcons
                        name='account-edit'
                        size={24}
                        color='black'
                    />
                </Pressable>
                <Pressable
                    onPress={() => navigate('Delete', { person })}
                    style={styles.contactButton}
                >
                    <MaterialCommunityIcons
                        name='delete-forever'
                        size={24}
                        color='black'
                    />
                </Pressable>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flex: 1
    },
    flatList: {
        width: '100%',
        borderTopWidth: 1
    },
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
        shadowColor: '#000',
        alignItems: 'center',
        width: '95%',
        maxWidth: 600,
        alignSelf: 'center'
    },
    contactText: {
        fontSize: 18,
        fontWeight: '500',
        justifyContent: 'space-around'
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
        backgroundColor: '#ff6a00',
        width: '80%',
        maxWidth: 500
    },
    addContactButtonText: {
        fontSize: 32,
        textAlign: 'center'
    }
})
