import React, { useState, useCallback, useRef } from "react";
import RBCarousel from "react-bootstrap-carousel";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

import bg1 from '../images/bg1.jpg';
import bg2 from '../images/bg2.jpg';
import bg3 from '../images/bg31.jpg';
import bg4 from '../images/bg4.jpg';




const styles = { height: 400, width: "100%" };
//const icon_glass = <span className="fa fa-glass" />;
//const icon_music = <span className="fa fa-music" />;

const  DemoV4 = ()=> {
    const autoplay = useState(true);
    const icon = useState({});
    const slider_ref = useRef(null);
    // const _autoplay = useCallback(() => setAutoplay(autoplay => !autoplay), []);
    // const _visiableOnSelect = useCallback(active => {
    // console.log(`visiable onSelect active=${active}`);
    // }, []);
    const _onSelect = useCallback((active, direction) => {
    //console.log(`active=${active} && direction=${direction}`);
    }, []);
    // const _changeIcon = useCallback(() => {
    // // Icon Switch
    // setIcon(({ leftIcon, rightIcon }) => {
    // leftIcon = leftIcon ? undefined : icon_glass;
    // rightIcon = rightIcon ? undefined : icon_music;
    // return { leftIcon: leftIcon, rightIcon: rightIcon };
    // });
    // }, []);
    // const _slidePrev = useCallback(() => slider_ref.current.slidePrev(), []);
    // const _slideNext = useCallback(() => slider_ref.current.slideNext(), []);
    // const _goToSlide = useCallback(() => slider_ref.current.goToSlide(1), []);

//     1.	Get future cotton sales prices trend now.
// 2.	Prediction sales prices just one step away
// 3.	See future price trend graph of cotton now


    return (
        <div className="container-fluid" style={{ paddingBottom: 20 , marginTop:-20}}>
            <Row>
                <Col span={12} style={{ marginTop: 20, padding:0 }}>
                    <RBCarousel
                    animation={true}
                    autoplay={autoplay}
                    slideshowSpeed={2000}
                    defaultActiveIndex={0}
                    leftIcon={icon.leftIcon}
                    rightIcon={icon.rightIcon}
                    onSelect={_onSelect}
                    ref={slider_ref}
                    version={4}
                    >
                    <div style={{ height: 400 }}>
                        <img alt="slider 1"
                        style={{ width: "100%", height: "100%" }}
                        src={bg1}
                        />
                        
                    </div>
                    <div style={{ ...styles, backgroundColor: "white", objectFit:"contain" }}>
                    <img alt="slider 1"
                        style={{ width: "100%", height: "100%" }}
                        src={bg2}
                        />
                        </div>
                    <div style={{ ...styles, backgroundColor: "white" }}>
                    <img alt="slider 1"
                        style={{ width: "100%", height: "100%" }}
                        src={bg3}
                        />
                         </div>
                    <div style={{ ...styles, backgroundColor: "lightblue" }}>
                    <img alt="slider 1"
                        style={{ width: "100%", height: "100%" }}
                        src={bg4}
                        />
                    </div>
                    
                    </RBCarousel>
                </Col>

            </Row>
        </div>
    );
}

export default DemoV4;