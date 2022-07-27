import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ErrorOverlay({message, onConfirm}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={{...styles.text, marginBottom: 20}}>{message}</Text>
        </View>
    );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    text: {
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary800
    },
    message: {
        fontSize: 14,
        color: GlobalStyles.colors.primary800
    }
});