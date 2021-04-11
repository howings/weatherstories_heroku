import React, {useState, useEffect} from "react";
// import ReactDOM from "react-dom";
import "./BottomBar.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VideoInit from './VideoInit';

function BottomBar(props) {
    
    const [data, setData] = useState([]);


    useEffect(() => {
        fetch(`https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe/`)
        .then((response) => response.json())
        .then(setData);
    }, []);

    const [sound, setSound] = useState(false);

    const movieSound = document.getElementById('video-clip');

    const toggleSound = () => {
        if (sound === false) {
            setSound(true);
            movieSound.muted = false;
        } else {
            setSound(false);
            movieSound.muted = true;
        }
        // console.log("Sound is: ", sound);
    }

    if(data) {
        // console.log(data);
        // console.log(data.description);
        return (
            <div className="bottom-bar">
                
                 <Container fluid="lg" className="bot-container">
                    <Row className="bot-row">
                        <Col lg={3}>&nbsp;</Col>
                        <Col lg={9}>

                            <p id="info" key={props.id}>Description: {props.description}</p>
                                              
                        </Col>
                    </Row>
                    <Row>
                        <Col lg>
                            <hr className="bottom-hr"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg>
                            <p>Title: {props.title}</p>
                            <p>Original Title: {props.original_title}</p>
                        </Col>
                        <Col lg>
                            <p>Producer: {props.producer}</p>
                            <p>Director: {props.director}</p>
                        </Col>
                        <Col lg>
                            <p>Release Date: {props.release_date}</p>
                            <p>Running Time: {props.running_time}</p>
                        </Col>
                        <Col lg><button className="musicBtn" onClick={ toggleSound }>Toggle Sound</button></Col>
                    </Row>
                 </Container>
            </div>
        )
    }
}

export default BottomBar;
