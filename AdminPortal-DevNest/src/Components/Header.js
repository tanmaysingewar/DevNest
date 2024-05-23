import { Title, Text } from "@mantine/core";

export default function Header({ title,dec }) {
  return (
    <>
      <div style={{marginTop : "10px",marginBottom : "10px"}}>
        <div>
          <Title style={{ textAlign: "left"}}>
            {title}{/* Assigned Labs 😄 */}
          </Title>
          <div style={{ textAlign: "center"}}>
            <Text
              size={"xs"}
              style={{ textAlign: "left" }}
            >
              {/* These Labs assign to you by the ADMIN, if changes required plz
              contact the admin */}
              {dec}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
