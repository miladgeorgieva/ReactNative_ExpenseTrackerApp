import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';

function ManageExpenses({ route, navigation }) {
   const [isSubmitting, setIsSubmitting] = useState(false);
    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId; // the "!!" converts to boolean
    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit expense' : 'Add expense'
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        await deleteExpense(editedExpenseId);
        // setIsSubmitting(false);
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData);
            await updateExpense(editedExpenseId, expenseData);
        } else {
            const id = storeExpense(expenseData);
            expensesCtx.addExpense({ ...expenseData, id: id });
        }
        navigation.goBack();
    }

    if (isSubmitting) {
        return <LoadingOverlay />;
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
                submitButtonLabel={isEditing ? 'Update' : 'Add'} />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton text="Delete" icon="trash" size={20} onPress={deleteExpenseHandler} color={GlobalStyles.colors.error} />
                </View>
            )}
        </View>
    );
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        // backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        alignItems: 'center'
    }
});