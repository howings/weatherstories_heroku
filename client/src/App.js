import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import "../node_modules/video-react/dist/video-react.css";
import Weather from './components/Weather';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VideoInit from './components/VideoInit'


function App() {
  return (
      
      <Container fluid>
      <Row>
        <Col className ="header-height">
          <div className="box-flex">
            <div className="logo-align">
              <img src="/assets/logo.svg" alt="logo" className="img-scale" />
            </div>
            <div className="instruction"><p>Weather Stories is a student project. It is not affiliated with Studio Ghibli.</p></div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="Wbox">
          <Weather/>
        </Col>
      </Row>
      <Row>
        <Col>
          <VideoInit id='06'/>
        </Col>
      </Row>  
      <Row>
        <Col>
         {/* <BottomBar /> */}
        </Col>
      </Row>
    </Container>
       
            
  );
}

export default App;
