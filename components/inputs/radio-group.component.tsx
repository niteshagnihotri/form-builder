import React, { FC, useEffect } from "react";
import DescriptionComponent from "./description.component";
import { useFormContext } from "react-hook-form";

interface RadioButtonGroupProps {
  name: string;
  value: string | null;
  options: Array<{
    label: string;
    icon?: React.ReactNode;
    value: string;
    description?: string;
  }>;
}

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
  name,
  value,
  options,
}) => {
  const { unregister, setValue } = useFormContext();

  const handleOptionClick = (optionValue: string) => {
    let keys = name.split(".");
    unregister(keys[0]);
    setValue(name, optionValue);
  };

  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [name, value]);

  return (
    <div className="grid grid-cols-2 gap-8">
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          className={`w-full px-4 py-2 border-2 rounded bg-dark text-black  ${
            option.value === value ? " border-violet-300 " : ""
          }`}
          onClick={() => handleOptionClick(option.value)}
        >
          {option.icon && <span className="mr-2">{option.icon}</span>}
          {option.label}

          {option?.description !== "" && (
            <DescriptionComponent
              label={option.label}
              description={option?.description}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
