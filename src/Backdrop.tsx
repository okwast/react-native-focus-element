import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { FC } from "react";
import { StyleSheet } from "react-native";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const Backdrop: FC<{ sharedValue: SharedValue<number> }> = ({
  sharedValue,
}) => {
  const animatedProps = useAnimatedProps(() => ({
    intensity: sharedValue.value * 110,
  }));
  const animatedStyle = useAnimatedStyle(() => ({
    display: sharedValue.value > 0.01 ? "flex" : "none",
  }));

  return (
    <AnimatedBlurView
      animatedProps={animatedProps}
      // tint="dark"
      style={[animatedStyle, StyleSheet.absoluteFill]}
    />
  );
};
