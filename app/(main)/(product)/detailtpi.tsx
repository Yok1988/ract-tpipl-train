import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Card } from 'react-native-paper';
import { getProductDetailServiceTPI2 } from '@/services/product-service-tpi';
import { router ,useLocalSearchParams} from 'expo-router';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProductListScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams(); // รับค่า id จาก params
  
  useEffect(() => {
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
  
  console.log('🟢 params.id:', params.id); // Debug ค่าที่รับมา
  const { data, isLoading } = useQuery({
    queryKey: ['productData'],
    queryFn: async () => {
      const response = await getProductDetailServiceTPI2();
      console.log(response.data.rows); // ตรวจสอบข้อมูลจาก API
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
        <Text style={styles.price}>💰 ราคา: {item.price ? `${item.price} บาท` : 'ไม่ระบุ'}</Text>
      </Card.Content>
    </Card>  
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : (
        data?.rows && (
          <FlashList
            data={data.rows} // ใช้ data.rows เพื่อแสดงรายการสินค้า
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
    height: 120, // ปรับขนาดรูปภาพให้เหมาะสม
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
  stock: {
    fontSize: 14,
    color: '#009688',
    marginTop: 5,
  },
});





//====================2
/* import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Card } from 'react-native-paper';
import { getProductDetailServiceTPI2 } from '@/services/product-service-tpi';

export default function ProductListScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ['productData'],
    queryFn: async () => {
      const response = await getProductDetailServiceTPI2();
      console.log(response.data); // ตรวจสอบข้อมูลจาก API
      return response.data;
    }
  });

  // ฟังก์ชันแสดงสินค้าเป็นการ์ด
  const _renderItem = ({ item }: { item: any }) => (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <Text style={styles.productCode}>{item.product_code}</Text>
        <Text style={styles.price}>💰 ราคา: {item.pricelist ? `${item.pricelist} บาท` : 'ไม่ระบุ'}</Text>
        <Text style={styles.stock}>📦 สต็อก: {item.stock}</Text>
        <Text style={styles.stock}>📦 สต็อก: {item.picture}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : (
        data?.rows && (
          <FlashList
            data={data.rows} // ใช้ data.rows เพื่อแสดงรายการสินค้า
            estimatedItemSize={100}
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
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  productCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#6200ea',
    marginTop: 5,
  },
  stock: {
    fontSize: 14,
    color: '#009688',
    marginTop: 5,
  },
});  */



///=========================== 2
/* import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { List } from 'react-native-paper';
import { getProductDetailServiceTPI2 } from '@/services/product-service-tpi';

export default function ProductListScreen() {

  const { data } = useQuery({
    queryKey: ['productData'],
    queryFn: async () => {
      const response = await getProductDetailServiceTPI2();
      console.log(response.data); // ตรวจสอบข้อมูลจาก API
      return response.data;
    }
  });

  // ฟังก์ชันแสดงสินค้า
  const _renderItem = ({ item }: { item: any }) => (
    <List.Item
      title={item.product_code} // ใช้ product_code เป็นชื่อสินค้า
      description={`ราคา: ${item.pricelist || 'ไม่ระบุ'}`} // แสดงราคาสินค้า
      onPress={() => console.log(`เลือกสินค้า: ${item.product_code}`)}
    />
  );

  return (
    <>
      {data?.rows && (
        <FlashList
          data={data.rows} // ใช้ data.rows เพื่อแสดงรายการสินค้า
          estimatedItemSize={50}
          renderItem={_renderItem}
        />
      )}
    </>
  );
} */


