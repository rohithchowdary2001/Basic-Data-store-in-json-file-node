import React, { useState } from "react";
import RegistrationPage from "./RegistrationPage";
import UsersPage from "./UsersPage";

const App = () => {
  const [view, setView] = useState("register");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Registration System</h1>
      <div>
        <button onClick={() => setView("register")}>Register</button>
        <button onClick={() => setView("viewUsers")}>View Users</button>
      </div>
      <hr />
      {view === "register" && <RegistrationPage />}
      {view === "viewUsers" && <UsersPage />}
    </div>
  );
};

export default App;
