import React, { useState } from "react";
import BackNav from "@/Components/BackNav";
import Header from "@/Components/Header";
import { Button, useMantineColorScheme,Input,Textarea,Text } from "@mantine/core";
import { Router, useRouter } from "next/router";
import { validate } from "@/helper/validate";
import { postDate } from "@/helper/fetchDate";


export default function CreatePractical() {
    const router = useRouter()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const [value, setValue] = useState({
      name: "",
      dec : "",
      lab_id : router.query.lab,
    });
  
    console.log(value);
  
    const [errors, setErrors] = useState({
      name: "",
      dec : "",
      allOk: false,
    });
  
    const [loading, setLoading] = useState(false);
  
    const [loadingButton, setLoadingButton] = useState(false);
  
    const [mainError, setMainError] = useState("");
  
    const handleChange = (name) => (event) => {
      setValue({ ...value, [name]: event?.target?.value });
      setErrors({ ...errors, [name]: "" });
    };
  
    const onClickCreate = () => {
      setLoadingButton(true);
      if (validate(value, setErrors)) return setLoadingButton(false);
  
      postDate("/faculty/create/practical", value).then((res) => {
        setLoadingButton(false)
        console.log(res)
        if (!res.success || !res) return setMainError(res?.message || "Something went wrong");
        router.push(`/faculty/labs?lab=${router.query.lab}`)
      });
    };
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
                error={errors.name}
                // style={{ marginLeft: "20px" }}
              >
                <Input
                  label="Faculty Name"
                  placeholder="Enter Practical Name"
                  style={{ width: "350px" }}
                  value={value.name}
                  onChange={handleChange("name")}
                  
                />
              </Input.Wrapper>
              <div style={{ marginTop: "20px" }}>
              <Textarea
                placeholder="Description"
                label="Enter Description"
                value={value.dec}
                onChange={handleChange("dec")}
                error={errors.dec}
                withAsterisk
              />
            </div>
            <Text style={{fontSize : "14px",color : "#e03130",marginTop : "10px"}}>{mainError}</Text>
            <Button style={{backgroundColor: "#0368FF",marginTop : "10px"}} onClick={() => onClickCreate()} loading={loadingButton} >Create Practical</Button>
      </div>
    </>
  );
}