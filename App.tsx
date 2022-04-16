import { PortalProvider } from "@gorhom/portal";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Backdrop } from "./src/Backdrop";
import { FocusItem } from "./src/FocusItem";

const data = [
  {
    color: "#F44336",
    name: "Red",
  },
  {
    color: "#E91E63",
    name: "Pink",
  },
  {
    color: "#9C27B0",
    name: "Purple",
  },
  {
    color: "#673AB7",
    name: "Deep Purple",
  },
  {
    color: "#3F51B5",
    name: "Indigo",
  },
  {
    color: "#2196F3",
    name: "Blue",
  },
  {
    color: "#03A9F4",
    name: "Light Blue",
  },
  {
    color: "#00BCD4",
    name: "Cyan",
  },
  {
    color: "#009688",
    name: "Teal",
  },
  {
    color: "#4CAF50",
    name: "Green",
  },
  {
    color: "#8BC34A",
    name: "Light Green",
  },
  {
    color: "#CDDC39",
    name: "Lime",
  },
];

export default function App() {
  const sharedValue = useSharedValue(0);

  const blurIntensity = useAnimatedProps(() => ({
    intensity: sharedValue.value * 100,
  }));

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // transform: [{ translateX: sharedValue.value * 255 }],
    };
  });

  const animatedProps = useAnimatedProps(() => ({
    intensity: sharedValue.value * 100,
  }));

  return (
    <PortalProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View
          style={{
            flex: 1,
            width: "100%",
            // alignItems: "stretch",
          }}
        >
          {data.map(({ color, name }) => (
            <FocusItem key={name} sharedValue={sharedValue}>
              <Animated.View
                style={[
                  {
                    // flex: 1,
                    backgroundColor: color,
                    margin: 10,
                    marginHorizontal: 30,
                    padding: 10,
                    borderRadius: 10,
                    // width: "80%",
                    borderWidth: 1,
                    borderColor: "black",
                  },
                  animatedStyles,
                ]}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  {name}
                </Text>
              </Animated.View>
            </FocusItem>
          ))}
        </View>
      </View>
      <Backdrop sharedValue={sharedValue} />
    </PortalProvider>
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
