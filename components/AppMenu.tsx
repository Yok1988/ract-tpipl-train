import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { View, Text, ImageBackground } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Drawer } from 'react-native-paper';
import * as React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';//https://icons.expo.fyi/Index
import { useQuery } from '@tanstack/react-query';
import { getVersionService } from '@/services/util-service';
import { AuthStoreContext } from '@/contexts/AuthContext';
import { loginService, logoutService } from '@/services/auth-service';
import { router } from 'expo-router';

export default  function AppMenu(props:DrawerContentComponentProps) {
  const {profile,onLogout} = React.useContext(AuthStoreContext);

  //https://api.codingthailand.com/api/version2 เชื่อม util-service.ts
  const {data} = useQuery<string>({ 
      queryKey: ['versionData'],
      queryFn : async ()=> {
      const response = await getVersionService();
      //console.log(response.data);
      return response.data;
  } });

  //https://api.codingthailand.com/api/version เชื่อม util-service.ts
//   const {data} = useQuery<string>({ 
//     queryKey: ['versionData'],
//     queryFn : async ()=> {
//     const response = await getVersionService();
//     //console.log(response.data);
//     return response.data.data.version;
// } });

  return (   
    <SafeAreaView>
        <ScrollView>       
            <ImageBackground source={{uri:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"}} 
            //source={{ uri: "https://source.unsplash.com/random/200x300" }}
            //https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg
            //https://picsum.photos/180/180
            
            style={{width: '100%',height:150,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white',fontSize:40}}>Main Menu</Text>
                <Text style={{color:'yellow',fontSize:30}}>version:{data}</Text>
                {
                data && <Text style={{fontSize: 16, color: 'white'}}>Version:{data}</Text>
                }
               {
                profile && <Text style={{fontSize: 14, color: 'white'}} >
                  id: {profile.id} name: {profile.name} role: {profile.role}
                  </Text>
              }
            </ImageBackground>
          <Drawer.Section>
          <Drawer.Item
            icon="home"
            label="หน้าแรก"
            right ={ () => <MaterialIcons name= "keyboard-arrow-right" size={20}/>}
            onPress={() => { props.navigation.navigate('(tabs)')}}
          />
          <Drawer.Item
            icon="star"
            label="สินค้า"
            right ={ () => <MaterialIcons name= "keyboard-arrow-right" size={20}/>}
            onPress={() => {props.navigation.navigate('(product)')}}
          />
          <Drawer.Item
            icon="help"
            label="ความช่วยเหลือ"
            right ={ () => <MaterialIcons name= "keyboard-arrow-right" size={20}/>}
            onPress={() => {props.navigation.navigate('(help)')}}
          />
          </Drawer.Section>


          <Drawer.Section>
          <Drawer.Item
            icon={"logout"}
            label="ออกจากระบบ"                   
            right={() => <MaterialIcons name="keyboard-arrow-right" size={20}/>}    
            onPress={ async () => {
              await logoutService();
              onLogout();
              router.replace('/login');
            }}   
          />
        </Drawer.Section>


        </ScrollView>       
    </SafeAreaView> 
  )
}



//============= โค้ดใส่ธีม
// import React from 'react';
// import { StyleSheet, Text, View, ImageBackground } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Drawer, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // https://icons.expo.fyi/Index
// import { useQuery } from '@tanstack/react-query';
// import { getVersionService } from '@/services/util-service';
// import { AuthStoreContext } from '@/contexts/AuthContext';
// import { logoutService } from '@/services/auth-service';
// import { router } from 'expo-router';

// // สร้าง Custom Theme โทนส้มแดง
// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#FF5722', // สีหลัก (ส้มแดง)
//     accent: '#FF7043',  // สีรอง (ส้มอ่อน)
//     background: '#FFE0B2', // สีพื้นหลัง (ครีม/ส้มอ่อน)
//     surface: '#FFAB91', // สีพื้นผิว (ส้มพาสเทล)
//     text: '#FFFFFF', // สีข้อความ (ขาว)
//   },
// };

// export default function AppMenu(props) {
//   const { profile, onLogout } = React.useContext(AuthStoreContext);

//   const { data } = useQuery({
//     queryKey: ['versionData'],
//     queryFn: async () => {
//       const response = await getVersionService();
//       return response.data;
//     },
//   });

//   return (
//     <PaperProvider theme={theme}>
//       <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
//         <ScrollView>
//           <ImageBackground
//             source={{
//               uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
//             }}
//             style={styles.imageBackground}
//           >
//             <Text style={styles.title}>Main Menu</Text>
//             <Text style={styles.version}>version: {data}</Text>
//             {profile && (
//               <Text style={styles.profileText}>
//                 id: {profile.id} name: {profile.name} role: {profile.role}
//               </Text>
//             )}
//           </ImageBackground>
//           <Drawer.Section title="เมนูหลัก" style={styles.drawerSection}>
//             <Drawer.Item
//               icon="home"
//               label="หน้าแรก"
//               //labelStyle={styles.label}
//               onPress={() => props.navigation.navigate('(tabs)')}
//               right={() => <MaterialIcons name="keyboard-arrow-right" size={20} color={theme.colors.text} />}
//             />
//             <Drawer.Item
//               icon="star"
//               label="สินค้า"
//               //labelStyle={styles.label}
//               onPress={() => props.navigation.navigate('(product)')}
//               right={() => <MaterialIcons name="keyboard-arrow-right" size={20} color={theme.colors.text} />}
//             />
//             <Drawer.Item
//               icon="help"
//               label="ความช่วยเหลือ"
//               //labelStyle={styles.label}
//               onPress={() => props.navigation.navigate('(help)')}
//               right={() => <MaterialIcons name="keyboard-arrow-right" size={20} color={theme.colors.text} />}
//             />
//           </Drawer.Section>
//           <Drawer.Section>
//             <Drawer.Item
//               icon="logout"
//               label="ออกจากระบบ"
//               //labelStyle={styles.label}
//               onPress={async () => {
//                 await logoutService();
//                 onLogout();
//                 router.replace('/login');
//               }}
//               right={() => <MaterialIcons name="keyboard-arrow-right" size={20} color={theme.colors.text} />}
//             />
//           </Drawer.Section>
//         </ScrollView>
//       </SafeAreaView>
//     </PaperProvider>
//   );
// }

// const styles = StyleSheet.create({
//   imageBackground: {
//     width: '100%',
//     height: 150,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     color: 'white',
//     fontSize: 40,
//   },
//   version: {
//     color: '#FFCCBC', // สีข้อความรอง (โทนอ่อน)
//     fontSize: 30,
//   },
//   profileText: {
//     fontSize: 14,
//     color: 'white',
//   },
//   drawerSection: {
//     backgroundColor: theme.colors.surface,
//   },
//   label: {
//     color: theme.colors.text,
//     fontWeight: 'bold',
//   },
// });

//===============
// import React from 'react';
// import { StyleSheet, Text, View, ImageBackground } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Drawer, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // https://icons.expo.fyi/Index
// import { useQuery } from '@tanstack/react-query';
// import { getVersionService } from '@/services/util-service';
// import { AuthStoreContext } from '@/contexts/AuthContext';
// import { logoutService } from '@/services/auth-service';
// import { router } from 'expo-router';

// // สร้าง Custom Theme
// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#1E88E5', // สีหลัก
//     accent: '#42A5F5',  // สีรอง
//     background: '#E3F2FD', // สีพื้นหลัง
//     surface: '#90CAF9', // สีพื้นผิว
//     text: '#FFFFFF', // สีข้อความ
//   },
// };

// export default function AppMenu(props) {
//   const { profile, onLogout } = React.useContext(AuthStoreContext);

//   const { data } = useQuery({
//     queryKey: ['versionData'],
//     queryFn: async () => {
//       const response = await getVersionService();
//       return response.data;
//     },
//   });

//   return (
//     <PaperProvider theme={theme}>
//       <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
//         <ScrollView>
//           <ImageBackground
//             source={{
//               uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
//             }}
//             style={styles.imageBackground}
//           >
//             <Text style={styles.title}>Main Menu</Text>
//             <Text style={styles.version}>version: {data}</Text>
//             {profile && (
//               <Text style={styles.profileText}>
//                 id: {profile.id} name: {profile.name} role: {profile.role}
//               </Text>
//             )}
//           </ImageBackground>
//           <Drawer.Section title="เมนูหลัก" style={styles.drawerSection}>
//             <Drawer.Item
//               icon="home"
//               label="หน้าแรก"
//               labelStyle={styles.label}
//               onPress={() => props.navigation.navigate('(tabs)')}
//               right={() => <MaterialIcons name="keyboard-arrow-right" size={20} color={theme.colors.text} />}
//             />
//             <Drawer.Item
//               icon="star"
//               label="สินค้า"
//               labelStyle={styles.label}
//               onPress={() => props.navigation.navigate('(product)')}
//               right={() => <MaterialIcons name="keyboard-arrow-right" size={20} color={theme.colors.text} />}
//             />
//             <Drawer.Item
//               icon="help"
//               label="ความช่วยเหลือ"
//               labelStyle={styles.label}
//               onPress={() => props.navigation.navigate('(help)')}
//               right={() => <MaterialIcons name="keyboard-arrow-right" size={20} color={theme.colors.text} />}
//             />
//           </Drawer.Section>
//           <Drawer.Section>
//             <Drawer.Item
//               icon="logout"
//               label="ออกจากระบบ"
//               labelStyle={styles.label}
//               onPress={async () => {
//                 await logoutService();
//                 onLogout();
//                 router.replace('/login');
//               }}
//               right={() => <MaterialIcons name="keyboard-arrow-right" size={20} color={theme.colors.text} />}
//             />
//           </Drawer.Section>
//         </ScrollView>
//       </SafeAreaView>
//     </PaperProvider>
//   );
// }

// const styles = StyleSheet.create({
//   imageBackground: {
//     width: '100%',
//     height: 150,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     color: 'white',
//     fontSize: 40,
//   },
//   version: {
//     color: 'yellow',
//     fontSize: 30,
//   },
//   profileText: {
//     fontSize: 14,
//     color: 'white',
//   },
//   drawerSection: {
//     backgroundColor: theme.colors.surface,
//   },
//   label: {
//     color: theme.colors.text,
//     fontWeight: 'bold',
//   },
// });
