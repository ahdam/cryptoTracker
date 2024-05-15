import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  symbol: {
    color: "red",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
    flex: 1,
  },
  gt0: {
    color: "green",
  },
  lt0: {
    color: "red",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
});
