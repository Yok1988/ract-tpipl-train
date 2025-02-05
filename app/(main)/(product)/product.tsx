import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';//https://icons.expo.fyi/Index
import { DrawerActions } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getProductService } from '@/services/product-service';
import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { Card, Chip, Text } from 'react-native-paper';
import AppLoading from '@/components/AppLoading';

export default function ProductScreen() {
  const navigation = useNavigation(); //  แฮมเบอร์กอร์
  
  const {data,isPending,error,isError,refetch,isRefetching} = useQuery <any[]>({ //data
    queryKey: ['productData'],
    queryFn : async ()=> {
    const response = await getProductService();
    //console.log(response.data);
    return response.data.data;
} });

  useEffect(()=> {
    navigation.setOptions({
      title: 'สินค้า',
      //headerTitle:() => <HomeLogo/>,
      //headerTitleAlign:'center',
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
  
//<Text>{JSON.stringify(data)}</Text>
//<Text>{item.title}</Text>
//<Card.Cover source={{ uri: item.picture}} /> รูป
const _renderItem = ( {item} : {item: any} ) => {
  return(
    //กดข้ามหน้า
    <Card style={{margin:10}}  onPress={()=> {
      //router.push(`/detail/${item.title}`);
      router.push({pathname: '/detail',
        params:{id:item.id,
            title :item.title,
            detail :item.detail,
            date :item.date,
            view :item.view,
            picture :item.picture,
        },
      });
    }} >
      <Card.Cover source={{ uri: item.picture}} />
      <Card.Content>
        <Text variant = "titleLarge">{item.title}</Text>
        <Text variant = "bodyMedium">{item.detail}</Text>
      </Card.Content>
      <Card.Actions>
        <Chip icon = "calendar">{item.date}</Chip>
        <Chip icon = "eye">{item.view}</Chip>
      </Card.Actions>
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

//แสดงข้อมูล
return (
    <>
     {
      data && <FlashList 
        data={data} 
        estimatedItemSize={50} 
        renderItem={_renderItem} 
        onRefresh={_onRefresh}
        refreshing={isRefetching} //refresh 
        />
     }
    </>
  )

}