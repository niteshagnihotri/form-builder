import React from 'react';
import { useController } from 'react-hook-form';
import { cn } from '@/lib/utils';
import DivWrapper from '../wrapperdiv';
import { FaCircleInfo } from "react-icons/fa6";
import DescriptionComponent from './description.component';


interface SelectInputComponentProps {
  label?: string;
  name: string;
  description?:string;
  required?: boolean;
  placeholder?: string;
  className?: string;
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
  defaultValue?: string;
}

const SelectInputComponent = ({
  label,
  name,
  description="",
  control,
  errors,
  required = false,
  options = {},
  className = '',
  labelClassName = '',
  selectOptions,
  placeholder = '',
  isLabelVisible = true,
  isDisabled = false,
  defaultValue,
}: SelectInputComponentProps) => {
  const { field } = useController({
    control,
    name,
    rules: {
      required: required ? `${label} is required` : false,
      ...options,
    },
  });

  return (
    <div className='grid grid-cols-2 items-center'>
        {label && (
            <div className='flex items-center space-x-2'>
          <label htmlFor={name} className={cn(`text-xs`, isLabelVisible ? 'block' : 'hidden', labelClassName)}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        {description !== "" && <DescriptionComponent label={label} description={description}/>}
          </div>
        )}
        <div>
          <select
            // @ts-ignore
            {...field}
            value={field.value || defaultValue || ""}
            disabled={isDisabled}
            className={cn(`block w-full cursor-pointer rounded-md text-xs bg-dark p-2 border focus:outline-none`, className)}
          >
            <option value="">{placeholder}</option>
            {selectOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errors[name] && <p className="mt-0.5 text-sm text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export default SelectInputComponent;
