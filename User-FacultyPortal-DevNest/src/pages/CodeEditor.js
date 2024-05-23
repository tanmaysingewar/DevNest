import React, { useState, useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { useFullscreen } from "@mantine/hooks";
import { useRouter } from "next/router";
import {
  Button,
  Title,
  Text,
  useMantineColorScheme,
  ActionIcon,
  Tabs,
  Input,
  Modal,
  Badge,
  Grid,
  Group,
  LoadingOverlay,
  Divider,
  Card,
  Box,
} from "@mantine/core";
import {
  IconSettings,
  IconCommand,
  IconCpu,
  IconRotate2,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import logo from "@/assets/main_logo.png";
import { Prism } from "@mantine/prism";
import { LoaderContext } from "@/Components/faculty/Context";
import { exeCode, fetchDate, postDate } from "@/helper/fetchDate";
import { isAuthenticated } from "@/helper/auth";

//#-------------------------  Main Component  ----------------------------- //
const CodeEditorLander = () => {
  const [isFocused, setIsFocused] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [clipboardArray, setClipboardArray] = useState([]); // Clipboard Array
  const [code, setCode] = useState(`
// C code is executed sequentially, line by line.
// Comments like these are ignored by the compiler but help in code documentation.
// It's where the program begins its journey.

#include <stdio.h>

int main() {

    // Take Input as per given format 
    scanf();

    // Your logic


    // Give output as per given fromat
    printf();

    return 0;
}`); // Code Editor Value
  // console.log(code)

  // #-------------------------  Server Calls and management  ----------------------------- //
  const [loadingRunButton, setLoadingRunButton] = useState(false);
  const router = useRouter();

  const [safetyLock, setSafetyLock] = useState(false);

  const [mainError, setMainError] = useState(false);

  const [visible, setVisible] = useState(false);

  const [labStatus, setLabStatus] = useState(true);

  const [noProblemFound, setNoProblemFound] = useState(false);

  const [values, setValues] = useState({
    problem_id: "",
    practical_id: "",
    problem_name: "",
    problem_statement: "",
    problem_dec: "",
    input_format: "",
    output_format: "",
    example: [],
    test_cases: [],
  });

  useEffect(() => {
    // Check if current time is greater than 1 min or not from localStorage time startTime
    if (router.query.practical_id) {
      console.log(isAuthenticated()?.student?._id);
      setVisible(true);
      // fetchDate(`/student/problem?practical_id=${router.query.practical_id}`).then(
      fetchDate(
        `/student/problem?practical_id=${router.query.practical_id}`
      ).then((res) => {
        console.log(res);
        if (res.success === false) return setMainError(true);
        if (res.isEmpty) return setNoProblemFound(true);
        setValues({
          problem_id: res.response._id,
          practical_id: res.response.practical_id,
          problem_name: res.response.problem_name,
          problem_statement: res.response.problem_statement,
          problem_dec: res.response.problem_dec,
          input_format: res.response.input_format,
          output_format: res.response.output_format,
          example: res.response.example,
          test_cases: res.response.test_cases,
        });
      });
    }
  }, [router.query.practical_id]);

  useEffect(() => {
    if (values.practical_id) {
      postDate("/student/create/analysis", {
        lab_id: router.query.lab_id,
        practical_id: values.practical_id,
        problem_id: values.problem_id,
        status: 422,
        attemptTime: new Date().getTime(),
      }).then((res) => {
        setVisible(false);
        if (res.success === false) return setMainError(true);
        // check for attempt time
        const startTime = res?.response?.attemptTime;
        const currentTime = new Date().getTime();
        const diff = currentTime - startTime;
        const diffInMin = Math.round(diff / 6000);
        if (diffInMin > 1) {
          // if greater than 1 min then set isFocused to false
          return setLabStatus(false);
        }
      });
    }
  }, [values]);

  const [results, setResults] = useState([]);
  // console.log(results)

  const [loadSubmitButton, setLoadSubmitButton] = useState(false);

  const onclickRunCode = () => {
    setLoadingRunButton(true);
    exeCode(`/c/run`, {
      code: code,
      testCases: values.test_cases,
    }).then((res) => {
      console.log(res);
      setResults(res);
      setLoadingRunButton(false);
    });
  };

  const [labCompleted, setLabCompleted] = useState(false);

  const onClickSubmitCode = () => {
    setLoadSubmitButton(true);
    exeCode(`/c/save`, {
      code: code,
      testCases: values.test_cases,
      practical_id: values.practical_id,
      lab_id: router.query.lab_id,
      problem_id: values.problem_id,
      s_id: isAuthenticated()?.student?._id,
    }).then((res) => {
      console.log(res);
      if (res.success === false && !res?.error)
        return setLoadSubmitButton(false);
      setLabCompleted(true);
      setResults(res);
      setLoadSubmitButton(false);
    });
  };

  //#-------------- Screen Change Detection Code -----------//
  useEffect(() => {
    // when the user loses focus
    window.addEventListener("blur", () => {
      // document.title = "Blurred";
      setIsFocused(false);
    });
    // when the user's focus is back to your tab (website) again
    window.addEventListener("focus", () => {
      // document.title = "Focused";
    });
    return () => {
      window.removeEventListener("blur", () => {
        document.title = "Blurred";
      });
      window.removeEventListener("focus", () => {
        document.title = "Focused";
      });
    };
  }, []);

  //#-----------------  Countdown Timer [Time Limit for Lab] - 1 Hour  -----------------//
  const [timer, setTimer] = useState(3600); // Initial timer value: 1 hour in seconds

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  //#-----------------  Fullscreen and Color Schema  -----------------//
  const { toggle, fullscreen } = useFullscreen();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  let cardColor = "#25262B";
  let editorTheme = "vs-dark";
  let themeBase = "onedark";

  if (colorScheme === "dark") {
    cardColor = "#25262B";
    editorTheme = "vs-dark";
    themeBase = "onedark";
  } else {
    cardColor = "#f8f9fa";
    editorTheme = "vs";
    themeBase = "vs";
  }

  //#-----------------  Clipboard Monitoring and CodeEditor Value Handling  -----------------//

  function handleEditorChange(value, event) {
    setCode(value);

    window.addEventListener("paste", (e) => {
      setOpenModal(true);
      console.log(clipboardArray, "Pre : clipboardArray");
      const pastedText = e.clipboardData.getData("text/plain");
      const updatedArray = [...clipboardArray, pastedText];
      setClipboardArray(updatedArray);
      // Do something with the pasted content
      console.log("Pasted content:", pastedText);
    });
    return () => {
      window.removeEventListener("paste", (e) => {});
    };
  }

  //#-----------------  Split Pane Size  -----------------//
  const [sizes, setSizes] = useState([500, "40%", "auto"]);
  const [sizeTwo, setSizeTwo] = useState([500, "40%", "auto"]);

  const layoutCSS = {
    height: "100%",
    display: "flex",
  };

  //#-----------------  Lab Activity & Editor Setting  -----------------//
  const [activeLab, setActiveLab] = useState(false);

  function setEditorTheme(monaco) {
    monaco.editor.defineTheme("onedark", {
      base: editorTheme,
      inherit: true,
      rules: [],
      colors: {
        "editor.background": cardColor,
      },
    });
  }

  //#-----------------  Enter Lab handler  -----------------//
  const onClickEnterLab = () => {
    toggle();
    return setActiveLab(true);
  };
  const onClickGoBack = () => {
    if (fullscreen === true) {
      return router.back(), toggle();
    }
    return router.back();
  };

  //#-----------------  If Out of Focus  -----------------//
  if (!isFocused) {
    return (
      <>
        <Timer setIsFocused={setIsFocused} isFullscreen={fullscreen} />
      </>
    );
  }

  if (mainError === true) {
    return (
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Text style={{ fontSize: "24px", fontWeight: "600" }}>
          Something went wrong !
        </Text>
        <Text style={{ fontSize: "16px", fontWeight: "500" }}>
          link might be broken 🤯 or its just random error 🤔
        </Text>
        <Text size={"xs"} style={{ fontWeight: "500", marginTop: "30px" }}>
          Hint : Try to refresh the page 😅 or contact the faculty for further
          details
        </Text>
        <Button onClick={onClickGoBack} style={{ marginTop: "20px" }}>
          Go back to Labs
        </Button>
      </div>
    );
  }

  if (!labStatus) {
    return (
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Text style={{ fontSize: "24px", fontWeight: "600" }}>
          Attempt Prohibited 🥶
        </Text>
        <Text style={{ fontSize: "16px", fontWeight: "500" }}>
          Please 🤕, contact the faculty for further details
        </Text>
        <Button onClick={onClickGoBack} style={{ marginTop: "20px" }}>
          Go back to Labs
        </Button>
      </div>
    );
  }

  if (noProblemFound) {
    return (
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Text style={{ fontSize: "24px", fontWeight: "600" }}>
          No Problem Found 🙃
        </Text>
        <Text style={{ fontSize: "16px", fontWeight: "500" }}>
          Please 🤕, contact the faculty for further details
        </Text>
        <Button onClick={onClickGoBack} style={{ marginTop: "20px" }}>
          Go back to Labs
        </Button>
      </div>
    );
  }

  // ??-----------------  If In Focus [Main render Component]  -----------------//
  return (
    <div style={{ height: "100vh" }} className="ResizablePanel" type="text">
      {/* //#-------Lab Completed Modal------ */}
      <Modal
        opened={labCompleted}
        onClose={() => setLabCompleted(false)}
        centered
        withCloseButton={false}
      >
        {
          // check results are all success or not
          results?.results?.length > 0 &&
          results?.results?.every((item) => item.success === true) ? (
            <div style={{ textAlign: "center" }}>
              <Text style={{ fontWeight: "600", fontSize: "20px" }}>
                Congratulation 🎉
              </Text>
              <Text style={{ fontWeight: "500", fontSize: "16px" }}>
                You have successfully completed the lab
              </Text>
              <Button onClick={onClickGoBack} style={{ marginTop: "20px" }}>
                Go back to Labs
              </Button>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Text style={{ fontWeight: "600", fontSize: "20px" }}>
                Oops 😕
              </Text>
              <Text style={{ fontWeight: "500", fontSize: "16px" }}>
                You have failed to complete the lab
              </Text>
              <Button onClick={onClickGoBack} style={{ marginTop: "20px" }}>
                Go back to Labs
              </Button>
            </div>
          )
        }
      </Modal>
      {/* //#-------Loader ------ */}
      <LoadingOverlay visible={visible} overlayBlur={2} />
      {/* // # ---- Modal ---- // */}
      <Modal
        opened={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title="Clip Board Monitoring"
        centered
        withCloseButton={false}
      >
        {/* Modal content */}
        <h3>Copy paste detected</h3>
        <Text size={"sm"}>
          We will keep track of your code for further analysis
        </Text>
        {clipboardArray.map((item) => {
          return (
            <Prism language="tsx" style={{ marginTop: "5px" }}>
              {item}
            </Prism>
          );
        })}
      </Modal>

      {/* // # ---- [Editor Display Code] ---- // */}
      {fullscreen && activeLab ? (
        // Enter Code Here
        <>
          <SplitPane
            split="vertical"
            sizes={sizes}
            onChange={setSizes}
            style={{ height: "100vh" }}
          >
            <Pane minSize={"20%"} maxSize="70%">
              <div style={{ ...layoutCSS }}>
                <ProblemStatement values={values} />
              </div>
            </Pane>
            <div
              style={{ height: "95vh", padding: "10px 10px 10px 5px" }}
              className="ResizablePanel"
              type="text"
            >
              {/* // # ---- Top Action Buttons ---- //  */}
              <div
                style={{
                  margin: "0 0 8px 5px",
                  padding: "0 0 5px 0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: 600 }}>Editor</Text>
                <div style={{ display: "flex" }}>
                  <ActionIcon variant="light" style={{ marginRight: "5px" }}>
                    <IconRotate2 size="1rem" />
                  </ActionIcon>
                  <ActionIcon variant="light" style={{ marginRight: "5px" }}>
                    <IconCommand size="1rem" />
                  </ActionIcon>
                  <ActionIcon variant="light" style={{ marginRight: "5px" }}>
                    <IconCpu size="1rem" />
                  </ActionIcon>
                  <ActionIcon variant="light" style={{ marginRight: "5px" }}>
                    <IconSettings size="1rem" />
                  </ActionIcon>
                  <ActionIcon
                    variant="filled"
                    color="green"
                    style={{ margin: "0 10px 0 10px", width: "40px" }}
                    onClick={() => onclickRunCode()}
                    loading={loadingRunButton}
                  >
                    <IconPlayerPlayFilled size="1rem" />
                  </ActionIcon>
                </div>
              </div>
              {/* // # ---- Editor ---- // */}
              <SplitPane
                split="horizontal"
                sizes={sizeTwo}
                onChange={setSizeTwo}
              >
                <Pane minSize={"20%"} maxSize="70%">
                  <div style={{ ...layoutCSS, paddingBottom: "5px" }}>
                    <div
                      style={{
                        ...layoutCSS,
                        background: cardColor,
                        padding: "5px",
                        height: "100%",
                        borderRadius: "10px",
                        paddingBottom: "10px",
                        width: "-webkit-fill-available",
                      }}
                    >
                      <Editor
                        theme="onedark"
                        defaultLanguage="c"
                        value={code}
                        onChange={handleEditorChange}
                        colorDecorators={true}
                        selectionClipboard={false}
                        beforeMount={setEditorTheme}
                        onPaste={(e) => {
                          e.preventDefault();
                        }}
                      />
                    </div>
                  </div>
                </Pane>
                {/* //#------ Test Cases and Code Submission */}
                <div style={{ paddingTop: "5px", height: "100%" }}>
                  <TestCaseAndResult
                    timer={timer}
                    values={values}
                    results={results}
                    onClickSubmitCode={onClickSubmitCode}
                    loadSubmitButton={loadSubmitButton}
                  />
                </div>
              </SplitPane>
            </div>
          </SplitPane>
        </>
      ) : // #------ if its not full screen and active lab is true ------//
      !fullscreen && activeLab ? (
        <Timer setIsFocused={setIsFocused} isFullscreen={fullscreen} />
      ) : (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <Text style={{ fontSize: "24px", fontWeight: "600" }}>Enter Lab</Text>
          <Text style={{ fontSize: "16px", fontWeight: "500" }}>
            From now you can't change the screen
          </Text>
          <Button
            onClick={() => onClickEnterLab()}
            color={fullscreen ? "red" : "blue"}
            style={{ marginTop: "40px" }}
          >
            {fullscreen ? "Exit lab" : "Enter the lab"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CodeEditorLander;

// #-------------------------  Sub Components  ----------------------------- //

// #-------------------------  Problem Statement  -------------------------- //
const ProblemStatement = ({ values }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  let cardColor = "#25262B";

  if (colorScheme === "dark") {
    cardColor = "#25262B";
  } else {
    cardColor = "#f8f9fa";
  }
  return (
    <>
      <div
        style={{
          padding: "10px 5px 10px 10px",
          height: "95vh",
          width: "100%",
        }}
      >
        {/* //#------- Title ------ */}
        <div
          style={{
            margin: "0 0 0px 5px",
            padding: "0 0 5px 0",
            display: "flex",
          }}
        >
          <Image src={logo} width={35} height={35} />
          <Text
            size={"xl"}
            style={{
              fontWeight: "700",
              marginLeft: "5px",
              fontFamily: "cursive",
              // marginTop: "5px",
              // marginBottom: "-5px",
            }}
          >
            E-TantraShala
          </Text>
        </div>
        <div
          style={{
            borderRadius: "10px",
            background: cardColor,
            padding: "20px",
            height: "100%",
            overflowY: "scroll",
          }}
        >
          <div style={{ height: "100%" }}>
            <div style={{ paddingBottom: "20px" }}>
              <Title order={2}>Problem Statement</Title>
              <Text size="sm">{values.problem_statement}</Text>
            </div>
            {/* Function Description*/}
            <div style={{ paddingBottom: "20px" }}>
              <Title order={4}>Function Description</Title>
              <Text size="sm">{values.problem_dec}</Text>
            </div>

            <div style={{ paddingBottom: "30px" }}>
              {/* Input Format */}
              <div style={{ paddingBottom: "10px" }}>
                <Title order={4}>Input Format</Title>
                <Text size="sm">{values.input_format}</Text>
              </div>

              <div style={{ paddingBottom: "10px" }}>
                {/* Output Format */}
                <Title order={4}>Output Format</Title>
                <Text size="sm">{values.output_format}</Text>
              </div>
              {/* Constraints */}
              {/* <div style={{ paddingBottom: "10px" }}>
              <Title order={4}>Constraints</Title>
              <Text size="sm">{`1 <= length of string <= 100000`}</Text>
            </div> */}
              {/* For Example */}
              {values.example.map((item, index) => {
                return (
                  <div style={{ paddingBottom: "10px" }}>
                    <Title order={4}>For Example</Title>
                    <div style={{ paddingBottom: "10px" }}>
                      <Text size="sm">Input {index + 1}:</Text>
                      <Text size="sm">{item.input}</Text>
                      <Text size="sm">Output {index + 1}:</Text>
                      <Text size="sm">{item.output}</Text>
                      <Text size="sm">Explanation {index + 1}:</Text>
                      <Text size="sm">{item.explanation}</Text>
                    </div>
                  </div>
                );
              })}
              <div
                style={{ margin: "auto", textAlign: "center", width: "100%" }}
              >
                <Divider
                  my="sm"
                  style={{
                    textAlign: "center",
                    width: "80%",
                    margin: "auto",
                    marginBottom: "10px",
                  }}
                />
                <Text
                  size={"xs"}
                  style={{ textAlign: "center", margin: "auto", width: "80%" }}
                >
                  Designed by Developer for future Developers with ❤️ by Tanmay
                  Singewar.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// #-------------------------  Change Screen Timer  -------------------------- //
const Timer = ({ setIsFocused, isFullscreen }) => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(10);
  const { toggle, fullscreen } = useFullscreen();

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [seconds]);

  const onClickGoBack = () => {
    if (isFullscreen === true) {
      return router.back(), toggle();
    }
    return router.back();
  };

  const onClickRejoin = () => {
    if (isFullscreen === true) {
      return setIsFocused(true);
    }
    return setIsFocused(true), toggle();
  };

  return (
    <div
      style={{
        backgroundColor: "#25262B",
        borderRadius: "10px",
        padding: "5px",
        height: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {seconds > 0 ? (
          <>
            <div>
              <p>{seconds} seconds</p>
              <Title>Screen Change Detected</Title>
              <Text>Press rejoin to join scission</Text>
              <Button onClick={() => onClickRejoin()}>Rejoin scission</Button>
            </div>
          </>
        ) : (
          <div>
            <p>Time's up!</p>
            <Title>Screen Change Detected</Title>
            <Button onClick={onClickGoBack}>Go back to Labs</Button>
          </div>
        )}
      </div>
    </div>
  );
};

// #-------------------------  Test Case and Result  -------------------------- //
const TestCaseAndResult = ({
  timer,
  values,
  results,
  onClickSubmitCode,
  loadSubmitButton,
}) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [tabChange, setTabChange] = useState("testCases");
  const { toggle, fullscreen } = useFullscreen();
  let cardColor = "#25262B";
  let editorTheme = "vs-dark";
  let themeBase = "onedark";

  if (colorScheme === "dark") {
    cardColor = "#25262B";
    editorTheme = "vs-dark";
    themeBase = "onedark";
  } else {
    cardColor = "#f8f9fa";
    editorTheme = "vs";
    themeBase = "vs";
  }
  // console.log(results)

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        backgroundColor: cardColor,
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <Tabs
        keepMounted={false}
        defaultValue="testCases"
        color="green"
        value={tabChange}
        onTabChange={setTabChange}
      >
        {/* //# ----- Header ----- */}
        <Tabs.List>
          <Tabs.Tab value="testCases">
            <Text style={{ fontWeight: "bold" }}>Test Case</Text>
          </Tabs.Tab>
          <Tabs.Tab value="results">
            <Text style={{ fontWeight: "bold" }}>Results</Text>
          </Tabs.Tab>
        </Tabs.List>

        {/* //#---- Test cases ----*/}
        <Tabs.Panel
          value="testCases"
          style={{ marginTop: "10px", margin: "10px" }}
        >
          <Tabs variant="pills" defaultValue="case1">
            <Tabs.List>
              {values.test_cases.map((item, index) => {
                if (index >= 10) return;
                return (
                  <Tabs.Tab
                    value={`case${index + 1}`}
                    color="teal"
                    style={{
                      padding: "2px 10px 2px 10px",
                      margin: 0,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Case {index + 1}</Text>
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>

            {/* //# -- Case 1 [Panel] -- */}
            {results?.results?.length > 0
              ? results?.results?.map((item, index) => {
                  if (index >= 10) return;
                  return (
                    <Tabs.Panel value={`case${index + 1}`} pt="xs">
                      <div>
                        <Text>Input : {item.input}</Text>
                        {/* <Input id="input-demo" value={"abcabcbb"} /> */}
                        <Text>Output : {item.output}</Text>
                        {/* <Input id="input-demo" value={"3"} /> */}
                        <Text>Your Output : {item.actualOutput}</Text>
                        {/* <Input id="input-demo" value={"3"} /> */}
                        <Group style={{ marginTop: "10px" }}>
                          <Text>
                            <b>Status :</b>
                          </Text>
                          {item.success ? (
                            <Badge style={{ marginLeft: "-8px" }} color="green">
                              {"Pass"}
                            </Badge>
                          ) : (
                            <Badge style={{ marginLeft: "-8px" }} color="red">
                              {"Failed"}
                            </Badge>
                          )}
                        </Group>
                      </div>
                    </Tabs.Panel>
                  );
                })
              : values.test_cases.map((item, index) => {
                  if (index >= 10) return;
                  return (
                    <Tabs.Panel value={`case${index + 1}`} pt="xs">
                      <div>
                        <Text>Input : {item.input}</Text>
                        {/* <Input id="input-demo" value={"abcabcbb"} /> */}
                        <Text>Output : {item.output}</Text>
                        {/* <Input id="input-demo" value={"3"} /> */}
                        <Group style={{ marginTop: "10px" }}>
                          <Text>
                            <b>Status :</b>
                          </Text>
                          {results?.error ? (
                            <Badge style={{ marginLeft: "-8px" }} color="red">
                              {"Error"}
                            </Badge>
                          ) : (
                            <Badge style={{ marginLeft: "-8px" }} color="green">
                              Yet To Execute
                            </Badge>
                          )}
                        </Group>
                      </div>
                    </Tabs.Panel>
                  );
                })}
          </Tabs>
        </Tabs.Panel>

        {/* //#---- Results ----*/}
        <Tabs.Panel value="results">
          <div>
            <Text
              style={{
                fontWeight: "600",
                fontSize: "15px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              {results?.results?.length > 0 ? (
                <Box style={{ margin: "10px" }}>
                  <Text>Result of Test Cases</Text>
                  {results?.results?.map((item, index) => {
                    if (item.success === false) {
                      return (
                        <Box>
                          <Text style={{ textAlign: "left" }}>
                            Test case {index + 1} :{" "}
                            <Badge color="red">FAILED</Badge>
                          </Text>
                        </Box>
                      );
                    } else {
                      return (
                        <Box>
                          <Text style={{ textAlign: "left" }}>
                            Test case {index + 1} :{" "}
                            <Badge color="green">PASSED</Badge>
                          </Text>
                        </Box>
                      );
                    }
                  })}
                  <Text style={{ textAlign: "left", marginTop: "20px" }}>
                    Total Test Cases : {results?.results?.length}
                  </Text>
                </Box>
              ) : results?.error ? (
                <Card
                  padding="sm"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    overflowY: "scroll",
                    height: "300px",
                  }}
                >
                  <Text style={{ fontWeight: "bold", marginBottom: "10px" }}>
                    Error Generated
                  </Text>
                  <Text color="##cb3b3c" style={{ textAlign: "left" }}>
                    {results?.error}
                  </Text>
                </Card>
              ) : (
                <Text style={{ marginTop: "40px" }}>
                  Result will be shown here after execution
                </Text>
              )}
            </Text>
          </div>
        </Tabs.Panel>
      </Tabs>

      {/* //#---- Bottom Timer and Exit Button ----*/}
      <div
        style={{
          backgroundColor: colorScheme === "dark" ? "#2e3035" : "#ececec", //"#f8f9fa"
          width: "100%",
          padding: "10px",
          position: "absolute",
          bottom: "0px",
          borderRadius: "0 0 10px 10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
            <Text style={{ fontWeight: "500", fontSize: "12px" }}>
              Time Left :
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              <p>{formatTime(timer)}</p>
            </Text>
          </div>
          <Button
            onClick={() => (setTabChange("results"), onClickSubmitCode())}
            color={"green"}
            loading={loadSubmitButton}
            style={{ marginTop: "auto", marginBottom: "auto" }}
          >
            {"Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};
