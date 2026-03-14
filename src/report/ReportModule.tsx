import { useEffect, useState } from "react"
import { get, post } from "../service/apiCall";
import { nanoid } from "nanoid";

const ReportModule = () => {
  const [report, setReport] = useState([]);
  const [reportModule, setReportModule] = useState<any>([]);
  const [toadd, setToAdd] = useState<any>([]);
  const [allModules, setAllModules] = useState<any>([]);
  useEffect(() => {
    fetchAsync();
  }, [])

  const fetchAsync = async () => {
    try {
      const apiUrl = import.meta.env.VITE_ERP_REPORT;

      const url = `${apiUrl}/report`
      const response = await get(url);
      setReport(response.data)

    } catch (error) {
      console.error("Login Error", error);
    }
    try {
      const apiUrl = import.meta.env.VITE_ERP_REPORT;

      const url = `${apiUrl}/reportModule`
      const response = await get(url);
      setAllModules(response.data)

    } catch (error) {
      console.error("Login Error", error);
    }
  }
  const handleChange = (e: any) => {
    const selectId = e.target.value;

    if (selectId) {
      const findReportById: any = report.find((item: any) => item.id == selectId);
      setReportModule(findReportById)
      if (toadd?.length > 0) {
        setToAdd((prev: any) =>
          prev.map((item: any) => ({
            ...item,
            reportId: findReportById.id,
            impactModuleId: null
          }))
        );
      }
    } else {
      setReportModule([]);
      setToAdd([])
    }
  }
  const add = () => {
    const reportId = reportModule?.id;
    if (!reportId) {
      alert("please Select Report Id");
      return;
    }

    const payload: any = {
      index: nanoid(),
      name: null,
      orderNo: null,
      impactModuleId: null,
      reportId: reportId
    }
    setToAdd([...toadd, payload])
  }
  const handleInputChange = (e: any, index: string) => {
    const value = e.target.value?.trim();
    const keyName = e.target.name;

    if (keyName) findAndUpdate(index, value, keyName);
  }

  const findAndUpdate = (id: String, value: any, KeyName: string) => {
    const findIndex = toadd.findIndex((item: any) => item.index == id);
    if (KeyName === "orderNo" || KeyName === "impactModuleId") {
      const valueToInt = parseInt(value);
      value = Number.isNaN(valueToInt) ? null : valueToInt

    }

    let AllData = toadd;
    if (findIndex >= 0) {
      AllData[findIndex][KeyName] = value;
      setToAdd(AllData);

    }

  }
  const submit = async () => {
    try {
      const apiUrl = import.meta.env.VITE_ERP_REPORT;

      const url = `${apiUrl}/reportModule`

      const response = await post(url, toadd);
      console.log("submit --->", response);
      setToAdd([]);


    } catch (error) {
      console.error("Login Error", error);
    }

  }

  return (
    <div>
      <select name="" id="" onChange={handleChange}>
        <option value="">Choose Dashboard</option>
        {report.map((item: any) => {
          return <option key={item.id} value={item.id}>{item.name}</option>
        })}
      </select>
      <div>
        <h1>Modules</h1>
        <table cellSpacing={20} width={"100%"}>
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Module Name</th>
              <th>Order</th>
            </tr>
          </thead>

          <tbody>
            {reportModule?.reportModule?.map((item: any) => (
              <tr key={item.id}>
                <td>{reportModule?.name}</td>
                <td>{item.name}</td>
                <td>{item.orderNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div>
          {
            reportModule?.reportModule && reportModule.reportModule.map((item: any) => {

              return (

                <div key={item.id}>{item.name}</div>
              )
            })
          }
        </div> */}
      </div>
      <div>
        <button onClick={add}>Add</button>
        <div>
          {
            toadd && toadd.map((item: any) => {
              return (
                <div key={item.index}>
                  <input type="text" placeholder="Name" name="name" onChange={(e) => handleInputChange(e, item.index)} />
                  <input type="number" placeholder="Order No" name="orderNo" onChange={(e) => handleInputChange(e, item.index)} />
                  <select name="impactModuleId" id="" onChange={(e) => handleInputChange(e, item.index)}>
                    <option value="" >Impact Module</option>
                    {allModules && allModules.map((item: any) => {
                      return <option key={item.id} value={item.id}>{item.name}</option>
                    })}

                  </select>

                </div>
              )
            })
          }
        </div>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  )
}

export default ReportModule