import { Button, Text, Box, Input, Select, Textarea } from "@mantine/core";
import Router from "next/router";
import { DateInput } from "@mantine/dates";
import Header from "@/Components/Header";
import BackNav from "@/Components/BackNav";
import { useContext, useEffect,useState } from "react";
import { fetchDate, updateDate } from "@/helper/fetchDate";
import { LoaderContext } from "@/Components/faculty/Context";
import { validate } from "@/helper/validate";

export default function EditFacultyProfile() {

  const  {visible, setVisible} = useContext(LoaderContext);

  const [values, setValues] = useState({
    _id : "",
    f_id : "",
    name : "",
    email : "",
    address : "",
    department : "",
    dob : "",
    gender : "",
    joining_date : "",
    contact : []
  })

  const [errors, setErrors] = useState({
    f_id : "",
    name : "",
    email : "",
    address : "",
    department : "",
    dob : "",
    gender : "",
    joining_date : "",
    contact : ""
  })

  console.log(values)
  const [loadingButton, setLoadingButton] = useState(false)

  useEffect(() => {
    setVisible(true);
    fetchDate("/faculty/profile").then((res) => {
      if(res.success === false) return;
      setValues({
        _id : res.response._id,
        f_id : res.response.f_id,
        name : res.response.name,
        email : res.response.email,
        address : res.response.address,
        department : res.response.department,
        dob : new Date(res.response.dob),
        gender : res.response.gender,
        joining_date : new Date(res.response.joining_date),
        contact : res.response.contact
      })
      setVisible(false);
    })
    
  }, [])

  const handleChange = (name) => (event) => {
    if(name === "dob" || name === "joining_date"){
      return setValues({ ...values, [name]: event });
    }
    setValues({ ...values, [name]: event?.target?.value });
    // setErrors({ ...errors, [name]: "" });
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
    updateDate(`/faculty/update/faculty?f_id=${Router.query.profile_id}`,values)
    .then((res) => {
      console.log(res)
      if(!res.success)return;
      Router.push('/faculty/profile')
    })
  }

  return (
    <div style={{height : "100vh", overflowY : "scroll",width : "100%"}}>
      <div style={{marginTop : "60px"}}>
       
      <div style={{ marginTop: "40px" }}>
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
              <DateInput
                defaultLevel={"year"}
                mt="md"
                label={"Date of Birth"}
                placeholder="Enter your DOB"
                required
                style={{ width: "240px" }}
                error={errors.dob}
                value={values.dob}
                onChange={handleChange("dob")}
              />
               <DateInput
                defaultLevel={"year"}
                mt="md"
                label={"Joining Date"}
                placeholder="Enter your Joining Date"
                required
                style={{ width: "240px", marginLeft : "20px" }}
                error={errors.joining_date}
                value={values.joining_date}
                onChange={handleChange("joining_date")}
              />
            </div>

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
            </div>
            <div style={{ marginTop: "20px", display: "flex" }}>
              <Input.Wrapper
                id="fName"
                withAsterisk
                label="Contact No 1"
                error={errors.contact}
              >
                <Input
                  type="number"
                  placeholder="Enter Contact No"
                  style={{ width: "200px" }}
                  value={values?.contact[0]}
                  onChange={handleContactChange(0)}
                />
              </Input.Wrapper>
              <Input.Wrapper
                id="fName"
                withAsterisk
                label="Faculty Contact No"
                error={errors.contact}
                style={{ marginLeft: "20px" }}
              >
                <Input
                  type="number"
                  label="Faculty Name"
                  placeholder="Enter Contact No"
                  style={{ width: "200px" }}
                  value={values?.contact[1]}
                  onChange={handleContactChange(1)}
                />
              </Input.Wrapper>
            </div>

            <div style={{ marginTop: "20px", display: "flex" }}>
              <Select
                withAsterisk
                label="Department"
                placeholder="Pick one"
                error={errors.department}
                value={values.department}
                data={[
                  { value: "CTec", label: "CTec" },
                  { value: "ENTC", label: "ENTC" },
                  { value: "CIVIL", label: "CIVIL" },
                  { value: "IT", label: "IT" },
                ]}
                onChange={handleSelectChange("department")}
              />
              <Select
                style={{ marginLeft: "20px" }}
                withAsterisk
                label="Gender"
                placeholder="Pick one"
                error={errors.gender}
                value={values.gender}
                data={[
                  { value: "Male", label: "Male" },
                  { value: "Female ", label: "Female" },
                  { value: "Other ", label: "Other" },
                ]}
                onChange={handleSelectChange("gender")}
              />
            </div>
            
            <div style={{ marginTop: "20px" }}>
              <Textarea
                placeholder="Address"
                label="Enter the Address"
                withAsterisk
                value={values.address}
                error={errors.address}
                onChange={handleChange("address")}
              />
            </div>
          </div>
        </Box>
        <div style={{  marginTop: "40px", marginBottom : "60px" }}>
          <Button loading={loadingButton} onClick={() => onClickUpdate()}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}
