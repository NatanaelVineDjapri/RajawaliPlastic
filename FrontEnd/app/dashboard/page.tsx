import pageStyles from './DashboardPage.module.css';
import StatsGrid from '../components/admincomponents/statsgrid';

export default function DashboardPage() {
  return (
    <>
      <StatsGrid />
      <div className={pageStyles.contentGrid}>
        <div className={pageStyles.placeholder}>
        </div>
      </div>
    </>
  );
}
