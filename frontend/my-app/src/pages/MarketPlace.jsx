import React, {useState, useContext} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './MarketPlace.css';

import indiamap from '../images/indian_map.jpg';

import Footer from '../util/Footer';

import Store from '../store/store';

import CONTENT from '../Lang/market.json';

const MarketPlace  = () => {

    const{state}= useContext(Store);
    const [data,setData] = useState([]);
    const [center, setCenter] = useState(true);

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
        
    
    const up = [
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

    const setFun = (states)=>{
        setData(states);
        setCenter(false);
        
    }

    let content = CONTENT;
  
    if(state.lang ==="Hindi"){
        content = content.Hindi
    }else{
        content = content.English
    }
    return (
        <>
            
            <div className="market-main">
                <h1 className="market-head">{content.marh}</h1>
                <div className="market-container">
                    <p className="market-content">
                    {content.mard1}
                    </p>
                    
                </div>
                <br/><br/>
                <div>
                    <Row >
                        <Col>
                            <h2 >{content.marh2}</h2>
                        </Col>
                    </Row>
                    {center === true ? (
                            <>
                                <Row>
                                    <Col>
                                        <br/>
                                        <img src={indiamap} alt="this is map" className="india_map"  useMap="#myMap" ></img>
                                        <map id="myMap" name="myMap">
                                            <area className="map-cursor" alt="Punjab" coords="87,96,99,82,98,73,104,71,116,66,118,75,134,88,130,93,119,91,109,101,96,100,88,96"  onClick={()=> setFun(punjabs)}  shape="poly" />
                                            <area className="map-cursor" alt="Haryana" coords="95,103,97,101,106,102,121,92,125,95,131,89,135,93,133,99,133,107,125,109,126,116,124,122,121,127,115,128,108,124,106,111,98,102" onClick={()=> setFun(haryanas)}  shape="poly" />
                                            <area className="map-cursor" alt="Rajashtan" coords="84,197,90,191,89,182,89,174,99,173,110,175,107,184,119,183,124,171,115,165,121,155,133,152,137,146,121,130,113,130,106,125,103,111,90,99,81,106,63,126,58,132,47,134,39,128,28,144,39,151,35,157,42,159,43,167,50,168,57,174,62,172,83,197" onClick={()=> setFun(rajasthans)}   shape="poly" /> 
                                            <area className="map-cursor" alt="Gujarat" coords="13,211,25,227,46,232,62,213,64,234,77,224,72,220,73,215,79,211,75,204,83,200,79,197,75,191,70,185,62,176,54,175,45,171,45,183,41,184,32,182,29,184,17,180,14,186,5,188,14,197,32,198,36,202,28,210,14,209" onClick={()=> setFun(gujrats)} shape="poly" /> 
                                            <area className="map-cursor" alt="Karnataka" coords="107,368,109,360,109,351,121,348,126,342,122,335,117,338,111,333,108,328,102,326,98,317,101,310,112,314,108,308,116,300,113,298,120,292,116,288,123,279,117,278,120,271,116,272,107,282,96,284,91,281,84,290,78,291,71,303,86,347,95,353,98,359,105,364" onClick={()=> setFun(karnatakas)} shape="poly" />
                                            <area className="map-cursor" alt="Andhra Pradesh" coords="127,351,144,344,148,343,159,338,159,329,160,317,174,310,188,304,191,298,231,265,220,270,207,267,199,276,191,274,185,283,173,284,159,292,150,295,142,301,133,304,129,310,117,319,126,312,139,306,112,314,121,317,112,313,113,314,113,318,129,311,114,311,115,316,110,320,105,322,112,328,117,335,129,337,125,349" onClick={()=> setFun(andhrapradeshs)} shape="poly" /> 
                                            <area className="map-cursor" alt="Madhya Pradesh" coords="80,205,85,204,90,199,94,194,95,188,92,178,96,176,102,178,103,187,110,192,112,188,119,189,128,171,128,165,121,163,124,158,129,160,139,151,144,151,150,154,150,158,138,178,144,187,150,189,152,184,151,171,156,175,176,173,191,174,204,195,204,191,201,191,197,192,191,200,182,210,166,221,169,228,153,220,144,225,137,220,130,225,123,217,115,216,108,228,102,222,95,223,88,218,90,213,82,210,83,205" onClick={()=> setFun(madhyapradeshs)} shape="poly" /> 
                                            <area className="map-cursor" alt="Maharashtra" coords="69,298,71,289,83,285,91,279,97,279,105,276,114,269,120,268,125,262,124,257,133,248,138,244,144,253,157,250,161,265,165,256,170,256,164,250,164,239,167,228,152,224,144,229,137,225,130,229,124,227,122,221,117,221,108,232,99,225,94,227,88,222,80,212,75,217,79,223,68,234,63,247,65,257,65,268,69,296" onClick={()=> setFun(maharastras)}  shape="poly" /> 
                                            <area className="map-cursor" alt="Telangana" coords="138,247,148,258,159,252,163,272,172,280,163,290,146,297,134,305,117,312,107,318,103,318,113,296,120,283,117,274,123,260,134,251,136,245" onClick={()=> setFun(telanganas)} shape="poly" />
                                            <area className="map-cursor" alt="Tamil Nadu" coords="121,422,129,416,133,407,141,406,149,389,153,391,155,365,161,357,160,338,149,345,141,349,116,352,111,354,110,369,109,380,120,389,116,395,119,401,113,413" onClick={()=> setFun(tamilnadus)}  shape="poly" /> 
                                        </map>
                                    </Col>
                                </Row>
                            </>
                        ): (
                            <>
                                <Row>
                                    <Col>
                                        <br/>
                                        <img src={indiamap} alt="this is map" className="india_map"  useMap="#myMap" ></img>
                                        <map id="myMap" name="myMap">
                                            <area className="map-cursor" alt="Punjab" coords="87,96,99,82,98,73,104,71,116,66,118,75,134,88,130,93,119,91,109,101,96,100,88,96"  onClick={()=> setFun(punjabs)}  shape="poly" />
                                            <area className="map-cursor" alt="Haryana" coords="95,103,97,101,106,102,121,92,125,95,131,89,135,93,133,99,133,107,125,109,126,116,124,122,121,127,115,128,108,124,106,111,98,102" onClick={()=> setFun(haryanas)}  shape="poly" />
                                            <area className="map-cursor" alt="Rajashtan" coords="84,197,90,191,89,182,89,174,99,173,110,175,107,184,119,183,124,171,115,165,121,155,133,152,137,146,121,130,113,130,106,125,103,111,90,99,81,106,63,126,58,132,47,134,39,128,28,144,39,151,35,157,42,159,43,167,50,168,57,174,62,172,83,197" onClick={()=> setFun(rajasthans)}   shape="poly" /> 
                                            <area className="map-cursor" alt="Gujarat" coords="13,211,25,227,46,232,62,213,64,234,77,224,72,220,73,215,79,211,75,204,83,200,79,197,75,191,70,185,62,176,54,175,45,171,45,183,41,184,32,182,29,184,17,180,14,186,5,188,14,197,32,198,36,202,28,210,14,209" onClick={()=> setFun(gujrats)} shape="poly" /> 
                                            <area className="map-cursor" alt="Karnataka" coords="107,368,109,360,109,351,121,348,126,342,122,335,117,338,111,333,108,328,102,326,98,317,101,310,112,314,108,308,116,300,113,298,120,292,116,288,123,279,117,278,120,271,116,272,107,282,96,284,91,281,84,290,78,291,71,303,86,347,95,353,98,359,105,364" onClick={()=> setFun(karnatakas)} shape="poly" />
                                            <area className="map-cursor" alt="Andhra Pradesh" coords="127,351,144,344,148,343,159,338,159,329,160,317,174,310,188,304,191,298,231,265,220,270,207,267,199,276,191,274,185,283,173,284,159,292,150,295,142,301,133,304,129,310,117,319,126,312,139,306,112,314,121,317,112,313,113,314,113,318,129,311,114,311,115,316,110,320,105,322,112,328,117,335,129,337,125,349" onClick={()=> setFun(andhrapradeshs)} shape="poly" /> 
                                            <area className="map-cursor" alt="Madhya Pradesh" coords="80,205,85,204,90,199,94,194,95,188,92,178,96,176,102,178,103,187,110,192,112,188,119,189,128,171,128,165,121,163,124,158,129,160,139,151,144,151,150,154,150,158,138,178,144,187,150,189,152,184,151,171,156,175,176,173,191,174,204,195,204,191,201,191,197,192,191,200,182,210,166,221,169,228,153,220,144,225,137,220,130,225,123,217,115,216,108,228,102,222,95,223,88,218,90,213,82,210,83,205" onClick={()=> setFun(madhyapradeshs)} shape="poly" /> 
                                            <area className="map-cursor" alt="Maharashtra" coords="69,298,71,289,83,285,91,279,97,279,105,276,114,269,120,268,125,262,124,257,133,248,138,244,144,253,157,250,161,265,165,256,170,256,164,250,164,239,167,228,152,224,144,229,137,225,130,229,124,227,122,221,117,221,108,232,99,225,94,227,88,222,80,212,75,217,79,223,68,234,63,247,65,257,65,268,69,296" onClick={()=> setFun(maharastras)}  shape="poly" /> 
                                            <area className="map-cursor" alt="Telangana" coords="138,247,148,258,159,252,163,272,172,280,163,290,146,297,134,305,117,312,107,318,103,318,113,296,120,283,117,274,123,260,134,251,136,245" onClick={()=> setFun(telanganas)} shape="poly" />
                                            <area className="map-cursor" alt="Tamil Nadu" coords="121,422,129,416,133,407,141,406,149,389,153,391,155,365,161,357,160,338,149,345,141,349,116,352,111,354,110,369,109,380,120,389,116,395,119,401,113,413" onClick={()=> setFun(tamilnadus)}  shape="poly" /> 
                                        </map>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <Row>
                                            
                                            <Col></Col>
                                            <Col>
                                                <br/>
                                                {data.length > 0 && 
                                                    <table className="zigzag">
                                                        <thead>
                                                            <tr><th>{content.mp}</th></tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.length>0&& data.map((m,i) =>(
                                                                <tr key={i}>
                                                                    {state.lang === "Hindi" ? 
                                                                        <td className="table-item">{m.displayH}</td>
                                                                        : 
                                                                        <td className="table-item">{m.displayE}</td>
                                                                    }
                                                                    
                                                                </tr>
                                                            ))} 
                                                        </tbody>
                                                        

                                                    </table>
                                                } 
                                            </Col>
                                            <Col></Col>

                                        </Row>
                                        
                                        
                                    </Col>
                                </Row> 
                            </>
                        )
                    }
                       
                </div>

                <br/><br/>
                <div className="market-container">
                    <p className="market-content">
                        {content.mard2}
                    </p>
                    
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MarketPlace;