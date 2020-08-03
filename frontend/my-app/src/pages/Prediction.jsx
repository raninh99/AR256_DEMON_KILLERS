import React, {useState, useContext} from 'react';

import { Redirect } from 'react-router-dom';

import {Line} from 'react-chartjs-2';

import Store from '../store/store';

import indiamap from '../images/indian_map.jpg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';



// import Ahemdabad from '../images/Ahmedabad.png';
// import Alirajpur from '../images/Alirajpur.png';
// import Amravati from '../images/Amravati.png';
// import Amreli from '../images/Amreli.png';
// import Aurangabad from '../images/Aurangabad.png';
// import Ahemdabad from '../images/Ahmedabad.png';
// import Ahemdabad from '../images/Ahmedabad.png';
// import Ahemdabad from '../images/Ahmedabad.png';
// import Ahemdabad from '../images/Ahmedabad.png';

// import Ahemdabad from '../images/Ahmedabad.png';
// import Ahemdabad from '../images/Ahmedabad.png';import Ahemdabad from '../images/Ahmedabad.png';



import axios from 'axios';


import Footer from '../util/Footer';

import CONTENT from '../Lang/prediction.json';

import g1 from "../images/g1.jpg";
import g2 from "../images/g2.jpg";

import './pages.css';
const Prediction =() =>{
    const{ state } = useContext(Store);
    const[data, setData] = useState({
        region: ''
    });

    const[sata, setSata] = useState({
        regions: '',
        area: '',
        month: ''
    })

    const [chk, setChk] = useState(false);

    const [imageBuffer, setBuffer] = useState([])

   const [maint, setMaint] = useState(false);

    const [graphLoad, setGraphLoad] = useState(2);
    //0 initial
    //1 loading 
    //2 graph
    const gujrats =[
        
        {area: 'Ahmedabad', displayE:"Ahmedabad", displayH:" अहमदाबाद"},
    
            {area: 'Kutch', displayE:"Kutch", displayH:" कच्छ"},
    
            {area: 'Amreli', displayE:"Amreli", displayH:" अमरेली"},
     
           {area: "Bhavnagar", displayE:"Bhavnagar", displayH:"भावनगर"},
    
            {area: "Gandhinagar", displayE:"Gandhinagar", displayH:"गांधीनगर"},
    
            {area: 'Jamnagar', displayE:"Jamnagar", displayH: "जामनगर"},
    
            {area: 'Junagarh', displayE:"Junagarh", displayH :"जूनागढ़"},
    
            {area: 'Kheda', displayE:"Kheda", displayH:" खेड़ा"},
     
           {area: 'Rajkot', displayE:"Rajkot", displayH:" राजकोट"}
    
        ];
        
    
    
    const haryanas = [
            
        {area: 'Hisar', displayE:"Hisar", displayH:" हिसार"},
    
            {area: 'Jind', displayE:"Jind", displayH:" जींद"},
     
           {area: 'Sirsa', displayE:"Sirsa", displayH:" सिरसा"}
        ];
     
    
    
      const karnatakas = [
            {area: 'Bijapur', displayE:"Bijapur", displayH:" बीजापुर"},
    
            {area: 'Davanagere', displayE:"Davanagere", displayH:" दावणगेरे"},
     
           {area: 'Dharwad', displayE:"Dharwad", displayH:" धारवाड़"},
     
           {area: 'Haveri', displayE:"Haveri", displayH:" हावेरी"},
    
            {area: 'Raichur' ,displayE:"Raichur", displayH:" रायचुर"}
        
    ];
        
    
    
    const madhyapradeshs = [
            
        {area: 'Alirajpur' ,displayE:"Alirajpur", displayH:" अलीराजपुर"},
    
            {area: 'Badwani' ,displayE:"Badwani", displayH:" बड़वानी"},
    
            {area: 'Chhindwara' ,displayE:"Chhindwara", displayH:" छिंदवाड़ा"},
     
           {area: 'Dhar' ,displayE:"Dhar", displayH:" धार"},
     
           {area: 'Khargone' ,displayE:"Khargone", displayH:" खरगोन"},
        
    ];
        
    
    
    const andhrapradeshs = [
            {area: 'Kurnool' ,displayE:"Kurnool", displayH:" कुरनूल"}
        ]
    ;
    
    
    const maharastras =[
        {area: 'Amravati' ,displayE:"Amravati", displayH:" अमरावती"},

        {area: 'Aurangabad' ,displayE:"Aurangabad", displayH:" औरंगाबाद"},
    
        {area: 'Buldana' ,displayE:"Buldana", displayH:" बुलढाणा"},
    
        {area: 'Nagpur' ,displayE:"Nagpur", displayH:" नागपुर"},
    
        {area: 'Nanded' ,displayE:"Nanded", displayH:" नांदेड़"}
    
    ];
        
    
    
    const rajasthans = [
            
        {area: 'Bhilwara' ,displayE:"Bhilwara", displayH:" भीलवाड़ा"},
    
            {area: 'Sri Ganganagar' ,displayE:"Sri Ganganagar", displayH:" गंगानगर"},
     
           {area: 'Hanumangarh' ,displayE:"Hanumangarh", displayH:" हनुमानगढ़"},
    
        ];
        
    
    const punjabs = [
            
        {area: 'Bathinda' ,displayE:"Bathinda", displayH:" भटिंडा"},
     
           {area: 'Barnala' ,displayE:"Barnala", displayH:" बरनाला"},
     
           {area: 'Mansa' ,displayE:"Mansa", displayH:" मनसा"},
        
    ];
        
    
    const telanganas = [
            
        {area: 'Khammam' ,displayE:"Khammam", displayH:" खम्मम"},
    
            {area: 'Warangal' ,displayE:"Warangal", displayH:" वारंगल"},
     
       ];
        
    
    const uttarpradeshs = [
            {area: 'Hathras' ,displayE:"Hathras", displayH:" हाथरस"}
        ];
    
    
    const tamilnadus = [
            {area: 'Tuticorin' ,displayE:"Tuticorin", displayH:" तूतीकोरिन"}
    
        ];
        
    
    
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
    // const gujrats =[
    //     {area: 'Ahemdabad'},
    //     {area: 'Kachh'},
    //     {area: 'Amreli'},
    //     {area: "Bhavnagar"},
    //     {area: "Gandhinagar"},
    //     {area: 'Jamnagar'},
    //     {area: 'Junagarh'},
    //     {area: 'Kheda'},
    //     {area: 'Raajkot'}
    // ];
    // const haryanas = [
    //     {area: 'Hisar'},
    //     {area: 'Jind'},
    //     {area: 'Sirsa'}
    // ];
    // const karnatakas = [
    //     {area: 'Bijapur'},
    //     {area: 'Devangere'},
    //     {area: 'Darvad'},
    //     {area: 'Haveri'},
    //     {area: 'Raichur'}
    // ];
    // const madhyapradeshs = [
    //     {area: 'Alirajpur'},
    //     {area: 'Badwani'},
    //     {area: 'Chindwara'},
    //     {area: 'Dhar'},
    //     {area: 'Khargone'},
    // ];
    // const andhrapradeshs = [
    //     {area: 'Kurnool'}
    // ]
    // const maharastras =[
    //     {area: 'Amravati'},
    //     {area: 'Aurangabad'},
    //     {area: 'Buldana'},
    //     {area: 'Nagpur'},
    //     {area: 'Nanded'}
    // ];
    // const rajasthans = [
    //     {area: 'Bhilwara'},
    //     {area: 'Ganganagar'},
    //     {area: 'Hanumangarh'},
    // ];
    // const punjabs = [
    //     {area: 'Bhatinda'},
    //     {area: 'Barnala'},
    //     {area: 'Mansa'},
    // ];
    // const telanganas = [
    //     {area: 'Khamman'},
    //     {area: 'Warangal'},
    // ];
    // const uttarpradeshs = [
    //     {area: 'Hatras'}
    // ];
    // const tamilnadus = [
    //     {area: 'Tuticorin'}
    // ];
    
    // const months = [
    //     {monthName: 'January', displayE:"January", displayH:"जनवरी"},
    //     {monthName: 'February', displayE:"February", displayH:"फरवरी"},
    //     {monthName: 'March', displayE:"March", displayH:"मार्च "},
    //     {monthName: 'April', displayE:"April", displayH:"अप्रैल"},
    //     {monthName: 'May', displayE:"May", displayH:"मई"},
    //     {monthName: 'June', displayE:"June", displayH:"जून"},
    //     {monthName: 'July', displayE:"July", displayH:"जुलाई"},
    //     {monthName: 'August', displayE:"August", displayH:"अगस्त"},
    //     {monthName: 'September', displayE:"September", displayH:"सितंबर"},
    //     {monthName: 'October', displayE:"October", displayH:"अक्टूबर"},
    //     {monthName: 'November', displayE:"November", displayH:"नवंबर"},
    //     {monthName: 'December', displayE:"December", displayH:"दिसंबर"}
    // ];
    const gujrat=()=> {
        setData({
            ...data,
            region: gujrats
        });
        setSata({
            area: '',
            month : '',
            regions:'gujarat'
        });

    }
    const haryana=()=> {
        setData({
            ...data,
            region: haryanas
        });
        setSata({
            area: '',
            month : '',
            regions:'haryana'
        });
        
    }
    const karnataka=()=> {
        setData({
            ...data,
            region: karnatakas
        });
        setSata({
            area: '',
            month : '',
            regions:'karnataka'
        });
    }
    const madhyapradesh=()=> {
        setData({
            ...data,
            region: madhyapradeshs
        });
        setSata({
            area: '',
            month : '',
            regions:'madhyapradesh'
        });
    }
    const andhrapradesh=()=> {
        setData({
            ...data,
            region: andhrapradeshs
        });
        setSata({
            area: '',
            month : '',
            regions:'andhrapradesh'
        });
    }
    const maharastra=()=> {
        setData({
            ...data,
            region: maharastras
        });
        setSata({
            area: '',
            month : '',
            regions:'maharashta'
        });
    }
    const rajasthan=()=> {
        setData({
            ...data,
            region: rajasthans
        });
        setSata({
            area: '',
            month : '',
            regions:'rajasthan'
        });
    }
    const punjab=()=> {
        setData({
            ...data,
            region: punjabs
        });
        setSata({
            area: '',
            month : '',
            regions:'punjab'
        });
    }
    const telangana=()=> {
        setData({
            ...data,
            region: telanganas
        });
        setSata({
            area: '',
            month : '',
            regions:'telangana'
        });
    }
    const uttarpradesh=()=> {
        setData({
            ...data,
            region: uttarpradeshs
        });
        setSata({
            area: '',
            month:'',
            regions:'up'
        });
    }
    const tamilnadu=()=> {
        setData({
            ...data,
            region: tamilnadus
        });
        setSata({
            area: '',
            month:'',
            regions:'tamilnadu'
        });
    }

    const handleChange = e =>{
        setSata({
            ...sata,
            [e.target.name] : e.target.value
        });
    }

    const [minmax, setminmax] = useState([]);
    const x = async() => {
        const PostData={
            state: sata.regions.toLowerCase(),
            city: sata.area.toLowerCase(),
            month: sata.month.toLowerCase(),
            token: localStorage.FBIdToken
        }
        try{
            const res = await axios({
                url: "https://sih-django.herokuapp.com/mlModel2/",
                method: 'POST',
                data: PostData
            });
            if(res.data){
                console.log(res.data);
                setminmax(res.data.x);
            }
        }catch(error){
            console.log(error);
        }
    }
    
        
    //imageg.map((m,i)=>(
    // console.log(
    //     m.buffer
    // )));
    const sendDetail = async() => {
        const PostData={
            state: sata.regions.toLowerCase(),
            city: sata.area.toLowerCase(),
            month: sata.month.toLowerCase(),
            token: localStorage.FBIdToken
        }
        try{
            
            const res = await axios({
                url: "https://sih-django.herokuapp.com/mlModel/",
                method: 'POST',
                data: PostData
            });

        
            if(res.data)
            {
                console.log(res.data);
                setBuffer(res.data.buffer);
                window.alert(content.gd);
                setGraphLoad(2);
            }            
        }catch(error){
            
                // window.alert("Data for this combination not available");
            
            setBuffer([]);
            if(error.response.data.flag === "False"){
                window.alert(content.dna);
                setGraphLoad(2);
            }else{
                setGraphLoad(2);
            }
            setGraphLoad(2);
            console.log(error);
        } 
        //console.log(imageg.buffer);
        
        //console.log(imageBuffer.buffer);
    }

    const verify = () =>{
        if(sata.area=== '' || sata.region === ''||sata.month === '' ){
            return false;
        }
        return true;
    }

    const xcv = async() =>{
        let ed = document.getElementById("areaRegion");
        let strUser = ed.options[ed.selectedIndex].value;
        //console.log(strUser);
        let ed2 = document.getElementById("selectMonth");
        let strUser2 = ed2.options[ed2.selectedIndex].value;
        //console.log(strUser2);
        setSata({
            ...sata,
            area: strUser,
            month: strUser2
        })
    }
    const onConfirm = (e) =>{
        e.preventDefault()
        if(sata.regions==='')
        {
            window.alert(content.ps);
        }
        else{
            xcv();
        }
            
        setMaint(true);
    }

    const onSubmit=(e)=>{
        
        e.preventDefault();
        let chk = verify();
        if(!maint){
            window.alert(content.pc);
        }
        if(chk &&maint ){
            setChk(true);
            setGraphLoad(1);
            sendDetail();
            x();
        }
        else{
            setChk(false);
            window.alert(content.ps);
        }
    }
    if(!state.isAuth){
        return <Redirect to='/login' />;
    }

    const graph = {
        labels: ['1', '2', '3','4', '5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
        datasets: [
          {
            label: 'Price of Cotton',
            fill: false,
            lineTension: 1,
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 2,
            data: imageBuffer
          }
        ],

      }
    
      let content = CONTENT;
  
      if(state.lang ==="Hindi"){
          content = content.Hindi
      }else{
          content = content.English
      }
   console.log(imageBuffer);
    console.log(data.region);
    console.log(sata);
    return(
        <div className="pred-main">
            <div>
                <h1>
                <br></br>
                    {content.predh}
                </h1>
                <br></br>
                <h6 className="preddec">{content.predd}
                </h6>
                <br></br>
                <h3>{content.pred2h}</h3> </div>
            <Container>
                <Row>
                    <Col sm={5} md={7} lg={5}  >
                    
                        <br></br>
                        
                        

                        <img src={indiamap} alt="this is map" className="india_map"  useMap="#myMap" ></img>
                        <map id="myMap" name="myMap">
                                <area className="map-cursor" alt="Punjab" coords="87,96,99,82,98,73,104,71,116,66,118,75,134,88,130,93,119,91,109,101,96,100,88,96" onClick={punjab}  shape="poly" />
                                <area className="map-cursor" alt="Haryana" coords="95,103,97,101,106,102,121,92,125,95,131,89,135,93,133,99,133,107,125,109,126,116,124,122,121,127,115,128,108,124,106,111,98,102" onClick={haryana} shape="poly" />
                                <area className="map-cursor" alt="Rajashtan" coords="84,197,90,191,89,182,89,174,99,173,110,175,107,184,119,183,124,171,115,165,121,155,133,152,137,146,121,130,113,130,106,125,103,111,90,99,81,106,63,126,58,132,47,134,39,128,28,144,39,151,35,157,42,159,43,167,50,168,57,174,62,172,83,197"  onClick={rajasthan}  shape="poly" /> 
                                <area className="map-cursor" alt="Gujarat" coords="13,211,25,227,46,232,62,213,64,234,77,224,72,220,73,215,79,211,75,204,83,200,79,197,75,191,70,185,62,176,54,175,45,171,45,183,41,184,32,182,29,184,17,180,14,186,5,188,14,197,32,198,36,202,28,210,14,209"  onClick={gujrat}  shape="poly" /> 
                                <area className="map-cursor" alt="Karnataka" coords="107,368,109,360,109,351,121,348,126,342,122,335,117,338,111,333,108,328,102,326,98,317,101,310,112,314,108,308,116,300,113,298,120,292,116,288,123,279,117,278,120,271,116,272,107,282,96,284,91,281,84,290,78,291,71,303,86,347,95,353,98,359,105,364"  onClick={karnataka}  shape="poly" />
                                <area className="map-cursor" alt="Andhra Pradesh" coords="127,351,144,344,148,343,159,338,159,329,160,317,174,310,188,304,191,298,231,265,220,270,207,267,199,276,191,274,185,283,173,284,159,292,150,295,142,301,133,304,129,310,117,319,126,312,139,306,112,314,121,317,112,313,113,314,113,318,129,311,114,311,115,316,110,320,105,322,112,328,117,335,129,337,125,349"  onClick={andhrapradesh}  shape="poly" /> 
                                <area className="map-cursor" alt="Madhya Pradesh" coords="80,205,85,204,90,199,94,194,95,188,92,178,96,176,102,178,103,187,110,192,112,188,119,189,128,171,128,165,121,163,124,158,129,160,139,151,144,151,150,154,150,158,138,178,144,187,150,189,152,184,151,171,156,175,176,173,191,174,204,195,204,191,201,191,197,192,191,200,182,210,166,221,169,228,153,220,144,225,137,220,130,225,123,217,115,216,108,228,102,222,95,223,88,218,90,213,82,210,83,205"  onClick={madhyapradesh}  shape="poly" /> 
                                <area className="map-cursor" alt="Maharashtra" coords="69,298,71,289,83,285,91,279,97,279,105,276,114,269,120,268,125,262,124,257,133,248,138,244,144,253,157,250,161,265,165,256,170,256,164,250,164,239,167,228,152,224,144,229,137,225,130,229,124,227,122,221,117,221,108,232,99,225,94,227,88,222,80,212,75,217,79,223,68,234,63,247,65,257,65,268,69,296"  onClick={maharastra}  shape="poly" /> 
                                <area className="map-cursor" alt="Telangana" coords="138,247,148,258,159,252,163,272,172,280,163,290,146,297,134,305,117,312,107,318,103,318,113,296,120,283,117,274,123,260,134,251,136,245"  onClick={telangana}  shape="poly" />
                                <area className="map-cursor" alt="Tamil Nadu" coords="121,422,129,416,133,407,141,406,149,389,153,391,155,365,161,357,160,338,149,345,141,349,116,352,111,354,110,369,109,380,120,389,116,395,119,401,113,413"  onClick={tamilnadu}  shape="poly" /> 
                        </map>
                    </Col>
                    <Col   className="selection" md={5} sm={12} lg={4}>
                    <br></br>
                    <br></br>
                    <br></br>
                        <form className="form_pred">
                        <p>{content.region}</p> 
                        
                        <div>
                            {sata.regions!==''?(
                                <select 
                                    name='area' 
                                    value =  {sata.area}
                                    onChange={handleChange}
                                    id="areaRegion"
                                    className="option-style"
                                    
                                >
                                  
                                {data.region&&data.region.map((e,i) =>(
                                    <>
                                    {state.lang === "Hindi" ? 
                                        <option  value = {e.area} key={i}>
                                        {e.displayH}
                                        </option>

                                        : 
                                        <option  value = {e.area} key={i}>
                                        {e.displayE}
                                        </option>
                                    }
                                </>
                                    // <option  value = {e.area} key={i}>
                                    //     {e.area}
                                    // </option>
                                ))}
                            </select>
                            ): null}
                            
                        </div>
                        <br></br>
                        <p >{content.mon}</p>
                        <div>
                            {sata.regions!=='' ?(
                            <select 
                                onChange= {handleChange} 
                                value={sata.month}
                                name= 'month' 
                                id="selectMonth" 
                                className="option-style"
                            >
                                {months.map((e,i) =>(
                                    <>
                                        {state.lang === "Hindi" ? 
                                            <option  value = {e.monthName} key={i}>
                                            {e.displayH}
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
                            ): null }
                        </div>
                        <br></br>
                        
                        <Button variant="outline-warning" onClick={onConfirm}>{content.conf}</Button>{' '}
                        <br></br><br></br>
                        {graphLoad === 2 &&
                            <><Button variant="outline-success" onClick={onSubmit}>{content.res}</Button>{' '}</>
                        }
                        {graphLoad === 1 &&
                            <><Button variant="outline-success" >{content.load}</Button>{' '}</>
                        }
                        {/* <Button variant="outline-success" onClick={onSubmit}>Get Result</Button>{' '} */}
                        <br></br>
                        <br></br>
                        {!chk ?( <div>
                            <h6>{content.ins}</h6>
                        </div>): null }
                        </form>

                        
                    </Col>
                    
                    <Col xs={12} sm={12} md={12} lg={3}>
                    <br></br>
                        <div>
                        <div className="statedis">
                            <pre >{content.mpoc}</pre>
                            <div className="button-state"> <Button variant="outline-secondary" className="button-state-in"  onClick={punjab} >{content.pun}</Button> </div>{' '}
                            <div className="button-state"> <Button variant="outline-secondary" className="button-state-in"  onClick={haryana}>{content.har}</Button> </div>{' '}
                            <div className="button-state"> <Button variant="outline-secondary" className="button-state-in"  onClick={rajasthan}>{content.raj}</Button> </div>{' '}
                            <div className="button-state"> <Button variant="outline-secondary" className="button-state-in"  onClick={gujrat}>{content.guj}</Button> </div>{' '}
                            <div className="button-state"> <Button variant="outline-secondary" className="button-state-in"  onClick={tamilnadu}>{content.tn}</Button> </div>{' '}
                            <div className="button-state"> <Button variant="outline-secondary" className="button-state-in"  onClick={karnataka}>{content.kar}</Button> </div>{' '}
                            <div className="button-state"> <Button variant="outline-secondary" className="button-state-in"  onClick={andhrapradesh}>{content.ap}</Button> </div>{' '}
                            <div className="button-state"> <Button variant="outline-secondary" className="button-state-in"  onClick={maharastra}>{content.mah}</Button> </div>{' '}
                            <div className="button-state"> <Button variant="outline-secondary" className="button-state-in"  onClick={madhyapradesh}>{content.mp}</Button> </div>{' '}
                            <div className="button-state"> <Button variant="outline-secondary" className="button-state-in"  onClick={telangana}>{content.tel}</Button> </div>{' '}
                        </div>
                        </div>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <Row>
                    <Col>
                    <div>
                        {maint&&chk && (imageBuffer.length>0) &&
                        <>
                            
                            <div>
                                

                                <>
                                    <div className="pgraph">
                                        <Line
                                            
                                            data={graph}
                                            height={180}
                                           
                                            options={{
                                                showScale: true,
                                                pointDot: true,
                                                title:{
                                                display:true,
                                                text:`${content.gt} ${content[sata.area]}`,
                                                fontSize:20
                                                },
                                                scales: {
                                                    xAxes: [{
                                                        display: true,
                                                        gridLines: {
                                                            display: true
                                                        },
                                                        scaleLabel: {
                                                        display: true,
                                                        labelString: `${content.dm}`,
                                                        fontSize: 20
                                                        }
                                                    }],
                                                    yAxes: [{
                                                        display: true,
                                                        gridLines: {
                                                            display: true
                                                        },
                                                        ticks: {
                                                            beginAtZero:true,
                                                            min: 2000,
                                                            max: 6500    
                                                        },
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: `${content.xax}`,
                                                            fontSize: 20
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
                                </>
                                
                                <div className="t-wrapper">
                                
                                    
                                        <table className="fl-table">
                                            <thead>
                                            <tr>
                                                <th>{content.dd}</th>
                                                <th>{content.pp}</th>
                                                
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {imageBuffer && 
                                                imageBuffer.map((m,i) =>(
                                                    <tr>
                                                        <td>{i+1}</td>
                                                        <td>{m.toFixed(2)}</td>
                                                    </tr>
                                                ))
                                            }
                                            
                                            
                                            
                                        
                                            </tbody>
                                        </table>
                                    
                                </div>
                                
                                
                               <br/><br/>
                               <h2>{content.ah}</h2>
                                {sata.area === "Ahmedabad"  ? (
                                    <img src= {g2} />
                                ):(
                                    <img src= {g1} />
                                )

                                
                                }
                                
<br/>
                                <div className="t-wrapper">
<br/>                                                            
                                                                    
                                <table className="fl-table">
                                    <thead>
                                    <tr>
                                        <th>{content.mon}</th>
                                        <th>{content.min}</th>
                                        <th>{content.max}</th>
                                        <th>{content.avg}</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>

                                    
                                        <tr>
                                            <td>{content.january}</td>
                                            <td>{minmax[0][0].toFixed(2)}</td>
                                            <td>{minmax[0][1].toFixed(2)}</td>

                                            <td>{minmax[0][0].toFixed(2)/2+minmax[0][1].toFixed(2)/2}</td>
                                        </tr>
                                        <tr>
                                            <td>{content.february}</td>
                                            <td>{minmax[1][0].toFixed(2)}</td>
                                            <td>{minmax[1][1].toFixed(2)}</td>
                                            <td>{minmax[1][0].toFixed(2)/2+minmax[1][1].toFixed(2)/2}</td>
                                        </tr>
                                        <tr>
                                            <td>{content.march}</td>
                                            <td>{minmax[2][0].toFixed(2)}</td>
                                            <td>{minmax[2][1].toFixed(2)}</td>
                                            <td>{(minmax[2][0].toFixed(2)/2+minmax[2][1].toFixed(2)/2).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>{content.april}</td>
                                            <td>{minmax[3][0].toFixed(2)}</td>
                                            <td>{minmax[3][1].toFixed(2)}</td>
                                            <td>{minmax[3][0].toFixed(2)/2+minmax[3][1].toFixed(2)/2}</td>
                                        </tr>
                                        <tr>
                                            <td>{content.may}</td>
                                            <td>{minmax[4][0].toFixed(2)}</td>
                                            <td>{minmax[4][1].toFixed(2)}</td>
                                            <td>{minmax[4][0].toFixed(2)/2+minmax[4][1].toFixed(2)/2}</td>
                                        </tr>
                                        <tr>
                                            <td>{content.june}</td>
                                            <td>{minmax[5][0].toFixed(2)}</td>
                                            <td>{minmax[5][1].toFixed(2)}</td>
                                            <td>{minmax[5][0].toFixed(2)/2+minmax[5][1].toFixed(2)/2}</td>
                                        </tr><tr>
                                            <td>{content.july}</td>
                                            <td>{minmax[6][0].toFixed(2)}</td>
                                            <td>{minmax[6][1].toFixed(2)}</td>
                                            <td>{minmax[6][0].toFixed(2)/2+minmax[6][1].toFixed(2)/2}</td>
                                        </tr>
                                        <tr>
                                            <td>{content.august}</td>
                                            <td>{minmax[7][0].toFixed(2)}</td>
                                            <td>{minmax[7][1].toFixed(2)}</td>
                                            <td>{minmax[7][0].toFixed(2)/2+minmax[7][1].toFixed(2)/2}</td>
                                        </tr>
                                        <tr>
                                            <td>{content.september}</td>
                                            <td>{minmax[8][0].toFixed(2)}</td>
                                            <td>{minmax[8][1].toFixed(2)}</td>
                                            <td>{minmax[8][0].toFixed(2)/2+minmax[8][1].toFixed(2)/2}</td>
                                        </tr>
                                        <tr>
                                            <td>{content.october}</td>
                                            <td>{minmax[9][0].toFixed(2)}</td>
                                            <td>{minmax[9][1].toFixed(2)}</td>
                                            <td>{minmax[9][0].toFixed(2)/2+minmax[9][1].toFixed(2)/2}</td>
                                        </tr>
                                        <tr>
                                            <td>{content.november}</td>
                                            <td>{minmax[10][0].toFixed(2)}</td>
                                            <td>{minmax[10][1].toFixed(2)}</td>
                                            <td>{minmax[10][0].toFixed(2)/2+minmax[11][1].toFixed(2)/2}</td>
                                        </tr>
                                        <tr>
                                            <td>{content.december}</td>
                                            <td>{minmax[11][0].toFixed(2)}</td>
                                            <td>{minmax[11][1].toFixed(2)}</td>
                                            <td>{minmax[11][0].toFixed(2)/2+minmax[11][1].toFixed(2)/2}</td>
                                        </tr>

                                    
                                    
                                    

                                    </tbody>
                                </table>

                                </div>

                                   
                               
                            </div>
                        </>
                        }
                    </div>
                    
                    </Col>
                </Row>
            </Container>
            
            
            
           < Footer /> 
        </div>
    );
}

export default Prediction;