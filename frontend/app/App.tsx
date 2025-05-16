import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { defaultConfig } from "@tamagui/config/v4";
import LoginScreen from "./screens/LoginScreen";

const config = createTamagui(defaultConfig);

type Conf = typeof config;

// make imports typed
declare module "@tamagui/core" {
    interface TamaguiCustomConfig extends Conf {}
}

export default function App() {
    return (
        <TamaguiProvider config={config}>
            <View style={styles.container}>
                <LoginScreen />
                <StatusBar style="auto" />
            </View>
        </TamaguiProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
