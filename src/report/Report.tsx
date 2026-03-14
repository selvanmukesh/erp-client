import { useState } from "react";
import { post } from "../service/apiCall";

const Report = () => {

  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleLogin = async () => {
    try {
      const apiUrl = import.meta.env.VITE_ERP_REPORT;

      const url = `${apiUrl}/report`
      const payload = {
        name: name,
        orderNo: parseInt(orderId)
      }

      const response = await post(url, payload);
      console.log("response--->", response);

    } catch (error) {
      console.error("Login Error", error);
    }
  };

  return (
    <div>

      <h2>Report</h2>

      <input
        type="email"
        placeholder="Email"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <input
        type="number"
        placeholder="Order No"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>Submit</button>

    </div>
  );
}

export default Report