import Login from "./auth/Login";
import Report from "./report/Report";
import ReportLayout from "./report/ReportLayout";
import ReportModule from "./report/ReportModule";

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/report",
    element: <ReportLayout />,
    children: [
      {
        index: true,
        element: <Report />,
      },
      {
        path: "module",
        element: <ReportModule />,
      },
    ],
  },
];