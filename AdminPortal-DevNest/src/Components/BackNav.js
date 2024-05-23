import {
  Button,
  Text,
  Box,
  Input,
  Select,
  Textarea,
  Breadcrumbs,
  Anchor
} from "@mantine/core";
import { useRouter } from "next/router";
import { IconArrowLeft } from "@tabler/icons-react";

export default function BackNav({ dataTrack }) {
  const router = useRouter();
  const items = dataTrack.map((item, index) => (
    <Anchor onClick={() => router.push(item.href)} key={index} style={{ color: "#74C0FC" }}>
      {item.title}
    </Anchor>
  ));
  return (
    <>
      <div>
        <Button
          variant="default"
          leftIcon={<IconArrowLeft size="1rem" />}
          style={{}}
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Breadcrumbs
          style={{
            marginTop: "10px",
            color: "red",
            paddingLeft: "2px",
          }}
        >
          {items}
        </Breadcrumbs>
      </div>
    </>
  );
}
