import React, {useContext, useState} from 'react';
import {Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './NavBar.css';
import store from '../store/store';

import CONTENT from '../Lang/navbar.json';

const NavBar = () => {
  const {state, dispatch} = useContext(store);

  const [language, setLang ] = useState(state.lang);

  const changeLang = () => {
    if(language === "English"){
      setLang("Hindi");
      localStorage.setItem('lang', "Hindi");

      dispatch ({
        type: 'LANG',
        payload: 'Hindi'
      })

    }else{
      setLang("English");
      localStorage.setItem('lang', "English");
    
      dispatch ({
        type: 'LANG',
        payload: 'English'
      })
    }
  }

   let content = CONTENT;
  
  if(state.lang ==="Hindi"){
    content = content.Hindi
  }else{
    content = content.English
  }

  console.log(state.lang);
  return(
        
        <>
        <Navbar sticky="top" collapseOnSelect='true' expand="lg" bg="success" variant="dark">
        <Navbar.Brand href="/" className='Nav-head'>{content.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <div className = 'Nav-item-br'><Nav.Item className='Nav-a'><Nav.Link eventKey="1" as = {Link} to = '/'>{content.home}</Nav.Link></Nav.Item></div>
            <div className = 'Nav-item-br'><Nav.Item className='Nav-a'><Nav.Link eventKey="2" as = {Link} to = '/marketPlace'>{content.market}</Nav.Link></Nav.Item></div>
            <div className = 'Nav-item-br'><Nav.Item className='Nav-a'><Nav.Link eventKey="3" as = {Link} to = '/prediction'>{content.prediction}</Nav.Link></Nav.Item></div>
            
            {/* <div>
              <select
                value={state.lang}
                onChange={changeLang}
              >
                <option value="English" >English</option>
                <option value="Hindi">हिन्दी</option>
              </select>
            </div> */}
          </Nav>
          <Nav>
          {state.lang === 'Hindi' ?
              <div className = 'Nav-item-br'><Nav.Item className='Nav-a'><Nav.Link eventKey="3" onClick = {changeLang}>English</Nav.Link></Nav.Item></div>   
              :
              <div className = 'Nav-item-br'><Nav.Item className='Nav-a'><Nav.Link eventKey="3" onClick = {changeLang}>हिन्दी</Nav.Link></Nav.Item></div>
            }
            {state.isAuth ? (
                <>
                  <div className = 'Nav-item-br'><Nav.Item className='Nav-a'><Nav.Link eventKey="4" as = {Link} to = '/logout'>{content.logout}</Nav.Link></Nav.Item></div>
                  <div className = 'Nav-item-br'><Nav.Item className='Nav-a'><Nav.Link eventKey="5" as = {Link} to = '/profile'>{content.profile}</Nav.Link></Nav.Item></div>
                </>
              ):(
                <>
                  <div className = 'Nav-item-br'><Nav.Item className='Nav-a'><Nav.Link eventKey="6" as = {Link} to = '/login'>{content.login}</Nav.Link></Nav.Item></div>
                  <div className = 'Nav-item-br'><Nav.Item className='Nav-a'><Nav.Link eventKey="7" as = {Link} to = '/signup'>{content.signup}</Nav.Link></Nav.Item></div>
                </>
              )
            }
           </Nav>
        </Navbar.Collapse>
        </Navbar>
        </>
    );
}

export default NavBar;