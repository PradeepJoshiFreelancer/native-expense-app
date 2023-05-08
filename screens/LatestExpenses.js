import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { getDateMinusDays } from "../util/dateFormatter";
import { fetchExpense } from "../util/http";
import { ExpenseContext } from "../store/expense-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function LatestExpenses() {
  const expenseContext = useContext(ExpenseContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getExpense() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpense();
        expenseContext.setExpenses(expenses);
      } catch (error) {
        setError("Count not fetch expense!")
      }
      setIsLoading(false);
    }
    getExpense();
  }, []);
  const latestExpenses = expenseContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  const errorHandller = () => {
    setError(null)
  }
  if(error && !isLoading) return <ErrorOverlay message={error} onConfirm={errorHandller} />

  if (isLoading) return <LoadingOverlay />;

  return (
    <ExpensesOutput
      expenses={latestExpenses}
      expensesPeriod="Last 7 days"
      falloutText="No expensed registeredfor last 7 days"
    />
  );
}
export default LatestExpenses;
