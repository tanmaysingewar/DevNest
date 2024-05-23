import React, { useContext, useEffect, useState } from "react";
// import {} from "@tabler/icons-react";
import { Button, Loader, Text, Title, useMantineColorScheme,Modal } from "@mantine/core";
import Router, { useRouter } from "next/router";
import { LoaderContext } from "./Context";
import { deleteDate, fetchDate } from "@/helper/fetchDate";

export default function FacultyPracticalCard({
  title,
  dec,
  color,
  show,
  setShow,
  index,
  _id
}) {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [deletePopUp, setDeletePopUp] = useState(false)


  const [loadDeleteBUtton, setLoadDeleteBUtton] = useState(false)

  const setShowIndex = (index) => {
    if (show === index) {
      setShow(null);
      return;
    }
    setShow(index);
  };

  let cardColor = "#25262B";

  if (colorScheme === "dark") {
    cardColor = "#25262B";
  } else {
    cardColor = "#f8f9fa";
  }


  const [data, setData] = useState({
    problems: [],
    success: false,
  });



  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchDate(`/faculty/get/all/problem?practical_id=${_id}`).then((res) => {
      console.log(res);
      if (!res.success) return setLoading(false);
      setData({ problems : res.response, success: true });
      setLoading(false)
    });
  }, []);

  const onClickDelete = () => {
    setLoadDeleteBUtton(true)
    deleteDate(`/faculty/delete/practical?practical_id=${_id}`).then((res) => {
      if(!res.success) return setLoadDeleteBUtton(false);
     router.reload()
    })
  }



  return (
    <>
     <Modal opened={deletePopUp} onClose={() => setDeletePopUp(false)} title="Delete Lab">
    <Text style={{marginBottom : "10px"}}>Problem : {title}</Text>
    <Text style={{marginBottom : "10px"}}>Are you sure you want to delete this Problem?</Text>
    <Button loading={loadDeleteBUtton} color="red" onClick={() => onClickDelete()}>Delete</Button>
    </Modal>
      <div
      onClick={() => setShowIndex(index)}
        style={{
          marginTop: "20px",
          display: "flex",
          backgroundColor: cardColor,
          width: "600px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: "20px",
            backgroundColor: color,
            borderRadius: "10px 0 0 10px",
          }}
        ></div>
        <div
          style={{ margin: "15px 15px 15px 10px",width : "95%" }}
          
        >
          <Title style={{ fontSize: "18px" }}>{title}</Title>
          <Text style={{ fontSize: "12px", lineHeight: "16px" }}>{dec}</Text>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <div>
              {/* if Array is empty show message */}
              {
                data.problems.length === 0 ? (
                  <Text style={{ fontSize: "12px", lineHeight: "20px" }}>
                   {loading ?  <Loader size="xs" variant="dots"  /> : "No Problems Found"}
                  </Text>
                ) : null
              }
              {data.problems.map((item, index) => {
                if (index < 4) {
                  return (
                    <Problems index={index}  item={item} />
                  );
                }
              })}
            </div>
            <div style={{ marginLeft: "10px" }}>
              {data.problems.map((item, index) => {
                if (index >= 4 && index < 8) {
                  return (
                    <Problems index={index}  item={item} />
                  );
                }
              })}
            </div>
            <div style={{ marginLeft: "10px" }}>
              {data.problems.map((item, index) => {
                if (index >= 8 && index < 12) {
                  return (
                    <Problems index={index}  item={item} />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
      {show === index ? (
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <Button
            style={{
              borderRadius: "10px",
              backgroundColor: "#0368FF",
              color: "#fff",
            }}
            onClick={() =>
              Router.push(
                `/faculty/labs?lab=${router.query.lab}&edit=practical&practical=${_id}`
              )
            }
          >
            Edit Practical
          </Button>
          <Button
            style={{
              borderRadius: "10px",
              backgroundColor: "#CF75FF",
              color: "#fff",
              marginLeft: "8px",
            }}
          >
            View & Edit Material
          </Button>
          <Button
            style={{
              borderRadius: "10px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              marginLeft: "8px",
            }}
            onClick={() =>
              Router.push(
                `/faculty/labs?lab=${router.query.lab}&create=problem&practical=${_id}`
              )
            }
          >
            Add Problems
          </Button>
          <Button
            style={{
              borderRadius: "10px",
              backgroundColor: "#f94449",
              color: "#fff",
              marginLeft: "8px",
            }}
            onClick={() => setDeletePopUp(true)}
          >
            Delete Practical
          </Button>
        </div>
      ) : null}
    </>
  );
}

const Problems = ({item,index}) => {
  const router = useRouter();
  return (
    <div
      key={index}
    >
      <Text
        style={{
          fontSize: "12px",
          lineHeight: "20px",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => Router.push(`/faculty/labs?lab=${router.query.lab}&edit=problem&problem=${item._id}&problem_name=${item.problem_name}`)}
      >
        {/* Practical NAme should dispay like this Practical 1 : hello Wo.... , it should not extend by 30 char */}

        {/* {`Practical ${index + 1} : `}{item.problem_name} */}
        {formatPracticalName({inputName : item.problem_name,index})}
      </Text>
    </div>
  );
};

function formatPracticalName(input) {
  const maxStringLength = 25;
  const { inputName, index } = input;
  const practicalNumber = index + 1;
  if (inputName.length <= maxStringLength - 12) {
    return `Practical ${practicalNumber} : ${inputName}`;
  } else {
    const truncatedString = inputName.slice(0, maxStringLength - 15);
    return `Practical ${practicalNumber} : ${truncatedString}...`;
  }
}
