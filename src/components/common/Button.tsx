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
  secondaryPurpleStroke: 'secondary-btn bg-purple-stroke text-secondary-black',
};

const Button = ({theme, text, icon}: ButtonProps) => {
  return (
    <button className={buttonTheme[theme]}>
      {icon}
      <span className='text-btn'>{text}</span>
    </button>
  );
};

export default Button;
