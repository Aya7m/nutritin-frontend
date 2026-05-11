import useDailyStore from "../store/dailyStore";

export default function ProgressCard() {

  const { todayData } = useDailyStore();

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Daily Progress
      </h2>

      <div className="w-full bg-gray-200 h-4 rounded-full">

        <div
          className="bg-green-500 h-4 rounded-full"
          style={{
            width: `${todayData?.progress || 0}%`,
          }}
        />

      </div>

      <p className="mt-4 text-gray-600">
        {todayData?.status}
      </p>

    </div>
  );
}