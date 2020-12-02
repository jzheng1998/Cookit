import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Tag(props: any) {
  const { label, onPress, tagContainerStyle, tagTextStyle } = props;

  return (
    <TouchableOpacity
      style={[tagContainerStyle, styles.defaultTagContainer]}
      onPress={onPress}
    >
      <Text style={[tagTextStyle, styles.defaultTagLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultTagContainer: {
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 5,
  },
  defaultTagLabel: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
