import React, { useContext } from "react";
import { Alert, Image, Platform, View } from "react-native";
import { TextInput, Button, HelperText, MD3Colors } from "react-native-paper";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginService } from "@/services/auth-service";
import { AuthStoreContext } from "@/contexts/AuthContext";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("อีเมล์ห้ามว่าง")
    .email("รูปแบบอีเมล์ไม่ถูกต้อง"),
  password: yup
    .string()
    .required("รหัสผ่านห้ามว่าง")
    .min(3, "รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป"),
});

export default function LoginScreen() {
const {onUpdateAuthData} = useContext(AuthStoreContext);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
     console.log(data);
    try {
      await loginService(data.email, data.password);
      // update global isAuth is true
      await onUpdateAuthData(); 
      // go to home screen
      router.replace("/(main)/(tabs)/(home)");
    } catch (error: any) {
      if (error.response.data.message) {
        Alert.alert(error.response.data.message); // 401 ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
      } else {
        Alert.alert(JSON.stringify(error));
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 30,
        backgroundColor: "#a31808" ,
      }}// MD3Colors.secondary90
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 15,
        }}
      >
      <Image source={require("../assets/images/TPIPL.png")} />
      </View>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              placeholder="Email"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error ? true : false}
              keyboardType="email-address"
              style={{ marginBottom: 15 }}
            />
            {error && (
              <HelperText type="error" visible={error ? true : false}>
                {error.message}
              </HelperText>
            )}
          </>
        )}
        name="email"
      />
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              placeholder="Password"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error ? true : false}
              secureTextEntry={true}
              keyboardType="number-pad"
              style={{ marginBottom: 15 }}
            />
            {error && (
              <HelperText type="error" visible={error ? true : false}>
                {error.message}
              </HelperText>
            )}
          </>
        )}
        name="password"
      />
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Button
          style={{ marginVertical: 10, width: "50%" }}
          icon="login"
          mode="contained"
          buttonColor="#c3691b"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Log In
        </Button>
      </View>
    </View>
  );
}