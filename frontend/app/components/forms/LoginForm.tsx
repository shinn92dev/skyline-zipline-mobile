import { YStack, Form, Input, Label, Button, Text, Image, XStack, Checkbox, View } from "tamagui";
import { Check } from "@tamagui/lucide-icons";
import logo from "../../../assets/logo.png";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { useState, useEffect } from "react";

// ✅ 키보드 상태 감지 Hook
function useKeyboardVisible() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", () => setVisible(true));
        const hideSub = Keyboard.addListener("keyboardDidHide", () => setVisible(false));
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    return visible;
}

const LoginForm = () => {
    const keyboardVisible = useKeyboardVisible();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <YStack
                        flex={1}
                        items="center"
                        justify={keyboardVisible ? "flex-start" : "center"}
                        gap="$4"
                    >
                        <Image
                            source={logo}
                            width={300}
                            height={300 / 1.69}
                            objectFit="contain"
                            mb="$3"
                        />
                        <Form
                            gap="$2"
                            width={"100%"}
                            minW={"100%"}
                            items="center"
                            px="$3"
                            $md={{ px: "$10" }}
                        >
                            <View width="100%" gap="$0">
                                <Label>Email</Label>
                                <Input placeholder="email" width="100%" />
                            </View>
                            <View width="100%" gap="$0">
                                <Label>Password</Label>
                                <Input placeholder="Password" width="100%" secureTextEntry />
                            </View>
                            <XStack flexDirection="row" gap="$3" mt="$5">
                                <Checkbox size="$4">
                                    <Checkbox.Indicator>
                                        <Check />
                                    </Checkbox.Indicator>
                                </Checkbox>
                                <Text>Use face id or finger print.</Text>
                            </XStack>
                            <Button size="$6" mt="$5">
                                Login
                            </Button>
                        </Form>
                    </YStack>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default LoginForm;
