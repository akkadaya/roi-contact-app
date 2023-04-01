import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createContext, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import Screens from './screens/index'
import { login } from './services'

export const ThemeContext = createContext()
const Stack = createNativeStackNavigator()

const App = () => {
    return (
        <ThemeContext.Provider value={style}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='List'>
                    <Stack.Screen
                        name='Login'
                        component={Login}
                    />
                    <Stack.Screen
                        name='List'
                        component={Screens.List}
                    />
                    <Stack.Screen
                        name='Create'
                        component={Screens.Create}
                    />
                    <Stack.Screen
                        name='Delete'
                        component={Screens.Delete}
                    />
                    <Stack.Screen
                        name='Details'
                        component={Screens.Details}
                    />
                    <Stack.Screen
                        name='Update'
                        component={Screens.Update}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeContext.Provider>
    )
}

export default App

const Login = () => {
    const navigation = useNavigation()
    const [username, setUsername] = useState('Akkad')
    const [password, setPassword] = useState('password123')

    const submit = () => {
        let data = { username, password }

        login(data)
            .then((t) => navigation.navigate('List'))
            .catch((e) => console.error('Error:', e))
    }

    return (
        <View>
            <Text>Username</Text>
            <TextInput
                onChangeText={setUsername}
                value={username}
            />
            <Text>Password</Text>
            <TextInput
                onChangeText={setPassword}
                value={password}
            />
            <Pressable onPress={submit}>
                <Text>Sign In</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    contactTile: {
        backgroundColor: 'green',
        color: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 5,
        borderColor: '#000',
        borderWidth: 1
    }
})
