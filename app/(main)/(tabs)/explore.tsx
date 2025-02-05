import { Alert, Button, Image, StyleSheet, Text, View, } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/native';

export default function TabTwoScreen() {
  const [title,setTitle] = useState("H E L L E O 😛 ^__^ 🧑‍💻 T  P  I");
  const isAuth = true;
  const navigation = useNavigation(); //  แฮมเบอร์กอร์

  useEffect(() =>{ console.log("H E L L E O 👋99999❤️ "); },[]);
  useEffect(() =>{  console.log("H E L L E O 👋88888😍"); });
  useEffect(() =>{ console.log("H E L L E O 👋7777😩");},[title]); //ทำซ้ำ

  useEffect(()=> {
    navigation.setOptions({
      title: 'Explore',
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
  },[navigator]
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'white', dark: '#353636' }}
      headerImage={
        <Image source={require('@/assets/images/TPI-Polene-Logo.png')} // partial-react-logo.png
        style={styles.reactLogo}   />
      } >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{color:'#f7f3ed',fontSize: 30,marginBottom:20,}}>Explore { isAuth && <HelloWave /> }</ThemedText>
        <Text style={{color:'#f7f3ed',fontSize: 20 ,fontWeight: 'bold'}}>Hello Yok 🥳</Text>
        <Text style={{color:'#f7f3ed',fontSize: 20,fontWeight: 'bold'}}>Hello Yok 🥳</Text>
        <Text style={styles.myText}>Hello Yok 🥳</Text>
      </ThemedView>

      <View style={{backgroundColor : "#f24724",padding:10,borderWidth:2,borderColor : "#white"}}>
       <Text style={{color:'white',fontSize: 18,marginBottom:20}}>{title}</Text>
        <Button title="Press me" onPress={() => {
            //Alert.alert("สวัสดี react native");
            setTitle("H E L L E O  😍 ReactNative 👋👋")
        }} /> 
       <Text style={styles.myText}> Hello 🥳</Text>
      </View>
    
      {/* <View style={{backgroundColor : "pink",padding:10,borderWidth:2}}>
       <Text style={{color:'green',fontSize: 18,marginBottom:20,}}>{title}</Text>
        <Button title="Press me" onPress={() => {
            //Alert.alert("สวัสดี react native");
            setTitle("H E L L E O  😍 ReactNative 👋👋")
        }} /> 
       <Text style={styles.myText}>Hello 🥳</Text>
      </View> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    padding: 20,
    backgroundColor: '#cc9356',//'#f4f4f4',
    flexDirection: 'column', ////flexDirection: 'row',
    height: '50%',
    alignItems: 'center', // Centers the title horizontally //stretch flex-start flex-end center baseline
    justifyContent: 'center', // Centers the title vertically  center
    //จัดตำแหน่ง flex-start center space-between space-around space-evenly
    //justifyContent: 'flex-end',
    gap: 8,
  },
  myText:{
    color: 'white',
    fontWeight: 'bold'
    ,fontSize: 30
    ,margin: 'auto'
    ,marginTop: 20
  },
  reactLogo: {
    height: 200,
    width: 200,
    bottom: 0,
    left: 100,
   // position: 'absolute',
  }
});
