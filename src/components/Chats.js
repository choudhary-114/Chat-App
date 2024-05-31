import React, {useRef,useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";

import { auth } from "../firebase";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";

const Chats = ( ) => {

    const history=useHistory();
    const {user} = useAuth();
    const [loading,setLoading]=useState(true);
    

    const handleLogout = async ( ) =>{
        await auth.signOut();
        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data],"userPhoto.jpg",{type:'image/jpeg'})
    }

    useEffect(()=>{
        if(!user){
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me',{
            headers:{
                "project-id":"ad8ba365-c6d9-4140-8635-6dda3934b1c2",
                "user-name" : user.email ,
                "user-secret" : user.uid,
            }
        })
        .then(() =>{
            setLoading(false);
        })
        .catch(e => {
            let formdata = new FormData()
            formdata.append('email', user.email)
            formdata.append('username', user.email)
            formdata.append('secret', user.uid)
    
            getFile(user.photoURL)
            .then(avatar => {
              formdata.append('avatar', avatar, avatar.name)
    
              axios.post(
                'https://api.chatengine.io/users/',
                formdata,
                { headers: { "private-key": "e693f0ec-537d-491c-88b7-1de25acad30b" }}
              )
              .then(() => setLoading(false))
              .catch(e => console.log('e', e.response))
            })
          })
    }, [user,history]);

    if(!user || loading ) return 'Loding....';

    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                Godara-Chat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                Logout
                </div>
            </div>
            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID="ad8ba365-c6d9-4140-8635-6dda3934b1c2"
                userName = {user.email}
                userSecret={user.uid}
            />
        </div>
        
    );
}

export default Chats;