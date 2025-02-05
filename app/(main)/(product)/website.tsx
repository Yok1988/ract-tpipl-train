import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';

export default function WebsiteScreen() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://www.tpipolene.com/' }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
  },
});