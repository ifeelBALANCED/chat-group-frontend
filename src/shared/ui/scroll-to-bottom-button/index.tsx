import { RefObject, useEffect, useState } from 'react';
import { Icon } from '../icon';

interface ScrollToBottomButtonProps {
  containerRef: RefObject<HTMLDivElement>;
  onScroll: VoidFunction;
}

export const ScrollToBottomButton = ({ containerRef, onScroll }: ScrollToBottomButtonProps) =>
{
  const [showButton, setShowButton] = useState(false);

  useEffect(() =>
  {
    const container = containerRef.current;
    if(!container)
    {
      return;
    }

    const handleScroll = () =>
    {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const shouldShow = scrollHeight - scrollTop - clientHeight > 100;
      setShowButton(shouldShow);
    };

    container.addEventListener('scroll', handleScroll);
    // eslint-disable-next-line consistent-return
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  if(!showButton)
  {
    return null;
  }

  return (
    <button
      onClick={onScroll}
      className='fixed bottom-[170px] right-4 p-2 bg-black text-primary-content rounded-full shadow-lg transition-all duration-200 animate-in fade-in'
      aria-label='Scroll to bottom'
    >
      <Icon name='sprite/arrow-down' fontSize={24} color='#FFF' />
    </button>
  );
};