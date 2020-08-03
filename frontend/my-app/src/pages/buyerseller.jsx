import React, { useContext, useState } from 'react';

import './buyer.css';

import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import bs from "../images/bs.svg";

import Store from '../store/store';

import CONTENT from '../Lang/buyer.json';

const Buyer = () => {
    const {state} = useContext(Store);
    const [data, setData] = useState({
        state:"",
        city: '',
        month: "January"
    });

    const [load, setLoad] = useState(false);

    const [trans, setTrans] = useState(0);
    const [sata, setSata] = useState([]);

    const months = [
        {monthName: 'January', displayE:"January", displayH:"जनवरी"},
 
       {monthName: 'February', displayE:"February", displayH:"फरवरी"},
 
       {monthName: 'March', displayE:"March", displayH:"मार्च "},

        {monthName: 'April', displayE:"April", displayH:"अप्रैल"},
 
       {monthName: 'May', displayE:"May", displayH:"मई"},
 
       {monthName: 'June', displayE:"June", displayH:"जून"},

        {monthName: 'July', displayE:"July", displayH:"जुलाई"},
 
       {monthName: 'August', displayE:"August", displayH:"अगस्त"},
 
       {monthName: 'September', displayE:"September", displayH:"सितंबर"},
 
       {monthName: 'October', displayE:"October", displayH:"अक्टूबर"},

        {monthName: 'November', displayE:"November", displayH:"नवंबर"},
 
       {monthName: 'December', displayE:"December", displayH:"दिसंबर"}
 
   ];

   const handleChange = e =>{
        setData({
            ...data,
            [e.target.name] : e.target.value
        });
    }

   const send = async() => {
    const PostData={
        state: data.state.toLowerCase(),
        city: data.city.toLowerCase(),
        month: data.month.toLowerCase(),
        token: localStorage.FBIdToken
    }
        try{
            const res = await axios({
                url: "https://sih-django.herokuapp.com/allprice/",
                method: 'POST',
                data: PostData
            });
            if(res.data){
                console.log(res.data);
                setLoad(false);
                if(trans === 0){
                    setSata(res.data.buffer);
                }else{
                    setSata(res.data.buffer1);
                }
                
            }
        }catch(error){
           console.log(error);
        }
   }
   console.log(data);

   const submit = (e) => {
        e.preventDefault();
        setTrans(1);
        if(data.city !== '' && data.month!== "" && data.state !== ''){
            console.log(data);
            setLoad(true);
            send();
        }else{
            window.alert("fill all credentials");
        }
   }

   const nsubmit = (e) => {
    e.preventDefault();
    setTrans(0);
    if(data.city !== '' && data.month!== "" && data.state !== ''){
        console.log(data);
        setLoad(true);
        send();
    }else{
        window.alert("fill all credentials");
    }
}

   let content = CONTENT;
  
      if(state.lang ==="Hindi"){
          content = content.Hindi
      }else{
          content = content.English
      }
    return (
        
            <div className="buyer">
                <br/>
                <h1 >{content.bh}</h1>
                <br />
                <br/> 
                <img src={bs}className="buypic" />
                <br/><br/>
                <h3 className="buyer-sh" >{content.bsh}</h3>
                <br/><br/>
                <Row>
                    <Col xs={12} sm={3} className="inp-col">
                    <div className="input-div one focus">
                    
                        <div className="div">
                                <h4>{content.st}</h4>
                                <input 
                                    type="text" 
                                    name='state'
                                    onChange={handleChange}
                                    required='required'
                                    className="input" 
                                />
                        </div>
                    </div>
                    </Col>
                    <Col xs={12} sm={3} className="inp-col">
                    <div className="input-div one focus">
                    
                        <div className="div">
                                <h4>{content.ci}</h4>
                                <input 
                                    type="text" 
                                    name='city'
                                    onChange={handleChange}
                                    required='required'
                                    className="input" 
                                />
                        </div>
                    </div>
                    </Col>
                    
                    <Col xs={12} sm={2}  className="mon">
                    <select 
                        onChange= {handleChange}
                        nalue={data.month} 
                        name= 'month' 
                        id="selectMonth" 
                        className="option-style"
                    >
                        {months.map((e,i) =>(
                            <>
                                {state.lang === "Hindi" ? 
                                    <option  value = {e.monthName} key={i}>
                                    {e.displayE}
                                    </option>

                                    : 
                                    <option  value = {e.monthName} key={i}>
                                    {e.displayE}
                                    </option>
                                }
                            </>
                            // <option  value = {e.monthName} key={i}>
                            // {e.displyE}
                            // </option>
                        )) }
                    </select>
                    </Col>
                </Row>
                <br />
                <Row><Col>{content.al}</Col></Row>
                <br/><br/>
                <Row>
                    <Col xs={12}>
                        {load ? 
                            <><Button variant="outline-success" onClick={submit} >Loading...</Button>{' '}</>
                            :
                            <><Button variant="outline-success" onClick={submit} >{content.wt}</Button>{' '}</>
                        }
                        {/* <><Button variant="outline-success" onClick={submit} >{content.wt}</Button>{' '}</> */}
                    </Col>
                    <Col xs={12}>
                        <br/>
                    </Col>
                    <Col xs={12}>
                    {load ? 
                            <><Button variant="outline-success" >Loading...</Button>{' '}</>
                            :
                            <><Button variant="outline-success" onClick={nsubmit} >{content.wnt}</Button>{' '}</>
                        }
                        {/* <><Button variant="outline-success" onClick={nsubmit} >{content.wnt}</Button>{' '}</> */}
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>

                    
                <Row className="hlo">
                            
                
                {sata && sata.length>0 &&
                    <>
                        {sata.map((e,i) => (

                            <Col xs={12} lg={3} className="colxz">
                                <div id="price-container">
                                <div class="profile-img"></div> 
                                <br/><br/>
                                <h6>CITY</h6>
                                    <h3>
                                        {e[0]}
                                    </h3>
                                    <h6>STATE</h6>
                                    <h3>
                                        {e[1]}
                                    </h3>
                                    <h4>Average price</h4>
                                    {trans === 0 ? 
                                            (
                                                <h2>
                                                    {e[2].toFixed(2)}
                                                </h2>
                                            ): (
                                                <h2>
                                                    {e[4].toFixed(2)}
                                                </h2>
                                            )
                                    }
                                
                                    
                                    
                                    
                                
                                </div>
                                
                            </Col>
                            
                        ))}
                    </>
                }

                </Row>
                {/* <div id="price-container">
                    <div class="profile-img"></div>
                    <h1>
                        Maddie
                    </h1>
                    <div class="description">
                        Maddie is a front end web developer in New York. She has worked in the field for 10 years now. Check out her projects in the links below. She is available for hire as well.
                    </div>
                    <div class="social">
                        <a>GitHub</a>
                        <a>Twitter</a>
                        <a>LinkedIn</a>
                    </div>
                    <button>Hire Me</button>
                    
                </div> */}

                
            </div>
        
    );
}

export default Buyer;