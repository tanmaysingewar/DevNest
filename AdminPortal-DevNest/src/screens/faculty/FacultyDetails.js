import React, { useContext, useEffect, useState } from "react";
// import {} from "@tabler/icons-react";
import Header from "@/Components/Header";
import {
  Button,
  Input,
  Select,
  Text,
  Badge,
  Modal,
  ScrollArea,
  Avatar,
  Box,
  ActionIcon,
  Group,
} from "@mantine/core";
import { IconMailFilled, IconPhoneCall } from "@tabler/icons-react";
import Router from "next/router";
import { fetchDate } from "@/helper/fetchDate";
import { LoaderContext } from "@/Components/admin/Context";


export default function FacultyDetails() {
  const [openModel, setOpenModel] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);

  const  {visible, setVisible} = useContext(LoaderContext);


  const [mainError, setMainError] = useState("");


  const [facultyArray, setFacultyArray] = useState([])

  useEffect(() => {
    setVisible(true);
    fetchDate("/all/faculty").then((res) => {
      console.log(res);
      setVisible(false);
      if (!res.success) return setMainError(res?.error || "Something went wrong");
      setFacultyArray(res.response)
    }
    )
  }, [])
  

  return (
    <>
      
      <div style={{ overflowY: "scroll", height: "100vh", width: "100%" }}>
        <div style={{ marginTop: "50px", width: "95%" }}>
          <Header
            title="Faculty Details"
            dec={"Setting of the this portal reflected all over the platform"}
          />
          <div style={{ width: "100%", display: "flex" }}>
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <Input
                placeholder="Search by Student Name, Reg No & Phone No"
                style={{
                  width: "500px",
                  marginRight: "10px",
                }}
              />
              <Button style={{ marginRight: "10px" }} radius={"md"}>Search</Button>
              <Button
            style={{
              backgroundColor: "#fff",
              color: "#000",
            }}
            radius={"md"}
            onClick={() => Router.push("/admin/profile?create=true")}
            loading={false}
            loaderProps={{ color: "#0368FF" }}
          >
            Create Faculty
          </Button>
            </div>
          </div>
          <div>
            <SingleStudentsAnalysis openModel={openModel} setOpenModel={setOpenModel} facultyArray={facultyArray} />
          </div>
          <div
            style={{
              margin: "auto",
              textAlign: "center",
              width: "100%",
              margin: "20px",
            }}
          >
            <Button style={{ margin: "auto", textAlign: "center" }}>
              Load More
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

const SingleStudentsAnalysis = ({ setOpenModel,facultyArray,openModel }) => {
  return (
    <>
      <table
        style={{
          borderCollapse: "separate",
          width: "100%",
          borderSpacing: "0 10px",
        }}
      >
        <tr style={{ textAlign: "center", padding: "20px" }}>
          <th>
            <Text
              style={{
                fontWeight: "800",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              Faculty Name
            </Text>
          </th>
          <th>
            <Text
              style={{
                fontWeight: "800",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              Faculty Id
            </Text>
          </th>
          <th>
            <Text
              style={{
                fontWeight: "800",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              Department
            </Text>
          </th>
          <th>
            <Text
              style={{
                fontWeight: "800",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              Email
            </Text>
          </th>
          <th>
            <Text
              style={{
                fontWeight: "800",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              Gender
            </Text>
          </th>
          <th>
            <Text
              style={{
                fontWeight: "800",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              More
            </Text>
          </th>
        </tr>

        {facultyArray.map((item, index) => {
          return (
            <>
            <Modal
        opened={openModel}
        onClose={() => setOpenModel(false)}
        centered
        withCloseButton={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <MoreDetails item={item}  />
      </Modal>
            <tr
              style={{
                textAlign: "center",
                backgroundColor: "#25262B",
              }}
            >
              <td style={{ padding: "10px" }}>
                <Text style={{ fontWeight: "500", fontSize: "15px" }}>
                  {item.name}
                </Text>
              </td>
              <td style={{ padding: "10px" }}>
                <Text style={{ fontWeight: "500", fontSize: "15px" }}>
                  {item.f_id}
                </Text>
              </td>
              <td style={{ padding: "10px" }}>
                <Text style={{ fontWeight: "500", fontSize: "15px" }}>{item.department || "Not Updated"}</Text>
              </td>
              <td style={{ padding: "10px" }}>
                <Text style={{ fontWeight: "500", fontSize: "15px" }}>
                  {item.email}
                </Text>
              </td>
              <td style={{ padding: "10px" }}>
                <Text style={{ fontWeight: "500", fontSize: "15px" }}>{item.gender || "Not Updated"}</Text>
              </td>
              <td style={{ padding: "10px" }}>
                <Button onClick={() => setOpenModel(true)}>More</Button>
              </td>
            </tr>
            </>
          );
        })}
      </table>
    </>
  );
};

const MoreDetails = ({item}) => {
  return (
    <>
      {/* Modal content */}
        {/* Modal content */}
        <div>
          <div style={{ marginBottom: "20px", marginTop : "20px" }}>
            <Avatar
              color="cyan"
              size="xl"
              radius="xl"
              style={{ margin: "auto" }}
            >
              {item.name.split(" ")[0][0] + item.name.split(" ")[1][0]}
            </Avatar>
            <Text
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Lorem Ipsum
            </Text>
            <Text style={{ textAlign: "center", fontSize: "14px" }}>
              F_ID : 23312
            </Text>
          </div>

          <hr style={{ border: "1px dashed #3b4347" }} />

          <div style={{ marginTop: "20px" }}>
          <Box 
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
          })}>
            <Text style={{ textAlign: "center", fontSize: "18px",fontWeight : "bold" }}> Contact Info</Text>
            <div style={{display : "flex", justifyContent : "space-between",textAlign : "center"}}>
              <div>
            <ActionIcon style={{margin : "auto"}} size="xl">
      <IconMailFilled size="1.75rem" />
    </ActionIcon>
            <Text style={{ alignSelf: "start" }}>Faculties@ycce.in </Text>
              </div>
           <div>
           <ActionIcon style={{margin : "auto"}} size="xl">
      <IconPhoneCall size="1.75rem" />
    </ActionIcon>
            <Text style={{ alignSelf: "start" }}>+91 8605527382</Text>
           </div>

            </div>
          
          </Box>
          </div>

          <div style={{ marginTop: "20px" }}>
          <Box 
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
          })}>
            <Text style={{ textAlign: "center", fontSize: "18px",fontWeight : "bold", marginBottom : "10px"}}> Basic Info</Text>
            <div style={{display : "flex", justifyContent : "space-between",textAlign : "center"}}>
              <div>
                <Text style={{ alignSelf: "start", fontWeight : "bold" }}>Gender </Text>
                <Text style={{ alignSelf: "start", color : "#909296", fontSize : "15px" }}>Male</Text>
              </div>
              <div>
                <Text style={{ alignSelf: "start", fontWeight : "bold" }}>Dependent </Text>
                <Text style={{ alignSelf: "start", color : "#909296", fontSize : "15px" }}>CTec</Text>
              </div>
              <div>
                <Text style={{ alignSelf: "start", fontWeight : "bold" }}>Location </Text>
                <Text style={{ alignSelf: "start", color : "#909296", fontSize : "15px" }}>Nagpur</Text>
              </div>
           
            </div>
            <div>
            <div style={{textAlign : "center", marginTop : "20px"}}>
                <Text style={{ alignSelf: "start", fontWeight : "bold" }}>Address </Text>
                <Text style={{ alignSelf: "start", color : "#909296", fontSize : "15px" }}> 958 Kristian Island, East Paulmouth, Montana, Nagpur</Text>
              </div>
            </div>
          
          </Box>
          </div>
        </div>

        <Group position="center" style={{ marginTop: "20px" }}>
          <Button
            variant="light"
            color="blue"
            fullWidth
            // mt="md"
            radius="md"
            onClick={() => Router.push("/admin/profile?edit=faculty")}
          >
            Edit
          </Button>
          <Button
            variant="light"
            color="red"
            fullWidth
            // mt="md"
            radius="md"
          >
            Delete
          </Button>
        </Group>
    </>
  );
};
