import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Box,
  Progress,
  Avatar,
  Modal,
  Loader
} from "@mantine/core";
import Router from "next/router";
import medal from "@/assets/medal.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchDate } from "@/helper/fetchDate";


export default function FacultyLabCard({
  lab,
  logo,
  title,
  dec,
  courseCode,
  progress,
  redirectLab,
  redirectAnalysis,
  BG_color,
}) {

  const [noOfPracticals, setNoOfPracticals] = useState("NaN")
  const [noOfStudents, setNoOfStudents] = useState("NaN")

  useEffect(() => {
    fetchDate(`/faculty/count/practicals?l_id=${lab._id}`).then((res) => {
      if(!res.success) return;
      setNoOfPracticals(res.response || 0)
      console.log(res.response)
    }
    );
    fetchDate(`/faculty/count/students?l_id=${lab._id}`).then((res) => {
      if(!res.success) return;
      setNoOfStudents(res.response || 0)
      console.log(res.response)
    }
    );
  }, [])


  return (
    <>

    <Box
      style={{
        backgroundColor: BG_color,
        padding: "20px",
        borderRadius: "10px",
        width: "500px",
        margin: "8px",
        display: "flex",
      }}
    >
      <div style={{ width: "70%" }}>
        <div style={{ display: "flex" }}>
          <Image src={logo} alt="Norway" height={50} />
          <div style={{ marginLeft: "20px" }}>
            <Text
              style={{ fontWeight: "700", color: "#fff", fontSize: "20px" }}
            >
              {lab.name}
            </Text>
            <Text
              style={{ fontWeight: "400", color: "#fff", fontSize: "12px" }}
            >
              {lab.l_id}
            </Text>
          </div>
        </div>
        <div style={{ marginTop: "10px", width: "90%" }}>
          <Text
            style={{
              fontWeight: "500",
              color: "#fff",
              fontSize: "12px",
              paddingLeft: "5px",
            }}
          >
            {lab.dec}
          </Text>
        </div>
        <div style={{marginLeft : "5px",marginTop : "5px"}}>
        <Text style={{ fontWeight: "600", color: "#fff", fontSize: "13px" }}>
            Faculty Names :
            {
              lab.faculties.map((faculty, index) => {
                return (
                  <span key={index}>
                    {" "}{faculty.name}{" "}
                  </span>
                );
              })
            }
          </Text>
          
        </div>
        <Box
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.20)",
            borderRadius: "10px",
            padding: "8px 0px 10px 10px",
            marginTop: "10px",
          }}
        >
          <div>
            <Text
              style={{
                fontWeight: "600",
                color: "#fff",
                fontSize: "15px",
              }}
            >
              Details
            </Text>
            <div style={{ display: "flex" }}>
              <div>
                <Text
                  style={{
                    fontWeight: "500",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                >
                  Year : {lab.year}
                </Text>
                <Text
                  style={{
                    fontWeight: "500",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                >
                  Semester : {lab.sem}
                </Text>
              </div>
              <div style={{ marginLeft: "20px" }}>
                <Text
                  style={{
                    fontWeight: "500",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                >
                  Branch : {lab.branch}
                </Text>
                <Text
                  style={{
                    fontWeight: "500",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                >
                  Section : {lab.section}
                </Text>
              </div>
            </div>
          </div>
        </Box>
        <div style={{ marginTop: "20px" }}>
          <Button
            style={{
              backgroundColor: "#fff",
              borderRadius: "50px",
              color: "#000",
            }}
            radius={"xl"}
            onClick={() => Router.push(`/faculty/labs?lab=${lab._id}&lab_name=${lab.name}&dec=${lab.dec}`)}
            loading={false}
            loaderProps={{ color: "#0368FF" }}
          >
            Open Lab
          </Button>
          <Button
            style={{
              marginLeft: "5px",
              backgroundColor: "#fff",
              borderRadius: "50px",
              color: "#000",
            }}
            radius={"xl"}
            // /faculty/labs?lab=cpp&&analysis=true
            onClick={() => Router.push(`/faculty/labs?lab=${lab.name}&analysis=true&lab_id=${lab._id}`)}
            loading={false}
            loaderProps={{ color: "#fff" }}
          >
            Lab Analysis
          </Button>
        </div>
      </div>
      <div style={{ textAlign: "center", width: "30%", margin: "auto" }}>
        <Box
          style={{
            padding: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.20)",
            borderRadius: "10px",
            margin: "auto",
            width: "100px",
          }}
        >
          <Text
            style={{
              fontWeight: "800",
              color: "#fff",
              fontSize: "15px",
              marginTop: "15px",
              textAlign: "center",
              margin: "auto",
            }}
          >
            {noOfStudents === "NaN" ? <Loader  size="xs"  /> : noOfStudents}
          </Text>
          <Text
            style={{
              fontWeight: "500",
              color: "#fff",
              fontSize: "13px",
              marginTop: "15px",
              textAlign: "center",
              margin: "auto",
            }}
          >
            Students
          </Text>
        </Box>
        <Box
          style={{
            padding: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.20)",
            borderRadius: "10px",
            margin: "auto",
            marginTop: "10px",
            width: "100px",
          }}
        >
          <Text
            style={{
              fontWeight: "800",
              color: "#fff",
              fontSize: "15px",
              marginTop: "15px",
              textAlign: "center",
              margin: "auto",
            }}
          >
            {noOfPracticals === "NaN" ? <Loader  size="xs"  /> : noOfPracticals}
          </Text>
          <Text
            style={{
              fontWeight: "500",
              color: "#fff",
              fontSize: "13px",
              marginTop: "15px",
              textAlign: "center",
              margin: "auto",
            }}
          >
            Practicals
          </Text>
        </Box>
      </div>
    </Box>
    </>
  );
}
