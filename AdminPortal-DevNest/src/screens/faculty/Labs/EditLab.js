import { Button, Text, Box, Input, Select, Textarea } from "@mantine/core";
import Router from "next/router";
import { DateInput } from "@mantine/dates";
import Header from "@/Components/Header";
import BackNav from "@/Components/BackNav";
import { useContext, useEffect, useMemo, useState } from "react";
import { fetchDate, postDate, updateDate } from "@/helper/fetchDate";
import { validate } from "@/helper/validate";
import { isAuthenticated } from "@/helper/auth";
import { LoaderContext } from "@/Components/admin/Context";


export default function CreateLab() {
  const  {visible, setVisible} = useContext(LoaderContext);

  useEffect(() => {
    setVisible(true);
    fetchDate(`/get/lab?l_id=${Router.query.edit}`).then((res) => {
      if(!res.success) return;
      setValue({
        name : res.response.name,
        id : res.response.l_id,
        description : res.response.dec,
        year : res.response.year,
        branch : res.response.branch,
        semester : res.response.sem,
        section : res.response.section,
        faculty : res.response.faculties[0]._id,
        faculty_name : res.response.faculties[0].name,
      })
      setSearchFaculty(res.response.faculties[0].name)
      setVisible(false);
    })
   
  }, [])
  

  const [loadingButton, setLoadingButton] = useState(false)

  

  const auth = isAuthenticated()

  const [value, setValue] = useState({
    name : "",
    id : "",
    description : "",
    year : "",
    branch : "",
    semester : "",
    section : "",
    faculty : "",
    collage_code : auth?.admin.collage_code,
    faculty_name : ""
  })

  const [searchFaculty, setSearchFaculty] = useState("")

  // console.log(value)

  const [errors, setErrors] = useState({
    name : "",
    id : "",
    description : "",
    year : "",
    branch : "",
    semester : "",
    section : "",
    faculty : "",
  })

  const [mainError, setMainError] = useState("")

const [facultySearchRes, setFacultySearchRes] = useState([])


  const handleChange = (name) => (event) => {
    setValue({...value, [name] : event?.target?.value})
    setErrors({...errors, [name] : ""})
  }

  const handleSelectChange = (name) => (event) => {
    setValue({...value, [name] : event})
    setErrors({...errors, [name] : ""})
  }

  const handleSearchChange = (name) => (event) => {
    setSearchFaculty(event?.target?.value)
  }


  const onClickCreate = () => {
    setLoadingButton(true)
    if(validate(value,setErrors)) return setLoadingButton(false);

    updateDate(`/update/lab?l_id=${Router.query.edit}`,value).then((res) => {
      setLoadingButton(false)
      if(!res.success) return setMainError("Error : Something went wrong please try again later");
      console.log(res.response)
      Router.push("/admin/labs")
    }
    );
  }

  const onClickSearch = async () => {

    if(!searchFaculty) return setFacultySearchRes([])

    await fetchDate(`/get/faculty?search=${searchFaculty}&limit=10&skip=0`)
    .then((res) => {
      if(!res.success) return ;
      console.log(res.response)
      setFacultySearchRes(res?.response)
    }
    );
  }

  return (
    <div style={{ height: "100vh", overflowY: "scroll", width: "100%" }}>
      <div style={{ marginTop: "60px" }}>
        <BackNav dataTrack={[]} />
        <Header title={`Edit Lab`} />
      </div>
      <div style={{ width: "100%" }}>
        <Box padding="xl" style={{ width: "650px" }}>
          <div>
            <Text style={{marginBottom : "10px", fontSize : "15px"}}><b>Lab ID :</b> {value.id}</Text>
            <Input.Wrapper
              id="fName"
              withAsterisk
              label="Name of the Lab"
              error={errors.name}
            >
              <Input
                value={value.name}
                placeholder="Enter Lab Name"
                style={{ width: "500px" }}
                onChange={handleChange("name")}
              />
            </Input.Wrapper>
            <div style={{ marginTop: "20px" }}>
              <Textarea
                value={value.description}
                placeholder="Description of the Lab"
                label="Description"
                withAsterisk
                error={errors.description}
                onChange={handleChange("description")}
              />
            </div>
            <div style={{ marginTop: "20px", display: "flex" }}>
              <Select
                style={{ width: "200px" }}
                withAsterisk
                value={value.year}
                label="Academic Year"
                placeholder="Pick one"
                error={errors.year}
                onChange={handleSelectChange("year")}
                data={[
                  { value: "I", label: "I" },
                  { value: "II", label: "II" },
                  { value: "III", label: "III" },
                  { value: "IV", label: "IV" },
                ]}
              />
              <Select
                style={{ width: "200px", marginLeft: "20px" }}
                withAsterisk
                value={value.branch}
                label="Branch"
                placeholder="Pick one"
                error={errors.branch}
                onChange={handleSelectChange("branch")}
                data={[
                  { value: "CTec", label: "CTec" },
                  { value: "AIDS", label: "AIDS" },
                  { value: "CSE", label: "CSE" },
                  { value: "ECE", label: "ECE" },
                  { value: "EEE", label: "EEE" },
                ]}
              />
            </div>
            <div style={{ marginTop: "20px", display: "flex" }}>
              <Select
                withAsterisk
                value={value.semester}
                label="Semester"
                placeholder="Pick one"
                error={errors.semester}
                onChange={handleSelectChange("semester")}
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
              />
              <Select
                style={{ marginLeft: "20px" }}
                withAsterisk
                value={value.section}
                label="Section"
                placeholder="Pick one"
                error={errors.section}
                onChange={handleSelectChange("section")}
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
              />
            </div>
            <div style={{ marginTop: "20px", display: "flex" }}>
              <Input value={searchFaculty} style={{ width: "200px" }} label="Faculty One" placeholder="Search Faculty" onChange={handleSearchChange()} error={errors.faculty} />
              <Button style={{marginLeft : "10px"}} onClick={() => onClickSearch()}>Search</Button>
            </div>
            <div>
                {
                  facultySearchRes.map((faculty,index) => {
                    return (
                      <div key={index} style={{display : "flex",justifyContent : "space-between",marginTop : "10px",width : "400px"}}>
                        <Text style={{margin : "auto 0 auto 0"}}>{index + 1}{". "}{faculty.name}</Text>
                        <Button size="xs" style={{backgroundColor : "#0368FF"}} onClick={() => setValue({...value, "faculty" : faculty._id})}>Add</Button>
                      </div>
                    )
                  }
                  )
                }
            </div>
          </div>
        </Box>
        <div style={{ marginTop: "40px", marginBottom: "60px" }}>
        <Text style={{fontSize : "14px",color : "#e03130",marginTop : "10px",marginBottom : "10px"}}>{mainError}</Text>
          <Button loading={loadingButton} onClick={() => onClickCreate() }>
            Conform & Save
          </Button>
          
        </div>
      </div>
    </div>
  );
}
