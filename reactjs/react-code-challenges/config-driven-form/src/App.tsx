import ConfigDrivenForm from "./component/From"

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "checkbox" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

const formConfig:FieldConfig[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Enter your age",
    required: false,
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
    required: true,
  },
  {
    name: "subscribe",
    label: "Subscribe to Newsletter",
    type: "checkbox",
  },
];
function App() {

  return (
    <>
      <ConfigDrivenForm config={formConfig} />
    </>
  )
}

export default App
