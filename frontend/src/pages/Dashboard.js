import axios from "axios";
import { useState } from "react";

function Dashboard() {
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState("");
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const updateCourse = async () => {
    try {
      await axios.put(
        "hthttps://student-backend-ah7p.onrender.com/api/update-course",
        { course },
        { headers: { Authorization: token } }
      );
      alert("Course updated");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const updatePassword = async () => {
    try {
      await axios.put(
        "https://student-backend-ah7p.onrender.com/api/update-password",
        password,
        { headers: { Authorization: token } }
      );
      alert("Password updated");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      <h4>Update Course</h4>
      <input
        placeholder="New Course"
        onChange={(e) => setCourse(e.target.value)}
        className="form-control mb-2"
      />
      <button onClick={updateCourse} className="btn btn-info mb-3">
        Update Course
      </button>

      <h4>Update Password</h4>
      <input
        placeholder="Old Password"
        onChange={(e) =>
          setPassword({ ...password, oldPassword: e.target.value })
        }
        className="form-control mb-2"
      />
      <input
        placeholder="New Password"
        onChange={(e) =>
          setPassword({ ...password, newPassword: e.target.value })
        }
        className="form-control mb-2"
      />
      <button onClick={updatePassword} className="btn btn-warning mb-3">
        Update Password
      </button>

      <button onClick={logout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;