import React, { useContext } from 'react';
import {Link} from 'react-router-dom'; 
import Store from '../store/store';

import CONTENT from '../Lang/footer.json';

const Footer = () => {
    const {state} = useContext(Store);
    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'})
     };

     let content = CONTENT;
  
    if(state.lang ==="Hindi"){
        content = content.Hindi
    }else{
        content = content.English
    }
    return(
        <div className= "footer">
            <div className="footer-container">
                <div className="footer-newsletter" >
                    <p style={{textAlign: "center", color: "#28a745"}}><strong>{content.title}</strong></p>
                    <p>
                        {content.dec}
                    </p>
                </div>
                <nav className="footer-nav">
                    <div className="sep">
                        <h3 className="footer-title">{content.rec}</h3>
                        <ul>
                            <li onClick={scrollTop} ><Link className="footer-link"  to='/'>{content.home}</Link></li>
                            <li onClick={scrollTop}><Link className="footer-link" onClick={scrollTop} to= '/marketPlace'>{content.market}</Link></li>
                            <li onClick={scrollTop}><Link className="footer-link" onClick={scrollTop} to= '/prediction'>{content.prediction}</Link></li>    
                        </ul>
                    </div>
                    <div>
                        <h3 className="footer-title">{content.contact}</h3>
                        <ul>
                            <li onClick={scrollTop} ><Link className="footer-link" to= '/faq'>FAQ</Link></li>
                            {state.isAuth ? (
                                <>
                                    <li onClick={scrollTop}><Link className="footer-link" to= '/profile'>{content.profile}</Link></li>
                                    <li onClick={scrollTop}><Link className="footer-link" to= '/logout'>{content.logout}</Link></li>
                                </>  
                            ):(
                                <>
                                    <li onClick={scrollTop}><Link className="footer-link" to= '/login'>{content.login}</Link></li>
                                    <li onClick={scrollTop}><Link className="footer-link" to= '/signup'>{content.signup}</Link></li>
                                
                                </>
                            )  
                            }
                             </ul>
                    </div>
                </nav>
                
            </div>
        </div>
    );
}

export default Footer;