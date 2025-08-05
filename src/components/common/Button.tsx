interface ButtonProps {
  theme: string;
  text: string;
  icon?: React.ReactElement;
  onClick?: () => void;
}

interface ButtonTheme {
  [key: string]: string;
}

const buttonTheme: ButtonTheme = {
  primaryPurple: 'primary-btn bg-primary text-white',
  primaryWhite: 'primary-btn bg-white text-primary border',
  secondaryPurpleStroke: 'secondary-btn bg-purple-stroke text-secondary-black',
};

const Button = ({theme, text, icon}: ButtonProps) => {
  return (
    <button
      className={`py-1.5 px-3 rounded-[10px] cursor-pointer ${buttonTheme[theme]}`}>
      {icon}
      <span className='text-btn'>{text}</span>
    </button>
  );
};

export default Button;
