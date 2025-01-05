import React, { useState } from "react";
import { FieldConfig } from "../App";

type FormData = {
  [key: string]: string | boolean;
};

const ConfigDrivenForm: React.FC<{ config: FieldConfig[] }> = ({ config }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    const fieldValue =
      type === "checkbox" ? (event.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: Record<string, string> = {};
    config.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Submitted Data:", formData);
  };

  return (
    <div className="form-container">
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        {config.map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span>*</span>}
            </label>
            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                onChange={handleChange}
                required={field.required}
              >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                onChange={handleChange}
                required={field.required}
              />
            )}
            {errors[field.name] && (
              <div className="error">{errors[field.name]}</div>
            )}
          </div>
        ))}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ConfigDrivenForm;
