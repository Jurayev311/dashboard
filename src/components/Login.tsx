import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "john32" && password === "12345678j") {
      localStorage.setItem("token", "fake-jwt-token");
      navigate("/dashboard");
    } else {
      alert("Login yoki parol noto‘g‘ri!");
    }
  };

  return (
   <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", }}>
     <div style={{ display: "flex",border: "#DDDDDD 1px solid", borderRadius: "12px", padding: "25px", flexDirection: "column", width: "400px", justifyContent: "center", height: "271px" }}>
      <h2 style={{marginBottom: "10px"}}>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: "16px", padding: "10px", width: "100%", borderRadius: "8px", border: "1px solid #DDDDDD" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{marginBottom: "10px", padding: "10px", width: "100%", borderRadius: "8px", border: "1px solid #DDDDDD"  }}
      />
      <button onClick={handleLogin} style={{ padding: "10px 20px", cursor: "pointer", background: "#454545", color: "white", borderRadius: "8px", border: "none" }}>Login</button>
    </div>
   </div>
  );
};

export default LoginPage;
