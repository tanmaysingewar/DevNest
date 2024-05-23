import {
  Button,
  Text,
  Box,
  Input,
  Select,
  Textarea,
  Popover,
  PasswordInput,
  Progress,
} from "@mantine/core";
import Router from "next/router";
import { DateInput } from "@mantine/dates";
import Header from "@/Components/Header";
import BackNav from "@/Components/BackNav";
import { useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import { postDate } from "@/helper/fetchDate";
import { validate } from "@/helper/validate";
import { isAuthenticated } from "@/helper/auth";

export default function CreateFaculty() {

  const auth = isAuthenticated()
  
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    f_id: "",
    collage_code: auth?.admin?.collage_code,
  });

  console.log(value);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    f_id: "",
    allOk: false,
  });

  const [loading, setLoading] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);

  const [mainError, setMainError] = useState("");

  const handleChange = (name) => (event) => {
    setValue({ ...value, [name]: event?.target?.value });
    setErrors({ ...errors, [name]: "" });
  };

  const onClickCreate = () => {
    setLoadingButton(true);
    if (validate(value, setErrors)) return setLoadingButton(false);

    postDate("/create/faculty", value).then((res) => {
      setLoadingButton(false)
      if (!res.success) return setMainError(res?.message || "Something went wrong");
      Router.push("/admin/facultyDetails");
    });
  };

  return (
    <div style={{ height: "100vh", overflowY: "scroll", width: "100%" }}>
      <div style={{ marginTop: "60px" }}>
        <div style={{ marginTop: "40px" }}>
          <BackNav dataTrack={[]} />
          <Header title={`Create Faculty`} />
        </div>
        <div style={{ width: "100%" }}>
          <Box padding="xl" style={{ width: "650px" }}>
            <div>
              <Input.Wrapper
                id="fName"
                withAsterisk
                label="Name of the Faculty"
                description="Please enter proper name of faculty this will reflect all over the platform"
                error={errors.name}
              >
                <Input
                  label="Faculty Name"
                  placeholder="Enter Faculty Name"
                  style={{ width: "500px" }}
                  value={value.name}
                  onChange={handleChange("name")}
                />
              </Input.Wrapper>

              <div style={{ marginTop: "20px", display: "flex" }}>
                <Input.Wrapper
                  id="fEmail"
                  withAsterisk
                  label="Faculty ID"
                  error={errors.f_id}
                >
                  <Input
                    label="Email"
                    placeholder="Enter Proper Email Id"
                    style={{ width: "300px" }}
                    value={value.f_id}
                    onChange={handleChange("f_id")}
                  />
                </Input.Wrapper>
              </div>
              <div style={{ marginTop: "20px", display: "flex" }}>
                <Input.Wrapper
                  id="fEmail"
                  withAsterisk
                  label="Email Id"
                  error={errors.email}
                >
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter Proper Email Id"
                    style={{ width: "300px" }}
                    value={value.email}
                    onChange={handleChange("email")}
                  />
                </Input.Wrapper>
              </div>
              {/* --------------------  Password ------------------------  */}

              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                onChange={handleChange("password")}
                error={errors.password}
                style={{ width: "300px" }}
                mt="md"
              />

              {/* -------------------------------------------------------- */}
            </div>
          </Box>
          <div style={{ marginTop: "40px", marginBottom: "60px" }}>
            <Text style={{ fontSize: "12px", marginBottom: "10px" }}>
              <b>Note :</b> Email will send to the given Email Id with Password
            </Text>
            <Text style={{fontSize : "14px",color : "#e03130",marginTop : "10px"}}>{mainError}</Text>
            <Button onClick={() => onClickCreate()} loading={loadingButton}>
              Create & Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
