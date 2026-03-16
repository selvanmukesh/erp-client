import { useEffect, useState } from "react";
import { get, post, put } from "../service/apiCall";

const Report = () => {

  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [link, setLink] = useState("");
  const [allReportData, setAllReportData] = useState<any>([])

  useEffect(() => {
    fetchAsyncData();
  }, [])

  const handleLogin = async () => {
    try {
      const apiUrl = import.meta.env.VITE_ERP_REPORT;

      const url = `${apiUrl}/report`
      const payload = {
        name: name,
        orderNo: parseInt(orderId),
        link: link
      }

      const response = await post(url, payload);
      console.log("response--->", response);

    } catch (error) {
      console.error("Login Error", error);
    }
  };
  const fetchAsyncData = async () => {
    // reportTable
    const apiUrl = import.meta.env.VITE_ERP_REPORT;

    const [reportData]: any = await Promise.allSettled([get(`${apiUrl}/report/reportTable`)]);
    console.log(reportData.value.data);

    if (reportData && reportData?.value?.data) {
      console.log("reportData----->", reportData);
      setAllReportData(reportData?.value?.data)
    }
  }
  const handleInputChange = (e: any, id: number) => {
    const value = e.target.value?.trim();
    const keyName = e.target.name;

    if (keyName) findAndUpdate(id, value, keyName);
  }

  const findAndUpdate = (id: number, value: any, KeyName: string) => {
    const findIndex = allReportData.findIndex((item: any) => item.id === id);
    console.log(id, "-----", findIndex);

    if (KeyName === "orderNo") {
      const valueToInt = parseInt(value);
      value = Number.isNaN(valueToInt) ? null : valueToInt

    }

    let AllData = allReportData;
    if (findIndex >= 0) {
      AllData[findIndex][KeyName] = value;
      setAllReportData(AllData);

    }

  }

  const submit = async () => {
    // console.log("allReportData---->", allReportData);

    try {
      const apiUrl = import.meta.env.VITE_ERP_REPORT;

      const url = `${apiUrl}/report`

      const response = await put(url, allReportData);
      console.log("submit --->", response);
      // setAllReportData([]);


    } catch (error) {
      console.error("Login Error", error);
    }

  }

  return (
    <div>
      <div>

        <h2>Report</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="test"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
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
      <div>
        <h1>Edit</h1>
        {allReportData && allReportData.map((item: any) => {
          return (
            <div key={item.id}>
              <input type="text" placeholder="Name" defaultValue={item.name} name="name" onChange={(e) => handleInputChange(e, item.id)} />
              <input type="text" placeholder="Link" defaultValue={item.link} name="link" onChange={(e) => handleInputChange(e, item.id)} />
              <input type="number" placeholder="Order No" name="orderNo" defaultValue={item.orderNo} onChange={(e) => handleInputChange(e, item.id)} />

            </div>
          )
        })}
        <button onClick={submit}>Update</button>
      </div>

    </div>
  );

}

export default Report