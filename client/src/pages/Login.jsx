import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        inputValue,
        { withCredentials: true }
      );
      console.log(data)
      if (data.success) {
        console.log(data.success)
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="form_container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputValue.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputValue.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>

        <p>
          Don't have account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;