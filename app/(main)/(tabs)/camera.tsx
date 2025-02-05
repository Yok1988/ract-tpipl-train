import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import axios from 'axios';

export default function CameraScreen() {
  const [permissions, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);

  if (!permissions) {
    return <View />;
  }

  if (!permissions.granted) {
    return (
      <View style={styles.container}>
        <Text>
          We need your permission to show the camera
        </Text>
        <Button title="grant permission" onPress={requestPermission} />
      </View>
    )
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ['images', 'videos'],
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    let result = await ImagePicker.launchCameraAsync({
      // cameraType: ImagePicker.CameraType.back,
      aspect: [4, 3],
      quality: 1,
      // base64: true
    });

    if (!result.canceled) {          // resize image
    const imgForResize = ImageManipulator.manipulate(result.assets![0].uri).resize({height: 400});
    const imgRef = await imgForResize.renderAsync();
    const imgForUpload = await imgRef.saveAsync({base64: true, compress: 0.5, format: SaveFormat.JPEG});
    // console.log(imgForUpload.base64);

    setImage(imgForUpload.uri);
    // setImage(result.assets[0].uri);

    // upload image to backend api
    const url = "https://api.codingthailand.com/api/upload";
    const res = await axios.post(url, {
      picture: "data:image/jpeg;base64," + imgForUpload.base64
    });

    Alert.alert("ผลการอัปโหลด" , JSON.stringify(res.data));

    }
  };

  return (
    <View style={styles.container}>
    <Button title="Pick an image from camera" onPress={pickImage} />
    {image && <Image source={{ uri: image }} style={styles.image} />}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 400,
    margin: 30
  },
});


// import { useState } from 'react';
// import { Button, Image, View, StyleSheet, Text, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as ImageManipulator from 'expo-image-manipulator';
// import axios from 'axios';

// export default function CameraScreen() {
//   const [permissions, requestPermission] = ImagePicker.useCameraPermissions();
//   const [image, setImage] = useState<string | null>(null);

//   if (!permissions) {
//     return <View />;
//   }

//   if (!permissions.granted) {
//     return (
//       <View style={styles.container}>
//         <Text>We need your permission to show the camera</Text>
//         <Button title="Grant Permission" onPress={requestPermission} />
//       </View>
//     );
//   }

//   const pickImage = async () => {
//     try {
      
//       // เปิดกล้องเพื่อถ่ายภาพ
//       let result = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled && result.assets) {
//         const imageUri = result.assets[0].uri;

//         // ปรับขนาดภาพ
//         const resizedImage = await ImageManipulator.manipulateAsync(
//           imageUri,
//           [{ resize: { height: 400 } }],
//           { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG, base64: true }
//         );

//         // แสดงภาพในหน้าจอ
//         setImage(resizedImage.uri);

//         // อัปโหลดภาพไปยัง API
//         const url = "https://api.codingthailand.com/api/upload";
//         const response = await axios.post(url, {
//           picture: `data:image/jpeg;base64,${resizedImage.base64}`,
//         });

//         // แสดงผลการอัปโหลด
//         Alert.alert("ผลการอัปโหลด", JSON.stringify(response.data));
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Something went wrong while picking the image.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pick an image from camera" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={styles.image} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: '100%',
//     height: 400,
//     margin: 30,
//   },
// });


// // import { useState } from 'react';
// // import { Button, Image, View, StyleSheet, Text, Alert, Platform } from 'react-native';
// // import * as ImagePicker from 'expo-image-picker';
// // import * as ImageManipulator from 'expo-image-manipulator';
// // import axios from 'axios';

// // export default function CameraScreen() {
// //   const [permissions, requestPermission] = ImagePicker.useCameraPermissions();
// //   const [image, setImage] = useState<string | null>(null);

// //   if (!permissions) {
// //     return <View />;
// //   }

// //   if (!permissions.granted) {
// //     return (
// //       <View style={styles.container}>
// //         <Text>โปรดอนุญาตการเข้าถึงกล้องเพื่อใช้งานฟีเจอร์นี้</Text>
// //         <Button title="อนุญาตการเข้าถึงกล้อง" onPress={requestPermission} />
// //       </View>
// //     );
// //   }

// //   const pickImage = async () => {
// //     try {
// //       Alert.alert("เริ่มการถ่ายภาพ", "ระบบกำลังเปิดกล้อง..."); // แจ้งเตือนก่อนเปิดกล้อง

// //       // เปิดกล้องเพื่อถ่ายภาพ
// //       const result = await ImagePicker.launchCameraAsync({
// //         allowsEditing: true,
// //         aspect: [4, 3],
// //         quality: 1,
// //       });

// //       Alert.alert("กล้องเสร็จสิ้น", JSON.stringify(result)); // แจ้งเตือนหลังถ่ายภาพ

// //       if (!result.canceled && result.assets) {
// //         const imageUri = result.assets[0].uri;

// //         // แจ้งเตือนก่อนปรับขนาดภาพ
// //         Alert.alert("เริ่มปรับขนาดภาพ", "ระบบกำลังปรับขนาดภาพ...");

// //         const resizedImage = await ImageManipulator.manipulateAsync(
// //           imageUri,
// //           [{ resize: { height: 400 } }],
// //           { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG, base64: true }
// //         );

// //         setImage(resizedImage.uri);

// //         // แจ้งเตือนก่อนอัปโหลดภาพ
// //         Alert.alert("เริ่มอัปโหลด", "กำลังอัปโหลดภาพไปยัง API...");

// //         const url = "https://api.codingthailand.com/api/upload";
// //         const response = await axios.post(url, {
// //           picture: `data:image/jpeg;base64,${resizedImage.base64}`,
// //         });

// //         Alert.alert("ผลการอัปโหลด", JSON.stringify(response.data)); // แจ้งเตือนผลลัพธ์การอัปโหลด
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       Alert.alert("Error", "เกิดข้อผิดพลาดระหว่างการทำงาน");
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Button title="เปิดกล้องถ่ายภาพ" onPress={pickImage} />
// //       {image && <Image source={{ uri: image }} style={styles.image} />}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   image: {
// //     width: '100%',
// //     height: 400,
// //     margin: 30,
// //   },
// // });
