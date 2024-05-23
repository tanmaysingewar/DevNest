import React, { useState } from "react";
// import {} from "@tabler/icons-react";
import { Button, Text, Title, useMantineColorScheme } from "@mantine/core";
import Router, { useRouter } from "next/router";

export default function FacultyPracticalCard({
  title,
  dec,
  color,
  show,
  setShow,
  index,
  _id
}) {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const setShowIndex = (index) => {
    if (show === index) {
      setShow(null);
      return;
    }
    setShow(index);
  };

  let cardColor = "#25262B";

  if (colorScheme === "dark") {
    cardColor = "#25262B";
  } else {
    cardColor = "#f8f9fa";
  }

  const Data = [
    {
      _id: "CPP101",
      title: "Problem 1",
    },
    {
      _id: "CPP102",
      title: "Problem 2",
    },
    {
      _id: "CPP103",
      title: "Problem 3",
    },
    {
      _id: "CPP104",
      title: "Problem 4",
    },
    {
      _id: "CPP105",
      title: "Problem 5",
    },
    {
      _id: "CPP106",
      title: "Problem 6",
    },
    {
      _id: "CPP107",
      title: "Problem 7",
    },
    {
      _id: "CPP108",
      title: "Problem 8",
    },
    {
      _id: "CPP109",
      title: "Problem 9",
    },
    {
      _id: "CPP1010",
      title: "Problem 10",
    },
  ];

  return (
    <>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          backgroundColor: cardColor,
          maxWidth: "600px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: "20px",
            backgroundColor: color,
            borderRadius: "10px 0 0 10px",
          }}
        ></div>
        <div
          style={{ margin: "15px 15px 15px 10px" }}
          onClick={() => setShowIndex(index)}
        >
          <Title style={{ fontSize: "18px" }}>{title}</Title>
          <Text style={{ fontSize: "12px", lineHeight: "16px" }}>{dec}</Text>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <div>
              {Data.map((item, index) => {
                if (index < 4) {
                  return (
                    <Problems index={index}  item={item} />
                  );
                }
              })}
            </div>
            <div style={{ marginLeft: "10px" }}>
              {Data.map((item, index) => {
                if (index >= 4 && index < 8) {
                  return (
                    <Problems index={index}  item={item} />
                  );
                }
              })}
            </div>
            <div style={{ marginLeft: "10px" }}>
              {Data.map((item, index) => {
                if (index >= 8 && index < 12) {
                  return (
                    <Problems index={index}  item={item} />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
      {show === index ? (
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <Button
            style={{
              borderRadius: "10px",
              backgroundColor: "#0368FF",
              color: "#fff",
            }}
            onClick={() =>
              Router.push(
                `/faculty/labs?lab=${router.query.lab}&edit=practical&practical=${_id}`
              )
            }
          >
            Edit Practical
          </Button>
          <Button
            style={{
              borderRadius: "10px",
              backgroundColor: "#CF75FF",
              color: "#fff",
              marginLeft: "10px",
            }}
          >
            View & Edit Material
          </Button>
          <Button
            style={{
              borderRadius: "10px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              marginLeft: "10px",
            }}
            onClick={() =>
              Router.push(
                `/admin/labs?lab=${router.query.lab}&create=problem`
              )
            }
          >
            Add Problems
          </Button>
        </div>
      ) : null}
    </>
  );
}

const Problems = ({item,index}) => {
  const router = useRouter();
  return (
    <div
      key={index}
    >
      <Text
        style={{
          fontSize: "12px",
          lineHeight: "20px",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => Router.push(`/faculty/labs?lab=${router.query.lab}&edit=problem&problem=${item._id}`)}
      >
        {item.title}
      </Text>
    </div>
  );
};
