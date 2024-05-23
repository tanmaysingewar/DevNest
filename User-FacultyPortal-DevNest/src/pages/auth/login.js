import { authenticate } from "@/helper/auth";
import { postDate } from "@/helper/fetchDate";
import { validate } from "@/helper/validate";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import Head from "next/head";

import Router from "next/router";
import { useEffect, useState } from "react";

export default function FacultyAuth() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
  if(localStorage.getItem("faculty_auth")){
      setIsAuth(true)
      Router.push("/faculty/labs")
    }
  }, [])
  
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    allOk: true,
  });

  const [mainError, setMainError] = useState("");

  const [loadingButton, setLoadingButton] = useState(false)

  const handleChange = (name) => (event) => {
    setErrors({ email: "", password: "", allOk: true });
    setMainError("");
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    setLoadingButton(true)
    let error = validate(values, setErrors);
    if (error) return setLoadingButton(false);
      postDate("/student/login", values).then((res) => {
        console.log(res);
        if (res.success === false) {
        setLoadingButton(false)
          setMainError(res?.message || "Email or Password is incorrect");
        }
        if (res.success === true) {
          authenticate(res.response);
          Router.push("/student/labs");
        }
      });
  };

  if(isAuth){
    return <></>
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div style={{ paddingTop: "15vh" }}>
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Welcome back 😄
          </Title>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              onChange={handleChange("email")}
              error={errors.email}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              onChange={handleChange("password")}
              mt="md"
              error={errors.password}
            />
            <Group position="apart" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Text
              style={{ fontSize: "14px", color: "#e03130", marginTop: "10px" }}
            >
              {mainError}
            </Text>
            <Button
              fullWidth
              mt="xl"
              loading={loadingButton}
              style={{ backgroundColor: "#0368FF" }}
              onClick={() => handleSubmit()}
            >
              Sign in
            </Button>
          </Paper>
          <Text align="center" mt={20}>
            {`Go to Faculty `}
            <Anchor
              component="button"
              style={{ Color: "#0368FF" }}
              onClick={() => Router.push("/auth/facultyLogin")}
            >
              Login
            </Anchor>
          </Text>
        </Container>
      </div>
    </>
  );
}
