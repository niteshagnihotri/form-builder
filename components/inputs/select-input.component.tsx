import React, { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import DivWrapper from "../wrapperdiv";
import { FaCircleInfo } from "react-icons/fa6";
import DescriptionComponent from "./description.component";
import { getErrorMessage } from "@/lib/functions";

interface SelectInputComponentProps {
  label?: string;
  inputName: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  setValue?: any;
  labelClassName?: string;
  isLabelVisible?: boolean;
  options?: any;
  control: any;
  errors: any;
  selectOptions: {
    value: string | number;
    label: string;
  }[];
  isDisabled?: boolean;
  defaultValue?: string | number;
}

const SelectInputComponent = ({
  label,
  inputName,
  description = "",
  errors,
  required = false,
  options = {},
  className = "",
  labelClassName = "",
  selectOptions,
  placeholder = "",
  isLabelVisible = true,
  isDisabled = false,
  defaultValue,
}: SelectInputComponentProps) => {
  
  const { setValue, register,watch, unregister, formState } = useFormContext();

  const handleChange = (event: any) => {
    setValue(inputName, event.target.value);
  };

  return (
    <div className="grid grid-cols-2 items-center">
      {label && (
        <div className="flex items-center space-x-2">
          <label
            htmlFor={inputName}
            className={cn(
              `text-xs`,
              isLabelVisible ? "block" : "hidden",
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
          {description !== "" && (
            <DescriptionComponent label={label} description={description} />
          )}
        </div>
      )}
      <div>
        <select
          {...register(inputName, {
            required: required ? `${label} is required` : false,
            ...options,
          })}
          onChange={handleChange}
          defaultValue={defaultValue}
          disabled={isDisabled}
          required={required}
          className={cn(
            `block w-full cursor-pointer rounded-md text-xs bg-dark p-2 border focus:outline-none`,
            className
          )}
        >
          <option value={""}>{placeholder}</option>
          {selectOptions?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {errors && inputName.split(".").length == 1 && errors[inputName] && (
        <p className="mt-0.5 text-xs text-red-500">
          {errors[inputName].message}
        </p>
      )}
      {errors && inputName.split(".").length > 1 && (
        <p className="mt-0.5 text-xs text-red-500">
          {getErrorMessage(inputName, errors)}
        </p>
      )}
    </div>
  );
};

export default SelectInputComponent;
