import { Outlet, Link } from "react-router-dom";

const ReportLayout = () => {
  return (
    <div>
      <div>
        <Link to="/report">
          <button>Report</button>
        </Link>

        <Link to="/report/module">
          <button>Report Module</button>
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default ReportLayout;