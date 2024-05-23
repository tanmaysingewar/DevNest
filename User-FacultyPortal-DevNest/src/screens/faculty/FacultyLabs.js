import Header from "@/Components/Header";
import { Grid } from "@mantine/core";
import LabCard from "@/Components/LabCard";
import cpp from "@/assets/cpp.png"; //https://www.freepik.com/
import python from "@/assets/python.png";
import java from "@/assets/java.png";
import FacultyLabCard from "@/Components/faculty/FacultyLabCard";
import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "@/Components/faculty/Context";
import { fetchDate } from "@/helper/fetchDate";

export default function FacultyLabs() {

  const [data, setData] = useState({
    labs: [],
    success: false,
  });

  const  {visible, setVisible} = useContext(LoaderContext);

  useEffect(() => {
    setVisible(true);
    fetchDate("/faculty/get/labs").then((res) => {
      console.log(res);
      if (!res.success) return setVisible(false);;
      setVisible(false);
      setData({ labs: res.response, success: true });
    });
  }, []);
    return (
        <>
         <div
            style={{ height: "100vh", overflowY: "scroll" }}
          >
            <div style={{marginTop : "50px"}}>
            <Header title={"Assigned Labs 😄"} dec={"These Labs assign to you by the ADMIN, if changes required plz contact the admin"} />
            <Grid style={{ margin: "auto" }}>
              {
                data.labs.map((lab) => (
                  <FacultyLabCard
                key={lab._id}
                lab={lab}
                logo={cpp}
                courseCode={"CPP203"}
                title={"C++"}
                dec={
                  "Basic C++ syntax and introduction to the c++ environment."
                }
                redirectLab={"/faculty/labs?lab=cpp"}
                // redirectTest={"/faculty/test/CPP203/"}
                redirectAnalysis={"/faculty/labs?lab=cpp&&analysis=true"}
                BG_color={"#0368FF"}
                progress={40}
              />
                ))
              }
              
            </Grid>
          </div>
          </div>
        </>
    );
}