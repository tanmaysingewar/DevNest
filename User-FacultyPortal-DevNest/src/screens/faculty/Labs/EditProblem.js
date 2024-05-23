import React, { useContext, useEffect, useState } from "react";
// import {} from "@tabler/icons-react";
import facultyNavData from "@/Components/faculty/facultyNavData";
import SideNav from "@/Components/SideNav";
import Labs from "@/screens/students/Labs";
import BackNav from "@/Components/BackNav";
import Header from "@/Components/Header";
import {
  Button,
  useMantineColorScheme,
  Title,
  Text,
  Group,
  Textarea,
  Box,
  TextInput,
  Card,
  Badge,
  Modal
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { validate } from "@/helper/validate";
import { deleteDate, fetchDate, postDate, updateDate } from "@/helper/fetchDate";
import { LoaderContext } from "@/Components/faculty/Context";


export default function EditProblem() {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const  {visible, setVisible} = useContext(LoaderContext);

  const [deletePopUp, setDeletePopUp] = useState(false)


  const [loadDeleteBUtton, setLoadDeleteBUtton] = useState(false)

  // practical_id, problem_name, problem_statement, problem_dec, input_format, output_format, example, test_cases
  useEffect(() => {
    setVisible(true);
    fetchDate(`/faculty/get/problem?problem_id=${router.query.problem}`).then((res) => {
      console.log(res);
      if (res.success) {
        setValue({
          practical_id: res.response.practical_id,
          problem_name: res.response.problem_name,
          problem_statement: res.response.problem_statement,
          problem_dec: res.response.problem_dec,
          input_format: res.response.input_format,
          output_format: res.response.output_format,
          example: res.response.example,
          test_cases: res.response.test_cases,
        });
       
      }
      setVisible(false);
    }
    )
  }, [])
  
  const [value, setValue] = useState({
    practical_id: router.query.practical,
    problem_name: "",
    problem_statement: "",
    problem_dec: "",
    input_format: "",
    output_format: "",
    example: [],
    test_cases: [],
  });

  console.log(value);
  const [errors, setErrors] = useState({
    problem_name: "",
    problem_statement: "",
    problem_dec: "",
    input_format: "",
    output_format: "",
    example: "",
    test_cases: "",
    allOk: false,
  });

  const [exampleInput, setExampleInput] = useState({
    input: "",
    output: "",
    explanation: "",
  });

  const [exampleError, setExampleError] = useState({
    input: "",
    output: "",
    explanation: "",
  });

  const [testCasesInput, setTestCasesInput] = useState({
    input: "",
    output: "",
  });

  const [testCasesError, setTestCasesError] = useState({
    input: "",
    output: "",
  });

  const [loading, setLoading] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);

  const [mainError, setMainError] = useState("");

  const handleChange = (name) => (event) => {
    setValue({ ...value, [name]: event?.target?.value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleExampleChange = (name) => (event) => {
    setExampleInput({ ...exampleInput, [name]: event?.target?.value });
    setExampleError({ ...exampleError, [name]: "" });
  };

  const handleTestCasesChange = (name) => (event) => {
    setTestCasesInput({ ...testCasesInput, [name]: event?.target?.value });
    setTestCasesError({ ...testCasesError, [name]: "" });
  };

  const onClickAddExample = () => {
    if (validate(exampleInput, setExampleError)) return;
    setValue({ ...value, example: [...value.example, exampleInput] });
    setExampleInput({
      input: "",
      output: "",
      explanation: "",
    });
  };

  const onClickAddTestCases = () => {
    if (validate(testCasesInput, setTestCasesError)) return;
    setValue({ ...value, test_cases: [...value.test_cases, testCasesInput] });
    setTestCasesInput({
      input: "",
      output: "",
    });
  };

  const onClickUpdate = () => {
    console.log("clicked")
    setLoadingButton(true);
    if (validate(value, setErrors)) return setLoadingButton(false);

    updateDate(`/faculty/update/problem?problem_id=${router.query.problem}`, value)
    .then((res) => {
      setLoadingButton(false);
      console.log(res);
      if (!res.success || !res) return setMainError(res?.message || "Something went wrong");
      router.push(`/faculty/labs?lab=${router.query.lab}`);
    });
  };


  const onClickDelete = () => {
    setLoadDeleteBUtton(true)
    deleteDate(`/faculty/delete/problem?problem_id=${router.query.problem}`).then((res) => {
      if(!res.success) return;
     router.push(`/faculty/labs?lab=${router.query.lab}`);
    })
  }

  return (
    <>
    <Modal opened={deletePopUp} onClose={() => setDeletePopUp(false)} title="Delete Lab">
    <Text style={{marginBottom : "10px"}}>Problem : {value.problem_name}</Text>
    <Text style={{marginBottom : "10px"}}>Are you sure you want to delete this Problem?</Text>
    <Button loading={loadDeleteBUtton} color="red" onClick={() => onClickDelete()}>Delete</Button>
  </Modal>
    <div style={{ overflowY: "scroll", height: "100vh", width: "100%" }}>
      <div style={{ marginTop: "60px", marginLeft: "20px" }}>
        <BackNav
          dataTrack={[
            { title: "Lab", href: "/faculty/labs" },
            {
              title: "Practicals",
              href: `/faculty/labs?lab=${router.query.lab}`,
            },
            {
              title: "Add Problem",
              href: `/faculty/labs?lab=${router.query.lab}&create=${router.query.create}`,
            },
          ]}
        />
        <Header
          title="Edit Problem"
          dec={"Setting of the this portal reflected all over the platform"}
        />
        <div style={{}}>
          <Group style={{ width: "600px" }}>
            <Group>
              <TextInput
                style={{ width: "550px", marginTop: "10px" }}
                placeholder="Enter Problem name"
                label="Name of the Problem"
                required
                value={value.problem_name}
                onChange={handleChange("problem_name")}
                error={errors.problem_name}
              />
              <Textarea
                style={{ width: "550px" }}
                placeholder="Enter problem statement"
                label="Enter Problem Statement"
                autosize
                minRows={2}
                required
                value={value.problem_statement}
                error={errors.problem_statement}
                onChange={handleChange("problem_statement")}
              />
              <Textarea
                style={{ width: "550px" }}
                placeholder="Enter problem description"
                label="Enter Problem Description"
                autosize
                minRows={2}
                required
                value={value.problem_dec}
                error={errors.problem_dec}
                onChange={handleChange("problem_dec")}
              />
              <Textarea
                style={{ width: "550px" }}
                placeholder="Enter Input Format"
                label="Enter Input Format"
                autosize
                minRows={2}
                required
                value={value.input_format}
                error={errors.input_format}
                onChange={handleChange("input_format")}
              />
              <Textarea
                style={{ width: "550px" }}
                placeholder="Enter Output Format"
                label="Enter Output Format"
                autosize
                minRows={2}
                required
                value={value.output_format}
                error={errors.output_format}
                onChange={handleChange("output_format")}
              />

              <Box>
                <Text>Example </Text>
                <Box>
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{ width: "550px" }}
                  >
                    {/* //loop the value.example */}
                    {value.example.map((item, index) => {
                      return (
                        <Box>
                          <Group>
                          <Text>Example {index + 1}</Text>
                          <Badge color="red" style={{cursor : "pointer"}} 
                          
                          onClick={() => {
                            let temp = value.example;
                            temp.splice(index,1);
                            setValue({...value,example : temp})
                          }
                          }>Delete</Badge>
                          </Group>
                         
                          <Group>
                            <Text>Input : {item.input}</Text>
                            <Text>Output : {item.output}</Text>
                          </Group>
                          <Text>Explanation : {item.explanation}</Text>
                          
                        </Box>
                      );
                    })}
                  </Card>
                </Box>
                <TextInput
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Input"
                  label="Input"
                  required
                  value={exampleInput.input}
                  error={exampleError.input}
                  onChange={handleExampleChange("input")}
                />
                <TextInput
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Output"
                  label="Output"
                  required
                  value={exampleInput.output}
                  error={exampleError.output}
                  onChange={handleExampleChange("output")}
                />
                <Textarea
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Enter Explanation"
                  label="Enter Explanation"
                  autosize
                  minRows={2}
                  required
                  value={exampleInput.explanation}
                  error={exampleError.explanation}
                  onChange={handleExampleChange("explanation")}
                />
                <Button
                  style={{ backgroundColor: "green", marginTop: "10px" }}
                  onClick={() => onClickAddExample()}
                >
                  Add Example
                </Button>
              </Box>
              <Box>
                <Text>Test Cases</Text>
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{ width: "550px" }}
                >
                  {/* //loop the value.example */}
                  <Text>Added Test Cases</Text>
                  {value.test_cases.map((item, index) => {
                    return (
                      <Box>
                        <Group>
                        <Text>Test Case {index + 1}</Text>
                        <Badge color="red" style={{cursor : "pointer"}} 
                          
                          onClick={() => {
                            let temp = value.test_cases;
                            temp.splice(index,1);
                            setValue({...value,test_cases : temp})
                          }
                          }>Delete</Badge>
                          </Group>
                        <Group>
                          <Text>Input : {item.input}</Text>
                          <Text>Output : {item.output}</Text>
                        </Group>
                      </Box>
                    );
                  })}
                </Card>

                <TextInput
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Input"
                  label="Input"
                  required
                  value={testCasesInput.input}
                  error={testCasesError.input}
                  onChange={handleTestCasesChange("input")}
                />
                <TextInput
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Output"
                  label="Output"
                  required
                  value={testCasesInput.output}
                  error={testCasesError.output}
                  onChange={handleTestCasesChange("output")}
                />
                <Button
                  style={{ backgroundColor: "green", marginTop: "10px" }}
                  onClick={() => onClickAddTestCases()}
                >
                  Add Test Case
                </Button>
              </Box>
              <Group style={{ marginTop: "10px",marginBottom : "40px" }}>

              <Button color="violet" style={{ backgroundColor: "#0368FF" }} loading={loadingButton} onClick={() => onClickUpdate()}>
                Update Example
              </Button>
              <Button color="red" style={{ backgroundColor: "red" }} onClick={() => setDeletePopUp(true)}>
                Delete Problem
              </Button>
              </Group>
            </Group>
          </Group>
        </div>
      </div>
    </div>
    </>
  );
}
