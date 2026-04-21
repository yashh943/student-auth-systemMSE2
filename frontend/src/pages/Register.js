import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://student-backend-ah7p.onrender.com/api/register", form);
      alert(res.data.msg);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} className="form-control mb-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" />
        <input name="course" placeholder="Course" onChange={handleChange} className="form-control mb-2" />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;