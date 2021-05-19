import React from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Container,
    Header,
    Icon,
    Image
} from 'semantic-ui-react';

const HomepageBanner = () =>{
    return(
        <div>
            <div class="whole-shiba">
  <div class="shiba-head">
      
    <div class="ears" id="ear-left"></div>
    <div class="ears" id="ear-right"></div>
    <div id="face"></div>
    <div class="brows" id="brow-left"></div>
    <div class="brows" id="brow-right"></div>
    <div class="eyes" id="eye-left"></div>
    <div class="eyes" id="eye-right"></div>
    <div class="eye-light" id="eye-light-right1"></div>
    <div class="eye-light" id="eye-light-left1"></div>
    <div id="sniff-white-1"></div>
    <div id="sniff-white-2"></div>
    <div id="nose"></div>
    <div id="mouth-up"></div>
    <div class="mouth" id="mouth-left"></div>
    <div class="mouth" id="mouth-right"></div>
    
    
    <div className="homepage-header">
    <Header
                    as='h1'
                    content='Dog Dash'
                    style={{
                        fontSize: '4em',
                        fontWeight: 'bold',
                        marginBottom: 0,
                        color:'lightseagreen',
                        fontFamily: 'Roboto Mono,sans-serif'
                    }}
                />
                <p style={{
                    fontWeight: 'normal',
                    color:'white',
                    fontSize: '1em',
                    
                   
                }}>
                    Can't find the time to walk your fur friend? <br/> 
                    Dog Dash is here to assist you with finding a suitable walker for your dog!
                </p>

                <Link to="/login">
                    <Button color='teal' size='huge' fontFamily= 'Roboto Mono,sans-serif'>
                        Register
                        <Icon name='right arrow' />
                    </Button>
                </Link>  
    </div>
  </div>
</div>
            {/* <Container text
                style={{
                    paddingTop:'10em',
                    paddingLeft:'30em',
                    paddingBottom:'2em'
                }}
            > */}
          
            {/* </Container> */}
        </div>

        // <div className="background-image">
        //     <Container text
        //         style={{
        //             paddingTop:'10em',
        //             paddingLeft:'30em',
        //             paddingBottom:'2em'
        //         }}
        //     >
        //         <Header
        //             as='h1'
        //             content='Dog Dash'
        //             style={{
        //                 fontSize: '4em',
        //                 fontWeight: 'bold',
        //                 marginBottom: 0,
        //                 paddingTop: '1em',
        //                 color:'lightseagreen',
        //                 fontFamily: 'Roboto Mono,sans-serif'
        //             }}
        //         />
        //         <p style={{
        //             fontWeight: 'normal',
        //             color:'white',
        //             fontSize: '1em',
                    
                   
        //         }}>
        //             Can't find the time to walk your fur friend? <br/> 
        //             Dog Dash is here to assist you with finding a suitable walker for your dog!
        //         </p>

        //         <Link to="/login">
        //             <Button color='teal' size='huge' fontFamily= 'Roboto Mono,sans-serif'>
        //                 Register
        //                 <Icon name='right arrow' />
        //             </Button>
        //         </Link>            
        //     </Container>
        // </div>

    )
}

export default HomepageBanner;