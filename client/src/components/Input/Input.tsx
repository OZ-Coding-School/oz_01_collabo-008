import { input } from "./Input.css";


type InputProps = {
  children?: React.ReactNode;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: "text" | "number" | "password" | "email" | "tel";
  placeholder?: string;
  min?: number;
};
const Input = ({ children, value, onChange, type, placeholder, min }: InputProps) => {
  return (
    <div>
      <label>
        {children}
        <input
          className={input}
          value={value}
          onChange={onChange}
          type={type}
          required
          placeholder={placeholder}
          min={min}
        ></input>
      </label>
    </div>
  );
};

export default Input;