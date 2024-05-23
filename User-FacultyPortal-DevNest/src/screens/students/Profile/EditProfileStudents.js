import { Button, Text, Box, Input, Select, Textarea } from "@mantine/core";
import Router from "next/router";
import { DateInput } from "@mantine/dates";
import Header from "@/Components/Header";
import BackNav from "@/Components/BackNav";
import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "@/Components/faculty/Context";
import { fetchDate, updateDate } from "@/helper/fetchDate";
import { validate } from "@/helper/validate";

export default function EditStudentsProfile() {
  const  {visible, setVisible} = useContext(LoaderContext);

  const [loadingButton, setLoadingButton] = useState(false)


  const [values, setValues] = useState({
    _id : "",
    name : "",
    email : "",
    collage_code : "",
    address : "",
    dob : "",
    gender : "",
    contact : ["",""],
    currentYear : "",
    currentSem : "",
    branch : "",
    section : "",
    rollNo : "",
    regNo : ""
  
  })

  const [errors, setErrors] = useState({
    _id : "",
    name : "",
    email : "",
    collage_code : "",
    address : "",
    dob : "",
    gender : "",
    contact : ["",""],
    currentYear : "",
    currentSem : "",
    branch : "",
    section : "",
    rollNo : "",
    regNo : ""
  
  })
  
  
  console.log(values)
  
  useEffect(() => {
    setVisible(true);
    fetchDate("/student/profile").then((res) => {
      console.log(res);
      if(res.success === false) return setVisible(false);
      setValues({
        _id : res.response._id,
        name : res.response.name,
        email : res.response.email,
        collage_code : res.response.collage_code,
        address : res.response.address,
        dob : new Date(res.response.dob),
        gender : res.response.gender,
        contact : res.response.contact,
        currentYear : res.response.currentYear,
        currentSem : res.response.currentSem,
        branch : res.response.branch,
        section : res.response.section,
        rollNo : res.response.rollNo,
        regNo : res.response.regNo
      })
      setVisible(false);
    })
    
  }, [])

  const handleChange = (name) => (event) => {
    if(name === "dob" || name === "joining_date"){
      return setValues({ ...values, [name]: event });
    }
    setValues({ ...values, [name]: event?.target?.value });
    setErrors({ ...errors, [name]: "" });
  };

  // handle contact update
  const handleContactChange = (name) => (event) => {
    // contact is array
    const contact = values.contact;
    contact[name] = event.target.value;
    setValues({ ...values, contact: contact })
  }

  const handleSelectChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event });
    setErrors({ ...errors, [prop]: "" });
  }

  const onClickUpdate = () => {
    setLoadingButton(true);
    if (validate(values, setErrors)) return setLoadingButton(false);
    updateDate(`/student/update/profile`,values)
    .then((res) => {
      console.log(res)
      if(!res.success)return;
      Router.push("/student/profile")
    })
  }

  return (
    <div style={{height : "100vh", overflowY : "scroll",width : "100%"}}>
      <div style={{ marginTop: "60px" }}>
      <BackNav
          dataTrack={[]}
        />
        <Header
          title={`Edit Profile`}
        />
        <Text style={{fontSize: "14px" }}>
          F_ID : 3245
        </Text>
      </div>
      <div style={{width : "100%"}}>
        <Box padding="xl" style={{width : "650px"}}>
          <div>
            <Input.Wrapper
              id="fName"
              withAsterisk
              label="Name of the Students"
              description="Please enter proper name of faculty this will reflect all over the platform"
              error={errors.name}
            >
              <Input
                label="Faculty Name"
                placeholder="Enter Faculty Name"
                style={{ width: "500px" }}
                value={values.name}
                onChange={handleChange("name")}
              />
            </Input.Wrapper>
            <div style={{ marginTop: "20px", display: "flex" }}>
              <Input.Wrapper
                id="fEmail"
                withAsterisk
                label="Email Id"
                error={errors.email}
              >
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter Proper Email Id"
                  style={{ width: "300px" }}
                  value={values.email}
                  onChange={handleChange("email")}
                />
              </Input.Wrapper>
              <Input.Wrapper
                id="fEmail"
                withAsterisk
                label="Collage Code"
                error={errors.collage_code}
                style={{marginLeft : "10px"}}
              >
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter Proper Email Id"
                  style={{ width: "300px"}}
                  value={values.collage_code}
                  onChange={handleChange("collage_code")}
                />
              </Input.Wrapper>
            </div>
            <div style={{  display: "flex" }}>
              <DateInput
                defaultLevel={"year"}
                mt="md"
                label={"Date of Birth"}
                placeholder="Enter your DOB"
                required
                style={{ width: "205px" }}
                error={errors.dob}
                value={values.dob}
                onChange={handleChange("dob")}
              />
              <Select
                style={{ marginLeft: "20px",marginTop : "16px" }}
                withAsterisk
                label="Gender"
                placeholder="Pick one"
                error={errors.gender}
                value={values.gender}
                onChange={handleSelectChange("gender")}
                data={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other ", label: "Other" },
                ]}
              />
            </div>


            <div style={{ marginTop: "20px", display: "flex" }}>
              <Select
                withAsterisk
                label="Branch"
                placeholder="Pick one"
                error={errors.branch}
                value={values.branch}
                onChange={handleSelectChange("branch")}
                data={[
                  { value: "CTec", label: "CTec" },
                  { value: "ENTC", label: "ENTC" },
                  { value: "CIVIL", label: "CIVIL" },
                  { value: "IT", label: "IT" },
                  { value: "MECH", label: "MECH" },
                  { value: "ELECT", label: "ELECT" },
                  {value : "AIDS", label : "AIDS"}
                ]}
              />
              
              <Select
                style={{ marginLeft: "20px" }}
                withAsterisk
                label="Current Year"
                placeholder="Pick one"
                error={errors.currentYear}
                value={values.currentYear}
                onChange={handleSelectChange("currentYear")}
                data={[
                  { value: "I", label: "I" },
                  { value: "II ", label: "II" },
                  { value: "III", label: "III" },
                  { value: "IV", label: "IV" },
                ]}
              />
              <Input.Wrapper
                id="fName"
                withAsterisk
                label="Reg No."
                error={errors.regNo}
                style={{ marginLeft: "20px" }}
              >
                <Input
                  type="number"
                  label="Faculty Name"
                  placeholder="Enter Reg No"
                  style={{ width: "200px" }}
                  value={values.regNo}
                  onChange={handleChange("regNo")}
                />
              </Input.Wrapper>
            </div>
            <div style={{ marginTop: "20px", display: "flex" }}>
              <Select
                withAsterisk
                label="Current Semester"
                placeholder="Pick one"
                error={errors.currentSem}
                data={[
                  { value: "I", label: "I" },
                  { value: "II", label: "II" },
                  { value: "III", label: "III" },
                  { value: "IV", label: "IV" },
                  { value: "V", label: "V" },
                  { value: "VI", label: "VI" },
                  { value: "VII", label: "VII" },
                  { value: "VIII", label: "VIII" },
                ]}
                value={values.currentSem}
                onChange={handleSelectChange("currentSem")}
              />
              <Select
                withAsterisk
                label="Section"
                placeholder="Pick one"
                error={errors.section}
                style={{ marginLeft: "20px" }}
                data={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" },
                  { value: "E", label: "E" },
                  { value: "F", label: "F" },
                  { value: "G", label: "G" },
                  { value: "H", label: "H" },
                ]}
                value={values.section}
                onChange={handleSelectChange("section")}
              />
              <Input.Wrapper
                id="fName"
                withAsterisk
                label="Class Roll No."
                error={errors.rollNo}
                style={{ marginLeft: "20px" }}
              >
                <Input
                  type="number"
                  label="Faculty Name"
                  placeholder="Enter Contact No"
                  style={{ width: "200px" }}
                  value={values.rollNo}
                  onChange={handleChange("rollNo")}
                />
              </Input.Wrapper>
              
            </div>

            <div style={{ marginTop: "20px", display: "flex" }}>
              <Input.Wrapper
                id="fName"
                withAsterisk
                label="Student Contact No"
                error={errors.contact}
              >
                <Input
                  type="number"
                  label="Faculty Name"
                  placeholder="Enter Contact No"
                  style={{ width: "200px" }}
                  value={values.contact[0]}
                  onChange={handleContactChange(0)}
                />
              </Input.Wrapper>
              <Input.Wrapper
                id="fName"
                withAsterisk
                label="Parents Contact No"
                error={errors.contact}
                style={{ marginLeft: "20px" }}
              >
                <Input
                  type="number"
                  label="Faculty Name"
                  placeholder="Enter Contact No"
                  style={{ width: "200px" }}
                  value={values.contact[1]}
                  onChange={handleContactChange(1)}
                />
              </Input.Wrapper>
            </div>
            
            <div style={{ marginTop: "20px" }}>
              <Textarea
                placeholder="Address"
                label="Enter the Address"
                withAsterisk
                error={errors.address}
                value={values.address}
                onChange={handleChange("address")}
              />
            </div>
          </div>
        </Box>
        <div style={{ textAlign: "center", marginTop: "40px", marginBottom : "60px" }}>
          <Button onClick={() => onClickUpdate() } loading={loadingButton}>
            Conform & Save
          </Button>
        </div>
      </div>
    </div>
  );
}
