import React, { useState, useContext } from "react";

import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import InputGroup from "../../components/InputGroup";
import CheckboxGroup from "../../components/CheckboxGroup";

import axios from "../../axios";
import SelectGroup from "../../components/SelectGroup";
import { Context } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Auth() {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (user) navigate("/");

  const handleContinue = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/users", {
        name,
        email,
        gender,
        status: "active",
      });

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      window.localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-5/6 sm:w-2/3 md:w-1/2 my-12 py-6 px-6 shadow mx-auto rounded-sm">
      <form onSubmit={handleContinue} className="w-full mx-auto text-center">
        <div className="">
          <h2 className="text-3xl font-bold text-gray-800">
            Create an account
          </h2>
        </div>
        <div className="mt-12">
          <FormGroup>
            <InputGroup
              type="text"
              name="name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e)}
            />
          </FormGroup>
          <FormGroup>
            <InputGroup
              type="email"
              name="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e)}
            />
          </FormGroup>
          <FormGroup>
            <SelectGroup
              placeholder="Select..."
              name="gender"
              options={[
                {
                  value: "male",
                  label: "Male",
                },
                {
                  value: "female",
                  label: "Female",
                },
              ]}
              onChange={(val) => setGender(val)}
            />
          </FormGroup>
          <FormGroup>
            <Button
              text={loading ? "..." : "Continue"}
              disabled={loading}
              submit
              full
              type="submit"
            />
          </FormGroup>
          <div className="mt-6 border-t border-b border-gray-300">
            <FormGroup>
              <CheckboxGroup
                label="Remember this device"
                name="rememberMe"
                defaultChecked
              />
            </FormGroup>
          </div>
          <p className="text-sm mt-6 text-left">
            By continuing you accept our{" "}
            <a href="#" className="text-blue-400">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-400">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
}

export default Auth;
