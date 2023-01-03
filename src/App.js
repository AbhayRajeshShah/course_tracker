import "./App.css";
import "./components/Card.scss";
import Card from "./components/Card";
import { useState, useEffect } from "react";

function App() {
  const [subjects, setSubjects] = useState(
    JSON.parse(localStorage.getItem("subjects")) || []
  );
  useEffect(() => {
    console.log(subjects);
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);
  return (
    <div className="App">
      <div
        className="card add_sub"
        onClick={() => {
          setSubjects([
            ...subjects,
            {
              name: `Subject ${subjects.length + 1}`,
              chapters: [],
            },
          ]);
        }}
      >
        <p style={{ fontSize: "96px" }}>+</p>
        <p>Add Subject</p>
      </div>
      {subjects.map((subject, index) => {
        return <Card subject={subject} ind={index} />;
      })}
    </div>
  );
}

export default App;
