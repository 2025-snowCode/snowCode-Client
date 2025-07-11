import * as React from 'react';

interface ButtonProps {
  icon: React.ReactElement;
}

const Button = ({icon}: ButtonProps) => {
  return <button className='header-btn'>{icon}</button>;
};

export default Button;
