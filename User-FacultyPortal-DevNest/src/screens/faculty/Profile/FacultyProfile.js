import React, { useContext, useEffect, useState } from "react";
// import {} from "@tabler/icons-react";
import Header from "@/Components/Header";
import { Avatar, Button, Text } from "@mantine/core";
import Image from "next/image";

import profile from "@/assets/profile-pic.jpg";
import Router, { useRouter } from "next/router";
import { fetchDate, updateDate } from "@/helper/fetchDate";
import { LoaderContext } from "@/Components/faculty/Context";



export default function FacultyProfile() {

  const  {visible, setVisible} = useContext(LoaderContext);

  const [values, setValues] = useState({
    _id : "",
    f_id : "",
    name : "",
    email : "",
    collage_code : "",
    address : "",
    department : "",
    dob : "",
    gender : "",
    joining_date : "",
    contact : []
  })

  console.log(values)

  useEffect(() => {
    setVisible(true);
    fetchDate("/faculty/profile").then((res) => {
      console.log(res);
      if(res.success === false) return setVisible(false);
      setValues({
        _id : res.response._id,
        f_id : res.response.f_id,
        name : res.response.name,
        email : res.response.email,
        collage_code : res.response.collage_code,
        address : res.response.address,
        department : res.response.department,
        dob : new Date(res.response.dob).toDateString(),
        gender : res.response.gender,
        joining_date : new Date(res.response.joining_date).toDateString(),
        contact : res.response.contact
      })
      setVisible(false);
    })
    
  }, [])

  
  const ProfileCard = () => {
    return (
      <div
        style={{
          display: "flex",
          padding: "20px",
          backgroundColor: "#0368FF",
          maxWidth: "550px",
          borderRadius: "10px",
          marginTop: "30px",
        }}
      >
        <Avatar variant="filled" radius="xl" size="xl" >
          {/* First Letters of word and First Letter of seconde word */}
          {values?.name?.split(" ")[1] ? values.name.split(" ")[0][0] + values?.name?.split(" ")[1][0] : ""}
        </Avatar>
        <div style={{ margin: "auto", marginLeft: "20px" }}>
          <Text style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>
            {values.name}
          </Text>
          <Text style={{ fontSize: "14px", fontWeight: "400", color: "#fff" }}>
            F_ID : {values.f_id}
          </Text>
          <Text style={{ fontSize: "14px", fontWeight: "400", color: "#fff" }}>
            {values.email}
          </Text>
        </div>
        <Button
          style={{
            borderRadius: "20px",
            backgroundColor: "#ffff",
            color: "#000",
            margin: "auto",
            width: "100px ",
          }}
          onClick={() => Router.push(`/faculty/profile?edit=true&profile_id=${values._id}`)}
        >
          Edit
        </Button>
      </div>
    );
  };
  
  const ProfileInfo = () => {
    return (
    <div>
      <div style={{marginTop : "30px" }}>
        <Text style={{ fontSize: "20px", fontWeight: "600"}}>
         Basic Information
        </Text>
        <div style={{display : "flex"}}>
        <Text style={{ fontSize: "14px", fontWeight: "400" }}>Date of Birth : {values.dob} </Text>
        <Text style={{ fontSize: "14px", fontWeight: "400",marginLeft : "40px" }}>Gender : {values.gender}</Text>
        </div>
      </div>
      <div style={{marginTop : "30px" }}>
        <Text style={{ fontSize: "20px", fontWeight: "600"}}>
        Joining Info
        </Text>
        <div style={{display : "flex"}}>
        <Text style={{ fontSize: "14px", fontWeight: "400" }}>Joining Date : {values.joining_date}</Text>
        <Text style={{ fontSize: "14px", fontWeight: "400",marginLeft : "40px" }}>Department : {values.department}</Text>
        </div>
      </div>
      <div style={{marginTop : "30px" }}>
        <Text style={{ fontSize: "20px", fontWeight: "600"}}>
        Contact Info
        </Text>
        <div >
          {
            values.contact.map((item,index) => (
              <Text key={index} style={{ fontSize: "14px", fontWeight: "400" }}><b >{"Phone Number "} {index + 1}</b>{": "} {item}</Text>
            ))
          }
        </div>
      </div>
      <div style={{marginTop : "30px" }}>
        <Text style={{ fontSize: "20px", fontWeight: "600"}}>
        Address
        </Text>
        <div style={{display : "flex"}}>
        <Text style={{ fontSize: "14px", fontWeight: "400" }}>Block 1 new Road Sector 3 , new State</Text>
        </div>
      </div>
    </div>
    );
  };

  return (
    <>
      <div style={{ width: "100%",overflowY : "scroll" }}>
        <div style={{ marginTop: "50px",}}>
        <Header title="Profile" dec={"Edit the Profile here."} />
        <ProfileCard />
        <ProfileInfo />
        </div>
      </div>
    </>
  );



 
}