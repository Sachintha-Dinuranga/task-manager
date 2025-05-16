function TaskStatsCard({ label, value, bgColor }) {
  return (
    <div className={`p-4 rounded shadow text-center ${bgColor}`}>
      <h2 className="font-bold text-lg">{label}</h2>
      <p className="text-3xl">{value}</p>
    </div>
  );
}

export default TaskStatsCard;
