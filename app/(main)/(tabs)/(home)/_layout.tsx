//พิมพ์ rnf สร้างcode
import { Stack } from 'expo-router'
export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:true}}/>
      <Stack.Screen name="about"/>
    </Stack>
  )
}