import React, { useState,  useEffect, useContext }  from 'react';
import {Redirect } from 'react-router-dom';

import axios from 'axios';
import config from '../config.json';

import {Line} from 'react-chartjs-2';

import './profile.css';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

import Avatar from '../images/avatar.svg';

import Store from '../store/store';

import Footer from '../util/Footer';

import CONTENT from '../Lang/profile.json';

const Profile = () => {
    const {state}  = useContext(Store);
    const [user, setUser] = useState({
        
    });

    const [name, setName] = useState('');

    const [id, setid] = useState('');

    const [buf, setBuffer] = useState([]);

    const [show, setShow] = useState(false);

    
     //0 no error
    //1 is empty error
    //2 unauthorized(username exist but isVerified false)
    //3 username does not exist
    //4 Password does not match

    dayjs.extend(relativeTime);
    useEffect(() => {
        const getUser = async () => {

            try{
                const res = await axios({
                    url: `${config.BASE}/getUserDetails/`,
                    method: "POST",
                    data: {
                        token: localStorage.FBIdToken
                    }
                });

                if(res.data){
                    
                    setUser(res.data.details.recent.reverse().slice(0,12));
                    setName(res.data.details.name);
                    setid(res.data.details._id);
                    console.log(res.data.details.recent.slice(0,12));
                    //console.log(user);
                   
                } 
            }
            catch(error) {
                console.log(error.response);
            }
        };

        getUser();
    }, []);
console.log(user);
    
    const showg = async(m) => {
        const userData = {
            state: m[0],
            city: m[1],
            month: m[2],
            token: localStorage.FBIdToken
        }
        try{
            const result = await axios({
                url: `${config.BASE}/mlModel1/`,
                method: "POST",
                data: userData
            });
            if(result.data){
                console.log(result.data);
                setBuffer(result.data.buffer);
                handleShow();
            }
        }catch(error){
            console.log(error.response.error);
        }
    } 

    const showGraph = (m) => {
        showg(m);
        
    }

    const graph = {
        labels: ['1', '2', '3','4', '5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
        datasets: [
          {
            label: 'Price of Cotton',
            fill: false,
            lineTension: 1,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: buf
          }
        ],

    }
    
    
    let content = CONTENT;
  
    if(state.lang ==="Hindi"){
        content = content.Hindi
    }else{
        content = content.English
    }
    console.log(content.telangana);


    const contentx = (e) => {
        console.log(content.e);
        return content.e;
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if(!state.isAuth){
        return <Redirect to='/login' />;
    }

  //console.log(user);
   
    return (
        <>
            <div className="wrapper">
                <div className="profile-card js-profile-card">
                    <div className="profile-card__img">
                        <img src={Avatar} alt="avatar"></img>
                    </div>
                
                    <div className="profile-card__cnt js-profile-cnt">
                        <div className="profile-card__name">{name}</div>
                        <br></br>
                        <p><strong>{content.email}</strong> {id}</p>
                        
                        

                        <div className="profile-card-ctr">
                            <h1>{content.his}</h1>
                            
                        </div>
                        <div className="profile-card-ctr">
                        <Row>
                                {user && user.length >0 ? (
                                    <>
                                    {user && 
                                        <>
                                            {user.map((m,i) => (
                                                <Col key={i} sm={3} xs={12} >
                                                    <Card className="recent-card"  border="primary" onClick={()=> showGraph(m)} >
                                                    
                                                        
                                                        <Card.Body>
                                                            <Card.Title>{content[m[0]]}</Card.Title>
                                                            <Card.Title>{content[m[1]]}</Card.Title>
                                                            <Card.Title>{content[m[2]]}</Card.Title>

                                                        </Card.Body>
                                                    </Card>
                                                    <br/>
                                                </Col>
                                            ))}
                                        </>
                                    }
                                    </>
                                ):(
                                    <>
                                        <h3>{content.nh}</h3>
                                    </>
                                )

                                }
                            </Row>
                            <div>
                                <Modal show={show} onHide={handleClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Trend</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <div>
                                        <Line
                                            
                                            data={graph}
                                            width={800}
                                            height={470}
                                            options={{
                                                showScale: true,
                                                pointDot: true,
                                                title:{
                                                display:true,
                                                // text:`Predicted Price of cotton for ${sata.area}`,
                                                // fontSize:20
                                                },
                                                scales: {
                                                    xAxes: [{
                                                        scaleLabel: {
                                                        display: true,
                                                        labelString: 'Days of Month',
                                                        fontSize: 20
                                                        }
                                                    }],
                                                    yAxes: [{
                                                        ticks: {
                                                            beginAtZero:true,
                                                            min: 0,
                                                            max: 6000    
                                                        }
                                                    }]
                                                },
                                                legend:{
                                                display:true,
                                                position:'bottom'
                                                }
                                            }}
                                        />
                                    </div>
                                    </Modal.Body>
                                    
                                </Modal>
                            </div>
                        </div>
                    </div>
            
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Profile;