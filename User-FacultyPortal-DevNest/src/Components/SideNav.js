import React, { useEffect, useState } from "react";
import { Box, NavLink, Button, Text } from "@mantine/core";

import { useContext } from 'react';
import { NavSelect } from "./faculty/Context";
import { useRouter } from "next/router";

export default function SideNav({ NavData}) {
  const router = useRouter();

  const { navIndex, setNavIndex} = useContext(NavSelect);

  let logoutRout = NavData.data[0].path.includes("faculty") ? "/auth/facultyLogin" : "/auth/login";
  let removeItem = NavData.data[0].path.includes("faculty") ? "faculty_auth" : "student_auth";

  const onClickLogout = () => {
    localStorage.removeItem(removeItem);
    router.push(logoutRout)
  }

  return (
    <>
      {NavData.data.map((item, index) => (
        <Box w={240} key={index}>
          <NavLink
            key={index}
            active={index === navIndex}
            label={item.label}
            description={item.description}
            rightSection={item.rightSection}
            icon={<item.icon size="1rem" stroke={1.5} />}
            onClick={() => (router.push(`/${item.path}`,setNavIndex(index)))}
            style={{
              marginBottom: 10,
              borderRadius: "10px",
              padding: "10px",
              paddingLeft: "13px",
              accentColor: "#0368FF",
            }}
          />
        </Box>
      ))}
      <Box>
        <Button
          style={{
            borderRadius: "20px",
            backgroundColor: "#1d2c40",
            color: "#fff",
            marginTop: "20px",
            width: "240px",
          }}
          
          onClick={() => onClickLogout()}
        >
          Log Out
        </Button>
        <Text
          size={"xs"}
          style={{
            textAlign: "center",
            marginTop: "30px",
            cursor: "pointer",
          }}
        >
          {" "}
          Report a Bug 😤
        </Text>
      </Box>
    </>
  );
}
