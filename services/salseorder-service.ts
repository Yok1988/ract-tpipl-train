import axios from "axios";
// ตรวจสอบหน้า Postman
export async function getSalseServiceTPI(){
 return await axios.get('http://localhost:5000/sales');
}

