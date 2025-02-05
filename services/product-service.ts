import axios from "axios";
// ตรวจสอบหน้า Postman
export async function getProductService(){
 return await axios.get('https://api.codingthailand.com/api/course');
}
//Detail
export async function getProductDetailService(id :number){ 
    return await axios.get('https://api.codingthailand.com/api/course/' + id.toString());
}