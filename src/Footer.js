import React, {useEffect,useState} from "react";
import "./Footer.css";
import { SocialIcon } from 'react-social-icons';

const Carousel = () => {

  // const styleOverride={height:25px,width:25px}
    return(
    <div className="footer">
      <div className="copyrightBlurb">© 2022 Copyright: Bizzies Ape<br/>
      <a href="google.com" style={{textDecoration:'none',color:"#3366BB"}}>Contact Us</a>
      </div>
      <div className="socialContainer">
      <SocialIcon url="https://twitter.com/jaketrent"  style={{marginRight:'5px'}} />
      <SocialIcon url="https://discord.com" style={{marginRight:'5px'}} />
      <SocialIcon url="https://opensea.io/collection/bizzies-exclusive"/>
      </div>
  </div>)
}
export default Carousel;