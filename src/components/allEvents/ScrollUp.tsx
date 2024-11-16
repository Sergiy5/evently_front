import { useEffect, useState } from 'react';
import { FaCircleArrowUp } from 'react-icons/fa6';

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight < window.scrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <button
        onClick={handleScrollToTop}
        className="fixed right-[60px] bottom-[60px] focus:outline-none "
      >
        <FaCircleArrowUp className="h-10 w-10 fill-borderColor active:-translate-y-4" />
      </button>
    )
  );
};

export default ScrollUp;
