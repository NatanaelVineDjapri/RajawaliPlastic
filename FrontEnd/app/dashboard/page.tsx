'use client'; 

import StatsGrid from "../components/admincomponents/StatsGrid"; 
import SalesChartCard from '../components/admincomponents/SalesChart';
import RecentlySoldTable from '../components/admincomponents/RecentlySold';

export default function DashboardPage() {
  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
        <StatsGrid />
        <div className="row mt-4">  
            <div className="col-12">
                <SalesChartCard />
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-12">
                <RecentlySoldTable />
            </div>
        </div>
    </div>
  );
}