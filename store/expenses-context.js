import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
    {
        id: '1',
        description: 'A pair of shoes',
        amount: 108.99,
        date: new Date('2022-07-13')
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

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, description, amount, date) => {}
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData} });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
};

export default ExpensesContextProvider;