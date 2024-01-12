import React, { useEffect, useState } from "react";
import TextInputComponent from "./inputs/text-input.component";
import { FormProvider, useForm } from "react-hook-form";
import DivWrapper from "./wrapperdiv";
import RadioButtonGroup from "./inputs/radio-group.component";
import SelectInputComponent from "./inputs/select-input.component";
import DescriptionComponent from "./inputs/description.component";
import { evaluateExpression } from "@/lib/functions";
import CheckboxInputComponent from "./inputs/checkbox-input.component";
import PrimaryBtnComponent from "./inputs/primary-btn.component";

export default function JsonForm({ formData}: { formData: any}) {
  const [submitData, setSubmitData] = useState();
  const formMethods = useForm();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors, touchedFields },
  } = formMethods;

  const onSubmit = (data: any) => {
    console.log("clicked :::::::::::::> ", data);
    setSubmitData(data);
  };

  return (
    <div>
      <FormProvider {...formMethods}>
        <form
          className="w-full px-4 pt-5 pb-3 border h-full rounded-xl flex flex-col space-y-5 text-xs font-medium"
          onSubmit={handleSubmit(onSubmit)}
        >
       {submitData && <h1 className="text-green-600 text-base font-semibold">Check Backend Data in Console !!</h1>}
          <hr />
          {formData.map((inputSchema: any, parent_index: number) => {
            let parent_UiType = inputSchema.uiType.toLowerCase();
            let parent_label = inputSchema.label.replace(/_/g, " ");
            let parent_jsonKey = inputSchema.jsonKey;

            switch (parent_UiType) {
              case "input":
                ///////////////////// TEXT 0 ////////////////////
                return (
                  <DivWrapper key={parent_index}>
                    <TextInputComponent
                      label={parent_label}
                      inputName={parent_jsonKey}
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
              case "select":
                ///////////////////// SELECT 0 ////////////////////
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
                      inputName={parent_jsonKey}
                      selectOptions={
                        inputSchema.validate.options
                          ? inputSchema.validate.options
                          : []
                      }
                    />
                  </DivWrapper>
                );
              case "switch":
                ///////////////////// SWITCH 0 ////////////////////
                return (
                  <CheckboxInputComponent
                    name={`${parent_jsonKey}`}
                    key={parent_index}
                    label={parent_label}
                    errors={errors}
                    required={inputSchema.validate.required}
                    description={inputSchema.description}
                    isDisabled={inputSchema.validate.disabled}
                    defaultValue={inputSchema.validate.defaultValue}
                  />
                );

              case "group":
                ///////////////////// GROUP 0 ////////////////////
                return (
                  <DivWrapper className="space-y-2" key={parent_index}>
                    {/*////////////  Group label //////////// */}
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
                    {/*////////////  Group label End //////////// */}

                    <hr />

                    <div className="space-y-4 py-2">
                      {inputSchema.subParameters.map(
                        (group: any, sub_index: number) => {
                          let group_uiType = group.uiType.toLowerCase();
                          let group_label = group.label.replace(/_/g, " ");
                          let group_jsonKey = `${parent_jsonKey}.${group.jsonKey}`;
                          let group_map_key = `${parent_index}_${sub_index}`;

                          switch (group_uiType) {
                            case "input":
                              ///////////////////// TEXT 1 ////////////////////
                              return (
                                <TextInputComponent
                                  key={group_map_key}
                                  label={group_label}
                                  inputName={group_jsonKey}
                                  description={group.description}
                                  errors={errors}
                                  required={group.validate.required}
                                  isDisabled={group.validate.immutable}
                                  register={register}
                                  placeholder={group.placeholder}
                                  variant={"filled"}
                                />
                              );
                            case "select":
                              ///////////////////// SELECT 1 ////////////////////
                              return (
                                <SelectInputComponent
                                  key={group_map_key}
                                  control={control}
                                  errors={errors}
                                  isDisabled={group.validate.immutable}
                                  description={group.description}
                                  required={group.validate.required}
                                  label={group_label}
                                  defaultValue={group.validate.defaultValue}
                                  inputName={group_jsonKey}
                                  selectOptions={
                                    group.validate.options
                                      ? group.validate.options
                                      : []
                                  }
                                />
                              );
                            case "switch":
                              ///////////////////// SWITCH 1 ////////////////////
                              return (
                                <CheckboxInputComponent
                                  name={group_jsonKey}
                                  key={group_map_key}
                                  label={group_label}
                                  errors={errors}
                                  required={group.validate.required}
                                  description={group.description}
                                  isDisabled={group.validate.disabled}
                                  defaultValue={group.validate.defaultValue}
                                />
                              );
                            case "radio":
                              ///////////////////// RADIO 1 ////////////////////
                              return (
                                <RadioButtonGroup
                                  key={group_map_key}
                                  value={
                                    watch(group_jsonKey) ??
                                    group.validate.defaultValue
                                  }
                                  name={group_jsonKey}
                                  options={group.validate.options}
                                  setValue={setValue}
                                />
                              );

                            case "ignore":
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
                                ///////////////////// IGNORE 1 ////////////////////
                                return (
                                  <div
                                    key={group_jsonKey}
                                    className="space-y-3"
                                  >
                                    {group.subParameters.map(
                                      (
                                        childSchema: any,
                                        child_index: number
                                      ) => {
                                        let child_label =
                                          childSchema.label.replace(/_/g, " ");

                                        let input_name = `${group_jsonKey}.${childSchema.jsonKey}`;
                                        let level2Key =
                                          childSchema.level + "_" + child_index;

                                        switch (
                                          childSchema.uiType.toLowerCase()
                                        ) {
                                          case "input":
                                            return (
                                              ///////////////////// TEXT 2 ////////////////////
                                              <TextInputComponent
                                                label={child_label}
                                                inputName={input_name}
                                                key={level2Key}
                                                register={register}
                                                errors={errors}
                                                variant={"filled"}
                                                description={
                                                  childSchema.description
                                                }
                                                required={
                                                  childSchema.validate.required
                                                }
                                                isDisabled={
                                                  childSchema.validate.immutable
                                                }
                                                placeholder={
                                                  childSchema.placeholder
                                                }
                                              />
                                            );
                                          case "switch":
                                            return (
                                              ///////////////////// CHECKBOX 2 ////////////////////
                                              <CheckboxInputComponent
                                                name={input_name}
                                                key={level2Key}
                                                label={child_label}
                                                errors={errors}
                                                description={
                                                  childSchema.description
                                                }
                                                required={
                                                  childSchema.validate.required
                                                }
                                                isDisabled={
                                                  childSchema.validate.immutable
                                                }
                                                defaultValue={
                                                  childSchema.validate
                                                    .defaultValue
                                                }
                                              />
                                            );
                                          case "select":
                                            return (
                                              ///////////////////// SELECT 2 ////////////////////
                                              <SelectInputComponent
                                                control={control}
                                                errors={errors}
                                                key={level2Key}
                                                isDisabled={
                                                  childSchema.validate.immutable
                                                }
                                                description={
                                                  childSchema.description
                                                }
                                                required={
                                                  childSchema.validate.required
                                                }
                                                label={child_label}
                                                defaultValue={
                                                  childSchema.validate
                                                    .defaultValue
                                                }
                                                setValue={setValue}
                                                inputName={input_name}
                                                selectOptions={
                                                  childSchema.validate.options
                                                    ? childSchema.validate
                                                        .options
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
                          }
                        }
                      )}
                    </div>
                  </DivWrapper>
                );
            }
          })}
          <hr />
          <div className="flex items-center gap-5 justify-end">
            <PrimaryBtnComponent
              type={"button"}
              text="Cancel"
              variant={"outline"}
              onClick={reset}
            />
            <PrimaryBtnComponent
              type="submit"
              text="Submit"
              variant={"filled"}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
