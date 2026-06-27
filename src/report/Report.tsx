import { useEffect, useRef, useState } from "react";
import { get, post, put } from "../service/apiCall";
import { nanoid } from "nanoid";
import DownloadExcel from "../components/DownloadExcel";
import { API, apiPath } from "../config/api";

const Report = () => {

  const [allReportData, setAllReportData] = useState<any[]>([])
  const saveData = useRef<any[]>([])


  useEffect(() => {
    fetchAsyncData();
  }, [])

  const fetchAsyncData = async () => {
    const [reportData]: any = await Promise.allSettled([get(apiPath.reportTable)]);
    if (reportData && reportData?.value?.data) {
      setAllReportData(reportData?.value?.data)
    }
  }

  const handleInputChange = (e: any, id: number | string) => {
    const value = e.target.value?.trim();
    const keyName = e.target.name;

    if (keyName) findAndUpdate(id, value, keyName);
  }
  const handleDelete = (id: number | string) => {
    setAllReportData(allReportData.filter(item => item.id !== id));
    saveData.current = saveData.current.filter(item => item.id !== id)

  }


  const findAndUpdate = (id: number | string, value: any, keyName: string) => {
    const toUpdateDataIndex = saveData?.current.findIndex((item: any) => item.id === id);
    if (toUpdateDataIndex >= 0) {
      saveData.current[toUpdateDataIndex][keyName] = value;
    } else {
      const toUpdateDbDataIndex = allReportData.findIndex((item: any) => item.id === id);
      if (toUpdateDbDataIndex >= 0) {
        const data = allReportData[toUpdateDbDataIndex];
        data[keyName] = value;
        saveData.current.push(data)
      }

    }
  }

  const add = () => {
    const payload: any = {
      id: nanoid(),
      name: null,
      orderNo: null,
      link: null
    }
    setAllReportData([...allReportData, payload])
    saveData.current.push(payload)
  }



  const submit = async () => {

    const payload = saveData?.current.map(item => ({ ...item, id: typeof item.id === "string" ? null : item.id }))
    try {
      const response = await post(apiPath.report, payload);
      if (response?.status === 200) {
        saveData.current = [];
        setAllReportData([])
        await fetchAsyncData()
      }

    } catch (error) {
      console.error("Login Error", error);
    }

  }



  return (
    <div>
      <div>
        <button onClick={add}>Add</button>
        <table cellSpacing={10} width={"100%"}>
          <thead>
            <tr>
              <td>Index</td>
              <td>Report Name</td>
              <td>Link</td>
              <td>Order No</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {allReportData && allReportData.map((item: any,index:number) => {
              return (
                <tr key={item.id || item.customId}>
                  <td>{index+1}</td>
                  <td>
                    <input style={{ width: "100%" }} type="text" placeholder="Name" defaultValue={item.name} name="name" onChange={(e) => handleInputChange(e, item.id)} />
                  </td>
                  <td>
                    <input style={{ width: "100%" }} type="text" placeholder="Link" defaultValue={item.link} name="link" onChange={(e) => handleInputChange(e, item.id)} />
                  </td>
                  <td>
                    <input style={{ width: "100%" }} type="number" placeholder="Order No" name="orderNo" defaultValue={item.orderNo} onChange={(e) => handleInputChange(e, item.id)} />
                  </td>
                  <td>
                    {typeof item.id === "string" ? <button onClick={() => handleDelete(item.id)}>Delete</button> : <></>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button onClick={submit}>submit</button>
        <DownloadExcel />
      </div>

    </div>
  );

}

export default Report