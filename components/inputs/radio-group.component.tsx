import React, { FC, useEffect } from "react";

interface RadioButtonGroupProps {
  name: string;
  setValue: (name: string, value: string) => void;
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
  setValue,
  value,
  options,
}) => {

  const handleOptionClick = (optionValue: string) => {
    setValue(name, optionValue);
  };

  useEffect(()=>{
    if(value){
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
          {/* {option.description && (
            <span className="ml-2 text-gray-500">{option.description}</span>
          )} */}
        </button>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
