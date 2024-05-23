import Header from "@/Components/Header";
import { Button, Grid, LoadingOverlay, Box,Overlay, Loader } from "@mantine/core";
import cpp from "@/assets/cpp.png"; //https://www.freepik.com/
import python from "@/assets/python.png";
import java from "@/assets/java.png";
import FacultyLabCard from "@/Components/admin/FacultyLabCard";
import Router from "next/router";
import { fetchDate, postDate } from "@/helper/fetchDate";
import { useState, useEffect, useContext } from "react";
import { LoaderContext } from "@/Components/admin/Context";

export default function FacultyLabs() {
  const [data, setData] = useState({
    labs: [],
    success: false,
  });

  const  {visible, setVisible} = useContext(LoaderContext);

  useEffect(() => {
    setVisible(true);
    fetchDate("/all/labs").then((res) => {
      console.log(res);
      if (!res.success) return setVisible(false);;
      setVisible(false);
      setData({ labs: res.response, success: true });
    });
  }, []);

  return (
    <>
      <div style={{ height: "100vh", width: "100%", overflowY: "scroll" }}>
        <div style={{ marginTop: "40px" }}>
          <div
            style={{
              display: "flex",
              width: "90%",
              justifyContent: "space-between",
            }}
          >
            <Header
              title={"Assigned Labs 😄"}
              dec={
                "These Labs assign to you by the ADMIN, if changes required plz contact the admin"
              }
            />
            <Button
              style={{ marginTop: "40px" }}
              onClick={() => Router.push("/admin/labs?create=lab")}
            >
              Create Lab
            </Button>
          </div>

          <Grid style={{ margin: "auto" }}>

            {data.labs.map((lab, index) => {
              return (
                <FacultyLabCard
                  lab={lab}
                  key={index}
                  logo={java}
                  courseCode={"JV232"}
                  title={"Java"}
                  dec={
                    "Introductory course to Java with DSA practice problems "
                  }
                  redirectLab={"/admin/labs?edit=JV232"}
                  redirectAnalysis={"/admin/labs?lab=java&&analysis=true"}
                  BG_color={"#CF75FF"}
                  progress={20}
                />
              );
            })}
          </Grid>
        </div>
      </div>
    </>
  );
}
