import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);

    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        setIsFetching(true);
        /* Creating an async function inside so we dont add async on the useEffect hook 
        because it's not recommended by the React Native team */
        async function getExpenses() {
            const expenses = await fetchExpenses();
            setIsFetching(false);
            expensesCtx.setExpenses(expenses);
        }

        getExpenses();
    }, []);

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date >= date7DaysAgo) && (expense.date <= today);
    });

    return <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 days"
        fallbackText="No expenses registered for the last 7 days."
    />
}

export default RecentExpenses;