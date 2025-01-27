import { useState } from "react";

function App() {
  return (
    <>
      <TabContainer />
    </>
  );
}
export default App;

// Components
const TabContainer = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    interests: [""],
    theme: "",
    options: [],
  });

  const ActiveTabComponent = tabConfig[activeTab].component;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", gap: "5px" }}>
        {tabConfig.map((tab, index) => (
          <div
            key={tab.name}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "5px",
              border: "1px solid black",
              cursor: "pointer",
              backgroundColor: activeTab === index ? "lightgray" : "white",
            }}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          padding: "10px",
          height: "150px",
        }}
      >
        <ActiveTabComponent formData={formData} setFormData={setFormData} />
      </div>

      <div style={{padding:"5px"}}>
        Name:{formData.name}<br/>
        Age:{formData.age}<br/>
        Email:{formData.email}<br/>
        Interests:{formData.interests.map((i) => <>{i},</>)}<br/>
        Theme:{formData.theme}<br/>
        Options:{formData.options.map((i) => <>{i},</>)}<br/>
      </div>
    </div>
  );
};

const Profile = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
    </div>
  );
};

const Interest = ({ formData, setFormData }) => {
  const handleInterestChange = (index, value) => {
    const updatedInterests = [...formData.interests];
    updatedInterests[index] = value;
    setFormData((prev) => ({ ...prev, interests: updatedInterests }));
  };

  const addInterest = () => {
    setFormData((prev) => ({ ...prev, interests: [...prev.interests, ""] }));
  };

  const removeInterest = (index) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index),
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {formData.interests.map((interest, index) => (
        <div key={index} style={{ display: "flex", gap: "5px" }}>
          <input
            type="text"
            value={interest}
            onChange={(e) => handleInterestChange(index, e.target.value)}
            placeholder={`Interest ${index + 1}`}
          />
          <button
            onClick={() => removeInterest(index)}
            style={{ padding: "5px" }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addInterest}
        style={{ padding: "5px", marginTop: "10px" }}
      >
        Add Interest
      </button>
    </div>
  );
};

const Setting = ({ formData, setFormData }) => {
  const handleThemeChange = (e) => {
    setFormData((prev) => ({ ...prev, theme: e.target.value }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <label>
        Theme:
        <select value={formData.theme} onChange={handleThemeChange}>
          <option value="">Select Theme</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
  );
};

const Options = ({ formData, setFormData }) => {
  const optionsList = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleCheckboxChange = (option) => {
    const updatedOptions = formData.options.includes(option)
      ? formData.options.filter((opt) => opt !== option)
      : [...formData.options, option];
    setFormData((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {optionsList.map((option) => (
        <label
          key={option}
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <input
            type="checkbox"
            checked={formData.options.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          {option}
        </label>
      ))}
      <button onClick={handleSubmit} style={{ padding: "5px", marginTop: "10px" }}>
        Submit
      </button>
    </div>
  );
};

const tabConfig = [
  {
    name: "Profile",
    component: Profile,
  },
  {
    name: "Interest",
    component: Interest,
  },
  {
    name: "Setting",
    component: Setting,
  },
  {
    name: "Options",
    component: Options,
  },
];
