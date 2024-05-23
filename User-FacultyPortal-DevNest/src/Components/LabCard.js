import { Card, Text, Badge, Button, Group, Box, Progress, Loader } from "@mantine/core";
import Router from "next/router";
import medal from "../assets/medal.png";
// lvl2_medal
// lvl3_medal
import medal2 from "../assets/lvl2_medal.png";
import medal3 from "../assets/lvl3_medal.png";
import Image from "next/image";
import { fetchDate } from "@/helper/fetchDate";
import { useEffect, useState } from "react";


export default function LabCard({
  lab,
  logo,
  BG_color,
}) {
  const [stats, setStats] = useState({
    progress: 0,
    score: 0,
  })

  const [loadingStat, setLoadingStat] = useState(false)
  useEffect(() => {
    setLoadingStat(true)
    fetchDate(`/student/lab/analysis?lab_id=${lab._id}`)
    .then((res) => {
      if(!res.success) return setLoadingStat(false);
      console.log(res)
      setStats(res.response)
      setLoadingStat(false)
    })
  }, [])
  
  return (
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
        <Text style={{ fontWeight: "700", color: "#fff", fontSize: "15px", marginTop : "5px" }}>
            Faculty Name : {
              lab?.faculties[0]?.name
            }
          </Text>
          <Text style={{ fontWeight: "500", color: "#fff", fontSize: "12px" }}>
            {lab.dec}
          </Text>
          
          <Text
            style={{
              fontWeight: "700",
              color: "#fff",
              fontSize: "13px",
              marginTop: "10px",
            }}
          >
            Progress : {stats.progress}%
          </Text>
          <Progress
            size="xs"
            radius="xl"
            sections={[{ value: stats.progress, color: "#fff", label: "40%" }]}
            style={{
              marginTop: "5px",
              backgroundColor: "rgba(255, 255, 255, 0.51)",
            }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
        <Button
            style={{
              backgroundColor: "#fff",
              borderRadius: "50px",
              color: "#000",
            }}
            radius={"xl"}
            onClick={() => Router.push(`/student/labs?lab_id=${lab._id}&lab=${lab.name}&lab_dec=${lab.dec}`)}
            loading={false}
            loaderProps={{ color: "#0368FF" }}
          >
            Open Lab
          </Button>
        </div>
      </div>
      <div style={{margin : 'auto',textAlign : "center",width : "30%"}}>
        {
          loadingStat ? 
            <Loader color="gray" variant="dots" size={"xs"} />
          :
          stats.score > 0 ? 
          <Image src={
            stats.score > 2000 ? medal3 : stats.score > 1000 ? medal2 : stats.score >= 300 ? medal : null
          } alt="Norway" height={60} style={{textAlign : 'center'}}  />
          :
          ""
        }
        
        <Text
            style={{
              fontWeight: "500",
              color: "#fff",
              fontSize: "13px",
              marginTop: "15px",
              textAlign : "center",
              margin : "auto"
            }}
          >You Earned </Text>
        <Text
            style={{
              fontWeight: "700",
              color: "#fff",
              fontSize: "15px",
              marginTop: "15px",
              textAlign : "center",
              margin : "auto"
            }}
          >{
            loadingStat ? 
            <Loader color="gray" variant="dots" size={"xs"} />
          :
            stats.score > 2000 ? "INTERMEDIATE" : stats.score > 1000 ? "ELEMENTARY" : stats.score >= 300 ? "BEGINNER" : "NO"
          }</Text>
           <Text
            style={{
              fontWeight: "500",
              color: "#fff",
              fontSize: "13px",
              marginTop: "15px",
              textAlign : "center",
              margin : "auto"
            }}
          >medal </Text>
         <Box style={{
          padding : "10px",
          backgroundColor : "rgba(255, 255, 255, 0.20)",
          borderRadius : "10px",
          margin : "auto",
          marginTop : "10px",
          width : "100px",
         }}>
         <Text
            style={{
              fontWeight: "800",
              color: "#fff",
              fontSize: "15px",
              marginTop: "15px",
              textAlign : "center",
              margin : "auto"
            }}
          >{stats.score} </Text>
          <Text
            style={{
              fontWeight: "500",
              color: "#fff",
              fontSize: "13px",
              marginTop: "15px",
              textAlign : "center",
              margin : "auto"
            }}
          >Your Score </Text>
         </Box>
      </div>
    </Box>
  );
}
