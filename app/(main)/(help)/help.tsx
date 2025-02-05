import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
//import { View, Text } from 'react-native'
import { StyleSheet, View, Text } from 'react-native';
import WebView from 'react-native-webview';

export default function HelpScreen() {
const navigation = useNavigation(); //  แฮมเบอร์กอร์
  useEffect(()=> {
    navigation.setOptions({
      title: 'ความช่วยเหลือ',
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
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'//'#ADD8E6', // สีพื้นหลัง (ใช้โค้ดสี HEX หรือชื่อสี) 
    },
    text: {
      fontSize: 40,
      color: 'white',
    },
  });

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.text}>👨🏻‍💻Help Screen</Text>
  //   </View>
  // );
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://www.tpipolene.com/static/help/Easy_E-Receipt_2568' }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
  },
});