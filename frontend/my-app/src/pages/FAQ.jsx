import React, {useState, useContext} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CONTENT from "../Lang/faq.json";

import './FAQ.css';

import indiamap from '../images/indian_map.jpg';

import Store from '../store/store';

const FAQ  = () => {
    const {state} = useContext(Store);
    let co = CONTENT;
  
    if(state.lang ==="Hindi"){
        co = co.Hindi
    }else{
        co = co.English
    }

    return (
        <>
            <div>
                <h1><b>{co.to}</b></h1>
                <p className= "question">{co.q1}</p>
                    <p className= "answer">{co.a1}</p>
                <p className= "question">{co.q2}?</p>
                    <p className= "answer">{co.a2} </p>
                <p className= "question">{co.q3}</p>
                    <p className= "answer">{co.a3}</p>
                 <p className= "question">{co.q4}</p>
                    <p className= "answer">{co.a4}</p>
                 <p className= "question">{co.q5}</p>
                    <p className= "answer">{co.a5}</p> 
                <p className= "question">{co.q6}</p>
                    <p className= "answer">{co.a6}</p>  
                <p className= "question">{co.q7}</p>
                    <p className= "answer">{co.a7}</p>        
                <p className= "question">{co.q8}</p>
                    <p className= "answer">{co.a8}</p>        
                <p className= "question">{co.q9}</p>
                    <p className= "answer">{co.a9}</p>        
                    <p className= "question">{co.q10}</p>
                    <p className= "answer">{co.a10}</p>                                         
            </div>

             </>
    );
}

export default FAQ;