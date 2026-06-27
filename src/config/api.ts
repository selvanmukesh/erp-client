
export const API = {
    GATEWAY: import.meta.env.VITE_ERP_GATE_WAY,
    REPORT: `${import.meta.env.VITE_ERP_GATE_WAY}${import.meta.env.VITE_ERP_REPORT}`,
    USER: `${import.meta.env.VITE_ERP_GATE_WAY}${import.meta.env.VITE_ERP_USER}`,
    AUTH: `${import.meta.env.VITE_ERP_GATE_WAY}${import.meta.env.VITE_ERP_AUTH}`,
    };
    
export const apiPath={
    report:`${API.REPORT}/report`,
    reportTable:`${API.REPORT}/report/reportTable`,
    reportModule:`${API.REPORT}/reportModule`

}