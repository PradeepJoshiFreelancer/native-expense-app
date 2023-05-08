import { Alert, Text, View } from "react-native";
import Input from "./Input";
import { StyleSheet } from "react-native";
import { useState } from "react";
import Button from "../UI/Button";
import { formatDate } from "../../util/dateFormatter";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, label, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? formatDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  const inputChangeHandller = (inputIndentifer, enteredValue) => {
    setInputs((currEnteredValue) => {
      return {
        ...currEnteredValue,
        [inputIndentifer]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandller = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      //   Alert.alert("Invalid Input", "Please check your inputs");
      setInputs((currentValues) => {
                return {
          amount: { value: currentValues.amount.value, isValid: isAmountValid },
          date: { value: currentValues.date.value, isValid: isDateValid },
          description: {
            value: currentValues.description.value,
            isValid: isDescriptionValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  };
  const isFormInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandller.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandller.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect: false
          // autoCapitalize:"none",
          onChangeText: inputChangeHandller.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {isFormInvalid && (
        <Text style={styles.errorText}>
          {" "}
          Invalid input values, please check the entered data!
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandller}>
          {label}
        </Button>
      </View>
    </View>
  );
}
export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    alignItems: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
