import { useEffect, useRef, useState } from "react"
import { get, post } from "../service/apiCall";
import { nanoid } from "nanoid";
import { apiPath } from "../config/api";

const ReportModule = () => {
  const [report, setReport] = useState([]);
  const [modulesByReportId, setModulesByReportId] = useState<any>([]);
  const [impactModule, setImpactModule] = useState<any>([]);
  const saveData = useRef<any[]>([]);
  const selectedReport = useRef<any>(null);

  useEffect(() => {
    fetchAsync();
  }, [])


  const fetchAsync = async () => {
    try {
      const [fetchAllReportApiResponse, reportModuleResponse] = await Promise.all([get(apiPath.report), get(apiPath.reportModule)])
      setReport(fetchAllReportApiResponse.data);
      setImpactModule(reportModuleResponse.data);
    } catch (error) {
      console.error("Login Error", error);
    }
  }

  const handleChange = (e: any) => {
    selectedReport.current = null
    const selectId = e.target.value;
    if (selectId) {
      selectedReport.current = selectId
      findReportModuleById(selectId)
    };
  }

  const add = () => {
    const payload: any = {
      id: nanoid(),
      name: null,
      orderNo: null,
      impactModuleId: null,
      reportId: selectedReport.current || null
    }
    setModulesByReportId([...modulesByReportId, payload])
    saveData.current.push(payload);
  }

  const handleInputChange = (e: any, id: string | number) => {
    const value = e.target.value?.trim();
    const keyName = e.target.name;

    if (keyName) findAndUpdate(id, value, keyName);
  }

  const findAndUpdate = (id: String | number, value: any, keyName: string) => {
    const toUpdateDataIndex = saveData.current.findIndex((item: any) => item.id == id);
    if (keyName === "orderNo" || keyName === "impactModuleId") {
      const valueToInt = parseInt(value);
      value = Number.isNaN(valueToInt) ? null : valueToInt;
    }

    if (toUpdateDataIndex >= 0) {
      saveData.current[toUpdateDataIndex][keyName] = value;
    }
    else {
      const toUpdateDbDataIndex = modulesByReportId.findIndex((item: any) => item.id === id);
      if (toUpdateDbDataIndex >= 0) {
        const data: any = modulesByReportId[toUpdateDbDataIndex];
        data[keyName] = value;
        saveData.current.push(data)
      }
    }
  }

  const submit = async () => {
    try {
      const payload = saveData?.current.map(item => ({ ...item, id: typeof item.id === "string" ? null : item.id }))
      const response = await post(apiPath.reportModule, payload);
      console.log("response-->", response);
    } catch (error) {
      console.error("Login Error", error);
    }

  }

  const findReportModuleById = async (id: string) => {
    try {
      setModulesByReportId([]);
      const url = `${apiPath.reportModule}/${id}`
      const response = await get(url);
      if (response?.status === 200) {
        setModulesByReportId(response.data)
      }
    } catch (error) {
      console.error("Login Error", error);
    }
  }

  const handleDelete = (id: number | string) => {
    setModulesByReportId(modulesByReportId.filter((item:any) => item.id !== id));
    saveData.current = saveData.current.filter(item => item.id !== id)
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
        {selectedReport.current && <button onClick={add}>Add</button>}
        <table cellSpacing={20} width={"100%"}>
          <thead>
            <tr>
              {/* <th>Report Name</th> */}
              <th>Module Name</th>
              <th>Order</th>
              <th>Impact Module</th>
              <td>Action</td>
            </tr>
          </thead>

          <tbody>
            {modulesByReportId?.map((item: any) => (
              <tr key={item.id}>
                {/* <td>{item.reportName}</td> */}
                <td>{modulesByReportId?.name}
                  <input type="text" placeholder="Name" name="name"
                    defaultValue={item.name}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />

                </td>

                {/* <td>{item.name}</td> */}
                <td> <input type="number" placeholder="Order No" name="orderNo"
                  defaultValue={item.orderNo}
                  onChange={(e) => handleInputChange(e, item.id)}
                />
                </td>
                <td>
                  <select name="impactModuleId" id="impactModuleId" defaultValue={item.impactModuleId} onChange={(e) => handleInputChange(e, item.id)}>
                    <option value="" >Impact Module</option>
                    {impactModule && impactModule.map((item: any) => {
                      return <option key={item.id} value={item.id}>{item.name}</option>
                    })}

                  </select>
                </td>
                <td>
                    {typeof item.id === "string" ? <button onClick={() => handleDelete(item.id)}>Delete</button> : <></>
                    }
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={submit}>Submit</button>
      </div>

    </div>
  )
}

export default ReportModule