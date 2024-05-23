import { Button, Text, Box, Input, Select, Textarea } from "@mantine/core";
import Router from "next/router";
import { DateInput } from "@mantine/dates";
import Header from "@/Components/Header";
import BackNav from "@/Components/BackNav";

export default function EditFacultyProfile() {
  return (
    <div style={{height : "100vh", overflowY : "scroll",width : "100%"}}>
      <div style={{marginTop : "60px"}}>
       
      <div style={{ marginTop: "40px" }}>
      <BackNav
          dataTrack={[]}
        />
        <Header
          title={`Edit Faculty`}
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
              error="Please enter name"
            >
              <Input
                label="Faculty Name"
                placeholder="Enter Faculty Name"
                style={{ width: "500px" }}
              />
            </Input.Wrapper>
            <div style={{ marginTop: "20px", display: "flex" }}>
              <DateInput
                defaultLevel={"year"}
                mt="md"
                label={"Date of Birth"}
                placeholder="Enter your DOB"
                required
                style={{ width: "240px" }}
                error="Enter date"
              />
               <DateInput
                defaultLevel={"year"}
                mt="md"
                label={"Joining Date"}
                placeholder="Enter your Joining Date"
                required
                style={{ width: "240px", marginLeft : "20px" }}
                error="Enter date"
              />
            </div>

            <div style={{ marginTop: "20px", display: "flex" }}>
              <Input.Wrapper
                id="fEmail"
                withAsterisk
                label="Email Id"
                error="Please Enter Proper Email Id"
              >
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter Proper Email Id"
                  style={{ width: "300px" }}
                />
              </Input.Wrapper>
            </div>
            <div style={{ marginTop: "20px", display: "flex" }}>
              <Input.Wrapper
                id="fName"
                withAsterisk
                label="Guardian Contact No"
                error="Please Enter Contact No"
              >
                <Input
                  type="number"
                  placeholder="Enter Contact No"
                  style={{ width: "200px" }}
                />
              </Input.Wrapper>
              <Input.Wrapper
                id="fName"
                withAsterisk
                label="Faculty Contact No"
                error="Please Enter Contact No"
                style={{ marginLeft: "20px" }}
              >
                <Input
                  type="number"
                  label="Faculty Name"
                  placeholder="Enter Contact No"
                  style={{ width: "200px" }}
                />
              </Input.Wrapper>
            </div>

            <div style={{ marginTop: "20px", display: "flex" }}>
              <Select
                withAsterisk
                label="Department"
                placeholder="Pick one"
                error="Select Department"
                data={[
                  { value: "ctec", label: "CTec" },
                  { value: "entc", label: "ENTC" },
                  { value: "civil", label: "CIVIL" },
                  { value: "it", label: "IT" },
                ]}
              />
              <Select
                style={{ marginLeft: "20px" }}
                withAsterisk
                label="Gender"
                placeholder="Pick one"
                error="Select Gender"
                data={[
                  { value: "m", label: "Male" },
                  { value: "f ", label: "Female" },
                  { value: "o ", label: "Other" },
                ]}
              />
            </div>
            
            <div style={{ marginTop: "20px" }}>
              <Textarea
                placeholder="Address"
                label="Enter the Address"
                withAsterisk
              />
            </div>
          </div>
        </Box>
        <div style={{marginTop: "40px", marginBottom : "60px" }}>
          <Button onClick={() => Router.push("/student/profile")}>
            Conform & Save
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}
