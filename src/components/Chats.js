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
                "project-id":"e11d839b-db76-414d-8cc2-36f81cf78ed7",
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
                { headers: { "private-key": "721701d0-9542-404d-934a-3bef9c887596" }}
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
                Chat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                Logout
                </div>
            </div>
            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID="e11d839b-db76-414d-8cc2-36f81cf78ed7"
                userName = {user.email}
                userSecret={user.uid}
            />
        </div>
        
    );
}

export default Chats;
