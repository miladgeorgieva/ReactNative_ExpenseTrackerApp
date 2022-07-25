import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import Input from "./Input";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value, // + converts to number
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

       console.log(expenseData.date.toString());

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values! Maybe you missed an input?');
            setInputs((currentInputs) => {
                return {
                    amount: {
                        value: currentInputs.amount.value,
                        isValid: amountIsValid
                    },
                    date: {
                        value: currentInputs.date.value,
                        isValid: dateIsValid
                    },
                    description: {
                        value: currentInputs.description.value,
                        isValid: descriptionIsValid
                    }
                }
            })
            return; // Stops function execution in case any input is invalid
        }

        onSubmit(expenseData);
    }

    const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;


    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputs.amount.value
                    }} />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value
                }}/>
            </View>
            <Input
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                multiline: true,
                autoCorrect: false,
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value
            }} />
            {formIsValid && <Text style={styles.errorText}>There are invalid fields!</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginBottom: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: GlobalStyles.colors.gray800
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error,
        marginTop: 10,
        marginBottom: 20,
        fontWeight: 'bold'
    }
})