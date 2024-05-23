// import {} from "@tabler/icons-react";
import BackNav from "@/Components/BackNav";
import Header from "@/Components/Header";
import {Title,Text, useMantineColorScheme } from "@mantine/core";
import PracticalCard from "@/Components/PracticalCard";
import { useRouter } from 'next/router'
import { LoaderContext, ShowMore } from "@/Components/faculty/Context";
import { useContext, useEffect, useState } from "react";

import { fetchDate } from "@/helper/fetchDate";

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

  // [
  //   {
  //     title: "Practical 1 : Hello World",
  //     dec: "Given a string S, find the length of its longest substring that does not have any repeating characters.",
  //     color: "#459949",
  //   },
  // ]

  const [data, setData] = useState({
    practicals: [],
    success: false,
  });

  const  {visible, setVisible} = useContext(LoaderContext);

  useEffect(() => {
    setVisible(true);
    fetchDate(`/student/all/practicals?lab_id=${router.query.lab_id}`).then((res) => {
      console.log(res);
      if (!res.success) return setVisible(false);
      setVisible(false);
      setData({ practicals : res.response, success: true });
    });
  }, []);


  return (
    <>
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
            { title: "Practicals" ,href : `/student/labs?lab=${router.query._id}`},
          ]}
        />
        <Header
          title={`Practicals : ${router.query.lab}`}
          dec={`${router.query.lab_dec}`}
        />

        <div style={{ paddingBottom: "100px" }}>
          {data.practicals.map((item, index) => {
            return (
              <div key={index} >
                <PracticalCard
                  id={item._id}
                  title={item.name}
                  dec={item.dec}
                  color={"#459949"}
                  setShow={setShow}
                  show={show}
                  index={index}
                />
              </div>
            );
          })}
        </div>
        </div>
      </div>
      {/* <ShowMore /> */}
    </>
  );
}
