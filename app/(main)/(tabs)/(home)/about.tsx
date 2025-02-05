import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router' 
import { useEffect } from 'react'
//import { View, Text, ImageBackground } from 'react-native'
import { StyleSheet, View, Text } from 'react-native';
export default function AboutScreen() {
  const navigation = useNavigation();

  useEffect(()=> {
    navigation.setOptions({
      title: 'About',
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
      headerStyle : {
           backgroundColor : "#c31b1b"//"#9dc31b"
      },
      headerTintColor : 'white',
      headerTitleStyle : {
        fontWeight :'bold'
      }
    });
  },[navigation]
);
  const styles = StyleSheet.create({
     container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: 'white'//'#ADD8E6', // สีพื้นหลัง (ใช้โค้ดสี HEX หรือชื่อสี) 
     },
     text: {
       fontSize: 50,
       color: 'pink',
     },
   });
 
   return (
     <View style={styles.container}>
       <Text style={styles.text}>about😝Screen</Text>
     </View>
   );
}
