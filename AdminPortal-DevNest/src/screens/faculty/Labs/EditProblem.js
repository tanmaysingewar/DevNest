import React, { useState } from "react";
// import {} from "@tabler/icons-react";
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
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function EditProblem({title}) {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
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
              title: "Edit Problem",
              href: `/faculty/labs?lab=${router.query.lab}&create=${router.query.create}&problem=${router.query.problem}`,
            },
          ]}
        />
        <Header
          title={`Edit Problem : ${router.query.problem}`}
          dec={"Setting of the this portal reflected all over the platform"}
        />
        <div style={{}}>
          <Group style={{ width: "600px" }}>
            <Group style={{}}>
              <Textarea
                style={{ width: "550px" }}
                placeholder="Enter problem statement"
                label="Enter Problem Statement"
                autosize
                minRows={2}
                required
              />
              <Textarea
                style={{ width: "550px" }}
                placeholder="Enter problem description"
                label="Enter Problem Description"
                autosize
                minRows={2}
                required
              />
              <Textarea
                style={{ width: "550px" }}
                placeholder="Enter Input Format"
                label="Enter Input Format"
                autosize
                minRows={2}
                required
              />
              <Textarea
                style={{ width: "550px" }}
                placeholder="Enter Output Format"
                label="Enter Output Format"
                autosize
                minRows={2}
                required
              />

              <Box>
                <Text>Example 1</Text>
                <TextInput
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Input"
                  label="Input"
                  required
                />
                <TextInput
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Output"
                  label="Output"
                  required
                />
                <Textarea
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Enter Explanation"
                  label="Enter Explanation"
                  autosize
                  minRows={2}
                  required
                />
              </Box>
              <Box>
                <Text>Example 2</Text>
                <TextInput
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Input"
                  label="Input"
                  required
                />
                <TextInput
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Output"
                  label="Output"
                  required
                />
                <Textarea
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Enter Explanation"
                  label="Enter Explanation"
                  autosize
                  minRows={2}
                  required
                />
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
                  {/* //loop this out */}
                  <Text>Test Case 1</Text>
                  <Group>
                    <Text>Input : [4,3,1,2,5]</Text>
                    <Text>Output : [1,2,3,4,5]</Text>
                    <Text>Date Type : num</Text>
                  </Group>
                </Card>
              </Box>

              <Box>
                <Text>Add Test Case</Text>
                <TextInput
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Data Type"
                  label="Data Type"
                  required
                />
                <TextInput
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Input"
                  label="Input"
                  required
                />
                <TextInput
                  style={{ width: "550px", marginTop: "10px" }}
                  placeholder="Output"
                  label="Output"
                  required
                />
              </Box>

              <Button color="violet" style={{}}>
                Add Example
              </Button>
            </Group>
          </Group>
        </div>
      </div>
    </div>
  );
}
