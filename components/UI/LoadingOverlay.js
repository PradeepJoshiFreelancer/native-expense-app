import { StyleSheet } from "react-native";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="white" size="large" />
    </View>
  );
}
export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:GlobalStyles.colors.primary700
  },
});
