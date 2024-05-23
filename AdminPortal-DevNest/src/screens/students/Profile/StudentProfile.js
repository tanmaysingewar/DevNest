import React, { useState } from "react";
// import {} from "@tabler/icons-react";
import Header from "@/Components/Header";
import { Button, Text } from "@mantine/core";
import Image from "next/image";

import profile from "@/assets/profile-pic.jpg";
import Router from "next/router";

export default function Profile() {
  return (
    <>
      <div style={{ marginTop: "40px", width: "100%" }}>
        <Header title="Profile" dec={"Edit the Profile here."} />
        <ProfileCard />
        <ProfileInfo />
      </div>
    </>
  );
}

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
      <Image
        src={profile}
        alt="Profile"
        width={100}
        height={100}
        style={{borderRadius: "50%"}}
      />
      <div style={{ margin: "auto", marginLeft: "20px" }}>
        <Text style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>
          Lorem Joseph Ipsum{" "}
        </Text>
        <Text style={{ fontSize: "14px", fontWeight: "400", color: "#fff" }}>
          S_ID : 22030041
        </Text>
        <Text style={{ fontSize: "14px", fontWeight: "400", color: "#fff" }}>
          loremjosephipsum@gmail.com
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

const ProfileInfo = () => {
  return (
  <div>
    <div style={{marginTop : "30px" }}>
      <Text style={{ fontSize: "20px", fontWeight: "600"}}>
       Basic Information
      </Text>
      <div style={{display : "flex"}}>
      <Text style={{ fontSize: "14px", fontWeight: "400" }}>Date of Birth : 13/02/2003 </Text>
      <Text style={{ fontSize: "14px", fontWeight: "400",marginLeft : "40px" }}>Gender : Male</Text>
      </div>
    </div>
    <div style={{marginTop : "30px" }}>
      <Text style={{ fontSize: "20px", fontWeight: "600"}}>
      Admission Info
      </Text>
      <div style={{display : "flex"}}>
      <Text style={{ fontSize: "14px", fontWeight: "400" }}>Admission Date : 08/11/2022</Text>
      </div>
    </div>
    <div style={{marginTop : "30px" }}>
      <Text style={{ fontSize: "20px", fontWeight: "600"}}>
      Registered Info
      </Text>
      <div style={{display : "flex"}}>
      <Text style={{ fontSize: "14px", fontWeight: "400" }}>Current Semester : III</Text>
      <Text style={{ fontSize: "14px", fontWeight: "400",marginLeft : "40px" }}>Class Roll No. : 61</Text>
      </div>
      <Text style={{ fontSize: "14px", fontWeight: "400" }}>Current Year : II</Text>
    </div>
    <div style={{marginTop : "30px" }}>
      <Text style={{ fontSize: "20px", fontWeight: "600"}}>
      Contact Info
      </Text>
      <div style={{display : "flex"}}>
      <Text style={{ fontSize: "14px", fontWeight: "400" }}>Parents Phone Number : 8605527382</Text>
      <Text style={{ fontSize: "14px", fontWeight: "400",marginLeft : "40px" }}>Students Phone Number : 9112954819</Text>
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
 