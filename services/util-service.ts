import axios from "axios";

export async function getVersionService(){
return await axios.get('https://api.codingthailand.com/api/version2');
//https://api.codingthailand.com/api/version2

//return await axios.get('https://api.codingthailand.com/api/version'),{
    //responseType: 'text'
//};
}