import axios from "axios";

export async function getVersionServiceTPI(){
return await axios.get('https://api.tpipolene.co.th/products');
//https://api.codingthailand.com/api/version2

//return await axios.get('https://api.codingthailand.com/api/version'),{
    //responseType: 'text'
//};
}