import { Ionicons } from "@expo/vector-icons";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const GoogleSigninButtonView = () => {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId:
      "950066094933-7kc3p19r3e113eq2q7c8buivsr20m313.apps.googleusercontent.com",
  });

  const handleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      alert("fjdlsajlfs");
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        console.log(userInfo.idToken);
        alert(userInfo.idToken);
      } else {
        alert("failed login1");
        throw new Error("no ID token present!");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("sigin cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("in-progreessss");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("service not available");
      } else {
        alert(error);
      }
    }
  };

  return (
    <>
      <TouchableOpacity
        className="bg-gray-800 flex-row h-12 rounded-xl justify-center items-center"
        onPress={handleSignin}
      >
        <Ionicons name="logo-google" size={16} color={"#fff"} />
        <Text className="text-white text-xl pl-2">Continue with Google</Text>
      </TouchableOpacity>
    </>
  );
};
