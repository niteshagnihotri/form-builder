import React, { useEffect } from "react";
import TextInputComponent from "./inputs/text-input.component";
import { useForm } from "react-hook-form";
import DivWrapper from "./wrapperdiv";
import RadioButtonGroup from "./inputs/radio-group.component";
import SelectInputComponent from "./inputs/select-input.component";
import { FaCircleInfo } from "react-icons/fa6";
import DescriptionComponent from "./inputs/description.component";
import { evaluateExpression } from "@/lib/eval-expr";
import CheckboxInputComponent from "./inputs/checkbox-input.component";
import PrimaryBtnComponent from "./inputs/primary-btn.component";

export default function JsonForm({ formData }: { formData: any }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log("clicked : ", data);

  return (
    formData && (
      <form
        className="w-full px-4 py-5 border h-full rounded-xl flex flex-col space-y-5 text-xs font-medium"
        onSubmit={handleSubmit(onSubmit)}
      >
        <hr />
        {formData?.map((inputSchema: any, parent_index: number) => {
          let parent_UiType = inputSchema.uiType.toLowerCase();
          let parent_label = inputSchema.label.replace(/_/g, " ");
          let parent_jsonKey = inputSchema.jsonKey;

          if (parent_UiType == "input") {
            return (
              <DivWrapper>
                <TextInputComponent
                  key={parent_index}
                  label={parent_label}
                  name={parent_jsonKey}
                  description={inputSchema.description}
                  errors={errors}
                  required={inputSchema.validate.required}
                  isDisabled={inputSchema.validate.immutable}
                  register={register}
                  placeholder={inputSchema.placeholder}
                  variant={"filled"}
                />
              </DivWrapper>
            );
          } else if (parent_UiType === "group") {
            return (
              <DivWrapper className="space-y-2" key={parent_index}>
                {/*  Group label  */}
                <div className="flex items-center space-x-2">
                  {" "}
                  <label htmlFor="" className="">
                    {parent_label}
                    {inputSchema.validate.required && (
                      <span className="text-red-400">*</span>
                    )}
                  </label>
                  {inputSchema.description !== "" && (
                    <DescriptionComponent
                      label={parent_label}
                      description={inputSchema.description}
                    />
                  )}
                </div>

                {/*  Group label End */}

                <hr />
                <div className="space-y-4 py-2">
                  {inputSchema.subParameters.map(
                    (group: any, sub_index: number) => {
                      let group_uiType = group.uiType.toLowerCase();
                      let group_label = group.label.replace(/_/g, " ");
                      let group_jsonKey = group.jsonKey;

                      if (group_uiType === "radio") {
                        ///////////////////// RADIO 1 ////////////////////
                        return (
                          <RadioButtonGroup
                            key={sub_index}
                            value={
                              watch(`${parent_jsonKey}.${group_jsonKey}`) ??
                              group.validate.defaultValue
                            }
                            name={`${parent_jsonKey}.${group_jsonKey}`}
                            options={group.validate.options}
                            setValue={setValue}
                          />
                        );
                      } else if (group_uiType === "select") {
                        ///////////////////// SELECT 1 ////////////////////
                        return (
                          <SelectInputComponent
                            control={control}
                            errors={errors}
                            key={sub_index}
                            isDisabled={group.validate.immutable}
                            description={group.description}
                            required={group.validate.required}
                            label={group_label}
                            defaultValue={group.validate.defaultValue}
                            name={`${parent_jsonKey}.${group_jsonKey}`}
                            selectOptions={
                              group.validate.options
                                ? group.validate.options
                                : []
                            }
                          />
                        );
                      } else if (group_uiType === "ignore") {
                        ///////////////////// IGNORE 1 ////////////////////

                        ///////////////// CHECKING ALL CONDITIONS ////////////////
                        let conditionsResponse = group?.conditions?.map(
                          (condition: any) => {
                            let valueOfKey = watch(condition.jsonKey);
                            if (valueOfKey) {
                              return evaluateExpression(valueOfKey, {
                                op: condition.op,
                                value: condition.value,
                              });
                            }
                            return false; // Assume false for undefined or falsy values
                          }
                        );

                        // Perform AND operation
                        const overallResult = conditionsResponse.every(
                          (result: boolean) => result === true
                        );

                        if (overallResult) {
                          return (
                            <div key={sub_index} className="space-y-3">
                              {group.subParameters.map(
                                (childSchema: any, child_index: number) => {
                                  let label = childSchema.label.replace(
                                    /_/g,
                                    " "
                                  );
                                  let input_name = `${parent_jsonKey}.${group_jsonKey}.${childSchema.jsonKey}`;

                                  switch (childSchema.uiType.toLowerCase()) {
                                    case "input":
                                      return (
                                        ///////////////////// TEXT 2 ////////////////////
                                        <TextInputComponent
                                          label={label}
                                          name={input_name}
                                          key={child_index}
                                          register={register}
                                          errors={errors}
                                          variant={"filled"}
                                          placeholder={childSchema.placeholder}
                                        />
                                      );
                                    case "switch":
                                      return (
                                        ///////////////////// CHECKBOX 2 ////////////////////
                                        <CheckboxInputComponent
                                          name={input_name}
                                          key={child_index}
                                          label={label}
                                          register={register}
                                          setValue={setValue}
                                          watch={watch}
                                          errors={errors}
                                          required={
                                            childSchema.validate.required
                                          }
                                          isDisabled={
                                            childSchema.validate.immutable
                                          }
                                          defaultValue={
                                            childSchema.validate.defaultValue
                                          }
                                        />
                                      );
                                    case "select":
                                      return (
                                        ///////////////////// SELECT 2 ////////////////////
                                        <SelectInputComponent
                                          control={control}
                                          errors={errors}
                                          key={child_index}
                                          isDisabled={
                                            childSchema.validate.immutable
                                          }
                                          description={childSchema.description}
                                          required={
                                            childSchema.validate.required
                                          }
                                          label={label}
                                          defaultValue={
                                            childSchema.validate.defaultValue
                                          }
                                          name={input_name}
                                          selectOptions={
                                            childSchema.validate.options
                                              ? childSchema.validate.options
                                              : []
                                          }
                                        />
                                      );
                                  }
                                }
                              )}
                            </div>
                          );
                        }
                      } else if (group_uiType === "switch") {
                        ///////////////////// SWITCH 1////////////////////
                        return (
                          <CheckboxInputComponent
                            name={`${parent_jsonKey}.${group_jsonKey}`}
                            key={sub_index}
                            label={group.label}
                            register={register}
                            setValue={setValue}
                            watch={watch}
                            errors={errors}
                            required={group.validate.required}
                            isDisabled={group.validate.disabled}
                            defaultValue={group.validate.defaultValue}
                          />
                        );
                      }
                    }
                  )}
                </div>
              </DivWrapper>
            );
          } else if (parent_UiType === "select") {
            ///////////////////// PARENT SELECT 0 ////////////////////
            return (
              <DivWrapper key={parent_index}>
                <SelectInputComponent
                  control={control}
                  errors={errors}
                  isDisabled={inputSchema.validate.immutable}
                  description={inputSchema.description}
                  required={inputSchema.validate.required}
                  label={parent_label}
                  defaultValue={inputSchema.validate.defaultValue}
                  name={parent_jsonKey}
                  selectOptions={
                    inputSchema.validate.options
                      ? inputSchema.validate.options
                      : []
                  }
                />
              </DivWrapper>
            );
          }
        })}
        <hr />
        <div className="flex items-center gap-5 justify-end">
          <PrimaryBtnComponent
            type="button"
            text="Cancel"
            variant={"outline"}
          />
          <PrimaryBtnComponent
            type="submit"
            text="Submit"
            variant={"filled"}
            className={""}
          />
        </div>
      </form>
    )
  );
}
