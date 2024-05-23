const { API_URL } = require("../../backend");
const { API_URL_CODE_EXE } = require("../../codeexe");

const { isAuthenticated } = require("./auth");


exports.fetchDate = async (url) => {
  const token = isAuthenticated().token || "";
  try {
    const response = await fetch(`${API_URL}${url}`,{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err)
    return {success : false, response : err}
  }
};

exports.postDate = async (url, data) => {
  const token = isAuthenticated().token || "";
  try{
    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    return response.json();
  }
  catch(err){
    console.log(err)
    return {success : false, response : err}
  }
};

exports.updateDate = async (url, data) => {
  const token = isAuthenticated().token || "";
  try{
    const response = await fetch(`${API_URL}${url}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  catch(err){
    console.log(err)
    return {success : false, response : err}
  }

};

exports.deleteDate = async (url) => {
  const token = isAuthenticated().token || "";
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  }
  catch(err){
    console.log(err)
    return {success : false, response : err}
  }
};

exports.exeCode = async (url,data) => {
  console.log(data)
  const token = isAuthenticated().token || "";
  try{
    const response = await fetch(`${API_URL_CODE_EXE}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body : JSON.stringify(data),
    });
    return response.json();
  }
  catch(err){
    console.log(err)
    return {success : false, response : err}
  }
}
