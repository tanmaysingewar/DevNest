import Header from "@/Components/Header";
import { Grid } from "@mantine/core";
import LabCard from "@/Components/LabCard";
import cpp from "@/assets/cpp.png"; //https://www.freepik.com/
import python from "@/assets/python.png";
import java from "@/assets/java.png";

import { useContext, useEffect, useState } from "react";
import { LoaderContext } from "@/Components/faculty/Context";
import { fetchDate, postDate } from "@/helper/fetchDate";
import { isAuthenticated } from "@/helper/auth";

export default function Labs() {
  const [data, setData] = useState({
    labs: [],
    success: false,
  });

  const [values, setValues] = useState({
    // branch, sem, section, year
    section: "",
    branch: "",
    year: "",
    sem: "",
  });

  const [noOfPracticals, setNoOfPracticals] = useState("NaN");
  const [noOfStudents, setNoOfStudents] = useState("NaN");

  const [deletePopUp, setDeletePopUp] = useState(false);

  const [loadDeleteBUtton, setLoadDeleteBUtton] = useState(false);

  const { visible, setVisible } = useContext(LoaderContext);

  useEffect(() => {
    const data = isAuthenticated().student;
    console.log(data, "data", data.section, data.branch, data.year, data.sem);
    setVisible(true);
    postDate("/student/labs", {
      section: data.section,
      branch: data.branch,
      year: data.year,
      sem: data.sem,
    }).then((res) => {
      console.log(res);
      if (!res.success) return setVisible(false);
      setVisible(false);
      setData({ labs: res.response, success: true });
    });
  }, []);

  return (
    <>
      <div style={{ height: "100vh", overflowY: "scroll" }}>
        <div style={{ marginTop: "50px" }}>
          <Header
            title={"Assigned Labs 😄"}
            dec={
              "These Labs assign to you by the ADMIN, if changes required plz contact the admin"
            }
          />
          <Grid style={{ margin: "auto" }}>
            {data.labs.map((lab) => (
              <LabCard
                key={1}
                logo={cpp}
                lab={lab}
                courseCode={"CPP203"}
                title={"C++"}
                dec={
                  "Basic C++ syntax and introduction to the c++ environment."
                }
                redirectLab={"/student/labs?lab=cpp"}
                // redirectTest={"/faculty/test/CPP203/"}
                BG_color={"#0368FF"}
                progress={40}
              />
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}
