"use client";

import JsonForm from "@/components/jsonform";
import JsonInput from "@/components/jsoninput";
import React, { useState } from "react";

export default function Home() {
  const [uiSchema, setUiSchema] = useState<any>();

  const handleChange = (data: any) => {
    if (data !== "") {
      data.sort((a: any, b: any) => a.sort - b.sort);
    }
    setUiSchema(data);
  };

  return (
    <div className="grid grid-cols-2 mt-10 gap-10">
      <div className="max-h-[90vh] ">
        <JsonInput onChange={handleChange} value={uiSchema} />
      </div>
      <div
        className={
          "w-full h-full bg-white rounded-lg " +
          ((!uiSchema || uiSchema == "") && " border ")
        }
      >
        {uiSchema && uiSchema !== "" ? (
          <JsonForm formData={uiSchema} />
        ) : (
          <h1 className="text-center text-sm mt-5"> Generated Form</h1>
        )}
      </div>
    </div>
  );
}
