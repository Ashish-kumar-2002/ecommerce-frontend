const Status = ({ text, Icon, bg, color }) => {
  return (
    <div
      className={`${bg} ${color} px-3 py-1 rounded-md flex items-center gap-2 text-sm font-medium`}
    >
      <span>{text}</span>
      <Icon size={14} />
    </div>
  );
};

export default Status;



