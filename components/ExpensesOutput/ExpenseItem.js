import { Pressable, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from '@react-navigation/native';

function ExpenseItem({ id, description, amount, date }) {
    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate('ManageExpense', {
            expenseId: id
        })
    }

    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed} android_ripple>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{ description }</Text>
                    <Text style={styles.textBase}>{ getFormattedDate(date) }</Text>
                </View>
        
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{ amount.toFixed(2) }</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expenseItem: {
        padding: 18,
        overflow: 'visible',
        marginHorizontal: 8,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 2,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 8,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        minWidth: 100
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    amount: {
        color: GlobalStyles.colors.primary600,
        fontWeight: 'bold',
        fontSize: 15
    }
});