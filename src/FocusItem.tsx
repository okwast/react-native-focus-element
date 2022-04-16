import { Portal } from "@gorhom/portal";
import { FC, ReactNode, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface IProps {
  children: ReactNode;
  sharedValue: SharedValue<number>;
}

export const FocusItem: FC<IProps> = ({ children, sharedValue }) => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useAnimatedRef<Animated.View>();
  const xPos = useSharedValue(0);
  const yPos = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    // top: yPos.value,
    top: interpolate(
      sharedValue.value,
      [0, 1],
      [yPos.value, 150],
      Extrapolate.CLAMP
    ),
    // left: xPos.value,
    left: 0,
    right: 0,

    // transform: [
    //   {
    //     translateY: yPos.value,
    //   },
    // ],
  }));

  const animatedContextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(sharedValue.value, [0, 0.75, 1], [0, 0, 1]),
  }));

  const setNonFocused = () => {
    console.log("asdfasdf");
    setIsFocused(false);
  };

  const x = useAnimatedReaction(
    () => sharedValue.value,
    (value, previous) => {
      if (value <= 0.01 && previous && previous > 0.01) {
        runOnJS(setNonFocused)();
      }
    }
  );

  const content = (
    <Pressable
      onPress={() => {
        ref.current?.measure((x, y, width, height, pageX, pageY) => {
          xPos.value = pageX;
          yPos.value = pageY;
        });
        setIsFocused(true);
        sharedValue.value = withTiming(1);
        setTimeout(() => {
          sharedValue.value = withTiming(0);
        }, 3000);
      }}
    >
      {children}
    </Pressable>
  );
  return (
    <>
      {isFocused ? (
        <Portal>
          <Animated.View
            style={[
              { position: "absolute", top: 208, left: 20, right: 20 },
              animatedContextStyle,
            ]}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  width: "80%",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  borderColor: "black",
                  borderWidth: 1,
                  marginTop: 15,
                }}
              >
                <Text>Edit</Text>
              </Pressable>
              <Pressable
                style={{
                  width: "80%",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  borderColor: "black",
                  borderWidth: 1,
                  marginTop: 15,
                }}
              >
                <Text>Delete</Text>
              </Pressable>
              <Pressable
                style={{
                  width: "80%",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  borderColor: "black",
                  borderWidth: 1,
                  marginTop: 15,
                }}
              >
                <Text>Close</Text>
              </Pressable>
            </View>
          </Animated.View>
          <Animated.View style={[animatedStyle]}>{content}</Animated.View>
        </Portal>
      ) : null}
      <Animated.View
        ref={ref}
        style={{
          // width: "100%",
          // alignItems: "stretch",
          opacity: isFocused ? 0 : 1,
        }}
      >
        {content}
      </Animated.View>
    </>
  );
};
