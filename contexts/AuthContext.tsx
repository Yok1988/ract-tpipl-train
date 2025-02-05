import { getProfileService } from "@/services/auth-service";
import { createContext, useContext, useEffect, useState } from "react";

export  const AuthStoreContext = createContext<any>(null) ;
//const {profile} = useContext(AuthStoreContext);

const AuthStoreProvider = ({children}:any) =>{
//global state (varible)
const[isAuth,setIsAuth] = useState(false); //(false);
const[profile,setProfile] = useState(false); 
const [isAuthLaoding,setIsAuthLaoding]=useState(true)

const initAuth = async() =>
{
  try{
    const res = await getProfileService();
    if (res.data.data.user){
      setProfile(res.data.data.user)
      setIsAuth(true)
    }
    else
    {
      setIsAuth(false)
    }

  }catch(error){
    setIsAuth(false);//401 token หมดอายุ
  }finally{
    setIsAuthLaoding(false);
  }
}

useEffect(()=>{
  initAuth();
},[]);

const onUpdateAuthData = async() =>{
  //setIsAuth(true)
  const res =await getProfileService();
  if (res.data.data.user){
    setProfile(res.data.data.user)
    setIsAuth(true)
  }
  else
  {
    setIsAuth(false)
  }
};


//const Name =() =>{}
//const Name = async() =>{}

const onLogout =() =>{
  setIsAuth(false)
  setProfile(null!)
}

const authStoreData = {
    isAuth:isAuth,
    onUpdateAuthData : onUpdateAuthData,
    profile : profile,
    isAuthLoading : isAuthLaoding,
    onLogout:onLogout
  }
  
  return(
    <AuthStoreContext.Provider value={authStoreData}>
      {children}
    </AuthStoreContext.Provider>
  );

}
export default AuthStoreProvider;
