import { GoogleSigninButtonView } from "@/components/GoogleSigninButtonView";
import { StyleSheet, View } from "react-native";

const Signin = () => {
  return (
    <View style={styles.container}>
      {/* <AnimatedIntro /> */}
      <GoogleSigninButtonView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
export default Signin;
