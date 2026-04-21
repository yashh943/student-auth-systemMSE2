import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://student-backend-ah7p.onrender.com/api/login", form);

      localStorage.setItem("token", res.data.token);
      alert("Login successful");

      navigate("/dashboard");

    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" />
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
}

export default Login;