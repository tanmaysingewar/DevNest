exports.validate = (value,setErrors) => {
  let error = false;
  for(let key in value){
    // Capitalizes the first letter of the key
    let keyCap = key.charAt(0).toUpperCase() + key.slice(1);
    if(!value[key]){
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: `${keyCap} is required`,
        allOk: false,
      }));
      error = true;
    }
    
  }
  return error;
}