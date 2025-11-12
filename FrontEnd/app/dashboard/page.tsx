'use client'; 

import StatsGrid from "../components/admincomponents/Statsgrid"; 
import SalesChartCard from '../components/admincomponents/SalesChart';
import RecentlySoldTable from '../components/admincomponents/RecentlySold';

export default function DashboardPage() {
  return (
    <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">
      <div className="row g-3">
        <div className="col-12">
          <StatsGrid />
        </div>
      </div>

      <div className="row g-3 mt-3">
        <div className="col-12 col-lg-12">
          <SalesChartCard />
        </div>
      </div>

      <div className="row g-3 mt-3">
        <div className="col-12">
          <RecentlySoldTable />
        </div>
      </div>
    </div>
  );
}