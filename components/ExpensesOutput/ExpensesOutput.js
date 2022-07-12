import { StyleSheet, View } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

const DUMMY_EXPENSES = [
    {
        id: '1',
        description: 'A pair of shoes',
        amount: 108.99,
        date: new Date('2021-12-19')
    },
    {
        id: '2',
        description: 'A book',
        amount: 20.99,
        date: new Date('2022-02-01')
    },
    {
        id: '3',
        description: 'Shirt',
        amount: 13.25,
        date: new Date('2022-03-12')
    },
    {
        id: '4',
        description: 'TV',
        amount: 2000,
        date: new Date('2022-05-17')
    },
    {
        id: '5',
        description: 'A book',
        amount: 18.99,
        date: new Date('2022-05-17')
    },
    {
        id: '6',
        description: 'A pair of shoes',
        amount: 108.99,
        date: new Date('2021-12-19')
    },
    {
        id: '7',
        description: 'A book',
        amount: 20.99,
        date: new Date('2022-02-01')
    },
    {
        id: '8',
        description: 'Shirt',
        amount: 13.25,
        date: new Date('2022-03-12')
    },
    {
        id: '9',
        description: 'TV',
        amount: 2000,
        date: new Date('2022-05-17')
    },
    {
        id: '10',
        description: 'A book',
        amount: 18.99,
        date: new Date('2022-05-17')
    },
    {
        id: '11',
        description: 'A pair of shoes',
        amount: 108.99,
        date: new Date('2021-12-19')
    },
    {
        id: '12',
        description: 'A book',
        amount: 20.99,
        date: new Date('2022-02-01')
    },
    {
        id: '13',
        description: 'Shirt',
        amount: 13.25,
        date: new Date('2022-03-12')
    },
    {
        id: '14',
        description: 'TV',
        amount: 2000,
        date: new Date('2022-05-17')
    },
    {
        id: '15',
        description: 'A book',
        amount: 18.99,
        date: new Date('2022-05-17')
    }
];

function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={DUMMY_EXPENSES}
                periodName={expensesPeriod} />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    }
});