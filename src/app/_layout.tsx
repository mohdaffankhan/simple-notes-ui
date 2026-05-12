import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ColorSchemeProvider, useColorScheme } from "@/hooks/use-color-scheme";

function RootContent() {
  const colorScheme = useColorScheme();
  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "light"} />
      <Slot />
    </>
  );
}

export default function RootLayout() {
  return (
    <ColorSchemeProvider>
      <RootContent />
    </ColorSchemeProvider>
  );
}
