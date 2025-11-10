import StartupCalendar from '@/components/Dashboard/startup/calendar';
import { Calendar } from 'react-feather';

const calendar = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task And Calendar</h1>
      <StartupCalendar />
    </div>
  );
};

export default calendar;