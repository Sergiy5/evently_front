import { SharedBtn } from "./SharedBtn";

interface EventCardProps {
    event: {};
}
export const EventCard: React.FC<EventCardProps> = ({ event }) => {
    
  return (
    <div 
      className={`group relative flex overflow-hidden items-start bg-[url('public/images/CardImage.webp')]
         rounded-[20px] bg-no-repeat w-[311px] h-[483px]`}
    >
      <div
              className={`flex items-center justify-center w-32 h-8 rounded-[20px]
             ml-6 mt-6 border-[2px] border-white bg-white bg-opacity-30`}
      >
        <div className={`text-white font-light text-base`}>Майстер клас</div>
      </div>
      <div
        className={`absolute flex flex-col items-center justify-between -bottom-[92px] w-full py-8 px-3 h-[292px]
             rounded-t-[20px] bg-hoverCard transition-all ease-in-out duration-300 group-hover:bottom-0`}
      >
        <ul className={`flex justify-between w-full`}>
          <li>16.09.24-25.0924</li>
          <li>17:00</li>
          <li>Київ</li>
        </ul>
        <h2>Свічки власноруч</h2>
        <p>Від 500 грн</p>
        <SharedBtn type="button" className="w-[287px]">
          Хочу
        </SharedBtn>
      </div>
    </div>
  );
};
