import { useContext } from "react"
import ExpensesOutput from "../components/Expenses/ExpensesOutput"
import { ExpenseContext } from "../store/expense-context"

function AllExpenses(){
    const expenseContext = useContext(ExpenseContext)

    return <ExpensesOutput expenses={expenseContext.expenses} expensesPeriod="Total" falloutText="No expensed registered" />
}
export default AllExpenses