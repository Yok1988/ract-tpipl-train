import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import AppMenu from '@/components/AppMenu';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect } from 'expo-router';
import { AuthStoreContext } from '@/contexts/AuthContext';
import AppLoading from '@/components/AppLoading';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function MainLayout() {
  // const isAuth = false;
  const { isAuth, isAuthLoading } = useContext(AuthStoreContext);

  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (isAuthLoading) {
    SplashScreen.hideAsync();
    return <AppLoading />
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#008bff',
      secondary: '#87ffe9',
    },
  };

  return (

    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}> 
        {
          isAuth ? (          
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Drawer drawerContent={(props) => <AppMenu {...props} />}>
                <Drawer.Screen name="(tabs)" options={{headerShown: false}} />
                <Drawer.Screen name="(product)" options={{headerShown: false}} />
                <Drawer.Screen name="(help)" options={{headerShown: false}} />
                <Drawer.Screen name="+not-found" />
              </Drawer>
            </GestureHandlerRootView>
            ) : (<Redirect href="/login" />)
        }
        <StatusBar style="auto" />
      </PaperProvider>   
    </QueryClientProvider>
     
  );
}
