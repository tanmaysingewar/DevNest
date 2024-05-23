import React, { useState,useEffect } from "react";
// import {} from "@tabler/icons-react";
import facultyNavData from "@/Components/faculty/facultyNavData";
import SideNav from "@/Components/SideNav";
import Labs from "@/screens/students/Labs";

import { useRouter } from 'next/router'

import { createContext, useContext } from 'react';
import { LoaderContext, NavSelect } from "@/Components/faculty/Context";
import Profile from "@/screens/students/Profile/StudentProfile";
import ComingSoon from "@/screens/ComingSoon";
import studentNavData from "@/Components/user/studentNavData";

import Setting from "@/screens/students/Setting";
import Practical from "@/screens/students/Practicals";
import Courses from "@/screens/students/Courses";
import Materials from "@/screens/students/Materials";
import Tools from "@/screens/students/Tools";
import EditStudentsProfile from "@/screens/students/Profile/EditProfileStudents";
import { LoadingOverlay } from "@mantine/core";

export default function landingPage() {
    const router = useRouter()
    const [navIndex, setNavIndex] = useState(10);

    const [visible, setVisible] = useState(false);

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
      else if(router.query.tab === "profile"){
        setNavIndex(5)
      }
    }, [router.query])


  return (
    <>
    <NavSelect.Provider value={{navIndex, setNavIndex}}>
    <LoaderContext.Provider value={{visible, setVisible}}>
      <div style={{}}>
      <LoadingOverlay visible={visible} overlayBlur={2} />
        <div style={{ display: "flex" }}>
          <div style={{ margin: "50px", marginTop: "50px" }}>
            <SideNav NavData={studentNavData} />
          </div>
          { 
            router.query.tab === "labs" && router.query.lab?( <Practical /> ) : 
            router.query.tab === "labs" ? <Labs/> :

            router.query.tab === "courses" ? <Courses />:
            router.query.tab === "materials" ? <Materials />:
            router.query.tab === "tools" ? <Tools />:
            router.query.tab === "settings" ? <Setting />:
            router.query.tab === "profile" && router.query.edit ?   (<EditStudentsProfile />) :
            router.query.tab === "profile" ? (<Profile />) :
            (<></>)
          }
          {/* {
            navIndex === 0 ? <Labs /> : navIndex === 1 ? <ComingSoon/> : navIndex === 4 ? <Setting /> :  navIndex === 6 ? <Profile /> : <Practical />
          }
           */}
          {/*  */}
          {/*  */}
          
        </div>
      </div>
      </LoaderContext.Provider>
      </NavSelect.Provider>
    </>
  );
}