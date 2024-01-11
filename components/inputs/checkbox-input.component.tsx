import React from 'react';
import { cn } from '@/lib/utils';

interface CheckboxInputComponentProps {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
  options?: any;
  register: any;
  errors: any;
  defaultValue?: boolean;
  isDisabled?: boolean;
  setValue: any;
  watch: any;
}

const CheckboxInputComponent = ({
  label,
  name,
  register,
  errors,
  required = false,
  defaultValue = false, 
  isDisabled = false, 
  options = {},
  className = '',
  watch,
  setValue
}: CheckboxInputComponentProps) => {

  let value = watch(name);

  const handleChange = (event: any) => {
    setValue(name, event.target.checked);
  }

  return (
    <div>
      <div className={'flex items-center gap-1'}>
        <input
          id={name}
          name={name}
          {...register(name, {
            required: required ? `${label} is required` : false,
            ...options,
          })}
          checked={value ? value : defaultValue}
          disabled={isDisabled}
          type={'checkbox'}
          onChange={handleChange}
          className={cn(`h-4 w-4 min-w-[20px] cursor-pointer`, className)}
        />
        <label htmlFor={name} className="inline-flex text-xs items-center">
          {label.replace(/_/g, " ")}
        </label>
      </div>
      {errors[name] && <p className="mt-0.5 text-sm text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export default CheckboxInputComponent;
