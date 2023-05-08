import axios from "axios";

const BASE_URL =
  "https://react-native-expense-e00c1-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function storeExpense(expenseData) {
  const response = await axios.post(BASE_URL + "/expenses.json", expenseData);
  const id = response.data.name
  return id
}

export async function fetchExpense() {
  const response = await axios.get(BASE_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expense = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expense);
  }
  return expenses;
}

export function updateExpense(id, expenseData){
    return axios.put(BASE_URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id){
    return axios.delete(BASE_URL + `/expenses/${id}.json`)
}