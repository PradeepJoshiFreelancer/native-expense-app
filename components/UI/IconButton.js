import { View } from "react-native";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

function IconButton({ name, size, color, onPress }) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.buttonContianer}>
        <Ionicons name={name} size={size} color={color} />
      </View>
    </Pressable>
  );
}
export default IconButton;

const styles = StyleSheet.create({
  buttonContianer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
  },
  pressed: {
    opacity: 0.75,
  },
});
