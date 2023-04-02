import { Pressable, StyleSheet, Text } from 'react-native'

export const PrimaryButton = ({ onPress, label, style }) => {
    return (
        <Pressable
            style={{ ...styles.primaryButton, ...style }}
            onPress={onPress}
        >
            <Text
                style={styles.buttonLabel}
                children={label}
            />
        </Pressable>
    )
}

export const SecondaryButton = ({ onPress, label, style }) => {
    return (
        <Pressable
            style={{ ...styles.secondaryButton, ...style }}
            onPress={onPress}
        >
            <Text
                style={styles.buttonLabel}
                children={label}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    primaryButton: {
        borderWidth: 1,
        maxWidth: 200,
        borderRadius: 5,
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'green',
        marginTop: 20,
        width: '95%'
    },
    secondaryButton: {
        borderWidth: 1,
        maxWidth: 200,
        borderRadius: 5,
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'red',
        width: '95%'
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700'
    }
})
