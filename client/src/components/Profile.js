import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

const Profile = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  console.log(logindata.ValidUserOne);

  // Check if ValidUserOne exists before accessing its properties
  const userEmail = logindata?.ValidUserOne?.email;

  const history = useNavigate();

  const ProfileValid = async () => {
    let token = localStorage.getItem("usersdatatoken"); //get userdatatoken
    // console.log(token);

    //called api for validuser
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    // console.log(data);
    if (data.status === 401 || !data) {
      history("*");
    } else {
      console.log("user verify");
      setLoginData(data);
      history("/profile");
    }
  };
  useEffect(() => {
    ProfileValid();
  }, []);

  return (
    <>
      <div style={{ alignItems: "center" }}>
        <h1>User profile</h1>
        <h2>User Name: {logindata ? logindata.ValidUserOne.uname : ""}</h2>
        <h2>User Email: {logindata ? logindata.ValidUserOne.email : ""}</h2>
        <h2>User Role: {logindata ? logindata.ValidUserOne.role : ""}</h2>
      </div>
    </>
  );
};

export default Profile;
