import styles from './Checkbox.module.css';

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

const Checkbox = ({checked, onChange, className=''}: CheckboxProps) => {
    return (
        <input 
            type="checkbox" 
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className={`${styles.checkbox} ${className}`}
        />
    )
}

export default Checkbox