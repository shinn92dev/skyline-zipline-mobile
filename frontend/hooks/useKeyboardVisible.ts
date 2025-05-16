import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

const useKeyboardVisible = () => {
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
};

export default useKeyboardVisible;
