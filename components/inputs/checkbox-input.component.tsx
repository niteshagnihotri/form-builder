import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import DescriptionComponent from './description.component';
import { getErrorMessage } from '@/lib/functions';
import { useFormContext } from 'react-hook-form';

interface CheckboxInputComponentProps {
  label: string;
  name: string;
  required?: boolean;
  description: string;
  className?: string;
  options?: any;
  errors: any;
  defaultValue?: boolean;
  isDisabled?: boolean;
}

const CheckboxInputComponent = ({
  label,
  name,
  errors,
  description,
  required = false,
  defaultValue = false, 
  isDisabled = false, 
  options = {},
  className = ''
}: CheckboxInputComponentProps) => {

  const {register} = useFormContext();

  return (
    <div>
      <div className={'flex items-center gap-1'}>
        <input
          id={name}
          {...register(name, {
            required: required ? `${label} is required` : false,
            ...options,
          })}
          defaultChecked={defaultValue}
          disabled={isDisabled}
          type={'checkbox'}
          className={cn(`h-4 w-4 min-w-[20px] cursor-pointer`, className)}
        />
        <label htmlFor={name} className="inline-flex text-xs items-center">
          {label.replace(/_/g, " ")} {required &&  <span className='text-red-500'> *</span>} 
        {description !== "" && <DescriptionComponent label={label} description={description}/>}
        </label>
      </div>
      
      {errors && name.split(".").length == 1 && errors[name] && (
        <p className="mt-2 text-xs text-red-500">
          {errors[name].message}
        </p>
      )}
      {errors && name.split(".").length > 1 && (
        <p className="mt-2 text-xs text-red-500 ">
          {getErrorMessage(name, errors)}
        </p>
      )}
    </div>
  );
};

export default CheckboxInputComponent;
