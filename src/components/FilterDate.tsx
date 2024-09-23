export const FilterDate: React.FC = () => {

  return (
    <div className={` w-full h-16 bg-lightBlue px-8 rounded-[20px]`}>
      <ul className={`flex items-center justify-between h-full`}>
        <li>
          <h2>Согодні</h2>
        </li>
        <li>
          <h2>На вихідних</h2>
        </li>
        <li>
          <h2>Тиждень</h2>
        </li>
        <li>
          <h2>Місяць</h2>
        </li>
        <li>
          <h2>Вибрати дату</h2>
        </li>
      </ul>
    </div>
  );
};
