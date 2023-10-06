import { createContext, useState } from "react";

export let userToken = createContext();



export default function UserTokenProvider(props){

    

    let [usertoken,setUserToken] = useState(null)

    return <userToken.Provider value={{usertoken,setUserToken}}>
        {props.children}
    </userToken.Provider>

}