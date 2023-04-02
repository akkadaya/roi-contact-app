import { StyleSheet, Text, TextInput, View } from 'react-native'

export const FormField = ({ form, setForm, label, stateField }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.textInput}
                value={form[stateField]}
                onChangeText={(text) => setForm((prev) => ({ ...prev, [stateField]: text }))}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        maxWidth: 300,
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        padding: 5,
        fontWeight: '600'
    },
    textInput: {
        width: '100%',
        maxWidth: 200,
        borderRadius: 5,
        borderWidth: 1,
        padding: 5,
        textAlign: 'center'
    }
})
