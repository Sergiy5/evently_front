interface EventCardProps {}
export const EventCard: React.FC<EventCardProps> = ({}) => {
  return (
    <div
      className={`relative flex overflow-hidden items-start bg-[url('public/images/CardImage.webp')] rounded-[20px] bg-no-repeat  w-[311px] h-[483px]`}
    >
      <div className={`absolute bottom-10 w-full h-[262px] rounded-t-[20px] bg-hoverCard`}></div>
    </div>
  );
};
