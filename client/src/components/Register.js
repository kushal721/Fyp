import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mix.css";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    uname: "",
    email: "",
    password: "",
    cpassword: "",
    role: "client", // set a default value for role
  });

  console.log(inpval);

  const setVal = (e) => {
    //defining setVal function
    // console.log(e.target.value);

    const { name, value } = e.target;
    setInpval((prevInpval) => ({
      ...prevInpval,
      [name]: value,
    }));
  };

  const addUserdata = async (e) => {
    e.preventDefault();
    // object destructuring
    const { uname, email, password, cpassword, role } = inpval;

    if (uname === "") {
      alert("please enter your name");
    } else if (email === "") {
      alert("Please enter your email");
    } else if (!email.includes("@")) {
      alert("Enter valid email");
    } else if (password === "") {
      alert("please enter your password");
    } else if (password.length < 6) {
      alert("password must be at least 6 char");
    } else if (cpassword === "") {
      alert("please enter your password");
    } else if (cpassword.length < 6) {
      alert("password must be at least 6 char");
    } else if (password !== cpassword) {
      alert("Password and confirm password did not match");
    } else {
      // console.log("user registration succesfully done");

      try {
        const data = await fetch("http://localhost:8009/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uname,
            email,
            password,
            cpassword,
            role,
          }),
        });

        const res = await data.json();
        if (res.status === 201) {
          alert("User registration done");
          // reset form values
          setInpval({
            uname: "",
            email: "",
            password: "",
            cpassword: "",
            role: "client",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1> Signup</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="uname">Name</label>
              <input
                type="text"
                onChange={setVal}
                value={inpval.uname}
                name="uname"
                id="uname"
                placeholder="Enter your Name"
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                id="email"
                placeholder="Enter Email Address"
                required
              />

              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.password}
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>

              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.cpassword}
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm Password"
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <label>Role:</label>
            <select value={inpval.role} onChange={setVal} name="role">
              <option value="client">Client</option>
              <option value="professional">Professional</option>
            </select>

            <button className="btn" onClick={addUserdata}>
              Signup
            </button>
            <p>
              Already have an Account? <NavLink to="/login">Login</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
