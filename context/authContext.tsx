import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, signOut } from 'firebase/auth'
import { auth, db } from "../firebaseConfig"
import { doc, documentId, getDoc, setDoc } from 'firebase/firestore'


type RegisterResult = { success: true; data: User } | { success: false; msg: string };
type LoginResult = { success: true} | { success: false; msg: string };
interface  CustomUser extends User{
    userId?: string;
    username?: string;
    profileURL?: string;
}

interface AuthContextType {
    user: CustomUser | null;
    // userData: { username: string | undefined, profileURL: string | undefined } | null;
    isAuthenticated: boolean | undefined;
    login: (email: string, password: string) => Promise<LoginResult>;
    register: (email: string, password: string, username : string) => Promise<RegisterResult>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);


export const AuthContextProvider = ({children} : {children : ReactNode}   )=>{
    const[user, setUser] = useState<CustomUser | null>(null);
    const[isAuthenticated, setIsAuthenticated]  = useState<boolean | undefined>(undefined);
    // const[userData, setUserData] = useState<{ username: string | undefined, profileURL: string | undefined } | null>(null);

    useEffect(()=>{
        //ONAUTHSTATECHANGE
        const unsub = onAuthStateChanged(auth, (user)=>{
            if(user){
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid)
            }else{  
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub
    },[])

    const updateUserData = async (userId : string) =>{
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user, userId: data.userId, username: data.username, profileURL : data.profileURL} as CustomUser)
            // setUserData({username: data.username, profileURL: data.profileURL})
        }
    }


    const login = async (email :string ,password : string) =>{
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            return {success: true as const}
        } catch (error : any) {
            let msg = error.message;
            if(msg.includes('(auth/invalid-email')) msg='Invalid email'
            if(msg.includes('(auth/invalid-credential')) msg='Invalid credentials'
            return {success: false as const, msg: msg}
        }
    }
    const logout = async () =>{
        try {
            await signOut(auth);
            return {success: true}
        } catch (error : any) {
            let msg = error.message;
            return {success: false as const, msg: msg}
        }
    }
    const register = async (email : string, password : string, username : string) =>{
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            // console.log('response.user', response?.user);
            await setDoc(doc(db, "users", response?.user?.uid),{
                userId: response?.user?.uid,
                username: username,
                profileURL: `https://robohash.org/${username}?set=set4&bgset=&size=400x400`,
            });
            return {success: true as const, data: response?.user}
        } catch (error : any) {
            let msg = error.message;
            if(msg.includes('(auth/invalid-email')) msg='Invalid email'
            if(msg.includes('(auth/email-already-in-use')) msg='Email is already in use'
            return {success: false as const, msg: msg}
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () =>{
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value
}