import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // ไอคอนจาก Expo
import { DrawerActions } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Card, Text } from 'react-native-paper';
import AppLoading from '@/components/AppLoading';
import { getProductServiceTPI } from '@/services/product-service-tpi';

export default function ProductScreen() {
  
  const navigation = useNavigation();

  const { data, isPending, error, isError, refetch, isRefetching } = useQuery<any[]>({
    queryKey: ['productTPI'],
    queryFn: async () => {
      const response = await getProductServiceTPI();
      //console.log(response.data.rows);
      //console.log(response.data.rows);
      return response.data.rows;
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: 'สินค้า TPIPL',
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

  const _renderItem = ({ item }: { item: any }) => (
    <Card
      style={styles.card}
      onPress={() => {
        router.push({
          pathname: '/product-detail', // '/detail-tpi'  /detailtpi
          params: {
            id: item.id,
            title: item.product_code,
            detail: item.variation_group_key,
            view: item.product_code,
            picture: item.picture,
          },
        });
      }}
    >
      <Card.Cover source={{ uri: item.picture || 'https://via.placeholder.com/300' }} style={styles.image} />
      <Card.Content>
        <Text style={styles.productCode}>{item.cate_lv1_name}</Text>
        <Text style={styles.price}>💰 ราคา: {item.price ? `${item.price} บาท` : 'ไม่ระบุ'}</Text>
        <Text style={styles.stock}>📦 สต็อก: {item.stock}</Text>
        <Text style={styles.stock}>📦 ขายแล้ว: {item.total_sales}</Text>
      </Card.Content>
    </Card>
  );

  if (isPending) {
    return <AppLoading />;
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง</Text>
        <Text style={styles.errorDetails}>{JSON.stringify(error)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        estimatedItemSize={200}
        renderItem={_renderItem}
        numColumns={2} // แสดงสินค้า 2 คอลัมน์
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      />
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
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  errorDetails: {
    fontSize: 12,
    color: '#666',
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





/* import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';//https://icons.expo.fyi/Index
import { DrawerActions } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
//import { getProductService } from '@/services/product-service';
import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { Card, Chip, List, Text } from 'react-native-paper';
import AppLoading from '@/components/AppLoading';
import { getProductServiceTPI } from '@/services/product-service-tpi';

export default function ProductScreen() {
  const navigation = useNavigation(); //  แฮมเบอร์กอร์
  
  const {data,isPending,error,isError,refetch,isRefetching} = useQuery <any[]>({ 
    queryKey: ['productTPI'],
    queryFn : async ()=> {
    const response = await getProductServiceTPI();
    //console.log(response.data);
    return response.data.rows;
  } });


  useEffect(()=> {
    navigation.setOptions({
      title: 'สินค้า TPIPL',
      headerShown:true,
      headerLeft:() => (
        <MaterialIcons.Button
        name = "menu" 
        backgroundColor ="#c31b1b"
        onPress={()=>{
          navigation.dispatch(DrawerActions.openDrawer())
        } }
        />
      ),
      headerStyle : { backgroundColor : "#c31b1b"},
      headerTintColor : 'white',
      headerTitleStyle : {fontWeight :'bold' }
    });
  },[navigation]
  );
  
const _renderItem = ( {item} : {item: any} ) => {
  return(
    //กดข้ามหน้า
    <Card style={{margin:10}}  onPress={()=> {
      router.push({pathname: '/detailtpi',
            params:{id:item.id,
            title :item.product_code,
            detail :item.variation_group_key,
            view :item.product_code,
            picture :item.picture,
        },
      });
    }} >

      <Card.Cover source={{ uri: item.picture}} />
      <Card.Content>
        <Text variant = "titleLarge">{item.product_code}</Text>
        <Text variant = "bodyMedium">{item.variation_group_key}</Text>
      </Card.Content>
    </Card>
  );
}


const _onRefresh = (  ) => {
  refetch(); 
}

//โหลดหมุน
if(isPending){
  return <AppLoading />
}
 
if(isError){
  //return หลายบรรทัด
  return (
    <>
    <Text> เกิดข้อผิดพลาด server โปรดลองใหม่ </Text>
    <Text> {JSON.stringify(error)} </Text>
    </>
  )
}

///แสดงข้อมูล
return (
    <>
     {
      data && <FlashList 
        data={data} 
        estimatedItemSize={10} 
        renderItem={_renderItem} 
        onRefresh={_onRefresh}
        refreshing={isRefetching} //refresh 
        />
     }
    </>
  )

} */