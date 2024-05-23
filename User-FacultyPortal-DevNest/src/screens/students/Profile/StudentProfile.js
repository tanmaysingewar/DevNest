import React, { useContext, useEffect, useState } from "react";
// import {} from "@tabler/icons-react";
import Header from "@/Components/Header";
import { Avatar, Button, Text } from "@mantine/core";
import Image from "next/image";

import profile from "@/assets/profile-pic.jpg";
import Router from "next/router";
import { useCounter } from "@mantine/hooks";
import { LoaderContext } from "@/Components/faculty/Context";
import { fetchDate } from "@/helper/fetchDate";

export default function Profile() {


  const  {visible, setVisible} = useContext(LoaderContext);

const [values, setValues] = useState({
  _id : "",
  name : "",
  email : "",
  collage_code : "",
  address : "",
  dob : "",
  gender : "",
  contact : ["",""],
  currentYear : "",
  currentSem : "",
  branch : "",
  section : "",
  rollNo : "",
  regNo : ""

})


console.log(values)

useEffect(() => {
  setVisible(true);
  fetchDate("/student/profile").then((res) => {
    console.log(res);
    if(res.success === false) return setVisible(false);
    setValues({
      _id : res.response._id,
      name : res.response.name,
      email : res.response.email,
      collage_code : res.response.collage_code,
      address : res.response.address,
      dob : new Date(res.response.dob).toDateString(),
      gender : res.response.gender,
      contact : res.response.contact,
      currentYear : res.response.currentYear,
      currentSem : res.response.currentSem,
      branch : res.response.branch,
      section : res.response.section,
      rollNo : res.response.rollNo,
      regNo : res.response.regNo
    })
    setVisible(false);
  })
  
}, [])
  return (
    <>
      <div style={{ marginTop: "40px", width: "100%" }}>
        <Header title="Profile" dec={"Edit the Profile here."} />
        <ProfileCard values={values} />
        <ProfileInfo values={values} />
      </div>
    </>
  );
}


const ProfileCard = ({values}) => {
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
          {values?.name?.split(" ")[0] ? values.name.split(" ")[0][0] + values?.name?.split(" ")[1][0] : ""}
      </Avatar>
      <div style={{ margin: "auto", marginLeft: "20px" }}>
        <Text style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>
          {values?.name}
        </Text>
        <Text style={{ fontSize: "14px", fontWeight: "400", color: "#fff" }}>
          S_ID : {values?.regNo}
        </Text>
        <Text style={{ fontSize: "14px", fontWeight: "400", color: "#fff" }}>
          {values?.email}
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
        onClick={() => Router.push("/student/profile?edit=true  ")}
      >
        Edit{" "}
      </Button>
    </div>
  );
};

const ProfileInfo = ({values}) => {
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
      {/* currentYear : res.response.currentYear,
      currentSem : res.response.currentSem,
      branch : res.response.branch,
      section : res.response.section,
      rollNo : res.response.rollNo,
      regNo : res.response.regNo */}
    </div>
    <div style={{marginTop : "30px" }}>
      <Text style={{ fontSize: "20px", fontWeight: "600"}}>
      Registered Info
      </Text>
      {/* branch */}
      <div style={{display : "flex"}}>
      <Text style={{ fontSize: "14px", fontWeight: "400" }}>Branch : {values.branch}</Text>
      </div>
      
      <div style={{display : "flex"}}>
      <Text style={{ fontSize: "14px", fontWeight: "400" }}>Current Semester : {values.currentSem}</Text>
      <Text style={{ fontSize: "14px", fontWeight: "400",marginLeft : "40px" }}>Class Roll No. : {values.rollNo}</Text>
      </div>
      <div style={{display : "flex"}}>
      <Text style={{ fontSize: "14px", fontWeight: "400" }}>Current Year  : {values.currentYear}</Text>
      <Text style={{ fontSize: "14px", fontWeight: "400",marginLeft : "108px" }}>Section : {values.section}</Text>
      </div>

    </div>
    <div style={{marginTop : "30px" }}>
      <Text style={{ fontSize: "20px", fontWeight: "600"}}>
      Contact Info
      </Text>
      <div style={{display : "flex"}}>
      <Text style={{ fontSize: "14px", fontWeight: "400"}}>Students Phone Number : {values.contact[0]}</Text>
      <Text style={{ fontSize: "14px", fontWeight: "400",marginLeft : "40px"  }}>Parents Phone Number : {values.contact[1]} </Text>

      </div>
    </div>
    <div style={{marginTop : "30px" }}>
      <Text style={{ fontSize: "20px", fontWeight: "600"}}>
      Address
      </Text>
      <div style={{display : "flex"}}>
      <Text style={{ fontSize: "14px", fontWeight: "400" }}>{values.address}</Text>
      </div>
    </div>
  </div>
  );
};
 