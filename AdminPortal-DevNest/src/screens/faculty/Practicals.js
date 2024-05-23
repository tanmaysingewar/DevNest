import React, { useState } from "react";
// import {} from "@tabler/icons-react";
import BackNav from "@/Components/BackNav";
import Header from "@/Components/Header";
import { Title, Text, useMantineColorScheme, Button, Box } from "@mantine/core";
import { useRouter } from "next/router";
import { ShowMore } from "@/Components/admin/Context";
import FacultyPracticalCard from "@/Components/admin/FacultyPracticalCard";

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

  const data = [
    {
      _id: "CPP203_01",
      title: "Practical 1 : Hello World",
      dec: "Given a string S, find the length of its longest substring that does not have any repeating characters.",
      color: "#459949",
    },
    {
      _id: "CPP203_02",
      title: "Practical 2 : Variables decelerations",
      dec: "Given a string S, find the length of its longest substring that does not have any repeating characters.",
      color: "#ED789B",
    },
    {
      _id: "CPP203_03",
      title: "Practical 3 : If & Else Statement",
      dec: "Given a string S, find the length of its longest substring that does not have any repeating characters.",
      color: "#B468DD",
    },
    {
      _id: "CPP203_04",
      title: "Practical 4 : Declaring Functions",
      dec: "Given a string S, find the length of its longest substring that does not have any repeating characters.",
      color: "#CE6365",
    },
    {
      _id: "CPP203_05",
      title: "Practical 5 : Loops",
      dec: "Given a string S, find the length of its longest substring that does not have any repeating characters.",
      color: "#459949",
    },
    {
      _id: "CPP203_06",
      title: "Practical 6 : Arrays",
      dec: "Given a string S, find the length of its longest substring that does not have any repeating characters.",
      color: "#ED789B",
    },
  ];
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
              title={`Practicals : ${router.query.lab}`}
              dec={"Basic C++ syntax and introduction to the c++ environment."}
            />
            <Button
              style={{
                borderRadius: "5px",
                backgroundColor: "#0368FF",
                color: "#fff",
                marginTop: "50px",
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
            {data.map((item, index) => {
              return (
                <div key={index}>
                  <FacultyPracticalCard
                    key={index}
                    _id={item._id}
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
        <div>
          <div
            style={{
              margin: "50px",
              marginTop: "90px",
              padding: "30px",
              backgroundColor: cardColor,
              width: "90%",
              maxWidth: "500px",
              borderRadius: "10px",
            }}
          >
            <Title style={{ fontSize: "15px" }}>CPP203</Title>
            <Title style={{ fontSize: "24px", marginTop: "10px" }}>
              Lab : C++
            </Title>
            <Text style={{ fontSize: "14px" }}>
              Basic C++ syntax and introduction to the c++ environment.
            </Text>

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
                        fontWeight: "400",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      Year : II
                    </Text>
                    <Text
                      style={{
                        fontWeight: "400",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      Term : Even 2024
                    </Text>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <Text
                      style={{
                        fontWeight: "400",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      Branch : AIDS
                    </Text>
                    <Text
                      style={{
                        fontWeight: "400",
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      Section : A
                    </Text>
                  </div>
                </div>
                <div style={{marginTop : "10px"}}>
                  <Text style={{ fontSize: "14px",color : "#fff" }}>
                    Total Enrolled Students : 200{" "}
                  </Text>
                  <Text style={{ fontSize: "14px",color : "#fff" }}>
                    Total Practical Assigned : 9{" "}
                  </Text>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
      {/* <ShowMore /> */}
    </>
  );
}
