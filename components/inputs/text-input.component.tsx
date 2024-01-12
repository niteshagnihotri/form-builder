import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import DivWrapper from "../wrapperdiv";
import { FaCircleInfo } from "react-icons/fa6";
import DescriptionComponent from "./description.component";
import { getErrorMessage } from "@/lib/functions";

interface TextInputComponentProps {
  label?: string;
  inputName: string;
  type?: string;
  description?: string;
  required?: boolean;
  defaultVal?: string;
  placeholder?: string;
  icon?: string;
  className?: string;
  labelClassName?: string;
  isLabelVisible?: boolean;
  options?: any;
  register: any;
  errors: any;
  isDisabled?: boolean;
  variant?: "filled" | "outline";
  onChange?: any;
  minVal?: number;
  minimize?: boolean;
}

const TextInputComponent = ({
  label,
  inputName,
  placeholder,
  icon,
  type = "text",
  description = "",
  required = false,
  defaultVal = "",
  className = "",
  labelClassName = "",
  isLabelVisible = true,
  register,
  errors,
  options = {},
  isDisabled = false,
  variant = "outline",
  onChange,
  minVal,
  minimize,
}: TextInputComponentProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div
      className={
        (minimize ? "w-max " : "w-full ") +
        " grid grid-cols-2 justify-items-stretch relative items-center"
      }
    >
      <label
        htmlFor={inputName}
        className={cn(
          `text-xs flex items-center space-x-2  `,
          !isLabelVisible && "hidden",
          labelClassName
        )}
      >
        {label} {required && <span className="text-red-500">*</span>}
        {description !== "" && (
          <DescriptionComponent label={label} description={description} />
        )}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute -translate-y-1/2 pointer-events-none right-2 top-1/2">
            <Image src={icon} alt="icon" width={21} height={21} />
          </span>
        )}
        <input
          name={inputName}
          {...register(inputName, {
            required: required
              ? `${label ? label : "This field "} is required`
              : false,
            ...options,
          })}
          type={type}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className={cn(
            `w-full rounded-md px-2.5 py-2 text-xs focus:outline-none  `,
            variant === "outline" && "border ",
            variant === "filled" && "border bg-dark placeholder:text-blue ",
            className
          )}
          disabled={isDisabled}
          defaultValue={defaultVal}
          onChange={onChange}
          min={minVal}
        />
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

export default TextInputComponent;
