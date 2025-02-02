import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import logo from '../Assets/kgp.svg';
import {Container, Row, Col} from 'reactstrap';
import axios from 'axios';
import {useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import { APIlink } from "../../Helper";
import Header from '../Header/Header';
import { Translate } from 'aws-sdk';
import Footer from '../Footer/Footer';
import Carousel from '../Project/carouselComponent'

const ProjectDetail = (props) => {

  const [project, setproject] = useState("");
  const [ loading, setLoading ] = useState(true);
  const credentials = localStorage.getItem('currentUser');
  
  console.log("props", props.match.params.project_uid);

  const getProjects = async() => {
  var myHeaders = new Headers();
  myHeaders.set('Authorization', 'Basic ' + credentials);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let response;

    try {
        response = await fetch (`${APIlink}/projects/`+ props.match.params.project_uid, requestOptions)
    } catch (err) {
        return;
    }finally{
        setLoading(false);
       }
    const result = await response.json();
    setproject(result);
  }
  console.warn("props", props);
  console.log(project);
  

  useEffect(() => {
    getProjects();
  }, []);

  if(loading)
    return <div>Fetching Data ...</div>

  return (
    <div className="home" style ={{minHeight:"100vh", display:"flex", flexDirection:"column"}}>
    <Header/>
        
        <div >
          <img src="https://socialmediacollege.com/wp-content/uploads/5-Creative-Ways-to-Use-Facebooks-Carousel-Ads.png" alt="" style={{maxWidth:"100%", padding:"5%", backgroundSize:"cover", backgroundPosition:"cover"}}/>
        </div>
        <div className="container" style={{padding: "1rem"}}>
        <div>
            <h2>Project Title</h2>
            <Row style = {{display: "flex"}}><Col xs="3">{project?.Item?.profName || ''}</Col>
                 <Col xs="3">{project?.Item?.dept || ''}</Col>
            </Row>             
        </div>
        <br/>
        <div style={{fontWeight:"bold"}}>
          <Row style = {{display: "flex"}}><Col xs="3">{project?.Item?.duration || ''} Months</Col>
                 <Col xs="3">{project?.Item?.stipend || ''}</Col>
          </Row>
          <Row style = {{displey: "flex"}}><Col xs="3">{project?.Item?.totalSlots || ''}</Col>
                 <Col xs="3">31st January</Col>
          </Row>
        </div>
        <br/><br/>
        <div>  {project?.Item?.description || ''}</div>

        <br/>
        <div>
            <h4>Responsibilities</h4>
            {project?.Item?.responsibilities || ''}</div>

        <br/>
        <div>
            <h4>Prerequisites</h4>
            {project?.Item?.preReq || ''}</div>

        <br/>
        <div>
            <h4>Additional Details</h4>
            {project?.Item?.addDetails || ''}</div>

        <br/>
        <div>
            <h4>Tags</h4><br/>
            <Row style = {{display: "flex"}}><Col xs="2"><Button style={{
                        backgroundColor: "#d3d3d3",
                        color: "white",
                        width: "100%",
                        textAlign:"center",
                        borderRadius: "20px",
                        borderColor: "#d3d3d3"
                      }}>Tag 1
            </Button></Col>
                 <Col xs="2"><Button style={{
                        backgroundColor: "#d3d3d3",
                        color: "white",
                        width: "100%",
                        textAlign:"center",
                        borderRadius: "20px",
                        borderColor: "#d3d3d3"
                      }}>Tag 2
            </Button></Col>
                 <Col xs="2"><Button style={{
                        backgroundColor: "#d3d3d3",
                        color: "white",
                        width: "100%",
                        textAlign:"center",
                        borderRadius: "20px",
                        borderColor: "#d3d3d3"
                      }}>Tag 3
            </Button></Col>
            </Row>
            </div><br/><br/>
      </div>
      <br></br>
      <center>
      <Link to ={"/Projects/Apply/"+ project?.Item?.["project-uid"] || ''}>
       <Button style={{
                        backgroundColor: "#0F8797",
                        color: "white",
                        width: "15%",
                        textAlign:"center"
                      }}>Apply
       </Button></Link>
      </center>
      <Carousel/>
      <br/><br/>
      <Footer/>
    </div>
  );
};

export default withRouter(ProjectDetail);
