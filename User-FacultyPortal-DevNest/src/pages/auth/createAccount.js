import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Stepper,
  NumberInput,
  Radio,
  Textarea,
  Progress,
  Popover,
  Box,
  PinInput,
  Center,
  Select,
  Input,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import Router from "next/router";
import { useState } from "react";

import { IconX, IconCheck } from "@tabler/icons-react";
import { validate } from "@/helper/validate";
import { postDate } from "@/helper/fetchDate";
import { authenticate } from "@/helper/auth";

export default function AuthenticationTitle() {
  const [active, setActive] = useState(0);
  console.log(active);

  const [mainError, setMainError] = useState("")

  const [passCode, setPassCode] = useState("")

  const [loadingButton, setLoadingButton] = useState(false)

  // name, email, gender, dob, currentYear, currentSem, branch, section, rollNo, regNo, contact, address, password,collage_code

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    collage_code: "",
    gender: "",
    dob: "",
    currentYear: "",
    currentSem: "",
    branch: "",
    section: "",
    rollNo: "",
    regNo: "",
    contact: ["", ""],
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    collage_code: "",
    gender: "",
    dob: "",
    currentYear: "",
    currentSem: "",
    branch: "",
    section: "",
    rollNo: "",
    regNo: "",
    contact: "",
    address: "",
    allOk: false,
  });

  console.log(values);

  const handleChange = (prop, value) => (event) => {
    if (prop === "dob" || prop === "joining_date") {
      setErrors({ ...errors, [prop]: "" });
      return setValues({ ...values, [prop]: event });
    }
    setValues({ ...values, [prop]: value ? value : event?.target?.value });
    setErrors({ ...errors, [prop]: "" });
  };

  const handleContactChange = (name) => (event) => {
    const contact = values.contact;
    contact[name] = event.target.value;
    setValues({ ...values, contact: contact });
    setErrors({ ...errors, contact: "" });
  };

  const handleSelectChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event });
    setErrors({ ...errors, [prop]: "" });
  };

  const validateForm = () => {
    // if active is 0 then validate name , email , password , collage_code
    if (
      active === 0 &&
      !validate(
        {
          name: values.name,
          email: values.email,
          password: values.password,
          collage_code: values.collage_code,
        },
        setErrors
      )
    ) {
      console.log(
        validate(
          [values.name, values.email, values.collage_code, values.password],
          setErrors
        )
      );
      setActive((current) => (current < 3 ? current + 1 : current));
    } else if (
      active === 1 &&
      !validate(
        {
          gender: values.gender,
          dob: values.dob,
          currentYear: values.currentYear,
          currentSem: values.currentSem,
          branch: values.branch,
          section: values.section,
        },
        setErrors
      )
    ) {
      console.log(
        validate(
          [values.name, values.email, values.collage_code, values.password],
          setErrors
        )
      );
      setActive((current) => (current < 3 ? current + 1 : current));
    } else if (
      active === 2 &&
      !validate(
        {
          regNo: values.regNo,
          rollNo: values.rollNo,
          contact: values.contact[0] && values.contact[1],
          address: values.address,
        },
        setErrors
      )
    ) {
      setActive((current) => (current < 3 ? current + 1 : current));
    } else if (
      active === 3 &&
      !validate(
        {
          // checks
        },
        setErrors
      )
    ) {
      console.log(
        validate(
          [values.name, values.email, values.collage_code, values.password],
          setErrors
        )
      );
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };

  const onClickSubmit = () => {
    setLoadingButton(true)
    if(passCode !== "2402"){
      setLoadingButton(false)
      return setMainError("Please enter the correct pass code")
    }
    if (
      !validate(values, setErrors) &&
      values.contact[0] &&
      values.contact[1] &&
      values.contact[0].length === 10 &&
      values.contact[1].length === 10
    ) {
      console.log("submit");
      postDate("/student/create", values)
        .then((res) => {
          console.log(res);
          if (!res.success) {
            setLoadingButton(false)
            setMainError(res?.message || "Something went wrong please try again 🥲");
          } else {
            if(res.success){
              return Router.push("/auth/login");
            }
            setLoadingButton(false)
            setMainError("Something went wrong please try again 🥲");
          }
          setLoadingButton(false)
    })
  }
  else{
    setLoadingButton(false)
    setMainError("Please check Contact No or other details are correct")
  }
}

  const nextStep = () => (
    setActive((current) => (current < 3 ? current + 1 : current)),
    validateForm()
  );
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        style={{
          width: "60%",
          margin: "auto",
          paddingTop: "50px",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <Stepper.Step label="First step" description="Create an account">
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
            style={{ width: "100%", marginTop: "50px" }}
          >
            Step 1 : Create new account!
          </Title>
          <Container size={420}>
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Join the new journey{" "}
            </Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <TextInput
                label="Name"
                placeholder="you@mantine.dev"
                required
                mt="md"
                value={values.name}
                onChange={handleChange("name")}
                error={errors.name}
              />
              <TextInput
                label="Email"
                placeholder="you@mantine.dev"
                required
                mt="md"
                value={values.email}
                onChange={handleChange("email")}
                error={errors.email}
              />
              <TextInput
                label="Collage Code"
                placeholder="Enter Collage Code"
                required
                mt="md"
                value={values.collage_code}
                onChange={handleChange("collage_code")}
                error={errors.collage_code}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                value={values.password}
                onChange={handleChange("password")}
                error={errors.password}
              />
              <Group position="center" mt="xl">
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  style={{ backgroundColor: "#0368FF" }}
                  onClick={validateForm}
                >
                  Next step
                </Button>
              </Group>
            </Paper>
          </Container>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Additional details">
          <Container size={550} my={40} style={{ paddingTop: "5vh" }}>
            <Title
              align="center"
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              Step 2 : Additional details!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Tell us more about yourself{" "}
            </Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <Group>
                <Radio.Group
                  name="gender"
                  label="Select your gender"
                  withAsterisk
                  style={{ width: "50%" }}
                  mt="md"
                  error={errors.gender}
                  value={values.gender}
                >
                  <Group mt="xs">
                    <Radio
                      value="Male"
                      label="Male"
                      onClick={handleChange("gender", "Male")}
                    />
                    <Radio
                      value="Female"
                      label="Female"
                      onClick={handleChange("gender", "Female")}
                    />
                  </Group>
                </Radio.Group>
                <DateInput
                  defaultLevel={"year"}
                  mt="md"
                  label={"Date of Birth"}
                  placeholder="Enter your DOB"
                  required
                  style={{ width: "240px" }}
                  error={errors.dob}
                  value={values.dob}
                  onChange={handleChange("dob")}
                />
              </Group>
              <Group>
                <Select
                  style={{ marginTop: "10px" }}
                  withAsterisk
                  label="Current Year"
                  placeholder="Pick one"
                  error={errors.currentYear}
                  value={values.currentYear}
                  onChange={handleSelectChange("currentYear")}
                  data={[
                    { value: "I", label: "I" },
                    { value: "II ", label: "II" },
                    { value: "III", label: "III" },
                    { value: "IV", label: "IV" },
                  ]}
                />
                <Select
                  withAsterisk
                  label="Current Semester"
                  style={{ marginTop: "10px" }}
                  placeholder="Pick one"
                  error={errors.currentSem}
                  value={values.currentSem}
                  onChange={handleSelectChange("currentSem")}
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
              </Group>
              <Group>
                <Select
                  style={{ marginTop: "10px" }}
                  withAsterisk
                  label="Branch"
                  placeholder="Pick one"
                  error={errors.branch}
                  value={values.branch}
                  onChange={handleSelectChange("branch")}
                  data={[
                    { value: "CTec", label: "CTec" },
                    { value: "AIDS", label: "AIDS" },
                    { value: "ENTC", label: "ENTC" },
                  ]}
                />
                <Select
                  withAsterisk
                  label="Section"
                  style={{ marginTop: "10px" }}
                  placeholder="Pick one"
                  error={errors.section}
                  value={values.section}
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
              </Group>

              <Group position="center" mt="xl">
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  onClick={validateForm}
                  style={{ backgroundColor: "#0368FF" }}
                >
                  Next step
                </Button>
              </Group>
            </Paper>
          </Container>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Academic Details">
          <Container size={550} my={40} style={{ paddingTop: "5vh" }}>
            <Title
              align="center"
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              Step 3 : Academic Details!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Tell us more about your academic details{" "}
            </Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <Group>
                <Input.Wrapper
                  id="fName"
                  withAsterisk
                  label="Registration Number"
                  error={errors.regNo}
                >
                  <Input
                    type="number"
                    placeholder="Registration Number"
                    label="Registration Number"
                    withAsterisk
                    mt="md"
                    style={{ width: "110%",marginTop : "2px" }}
                    value={values.regNo}
                    onChange={handleChange("regNo")}
                    error={errors.regNo}
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  id="fName"
                  withAsterisk
                  label="Roll Number"
                  error={errors.rollNo}
                  style={{ marginLeft: "30px" }}
                >
                  <Input
                    type="number"
                    placeholder="Class Roll Number"
                    label="Class Roll Number"
                    withAsterisk
                    mt="md"
                    style={{ width: "110%",marginTop : "2px" }}
                    value={values.rollNo}
                    onChange={handleChange("rollNo")}
                  />
                </Input.Wrapper>
              </Group>

              <Group style={{marginTop : "20px"}}>
                <Input.Wrapper
                  id="fName"
                  withAsterisk
                  label="Students Contact No "
                  error={errors.contact}
                >
                  <Input
                    type="number"
                    label="Faculty Name"
                    placeholder="Enter Contact No 1"
                    style={{ width: "110%" }}
                    value={values?.contact[0]}
                    onChange={handleContactChange(0)}
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  id="fName"
                  withAsterisk
                  label="Parents Contact No"
                  error={errors.contact}
                  style={{ marginLeft: "30px" }}
                >
                  <Input
                    type="number"
                    label="Faculty Name"
                    placeholder="Enter Contact No 2"
                    style={{ width: "110%" }}
                    value={values?.contact[1]}
                    onChange={handleContactChange(1)}
                  />
                </Input.Wrapper>
              </Group>
              <Textarea
                placeholder="Address"
                label="Enter the Address"
                withAsterisk
                mt="md"
                error={errors.address}
                value={values.address}
                onChange={handleChange("address")}
              />
              <Group position="center" mt="xl">
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  onClick={validateForm}
                  style={{ backgroundColor: "#0368FF" }}
                >
                  Next step
                </Button>
              </Group>
            </Paper>
          </Container>
        </Stepper.Step>
        <Stepper.Completed>
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <Title>
            {values.name}, You have completed the registration process
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Please enter the access code given by your institution{" "}
            </Text>
            <Center style={{ marginTop: "20px" }}>
              <PinInput error={false} onChange={setPassCode} />
            </Center>
            <Text
              style={{ fontSize: "14px", color: "#e03130", marginTop: "10px" }}
            >
              {mainError}
            </Text>
            <Button
            loading={loadingButton}
              style={{ marginTop: "20px", backgroundColor: "#0368FF" }}
              onClick={() => onClickSubmit()}
            >
              Submit & Continue{" "}
            </Button>
          </div>
        </Stepper.Completed>
      </Stepper>
    </>
  );
}

function PasswordRequirement({ meets, label }) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function PasswordInputAdvance({ passwordInput, setPasswordInput }) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState("");
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Box maw={340} mx="auto" style={{ marginTop: "10px" }}>
      <Popover
        opened={popoverOpened}
        position="bottom"
        width="target"
        transitionProps={{ transition: "pop" }}
      >
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Your password"
              value={passwordInput}
              onChange={(event) => (
                setValue(event.currentTarget.value),
                setPasswordInput("password", value)
              )}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress color={color} value={strength} size={5} mb="xs" />
          <PasswordRequirement
            label="Includes at least 6 characters"
            meets={value.length > 5}
          />
          {checks}
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
}
