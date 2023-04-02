import { StyleSheet, Text, TextInput, View } from 'react-native'

export const FormField = ({ form, setForm, label, stateField }) => {
    return (
        <View>
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
    label: {
        fontSize: 16,
        padding: 5,
        fontWeight: '600'
    },
    textInput: {
        maxWidth: 200,
        borderRadius: 5,
        borderWidth: 1,
        padding: 5
    }
})
