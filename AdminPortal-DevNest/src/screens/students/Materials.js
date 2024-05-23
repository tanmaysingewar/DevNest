import React, { useState } from "react";
import Header from "@/Components/Header";
import ComingSoon from "../ComingSoon";

export default function Materials() {
  return (
    <>
      <div style={{marginTop : "40px"}}>
        <Header title="Material 📚" dec={"These are the original materia officially provides by the platform"} />
        <ComingSoon />
      </div>
    </>
  );
}