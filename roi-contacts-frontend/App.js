import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { ThemeContext } from './ThemeContext'
import { Screens } from './screens/index'

const Stack = createNativeStackNavigator()

const App = () => {
    return (
        <ThemeContext.Provider value={styles}>
            <SafeAreaView style={styles.safeAreaView}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName='List'
                        screenOptions={styles.screenOptions}
                    >
                        {/* <Stack.Screen
                        name='Login'
                        component={Login}
                    /> */}
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
            </SafeAreaView>
        </ThemeContext.Provider>
    )
}
export default App

// const Login = () => {
//     const navigation = useNavigation()
//     const [username, setUsername] = useState('Akkad')
//     const [password, setPassword] = useState('password123')

//     const submit = () => {
//         let data = { username, password }

//         login(data)
//             .then((t) => navigation.navigate('List'))
//             .catch((e) => console.error('Error:', e))
//     }

//     return (
//         <View>
//             <Text>Username</Text>
//             <TextInput
//                 onChangeText={setUsername}
//                 value={username}
//             />
//             <Text>Password</Text>
//             <TextInput
//                 onChangeText={setPassword}
//                 value={password}
//             />
//             <Pressable onPress={submit}>
//                 <Text>Sign In</Text>
//             </Pressable>
//         </View>
//     )
// }

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#941a1d',
        justifyContent: 'center'
        // alignItems: 'center'
    },
    appBackground: {
        backgroundColor: '#fafafa'
    },
    screenOptions: {
        headerStyle: {
            backgroundColor: '#941a1d'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32
        }
    }
})
