import React, { useState,useEffect } from "react";
// import {} from "@tabler/icons-react";
import facultyNavData from "@/Components/faculty/facultyNavData";
import SideNav from "@/Components/SideNav";

import { useRouter } from 'next/router'

import { LoaderContext, NavSelect } from "@/Components/faculty/Context";

import Setting from "@/screens/students/Setting";
import Courses from "@/screens/students/Courses";
import Materials from "@/screens/students/Materials";
import Tools from "@/screens/students/Tools";
import FacultyLabs from "@/screens/faculty/FacultyLabs";
import FacultyPractical from "@/screens/faculty/Practicals";
import FacultyProfile from "@/screens/faculty/Profile/FacultyProfile";
import EditFacultyProfile from "@/screens/faculty/Profile/EditProfileFaculty";
import StudentsDetails from "@/screens/faculty/StudentDetails";
import CreatePractical from "@/screens/faculty/Labs/CreatePractical";
import AddProblem from "@/screens/faculty/Labs/AddProblem";
import EditProblem from "@/screens/faculty/Labs/EditProblem";
import EditPractical from "@/screens/faculty/Labs/EditPractical";
import LabAnalysis from "@/screens/faculty/LabAnalysis";

import { LoadingOverlay } from "@mantine/core";


export default function landingPage() {
    const router = useRouter()
    const [navIndex, setNavIndex] = useState(10);
    const [checkToken, setCheckToken] = useState(false)

    const [visible, setVisible] = useState(false);

    useEffect(() => {
      if(!localStorage.getItem("faculty_auth")){
        router.push("/auth/facultyLogin")
        setCheckToken(false)
        console.log(localStorage.getItem("faculty_auth"))
      }else{
        setCheckToken(true)
      }
    }, [])

    useEffect(() => {
      if(router.query.tab === "labs"){
        setNavIndex(0)
      }
      else if(router.query.tab === "courses"){
        setNavIndex(1)
      }
      else if(router.query.tab === "materials"){
        setNavIndex(2)
      }
      else if(router.query.tab === "tools"){
        setNavIndex(3)
      }
      else if(router.query.tab === "settings"){
        setNavIndex(4)
      }
      else if(router.query.tab === "studentsDetails"){
        setNavIndex(5)
      }
      else if(router.query.tab === "profile"){
        setNavIndex(6)
      }
    }, [router.query])

    if(!checkToken){
      return <></>
    }


  return (
    <>
    <NavSelect.Provider value={{navIndex, setNavIndex}}>
    <LoaderContext.Provider value={{visible, setVisible}}>
      <div style={{}}>
      <LoadingOverlay visible={visible} overlayBlur={2} />
        <div style={{ display: "flex" }}>
          <div style={{ margin: "50px", marginTop: "50px" }}>
            <SideNav NavData={facultyNavData} />
          </div>
          { 
            //Labs Tab
            router.query.tab === "labs" && router.query.lab && router.query.edit === "problem" && router.query.problem ?( <EditProblem /> ) : 
            router.query.tab === "labs" && router.query.lab && router.query.edit === "practical" && router.query.practical ?( <EditPractical /> ) : 
            router.query.tab === "labs" && router.query.lab && router.query.create === "practical" ?( <CreatePractical /> ) : 
            router.query.tab === "labs" && router.query.lab && router.query.create === "problem" ?( <AddProblem /> ) : 
            router.query.tab === "labs" && router.query.lab && router.query.analysis ?( <LabAnalysis /> ) : 
            router.query.tab === "labs" && router.query.lab?( <FacultyPractical /> ) : 
            router.query.tab === "labs" ? <FacultyLabs/> :
            
            //Other Tabs 
            router.query.tab === "courses" ? <Courses />:
            router.query.tab === "materials" ? <Materials />:
            router.query.tab === "tools" ? <Tools />:
            router.query.tab === "settings" ? <Setting />:
            router.query.tab === "studentsDetails" ? <StudentsDetails />:
            router.query.tab === "profile" && router.query.edit ? (<EditFacultyProfile />) :
            router.query.tab === "profile" ? (<FacultyProfile />) :
            (<></>)
          }
        </div>
      </div>
      </LoaderContext.Provider>
      </NavSelect.Provider>
    </>
  );
}