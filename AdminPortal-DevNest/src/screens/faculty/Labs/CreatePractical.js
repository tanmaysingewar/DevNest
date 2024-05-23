import React, { useState } from "react";
import BackNav from "@/Components/BackNav";
import Header from "@/Components/Header";
import { Button, useMantineColorScheme,Input,Textarea } from "@mantine/core";
import { useRouter } from "next/router";


export default function CreatePractical() {
    const router = useRouter()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <>
      <div style={{marginTop : "40px",padding : '20px',}}>
      <BackNav
          dataTrack={[
            { title: "Lab",href : "/faculty/labs" },
            { title: "Practicals" ,href : `/faculty/labs?lab=${router.query.lab}`},
            { title: "Create Practical" ,href : `/faculty/labs?lab=${router.query.lab}&create=${router.query.create}`},
          ]}
        />
        <Header title="Create Practical" dec={"Setting of the this portal reflected all over the platform"} />

         <Input.Wrapper
                id="fName"
                withAsterisk
                label="Practical Name"
                error="Please Enter Contact No"
                // style={{ marginLeft: "20px" }}
              >
                <Input
                  type="number"
                  label="Faculty Name"
                  placeholder="Enter Practical Name"
                  style={{ width: "350px" }}
                />
              </Input.Wrapper>
              <div style={{ marginTop: "20px" }}>
              <Textarea
                placeholder="Description"
                label="Enter Description"
                withAsterisk
              />
            </div>
      </div>
    </>
  );
}