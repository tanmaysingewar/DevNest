import React, { useState } from "react";
// import {} from "@tabler/icons-react";
import Header from "@/Components/Header";
import { Button, useMantineColorScheme } from "@mantine/core";


export default function Setting() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <>
      <div style={{marginTop : "40px"}}>
        <Header title="Settings" dec={"Setting of the this portal reflected all over the platform"} />
        <Button onClick={() => toggleColorScheme()}>Toggle color scheme</Button>
      </div>
    </>
  );
}