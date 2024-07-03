import { GoogleSigninButtonView } from "@/components/GoogleSigninButtonView";
import { ColorSet } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

const Signin = () => {
  return (
    <View style={styles.container}>
      <GoogleSigninButtonView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorSet.bgColor,
  },
});

export default Signin;
