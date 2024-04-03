import { HTMLInputTypeAttribute } from "react";
import { input } from "./Input.css";


type InputProps = {
  children?: React.ReactNode;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
};
const Input = ({ children, value, onChange, type, placeholder }: InputProps) => {
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
        ></input>
      </label>
    </div>
  );
};

export default Input;