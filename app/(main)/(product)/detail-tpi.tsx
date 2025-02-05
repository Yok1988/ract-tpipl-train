import { router, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Card } from 'react-native-paper';
import { getProductDetailServiceTPI } from '@/services/product-service-tpi';
import { useNavigation } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

export default function ProductListScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams(); // รับค่า id จาก params

  console.log('🟢 params.id:', params.id); // Debug ค่าที่รับมา

  useEffect(() => {
    navigation.setOptions({
      title: 'สินค้า',
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
  
  // ดึงข้อมูลจาก API
  const { data, isLoading, error } = useQuery({
    queryKey: ['productData', params.id],
    queryFn: async () => {
      console.log("📡 Fetching product with ID:", params.id);
      const response = await getProductDetailServiceTPI(Number(params.id));
      console.log("📦 API Response:", response.data.product_code); // ตรวจสอบข้อมูลที่ได้จาก API
      return response.data;
    },
  });
  

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>❌ ไม่พบข้อมูลสินค้า หรือเกิดข้อผิดพลาด</Text>
      </View>
    );
  }

  if (!data.rows || data.rows.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>🚫 ไม่มีสินค้าในหมวดนี้</Text>
      </View>
    );
  }

  // ฟังก์ชันแสดงสินค้าเป็นการ์ด
  const _renderItem = ({ item }: { item: any }) => (
    <Card style={styles.card} mode="outlined" onPress={() => router.push('/website')}>
      <View style={styles.row}>
        {item.picture ? (
          <Image source={{ uri: item.picture }} style={styles.thumbnail} />
        ) : (
          <View style={styles.noImage}><Text>📷 ไม่มีรูป</Text></View>
        )}
        <View style={styles.details}>
          <Text style={styles.productCode}>{item.product_code || 'ไม่มีรหัสสินค้า'}</Text>
          <Text style={styles.category}>📂 {item.cate_lv1_name || 'ไม่ระบุหมวดหมู่'}</Text>
          <Text style={styles.price}>💰 ราคา: {item.price ? `${item.price} บาท` : 'ไม่ระบุ'}</Text>
        </View>
      </View>
    </Card>
  ); 

/*   // ฟังก์ชันแสดงสินค้าเป็นการ์ด
  const _renderItem = ({ item }: { item: any }) => (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <Image source={{ uri: item.picture }} style={styles.thumbnail} />
        <Text style={styles.productCode}>{item.product_code}</Text>
        <Text style={styles.price}>💰 ราคา: {item.price} บาท</Text>
      </Card.Content>
    </Card>
  ); */
  

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : error ? (
        <Text style={styles.notFound}>❌ โหลดข้อมูลผิดพลาด</Text>
      ) : !data ? (
        <Text style={styles.notFound}>🚫 ไม่มีสินค้า</Text>
      ) : (
        <FlashList
        data={data.rows} // เปลี่ยนจาก [data] เป็น data.rows
        estimatedItemSize={150}
        renderItem={_renderItem}
        numColumns={2}
      />
      
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  noImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  productCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    color: '#6200ea',
    marginTop: 5,
  },
  notFound: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
});
