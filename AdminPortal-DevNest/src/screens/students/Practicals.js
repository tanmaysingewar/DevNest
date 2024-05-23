import React, { useState } from "react";
// import {} from "@tabler/icons-react";
import BackNav from "@/Components/BackNav";
import Header from "@/Components/Header";
import {Title,Text, useMantineColorScheme } from "@mantine/core";
import PracticalCard from "@/Components/PracticalCard";
import { useRouter } from 'next/router'


export default function Practical() {
  const router = useRouter()
  const [show, setShow] = useState("")
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  let cardColor = "#25262B";

  if(colorScheme === "dark"){
      cardColor = "#25262B";
  }
  else{
      cardColor = "#f8f9fa";
  } 

  const data = [
    {
      title: "Practical 1 : Hello World",
      dec: "Given a string S, find the length of its longest substring that does not have any repeating characters.",
      color: "#459949",
    },
    {
      title: "Practical 2 : Variables decelerations",
      dec: "Given a string S, find the length of its longest substring that does not have any repeating characters.",
      color: "#ED789B",
    },
    {
      title: "Practical 3 : If & Else Statement",
      dec: "Given a string S, find the length of its longest substring that does not have any repeating characters.",
      color: "#B468DD",
    },
    {
      title: "Practical 4 : Declaring Functions",
      dec: "Given a string S, find the length of its longest substring that does not have any repeating characters.",
      color: "#CE6365",
    },
    {
        title : "Practical 5 : Loops",
        dec : "Given a string S, find the length of its longest substring that does not have any repeating characters.",
        color : "#459949"
    },
    {
        title : "Practical 6 : Arrays",
        dec : "Given a string S, find the length of its longest substring that does not have any repeating characters.",
        color : "#ED789B"
    }
  ];
  return (
    <>
    {/* <ShowMore.Provider value={{showMore,setShowMore}}> */}
      <div
        style={{
        padding : '20px',
          paddingTop: "60px",
          height: "100vh",
          width: "100%",
          display : "flex",
          overflowY: "scroll",
        }}
      >
        <div >
        <BackNav
          dataTrack={[
            { title: "Lab",href : "/student/labs" },
            { title: "Practicals" ,href : `/student/labs?lab=${router.query.lab}`},
          ]}
        />
        <Header
          title={`Practicals : ${router.query.lab}`}
          dec={"Basic C++ syntax and introduction to the c++ environment."}
        />

        <div style={{ paddingBottom: "100px" }}>
          {data.map((item, index) => {
            return (
              <div key={index} >
                <PracticalCard
                  title={item.title}
                  dec={item.dec}
                  color={item.color}
                  setShow={setShow}
                  show={show}
                  index={index}
                />
              </div>
            );
          })}
        </div>
        </div>
        {/* <div>
            <div style={{ margin: "50px", marginTop: "90px",padding : "30px",backgroundColor : cardColor, width : "90%",maxWidth : '500px' ,borderRadius : '10px'}}>
                <Title style={{ fontSize: "15px" }}>Practical 1:</Title>
                <Title style={{ fontSize: "24px",marginTop : "10px" }}>Hello World</Title>
                <Text style={{fontSize : "14px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                <Title style={{ fontSize: "18px",marginTop : "10px" }}>Problem Statement</Title>
                <Text style={{fontSize : "14px"}}>Given a string S, find the length of its longest substring that does not have any repeating characters.</Text>
                <Title style={{ fontSize: "18px",marginTop : "10px" }}>Function Description</Title>
                <Text style={{fontSize : "14px"}}>Complete the function longestSubstring() which takes the string S as input and returns the length of the longest substring without any repeating characters.</Text>
                <Title style={{ fontSize: "18px",marginTop : "10px" }}>Input Format</Title>
                <Text style={{fontSize : "14px"}}>The only argument given is string S.</Text>
                <Title style={{ fontSize: "18px",marginTop : "10px" }}>Output Format</Title>
                <Text style={{fontSize : "14px"}}>Return the length of the longest substring without any repeating characters.</Text>
                <Title style={{ fontSize: "18px",marginTop : "10px" }}>Constraints</Title>
                <Text style={{fontSize : "14px"}}>{"1 <= length of string <= 100000"}</Text>
            </div>
        </div> */}
      </div>
      {/* <ShowMore /> */}
    </>
  );
}
