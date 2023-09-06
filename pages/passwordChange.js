import axios from "axios";
import React from "react";

export default function PasswordChangePage() {
  const handlePasswordChange = async () => {
    const response = await axios.patch("/api/user/changePassword", {
      oldPassword: "oldPassword",
      newPassword: "newPassword",
    });

    console.log(response.data)
  };


  return (
    <div>
      <button onClick={handlePasswordChange}>Change password</button>
    </div>
  );
}
