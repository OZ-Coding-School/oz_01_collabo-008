import '@radix-ui/themes/styles.css';
import { select } from './SelecteBox.css';

type SelectBoxProps = {
  defaultValue?: string;
  options?: { value: string; label: string }[];
  onChange?: (value: string) => void;
};

const SelectBox = ({ defaultValue, options, onChange }: SelectBoxProps) => {
  return (
    <select defaultValue={defaultValue} onValueChange={onChange} className={select}>


      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}

    </select>
  );
};

export default SelectBox