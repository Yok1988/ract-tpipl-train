import { Text } from "react-native";
type AppLogoProp ={
    title: string;
    phone?: number;
}
export default function AppLogo({title,phone} : AppLogoProp) {
    return (
        <Text style={{color:'red',fontSize:20}} >{title}{phone}</Text>  
       //<Text>👋Logo👋</Text>
    );
}