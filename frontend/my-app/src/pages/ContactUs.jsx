import React, {useState, useContext} from 'react';
import './ContactUs.css';

import axios from 'axios';
import config from '../config.json';

import Store from '../store/store';

import CONTENT from '../Lang/home.json';


const ContactUs = () => {
    const {state} = useContext(Store);
    const [data,setData] = useState({
        name: "",
        email: "",
        msg: "",
        token: ""
    })

    const [load, setLoad] = useState(false);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const send = async () => {
        const userData = {
            name: data.name,
            msg : data.msg,
            token : localStorage.FBIdToken
        }
        try{
            
            const res = await axios({
                url: `${config.BASE}/Query/`,
                method: 'POST',
                data: userData
            }
                
            );
            if(res.data){
                if(res.data.status === "done"){
                    
                    window.alert(content.su);
                }
                setLoad(false);
                setData({
                    name: "",
                    msg: "",
                    token: ""
                })
            }
        }catch(error){
            console.log(error);
            setLoad(false);
            window.alert("Please try again");
        }
    }

    let content = CONTENT;
  
    if(state.lang ==="Hindi"){
        content = content.Hindi
    }else{
        content = content.English
    }


    const sendDetails = (e) =>{
        e.preventDefault();
        if(state.isAuth){
            if(data.name!==""  && data.msg!==""){
                setLoad(true);
                send();
            }else{
                window.alert(content.al);
            }
        }else{
            window.alert(content.pl);
        }
    }
    return(
        <div className="background">
            <div className="container-contact">
                <div className="screen">
                
                    <div className="screen-body">
                        <div className="screen-body-item left">
                            <div className="app-title" >
                                <div className="xyz">{content.cu}</div>
                                <div className="xyz">{content.cub}</div>
                                <p className="xyza" style={{color:"white"}}>{content.fs}</p>
                            </div>
                            
                            
                        </div>
                        <div className="screen-body-item">
                            <div className="app-form">
                                <div className="app-form-group">
                                <input className="app-form-control" name = "name" placeholder={content.name} onChange = {handleChange} value={data.name} />
                                </div>
                                
                                
                                <div className="app-form-group message">
                                <input className="app-form-control" name = "msg" placeholder={content.msg} onChange = {handleChange} value={data.msg} />
                                </div>
                                <div className="app-form-group buttons">
                                    {load ? 
                                        <button className="app-form-button">{content.load}</button>
                                        :
                                        <button className="app-form-button" onClick={sendDetails}>{content.send}</button>
                                    
                                    }
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>

    );
}

export default ContactUs;