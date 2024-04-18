import '@radix-ui/themes/styles.css';
import { ChangeEvent } from 'react';
import { select } from './SelecteBox.css';

type SelectBoxProps = {
  defaultValue?: string;
  options?: { value: string; label: string }[];
  onChange?: (value: string) => void;
};

const SelectBox = ({ defaultValue, options, onChange }: SelectBoxProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  return (
    <select defaultValue={defaultValue} onChange={handleChange} className={select}>


      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}

    </select>
  );
};

export default SelectBox