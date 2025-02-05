import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Card } from 'react-native-paper';
import { getProductDetailServiceTPI, getProductDetailServiceTPI2 } from '@/services/product-service-tpi';
import { router ,useLocalSearchParams} from 'expo-router';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProductListScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams(); // รับค่า id จาก params
  console.log('🟢 params.id:', params.id); // Debug ค่าที่รับมา
  const productId = Number(params.id);
  console.log('🟢 params:', params); // ตรวจสอบ params ทั้งหมด
  console.log('🟢 params.id (typeof):', typeof params.id, params.id);
  
  if (isNaN(productId)) {
    console.error('❌ Invalid product ID:', params.id);
  } else {
    console.log('✅ Valid product ID:', productId);
  }

  useEffect(() => {//หัวของ apps
    navigation.setOptions({
      title: 'รายการสินค้า',
      headerShown: true,
      headerLeft: () => (
        <MaterialIcons.Button
          name="menu"
          backgroundColor="#c31b1b"
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        />
      ),
      headerStyle: { backgroundColor: '#c31b1b' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
    });
  }, [navigation]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['productDataTPI', params.id],
    queryFn: async () => {
      //const response = await getProductDetailServiceTPI2();
      console.log('🟢 params.id:', params.id); // Debug ค่าที่รับมา
      const response = await getProductDetailServiceTPI(params.id);
      console.log("📦 API Response product_code:", response.data.product_code); // ตรวจสอบข้อมูลที่ได้จาก API
      console.log("ตรวจสอบข้อมูลจาก API price",response.data.price); // ตรวจสอบข้อมูลจาก API
      //console.log("📦 API Response:", JSON.stringify(response.data, null, 2)); // แสดงโครงสร้างข้อมูลทั้งหมด
      console.log("🔄 isLoading:", isLoading); // ตรวจสอบสถานะ Loading
      //console.log("📄 Data:", data.rows); // ตรวจสอบข้อมูลที่ได้จาก Query
      return response.data;
    }
  });

  // ฟังก์ชันแสดงสินค้าเป็นการ์ด
  const _renderItem = ({ item }: { item: any }) => (
    <Card style={styles.card} mode="outlined" onPress={()=>{ router.push({pathname: '/website'}) } }>
      {/* แสดงรูปภาพสินค้า */}
      <Card.Cover 
        source={{ uri: item.picture || 'https://via.placeholder.com/150' }} 
        style={styles.image} 
      />
      <Card.Content>
        <Text style={styles.productCode}>รหัสสินค้า: {item.product_code}</Text>
        <Text style={styles.price}>💰 ราคา: {item.price ? `${item.price} บาท` : 'ไม่ระบุ'}</Text>
      </Card.Content>
    </Card>  
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : (
        data && (
          <FlashList
            data=  {Array.isArray(data.rows) ? data.rows : [data]} // ใช้ data.rows เพื่อแสดงรายการสินค้า {data.rows}
            estimatedItemSize={150}
            renderItem={_renderItem}
            numColumns={2} // ให้แสดงเป็น 2 คอลัมน์
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 200, // ปรับขนาดรูปภาพให้เหมาะสม
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    color: '#6200ea',
    marginTop: 5,
  },
  stock: {  // ปรับขนาดสีฟอร์นตัวอักษร
    fontSize: 14,
    color: '#009688',
    marginTop: 5,
  },
});