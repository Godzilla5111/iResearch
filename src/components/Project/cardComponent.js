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
import {Link} from "react-router-dom";
import { APIlink } from "../../Helper";

const CardComponent = (props) => {

  const [projects, setProjects] = useState(null);
  const [data, setData] = useState("");
  const credentials = localStorage.getItem('currentUser');
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
        response = await fetch (`${APIlink}/projects/all`, requestOptions)
    } catch (err) {
        return;
    }
    const result = await response.json();
    setData(result);
  }
  console.log(data);
  useEffect(() => {
    getProjects();
  }, []);


  return (<div style={{
      padding: "0% 3% 3% 3%"
    }}>
    {
      data && data.Items.map((data, index) => {
        return (<Card style={{
            textAlign: "left"
          }}>
          <Row style={{
              display: "flex"
            }}>
            <Col xs="3">
              <CardImg top="top" style = {{width:"100%", margin: "0.5rem"}} src={logo} alt="Card image cap"/>
            </Col>
            <Col xs="9">
              <CardBody>
                <CardTitle tag="h5" style={{fontWeight:"bold"}}>Project title</CardTitle>
                <Row style = {{display: "flex"}}><Col xs="6">{data.profName}</Col>
                 <Col xs="6">{data.dept}</Col>
                 </Row>
                <CardText style={{color:"#000000"}}>{data.description}</CardText>
                <Row style={{
                    display: "flex",
                    fontSize:"20px"
                  }}>
                  <Col xs="3">{data.duration} months</Col>
                  <Col xs="3">{data.totalSlots} students</Col>
                  <Col xs="3">INR {data.stipend}</Col>
                  <Col xs="3">
                    <Link to ={"/Projects/" + data["project-uid"]}><Button style={{
                        backgroundColor: "#0F8797",
                        color: "white"
                      }}>Apply</Button></Link>
                  </Col>
                </Row>
              </CardBody>
            </Col>
          </Row>
        </Card>);
      })
    }
    </div>);
};

export default CardComponent;
