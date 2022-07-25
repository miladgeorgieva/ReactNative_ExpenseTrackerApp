import { Text, View, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, invalid, textInputConfig, style }) {
    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    if (invalid) {
        inputStyles.push(styles.invalidLabel);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 14
    },
    input: {
        shadowColor: GlobalStyles.colors.gray800,
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity:  0.15,
        shadowRadius: 3.05,
        elevation: 4,
        padding: 12,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: 'white'
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error
    }
});