import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "BlogSphere",
          headerTitleAlign: "center",
          headerTintColor: "blue",
          headerStyle: {
            backgroundColor: "lightblue",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: "blue",
          },
        }}
      />
    </Stack>
  );
}
