import { useLocalSearchParams } from 'expo-router'
import { router, useNavigation } from 'expo-router'
import {  getProductDetailService, getProductService } from '@/services/product-service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { List } from 'react-native-paper';

export default function DetailScreen() {
  //const navigation = useNavigation(); //  แฮมเบอร์กอร์
  const params = useLocalSearchParams();
  const {data} = useQuery <any[]>({ //data
    queryKey: ['productDetailData'],
    queryFn : async ()=> {
    const response = await getProductDetailService(Number(params.id));
    //console.log(response.data);
    return response.data.data;
  } });
  
 const  _renderItem = ({item} : {item:any} )=> (
  <List.Item
    title = {item.ch_title}
    description= {item.ch_dateadd}
    onPress={()=>{ router.push({pathname: '/website'})
    } }
  />
 );
 
//แสดงข้อมูล
return (
  <>
   {
    data && <FlashList 
      data={data} 
      estimatedItemSize={50}  
      renderItem={_renderItem}
      />
   }
  </>
)
   
// return (
//     <View>
//       <Text>{params.id}</Text>
//       <Text>{params.title}</Text>
//       <Text>{params.detail}</Text>
//       <Text>{params.date}</Text>
//       <Text>{params.view}</Text>
//       <Text>{params.picture}</Text>
//     </View>
//   )
}