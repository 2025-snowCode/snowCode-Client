import * as React from 'react';

interface IconButtonProps {
  icon: React.ReactElement;
}

const IconButton = ({icon}: IconButtonProps) => {
  return <button className='header-btn'>{icon}</button>;
};

export default IconButton;
