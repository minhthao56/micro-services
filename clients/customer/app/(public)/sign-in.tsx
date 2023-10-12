import { useCallback, useState } from "react";
import { router } from "expo-router";
import { Button, Text, H2, Stack } from "tamagui";
import { LoginForm, LoginFormData } from "tamagui-shared-ui";
import { KeyboardAvoidingComponent } from "expo-shared-ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { authMobile } from "utils/firebase/mobile";
import { useSession } from "../ctx";

export default function SignIn() {
  const val = useSession();
  const onSubmit = useCallback(async (data: LoginFormData) => {
    try {
      console.log("email: ", data.email);
      console.log("password: ", data.password);
      const user = await authMobile.signIn(data.email, data.password);
      console.log("user.user.email: ", user.user.email);
      console.log("user.uid: ", user.user.uid);

      // await val?.signIn();
      // router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <KeyboardAvoidingComponent>
        <H2 mb="$4">Taxi SM</H2>
        <LoginForm onSubmit={onSubmit} title="Sign In" />
      </KeyboardAvoidingComponent>
    </SafeAreaView>
  );
}
