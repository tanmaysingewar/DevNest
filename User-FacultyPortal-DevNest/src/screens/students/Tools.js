import React, { useState } from "react";
import Header from "@/Components/Header";
import ComingSoon from "../ComingSoon";


export default function Tools() {
  return (
    <>
      <div style={{marginTop : "40px"}}>
        <Header title="Tools ⚒️" dec={"These are the original tools officially provides by the platform"} />
        <ComingSoon />
      </div>
    </>
  );
}