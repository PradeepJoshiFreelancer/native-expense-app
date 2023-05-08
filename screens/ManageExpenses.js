import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenses({ route, navigation }) {
  const expenseContext = useContext(ExpenseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const editedExpenseId = route.params.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExpense = expenseContext.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  const deleteButtonHandller = async () => {
    setIsLoading(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseContext.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Count not delete expense! Please try later.");
      setIsLoading(false);
    }
  };
  const confirmButtonHandller = async (expenseData) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        expenseContext.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseContext.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch {
      setError("Count not save expense! Please try later.");
      setIsLoading(false)
    }
  };
  const cancelButtonHandller = () => {
    navigation.goBack();
  };
  const errorHandller = () => {
    setError(null);
  };
  if (error && !isLoading)
    return <ErrorOverlay message={error} onConfirm={errorHandller} />;
  if (isLoading) return <LoadingOverlay />;
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelButtonHandller}
        onSubmit={confirmButtonHandller}
        label={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteButtonHandller}
            style={styles.infoText}
          />
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
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
