import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, date, amount }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, date, amount }) => {},
});
const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const invertedExpenses = action.payload.reverse()
      return invertedExpenses;
    case "UPDATE":
      const updateItemIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateExpenseItem = state[updateItemIndex];
      const updatedExpense = { ...updateExpenseItem, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateItemIndex] = updatedExpense;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

function ExpenseContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expenseReducer,[]);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const value = {
    expenses: expenseState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
