import { useEffect, useState } from "react"
import { get, post } from "../service/apiCall";
import { nanoid } from "nanoid";

const ReportModule = () => {
  const [report, setReport] = useState([]);
  const [reportModule, setReportModule] = useState<any>([]);
  const [toadd, setToAdd] = useState<any>([]);
  const [allModules, setAllModules] = useState<any>([]);
  const [updateReportModule, setUpdateReportModule] = useState<any>([]);
  useEffect(() => {
    fetchAsync();
  }, [])
  //   {
  //     "id": 66,
  //     "name": "CRM Main",
  //     "orderNo": 1,
  //     "impactModuleId": null
  // },

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
      setAllModules(response.data);

    } catch (error) {
      console.error("Login Error", error);
    }
  }
  const handleChange = (e: any) => {
    const selectId = e.target.value;

    if (selectId) {
      const findReportById: any = report.find((item: any) => item.id == selectId);
      findReportModuleById(findReportById.id)
      // setReportModule(findReportById)
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
    const reportId = reportModule?.[0]?.reportId;
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
      const reportId = reportModule?.[0]?.reportId;


      setToAdd([]);
      if (reportId) findReportModuleById(reportId);


    } catch (error) {
      console.error("Login Error", error);
    }

  }

  const findReportModuleById = async (id: string) => {
    try {
      const apiUrl = import.meta.env.VITE_ERP_REPORT;

      const url = `${apiUrl}/reportModule/${id}`
      const response = await get(url);
      setReportModule(response.data)
      // setReport(response.data)
      let payload: any = response.data.map((item: any) => {
        return {
          id: item.moduleId,
          name: item.moduleName,
          orderNo: item.moduleOrder,
          impactModuleId: item.impactModuleId,
          reportId: item.reportId
        }
      })
      console.log("payload--->140--->", payload);


      setUpdateReportModule(payload)

    } catch (error) {
      console.error("Login Error", error);
    }
  }

  const handleUpdateInputChange = (e: any, index: string) => {
    const value = e.target.value?.trim();
    const keyName = e.target.name;

    if (keyName) findUpdateInputChange(index, value, keyName);
  }
  const findUpdateInputChange = (id: String, value: any, KeyName: string) => {
    const findIndex = updateReportModule.findIndex((item: any) => item.id == id);
    console.log("finded Index--->",findIndex);
    
    if (KeyName === "orderNo" || KeyName === "impactModuleId") {
      const valueToInt = parseInt(value);
      value = Number.isNaN(valueToInt) ? null : valueToInt
    }

    let AllData = updateReportModule;
    if (findIndex >= 0) {
      AllData[findIndex][KeyName] = value;
      setUpdateReportModule(AllData);

    }

  }

  const updateAll=async()=>{

    console.log("updateAll--->",updateReportModule);
    try {
      const apiUrl = import.meta.env.VITE_ERP_REPORT;

      const url = `${apiUrl}/reportModule`

      const response = await post(url, updateReportModule);
      const reportId = updateReportModule?.[0]?.id;


      setUpdateReportModule([]);
      if (reportId) findReportModuleById(reportId);


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
              <th>Impact Module</th>
            </tr>
          </thead>

          <tbody>
            {reportModule?.map((item: any) => (
              <tr key={item.moduleId}>
                <td>{item.reportName}</td>
                <td>{reportModule?.name}
                  <input type="text" placeholder="Name" name="name"
                    defaultValue={item.moduleName}
                    onChange={(e) => handleUpdateInputChange(e, item.moduleId)}
                  />

                </td>

                {/* <td>{item.name}</td> */}
                <td> <input type="number" placeholder="Order No" name="orderNo"
                  defaultValue={item.moduleOrder}
                  onChange={(e) => handleUpdateInputChange(e, item.moduleId)}
                />
                </td>
                <td>
                  <select name="impactModuleId" id="impactModuleId" defaultValue={item.impactModuleId} onChange={(e) => handleUpdateInputChange(e, item.moduleId)}>
                    <option value="" >Impact Module</option>
                    {allModules && allModules.map((item: any) => {
                      return <option key={item.id} value={item.id}>{item.name}</option>
                    })}

                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={updateAll}>UpdateAll</button>
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
                  <select name="impactModuleId" id="impactModuleIdAdd" onChange={(e) => handleInputChange(e, item.index)}>
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