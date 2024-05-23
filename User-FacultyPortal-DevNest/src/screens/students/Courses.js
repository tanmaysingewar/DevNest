import React, { useState } from "react";
// import {} from "@tabler/icons-react";
import facultyNavData from "@/Components/faculty/facultyNavData";
import SideNav from "@/Components/SideNav";
import Labs from "@/screens/students/Labs";
import BackNav from "@/Components/BackNav";
import Header from "@/Components/Header";
import { Button, useMantineColorScheme } from "@mantine/core";
import ComingSoon from "../ComingSoon";


export default function Courses() {
  return (
    <>
      <div style={{marginTop : "40px"}}>
        <Header title="Courses 🔥" dec={"These are the original courses officially provides by the platform"} />
        <ComingSoon />
      </div>
    </>
  );
}