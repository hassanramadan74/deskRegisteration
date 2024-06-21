import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){

    const [userToken,setUserToken] = useState(null)
    const [studentToken,setStudentToken] = useState(null)

  return<UserContext.Provider value={{userToken,setUserToken,setStudentToken,studentToken}}>
        {props.children}
    </UserContext.Provider>
}