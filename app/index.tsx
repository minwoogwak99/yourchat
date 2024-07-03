// import { ColorSet } from "@/constants/Colors";
import { fsInitializingAtom, userAtom } from "@/utils/core";
import { Redirect } from "expo-router";
import { useAtom } from "jotai";

export default function Index() {
  const [initializing] = useAtom(fsInitializingAtom);
  const [user] = useAtom(userAtom);

  if (initializing) return null;

  if (!user) {
    return <Redirect href={"/signin"} />;
  }

  return <Redirect href={"/home"} />;
}
