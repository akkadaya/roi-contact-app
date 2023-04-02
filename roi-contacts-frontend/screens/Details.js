import { useRoute } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export const Details = () => {
    const route = useRoute()
    const { person } = route.params

    const departments = {
        0: 'General',
        1: 'Information Communications Technology',
        2: 'Finance',
        3: 'Marketing',
        4: 'Human Resources'
    }

    const fields = [
        { label: 'Name:', value: person?.name },
        { label: 'Phone:', value: person?.phone, isTel: true, style: { color: 'blue' } },
        { label: 'Department:', value: departments[person?.department] },
        {
            label: 'Address:',
            value: `${person?.address?.street}
${person?.address?.city} ${person?.address?.state} ${person?.address?.postcode}
${person?.address?.country}`
        }
    ]

    return (
        <ScrollView>
            <View style={styles.contentContainer}>
                <Text style={styles.header}>Contact Information</Text>
                {fields.map((field, index) => (
                    <View
                        key={index}
                        style={styles.detailsContainer}
                    >
                        <Text style={styles.label}>{field.label} </Text>
                        <Text
                            style={{ ...styles.value, ...field.style }}
                            onPress={
                                field.isTel && (() => Linking.openURL(`tel: ${person?.phone}`))
                            }
                            selectable={field.isTel}
                        >
                            {field.value}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        margin: 20
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10
    },
    detailsContainer: {
        flexDirection: 'row'
    },
    labels: {
        width: 100
    },
    label: {
        fontSize: 16,
        fontWeight: '400',
        width: 100,
        paddingVertical: 5
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 5,
        flex: 1
    }
})
