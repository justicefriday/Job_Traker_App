import { useMemo } from 'react';
import { subDays, eachWeekOfInterval, startOfWeek, endOfWeek, format } from 'date-fns';

const Analytics = ({ jobs }) => {
  // Calculate weekly data (last 4 weeks)
  const weeklyData = useMemo(() => {
    const last4Weeks = eachWeekOfInterval({
      start: subDays(new Date(), 28),
      end: new Date(),
    });

    return last4Weeks.map((week) => {
      const weekStart = startOfWeek(week);
      const weekEnd = endOfWeek(week);

      const weekJobs = jobs.filter((job) => {
        const appDate = new Date(job.applicationDate);
        return appDate >= weekStart && appDate <= weekEnd;
      });

      return {
        week: `${format(weekStart, 'MMM dd')}`,
        count: weekJobs.length,
      };
    });
  }, [jobs]);

  const maxCount = Math.max(...weeklyData.map((w) => w.count), 1);

  // Calculate stats
  const thisWeek = jobs.filter((job) => {
    const jobDate = new Date(job.applicationDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return jobDate >= weekAgo;
  }).length;

  const thisMonth = jobs.filter((job) => {
    const jobDate = new Date(job.applicationDate);
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return jobDate >= monthAgo;
  }).length;

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-16 text-center">
        <p className="text-gray-500 text-base md:text-lg">
          No data to display yet. Start adding job applications to see analytics!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 text-center">
         Your Job Search Summary
      </h2>

      {/* Stats Cards - 3 Cards Only (Removed Average) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-5 md:p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
          <div className="text-4xl md:text-5xl font-bold mb-2">{thisWeek}</div>
          <div className="text-sm md:text-lg font-medium opacity-90 mb-1">Applied This Week</div>
          <div className="text-xs md:text-sm opacity-75">Last 7 days</div>
        </div>

        <div className="bg-gradient-to-br from-secondary to-[#37536b] text-white p-5 md:p-6 rounded-xl shadow-lg hover:scale-105 transition transform">
          <div className="text-4xl md:text-5xl font-bold mb-2">{thisMonth}</div>
          <div className="text-sm md:text-lg font-medium opacity-90 mb-1">Applied This Month</div>
          <div className="text-xs md:text-sm opacity-75">Last 30 days</div>
        </div>

        <div className="bg-gradient-to-br from-[#f57c00] to-[#e65100] text-white p-5 md:p-6 rounded-xl shadow-lg hover:scale-105 transition transform col-span-2 lg:col-span-1">
          <div className="text-4xl md:text-5xl font-bold mb-2">{jobs.length}</div>
          <div className="text-sm md:text-lg font-medium opacity-90 mb-1">Total Applications</div>
          <div className="text-xs md:text-sm opacity-75">All time</div>
        </div>
      </div>

      {/* Weekly Trend Chart - REDUCED SPACING */}
      <div className="mb-8 bg-gray-50 p-4 md:p-6 rounded-xl">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-1">
          Weekly Trend (Last 4 Weeks)
        </h3>
        <div className="flex justify-around items-end h-54 md:h-72 gap-2 md:gap-4">
          {weeklyData.map((week, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
              {/* Bar */}
              <div
                className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg flex items-start justify-center pt-2 text-white text-sm md:text-base font-bold hover:scale-105 transition transform shadow-lg"
                style={{
                  minHeight: '40px',
                  height: `${(week.count / maxCount) * 100}%`,
                }}
              >
                {week.count}
              </div>
              {/* Date Label - REDUCED GAP */}
              <span className="text-xs md:text-sm font-semibold text-gray-600">
                {week.week}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bars */}
      <div>
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
          Application Status
        </h3>

        <div className="space-y-4 md:space-y-5">
          {/* Applied */}
          <div>
            <div className="flex justify-between mb-2 font-semibold text-sm md:text-base text-gray-700">
              <span>Applied</span>
              <span>{jobs.filter((j) => j.status === 'applied').length}</span>
            </div>
            <div className="w-full h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#1976d2] to-[#1565c0] rounded-full transition-all duration-500"
                style={{
                  width: `${
                    (jobs.filter((j) => j.status === 'applied').length / jobs.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Interview */}
          <div>
            <div className="flex justify-between mb-2 font-semibold text-sm md:text-base text-gray-700">
              <span>Interview</span>
              <span>{jobs.filter((j) => j.status === 'interview').length}</span>
            </div>
            <div className="w-full h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#f57c00] to-[#e65100] rounded-full transition-all duration-500"
                style={{
                  width: `${
                    (jobs.filter((j) => j.status === 'interview').length /
                      jobs.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Offer */}
          <div>
            <div className="flex justify-between mb-2 font-semibold text-sm md:text-base text-gray-700">
              <span>Offer</span>
              <span>{jobs.filter((j) => j.status === 'offer').length}</span>
            </div>
            <div className="w-full h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#388e3c] to-[#2e7d32] rounded-full transition-all duration-500"
                style={{
                  width: `${
                    (jobs.filter((j) => j.status === 'offer').length / jobs.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Rejected */}
          <div>
            <div className="flex justify-between mb-2 font-semibold text-sm md:text-base text-gray-700">
              <span>Rejected</span>
              <span>{jobs.filter((j) => j.status === 'rejected').length}</span>
            </div>
            <div className="w-full h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] rounded-full transition-all duration-500"
                style={{
                  width: `${
                    (jobs.filter((j) => j.status === 'rejected').length / jobs.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;