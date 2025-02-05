//พิมพ์ rnf layout Product
import { Stack } from 'expo-router'

export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen name="product"/>
      <Stack.Screen name="detail"/>
      <Stack.Screen name="website"/>
    </Stack>
  )
}