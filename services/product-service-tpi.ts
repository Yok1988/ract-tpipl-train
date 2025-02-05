import axios from "axios";
// ตรวจสอบหน้า Postman
export async function getProductServiceTPI(){
 return await axios.get('https://api.tpipolene.co.th/products');
}

export async function getProductDetailServiceTPI(id :any){ 
    console.log('https://api.tpipolene.co.th/products/' + id.toString());
    return await axios.get(`https://api.tpipolene.co.th/products/${id}`);
    
    //return await axios.get('https://api.tpipolene.co.th/products/' + id.toString());  
}

export async function getProductDetailServiceTPIPL(){ 
    console.log('https://api.tpipolene.co.th/products/1');
    return await axios.get('https://api.tpipolene.co.th/products/1');
}

export async function getProductDetailServiceTPI2(){ 
    return await axios.get('https://api.tpipolene.co.th/products');  
}