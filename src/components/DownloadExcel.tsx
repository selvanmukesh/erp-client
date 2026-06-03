const DownloadExcel = () => {

    const handleDownload = async () => {
        try {
   
            const apiUrl = import.meta.env.VITE_ERP_REPORT;
            window.open(
                `${apiUrl}/reportModule/reportInfo/download`,
                "_blank"
              );
            // const response = await fetch(
            //     `${apiUrl}/reportModule/reportInfo/download`
            // );

            // if (!response.ok) {
            //     throw new Error("Download failed");
            // }

            // const blob = await response.blob();

            // const url = window.URL.createObjectURL(blob);

            // const link = document.createElement("a");
            // link.href = url;
            // link.download = "ReportInfo.xlsx";

            // document.body.appendChild(link);
            // link.click();

            // document.body.removeChild(link);
            // window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    return (
        <button type="button" onClick={handleDownload}>
            Download Report Info
        </button>
    );
};

export default DownloadExcel;