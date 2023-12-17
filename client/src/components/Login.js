import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";

const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  console.log(inpval);

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      alert("Please enter your email");
    } else if (!email.includes("@")) {
      alert("Enter valid email");
    } else if (password === "") {
      alert("please enter your password");
    } else if (password.length < 6) {
      alert("password must be at least 6 char");
    } else {
      // console.log("user login succesfully done");
      try {
        const data = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const res = await data.json();

        if (res.status === 201) {
          //if user is valid

          localStorage.setItem("usersdatatoken", res.result.token); //taking the token and storing it in localstorage
          alert("Login successful");
          history("/profile");

          setInpval({
            ...inpval,
            email: "",
            password: "",
          });
        }
        // console.log("usersdatatoken");
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Invalid username or password");
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1> Login</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                id="email"
                placeholder="Enter Email Address"
              />

              <label htmlFor="email">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.password}
                  name="password"
                  id="password"
                  placeholder="Enter Email Address"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={loginuser}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
            </p>
            <br />
            <NavLink to="/reset-password">Forgot Password?</NavLink>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
