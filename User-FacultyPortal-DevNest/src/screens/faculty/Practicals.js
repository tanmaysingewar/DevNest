import React, { useState,useEffect, useContext } from "react";
// import {} from "@tabler/icons-react";
import BackNav from "@/Components/BackNav";
import Header from "@/Components/Header";
import { Title, Text, useMantineColorScheme, Button, Box } from "@mantine/core";
import PracticalCard from "@/Components/PracticalCard";
import { useRouter } from "next/router";
import { LoaderContext, ShowMore } from "@/Components/faculty/Context";
import FacultyPracticalCard from "@/Components/faculty/FacultyPracticalCard";
import { fetchDate } from "@/helper/fetchDate";



export default function FacultyPractical() {
  const router = useRouter();
  const [show, setShow] = useState("");
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  let cardColor = "#25262B";

  if (colorScheme === "dark") {
    cardColor = "#25262B";
  } else {
    cardColor = "#f8f9fa";
  }


  const [data, setData] = useState({
    practicals: [],
    success: false,
  });

  const  {visible, setVisible} = useContext(LoaderContext);

  useEffect(() => {
    setVisible(true);
    fetchDate(`/faculty/get/all/practicals?l_id=${router.query.lab}`).then((res) => {
      console.log(res);
      if (!res.success) return setVisible(false);;
      setVisible(false);
      setData({ practicals : res.response, success: true });
    });
  }, []);
  return (
    <>
      {/* <ShowMore.Provider value={{showMore,setShowMore}}> */}
      <div
        style={{
          padding: "20px",
          paddingTop: "60px",
          height: "100vh",
          width: "100%",
          display: "flex",
          overflowY: "scroll",
        }}
      >
        <div>
          <BackNav
            dataTrack={[
              { title: "Lab", href: "/faculty/labs" },
              {
                title: "Practicals",
                href: `/faculty/labs?lab=${router.query.lab}`,
              },
            ]}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Header
              title={`Practicals : ${router.query.lab_name || ""}`}
              dec={`${router.query.dec || ""}`}
            />
            <Button
              style={{
                borderRadius: "5px",
                backgroundColor: "#0368FF",
                color: "#fff",
                margin :"auto",
                marginLeft: "50px",
              }}
              onClick={() =>
                router.push(
                  `/faculty/labs?lab=${router.query.lab}&create=practical`
                )
              }
            >
              Create Practical
            </Button>
          </div>

          <div style={{ paddingBottom: "100px" }}>
            {data.practicals.map((item, index) => {
              return (
                <div key={index}>
                  <FacultyPracticalCard
                    key={index}
                    _id={item._id}
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


const data = [
  {
    color: "#459949",
  },
  {
    color: "#ED789B",
  },
  {
    color: "#B468DD",
  },
  {
    color: "#CE6365",
  },
  {
    color: "#459949",
  },
  {
    color: "#ED789B",
  },
];
