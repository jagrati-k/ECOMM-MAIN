import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserInput from "./hooks/User-Input";
import style from "./Signup.module.css";
const Signup = () => {
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const {
    value: fname,
    nameIsInValid: invalidFName,
    onValueInputHandler: onFNameChangeHandler,
    onErrorHandler: fnameBlurHandler,
    nameIsValid: validFName,
    reset: resetFNameHandler,
  } = UserInput((value) => value.length > 0);
  const {
    value: lname,
    nameIsInValid: invalidLName,
    onValueInputHandler: onLNameChangeHandler,
    onErrorHandler: lnameBlurHandler,
    nameIsValid: validLName,
    reset: resetLNameHandler,
  } = UserInput((value) => value.length > 0);
  const {
    value: username,
    nameIsInValid: invalidUserName,
    onValueInputHandler: onUsernameChangeHandler,
    onErrorHandler: userNameBlurHandler,
    nameIsValid: validUserame,
    reset: resetUserNameHandler,
  } = UserInput((value) => value.length > 0);

  const {
    value: email,
    nameIsInValid: invalidEmail,
    onValueInputHandler: onEmailChangeHandler,
    onErrorHandler: emailBlurHandler,
    nameIsValid: validEmail,
    reset: resetEmailHandler,
  } = UserInput((value) => value.includes("@gmail.com"));

  const {
    value: password,
    nameIsInValid: invalidPassword,
    onValueInputHandler: onPasswordChangeHandler,
    onErrorHandler: passwordBlurHandler,
    nameIsValid: validPassword,
    reset: resetPasswordrHandler,
  } = UserInput((value) => value.length >= 6);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validEmail && !validFName && validPassword && validLName && validEmail) {
      return;
    }

try {
  let signup = await fetch("http://localhost:9092/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:email,
        fname:fname,
        username:username,
        password:password,
        lname:lname,
        fname:fname
        
      }),
    });

    if (!signup.ok) {
      throw new Error(`HTTP REQ ERROR ${signup.status}`)
    }else{
      let responseData = await signup.json();
      console.log(responseData);
      navigate("/login", { replace: true });

    }
} catch (error) {
  alert("Somting Went Worng !!", error)
  console.log("Somthing Went Worng !!", error)
}
    // console.log({password, email, fname,lname});


    resetFNameHandler();
    resetEmailHandler();
    resetLNameHandler();
    resetUserNameHandler();
    resetPasswordrHandler();
  };

  useEffect(() => {
    if (validEmail && validFName && validPassword && validLName) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [validEmail, validFName, validPassword, validLName]);
  return (
    <div className={style.signupContainer}>
      <h3>Create Account</h3>
      <form action="" onSubmit={submitHandler}>
        <div className={style.inputFiled}>
          <label htmlFor="fname">First Name</label>
          <input
            className={style.input}
            type="text"
            id="fname"
            placeholder="Enter the First Name"
            value={fname}
            onChange={onFNameChangeHandler}
            onBlur={fnameBlurHandler}
          />
          {invalidFName && <p className={style.error}>Please enter a Fname</p>}
        </div>
        <div className={style.inputFiled}>
          <label htmlFor="lname">Last Name</label>
          <input
            className={style.input}
            type="text"
            id="lname"
            placeholder="Enter the Last Name"
            value={lname}
            onChange={onLNameChangeHandler}
            onBlur={lnameBlurHandler}
          />
          {invalidLName && <p className={style.error}>Please enter a Lname</p>}
        </div>
        <div className={style.inputFiled}>
          <label htmlFor="username">User Name</label>
          <input
            className={style.input}
            type="text"
            id="username"
            name="username"
            placeholder="Enter the unique Username "
            value={username}
            onChange={onUsernameChangeHandler}
            onBlur={userNameBlurHandler}
          />
          {invalidUserName && <p className={style.error}>Please enter a Username</p>}
        </div>
        <div className={style.inputFiled}>
          <label htmlFor="email">Email </label>
          <input
            type="text"
            id="email"
            placeholder="Email Ex. sandeep@cbnits.com"
            value={email}
            onChange={onEmailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {invalidEmail && (
            <p className={style.error}>Please enter an email address</p>
          )}
        </div>
        <div className={style.inputFiled}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="At list 6 charector Ex 123456"
            value={password}
            onChange={onPasswordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {invalidPassword && (
            <p className={style.error}>Please enter a password.</p>
          )}
        </div>
        <div className={style.actionButton}>
          <button type="submit" disabled={!formIsValid}>
            Continue
          </button>
        </div>
      </form>

      <footer>
        <p>
          Already have an account ?<NavLink to="/login">Sigin In</NavLink>{" "}
          <br />
          <NavLink to="/">Back To Home</NavLink>
        </p>
      </footer>
    </div>
  );
};

export default Signup;
