import React, { useContext, useEffect, useState } from "react";
import BackNav from "@/Components/BackNav";
import Header from "@/Components/Header";
import {
  Button,
  Input,
  Select,
  Text,
  Badge,
  Modal,
  Title,
  ScrollArea,
  ActionIcon,
  Loader,
} from "@mantine/core";
import { Prism } from "@mantine/prism";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { deleteDate, fetchDate } from "@/helper/fetchDate";
import { useRouter } from "next/router";
import { LoaderContext } from "@/Components/admin/Context";

export default function LabAnalysis() {
  const [openModel, setOpenModel] = useState(false);
  const router = useRouter();

  const { visible, setVisible } = useContext(LoaderContext);

  const [recordLoading, setRecordLoading] = useState(false);

  const [selectPractical, setSelectPractical] = useState("");

  const [values, setValues] = useState([]);
  console.log(values)

  const [resetLoaderButton, setResetLoaderButton] = useState(false)

  const [statusValue, setStatusValue] = useState({
    totalAttemptedStudents: 0,
    successfullyExecuted: 0,
    failed: 0,
    partially: 0,
    terminated: 0,
    totalStudents: 0,
  });

  const [practicalList, setPracticalList] = useState([]);
  useEffect(() => {
    setVisible(true);
    fetchDate(`/practical/list?lab_id=${router.query.lab_id}`).then(
      (res) => {
        if (!res.success) return setVisible(false);
        console.log(res.response);
        //  { value: "pr_3", label: "Practical 3 : If & Else Statement" },
        setPracticalList(
          res.response.map((item) => {
            return { value: item._id, label: item.name };
          })
        );
      }
    );
    fetchDate(`/analysis/status?lab_id=${router.query.lab_id}`).then(
      (res) => {
        if (!res.success) return setVisible(false);
        console.log(res.response);
        setStatusValue({
          totalAttemptedStudents: res.response.totalAttemptedStudents,
          successfullyExecuted: res.response.successfullyExecuted,
          failed: res.response.failed,
          partially: res.response.partially,
          terminated: res.response.terminated,
        });
      }
    );
    fetchDate(`/analysis/practical?lab_id=${router.query.lab_id}`).then(
      (res) => {
        console.log(res);
        if (!res.success) return setVisible(false);
        setValues(res.response);
      }
    );
    fetchDate(`/count/students?l_id=${router.query.lab_id}`).then(
      (res) => {
        if (!res.success) return setVisible(false);
        setStatusValue((prev) => {
          return {
            ...prev,
            totalStudents: res.response,
          };
        });
        setVisible(false);
        console.log(res.response);
      }
    );
  }, []);

  useEffect(() => {
    if (!selectPractical) return;
    setRecordLoading(true);
    fetchDate(
      `/analysis/practical?lab_id=${router.query.lab_id}&practical_id=${selectPractical}`
    ).then((res) => {
      console.log(res);
      if (!res.success) return setVisible(false);
      setValues(res.response);
      setRecordLoading(false);
    });
  }, [selectPractical]);

  const [search, setSearch] = useState("");
  console.log(search)

  // handle search input change
  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  const onClickSearch = () => {
    setRecordLoading(true);
    fetchDate(`/analysis/search?lab_id=${router.query.lab_id}&search=${search}`).then((res) => {
      console.log(res);
      if (!res.success) return setVisible(false);
      setValues(res.response);
      setRecordLoading(false);
    }
    );
  }

  const onClickReset = (id) => {
    setResetLoaderButton(true)
    deleteDate(`/reset/record?record_id=${id}`)
    .then(res => {
      if(!res?.success) return (setVisible(false),setResetLoaderButton(false));
      // remove that record from the values
      setValues(prev => {
        return prev.filter(item => item._id !== id)
      }) 
      setResetLoaderButton(false)
    }
    )

  }

  return (
    <>
      <div style={{ overflowY: "scroll", height: "100vh", width: "100%" }}>
        <div style={{ marginTop: "60px", width: "95%" }}>
          <BackNav dataTrack={[]} />
          <Header
            title={`Lab Analysis : ${router.query.lab}`}
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
                onChange={onChangeSearch}
                value={search}
              />
              <Button style={{ marginRight: "20px" }} onClick={() => onClickSearch()}>Search</Button>
              <Select
                withAsterisk
                // value="pr_1"
                placeholder="Select Practical"
                data={practicalList}
                value={selectPractical}
                onChange={(e) => setSelectPractical(e)}
              />
            </div>
          </div>
          <div>
            <Analysis statusValue={statusValue} />
            {recordLoading ? (
              <Loader  style={{ margin: "auto",width : "100%", marginTop : "60px"}} />
            ) : (
              values.length === 0 ?
              <Text style={{ fontWeight: "500", fontSize: "15px",textAlign : "center",width : "100%",marginTop : "60px"}}>
              No Record Found
            </Text>
              :
              <SingleStudentsAnalysis
                setOpenModel={setOpenModel}
                values={values}
                onClickReset={onClickReset}
                resetLoaderButton={resetLoaderButton}
              />
            )}
          </div>
          <div
            style={{
              margin: "auto",
              textAlign: "center",
              width: "100%",
              margin: "20px",
            }}
          >
            {/* <Button style={{ margin: "auto", textAlign: "center" }}>
              Load More
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
}

const SingleStudentsAnalysis = ({ values,onClickReset,resetLoaderButton }) => {
  const [submission, setSubmission] = useState("// no code provided");
  const [openModel, setOpenModel] = useState(false);

  return (
    <>
      <Modal
        opened={openModel}
        onClose={() => setOpenModel(false)}
        centered
        withCloseButton={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div style={{ padding: "10px" }}>
          <Title
            style={{
              textAlign: "left",
              fontSize: "20px",
              marginBottom: "10px",
            }}
          >
            Submitted Code
          </Title>
          <Prism language="cpp">
            {submission}
          </Prism>
          {/* <ActionIcon
            variant="filled"
            color="green"
            style={{ width: "40px", marginTop: "10px" }}
          >
            <IconPlayerPlayFilled size="1rem" />
          </ActionIcon> */}
        </div>
      </Modal>
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
              Student Name
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
              Reg No.
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
              Class Roll No.
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
              Date
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
              Time
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
              Status
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
              Pass TC
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
              Code
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
              Reset
            </Text>
          </th>
        </tr>

        { values.map((item, index) => {
          return (
            <tr
              style={{
                textAlign: "center",
                backgroundColor: "#25262B",
              }}
            >
              <td style={{ padding: "10px" }}>
                <Text style={{ fontWeight: "500", fontSize: "15px" }}>
                  {item.s_id.name}
                </Text>
              </td>
              <td style={{ padding: "10px" }}>
                <Text style={{ fontWeight: "500", fontSize: "15px" }}>
                  {item.s_id.regNo}
                </Text>
              </td>
              <td style={{ padding: "10px" }}>
                <Text style={{ fontWeight: "500", fontSize: "15px" }}>
                  {item.s_id.rollNo}
                </Text>
              </td>
              <td style={{ padding: "10px" }}>
                <Text style={{ fontWeight: "500", fontSize: "15px" }}>
                  {new Date(parseInt(item.date)).toDateString()}
                </Text>
              </td>
              <td style={{ padding: "10px" }}>
                <Text style={{ fontWeight: "500", fontSize: "15px" }}>
                  {new Date(parseInt(item.time)).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true, // Use 12-hour format
                  })}
                </Text>
              </td>
              <td style={{ padding: "10px" }}>
                {
                  <Badge
                    color={
                      item.status === -1
                        ? "blue"
                        : item.status === 0
                        ? "red"
                        : item.status === 1
                        ? "orange"
                        : item.status === 2
                        ? "yellow"
                        : "green"
                    }
                  >
                    {item.status === -1
                      ? "Terminated"
                      : item.status === 0
                      ? "Failed"
                      : item.status === 1
                      ? "Error"
                      : item.status === 2
                      ? "Partially"
                      : "Executed"}
                  </Badge>
                }
              </td>
              <td style={{ padding: "10px" }}>
                <Text style={{ fontWeight: "500", fontSize: "15px" }}>
                  {item.tc_pass}
                </Text>
              </td>
              <td style={{ padding: "10px" }}>
                <Button
                  color="green"
                  onClick={() => (setOpenModel(true), setSubmission(item?.submission ? item?.submission : "// No Code Submitted " ))}
                >
                  Code
                </Button>
              </td>
              <td style={{ padding: "10px" }}>
                <Button
                  color="orange"
                  loading={resetLoaderButton}
                  onClick={() => onClickReset(item._id)}
                >
                  Reset
                </Button>
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

const Analysis = ({ statusValue }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <div style={{ width: "50%" }}>
          <Text
            style={{
              fontWeight: "800",
              fontSize: "15px",
              marginBottom: "5px",
            }}
          >
            Students
          </Text>
          <Badge>Total Students : {statusValue.totalStudents}</Badge>
          <div style={{ marginBottom: "20px" }}>
            <Badge color="green">
              Attempted : {statusValue.totalAttemptedStudents}
            </Badge>

            <Badge style={{ marginLeft: "10px" }} color="orange">
              Not Attempted :{" "}
              {statusValue.totalStudents - statusValue.totalAttemptedStudents}
            </Badge>
          </div>

          <Text
            style={{
              fontWeight: "800",
              fontSize: "15px",
              marginBottom: "5px",
            }}
          >
            Lab Analysis
            {/* 
            totalAttemptedStudents : 0,
    successfullyExecuted : 0,
    failed : 0,
    partially : 0,
    terminated : 0, */}
          </Text>
          <div>
            <Badge color="green">
              Successfully : {statusValue.successfullyExecuted}
            </Badge>
            <Badge style={{ marginLeft: "10px" }} color="red">
              Failed : {statusValue.failed}
            </Badge>
          </div>
          <div style={{ marginTop: "5px" }}>
            <Badge color="yellow">Partially : {statusValue.partially}</Badge>{" "}
            <Badge color="blue">Terminated : {statusValue.terminated}</Badge>
          </div>
          <div style={{ marginTop: "5px" }}></div>
        </div>
      </div>
    </>
  );
};
