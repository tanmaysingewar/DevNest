import React, { useState } from "react";
import {Title} from "@mantine/core";
import comingSoonImg from "@/assets/comingSoon.png"; //https://www.freepik.com/
import Image from "next/image";

export default function ComingSoon() {
  return (
    <>
      <div style={{margin : "auto", width : "100%"}}>
      <Image style={{margin : 'auto'}} src={comingSoonImg} alt="Norway" height={200} />
        {/* <Title size="26" style={{textAlign : "left",marginLeft : "50px"}}>Coming Soon</Title> */}
      </div>
    </>
  );
}