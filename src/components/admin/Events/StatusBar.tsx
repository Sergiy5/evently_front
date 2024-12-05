const StatusBar = () => {
  return (
    <div className="bg-lightBlue rounded-[15px] p-2 mb-[15px] w-full">
      <ul className="text-2xl text-textDark flex justify-around">
        <li>
          <h2>Очікують (15)</h2>
        </li>
        <li>
          <h2>Схвалено (0)</h2>
        </li>
        <li>
          <h2>Відхилено (10)</h2>
        </li>
      </ul>
    </div>
  );
};

export default StatusBar;
