import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { formatDate } from "../../util/dateFormatter";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ expenseItem }) {
  const navigation = useNavigation();

  const expensePressHandler = () => {
    navigation.navigate("ManageExpenses", {
      expenseId: expenseItem.id,
    });
  };

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={expensePressHandler}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {expenseItem.description}
          </Text>
          <Text style={styles.textBase}>{formatDate(expenseItem.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.textBase, styles.amount]}>
            {expenseItem.amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 5,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    margin: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
