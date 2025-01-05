import { useState } from "react";

const items = [
  { title: "Section 1", content: "Content for section 1." },
  { title: "Section 2", content: "Content for section 2." },
  { title: "Section 3", content: "Content for section 3." },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="accordion">
        <h1>Accordion Component</h1>
        {items.map((item, index) => (
          <div key={index} className="accordion-item">
            <button
              className={`accordion-title ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
            </button>
            <div
              className={`accordion-content ${
                activeIndex === index ? "show" : ""
              }`}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
