import { Text } from "react-native"
import { FlatList } from "react-native"
import ExpenseItem from "./ExpenseItem"

const renderExpenseData = (expenseData) => {
    return <ExpenseItem expenseItem={expenseData.item} />
}

function ExpensesList({expenses}){
    return <FlatList data={expenses} renderItem={renderExpenseData} keyExtractor={(expense)=> expense.id}/>
}
export default ExpensesList