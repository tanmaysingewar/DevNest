import { authenticate } from "@/helper/auth";
import { postDate } from "@/helper/fetchDate";
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

export default function AuthenticationTitle() {

  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("auth")){
      setIsAuth(true)
      Router.push("/admin/labs")
    }
  }, [])
  
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    allOk: false,
  });

  const [loading, setLoading] = useState(false)

  const [mainError, setMainError] = useState("");

  const handleChange = (name) => (event) => {
    setErrors({ email: "", password: "", allOk: true });
    setMainError("");
    setValues({ ...values, [name]: event.target.value });
  };

  function saveTokenAndRedirect(data) {
    return new Promise((resolve, reject) => {
      // Async code to get the token, e.g., from an API request
  
      if (authenticate(data)) {
        // Save the token to local storage
        resolve("Token saved to local storage");
      } else {
        reject('Token not available');
      }
    });
  }

  const onClickLogin = async () => {

    setLoading(true)
    setMainError("");

    if (!password)
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
        allOk: false,
      }));
    if (!email)
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Emails is required",
        allOk: false,
      }));
    if (!errors.allOk) return setLoading(false);

    // execute below code after 4 seconds
      await postDate("/login", { email, password })
      .then(async (data) => {
        console.log(data);
        setLoading(false)
        if (!data.success) return setMainError("Email or password is incorrect");
        // save token to local storage
        // its redirect before saving token to local storage give me solotion
        saveTokenAndRedirect(data).then((token) => {
          console.log(token);
          Router.push("/admin/labs")
        }
        );
          
      });
  };

  if(!isAuth){
   
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
            Welcome back Admin!
          </Title>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              onChange={handleChange("email")}
              required
              error={errors.email}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              onChange={handleChange("password")}
              error={errors.password}
              mt="md"
            />
            <Group position="apart" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Text style={{fontSize : "14px",color : "#e03130",marginTop : "10px"}}>{mainError}</Text>
            <Button
              fullWidth
              mt="xl"
              style={{ backgroundColor: "#0368FF" }}
              onClick={() => onClickLogin()}
              loading={loading}
            >
              Sign in
            </Button>
          </Paper>
        </Container>
      </div>
    </>
  );
}
}