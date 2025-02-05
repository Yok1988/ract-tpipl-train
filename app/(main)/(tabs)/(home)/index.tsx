import { Image, StyleSheet, Platform, View, Text, Pressable, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AppLogo from '@/components/AppLogo';
import { Link, router } from 'expo-router';
//import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { DrawerActions } from '@react-navigation/native';
import HomeLogo from '@/components/HomeLogo';
import { Button as Button2 } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';//https://icons.expo.fyi/Index


export default function HomeScreen() {
  const navigation = useNavigation();
  useEffect(()=> {
    navigation.setOptions({
      //title: 'Home',
      headerTitle:() => <HomeLogo/>,
      headerTitleAlign:'center',
      headerShown:true,
      headerLeft:() => (
        <MaterialIcons.Button
        name = "menu" 
        backgroundColor = "#c31b1b"//"#9dc31b" //c31b1b
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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#bf7e41', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/TPI-Polene-Logo.png')} // partial-react-logo.png
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{color:'blue',fontSize:30}}>🥰Welcome YOK!</ThemedText>
        
        <HelloWave />
      </ThemedView>
      <AppLogo title ="TPLPL👋👋👋❤️"/>
      <AppLogo title ="TPLPL👋👋" />
      <AppLogo title ="TPLPL👋" phone={100}/>

      <View>
        <Link href = "/about">About Us</Link>
      </View>

      <View>
        <Link href = "/about" asChild>
        <Pressable style= {{backgroundColor:'#bf7e41' }}>
        <Text style={{color:'#f7f3ed',fontSize: 20,marginBottom:20,}} >😋About Us 2</Text>
        </Pressable>
        </Link>
      </View>

      <View>
      <Button title="About us3👈" onPress={() => { router.push('/about')}} /> 
      <Button2 mode="contained" style={{ marginVertical: 10, width: "50%" ,margin : 10}} icon="account-circle" onPress={() => {
        router.push('/about'); }}>
          About us 3😍
      </Button2>

      <Button2 mode="contained" style={{ margin: 10}} icon="account-circle" onPress={() => {
        router.push('/about'); 
        }}>
          About us 3😍
      </Button2>
      </View>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 200,
    width: 200,
    bottom: 0,
    left: 100,
    //position: 'absolute',
  },
});
