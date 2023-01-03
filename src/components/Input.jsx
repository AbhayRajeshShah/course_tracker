import "./Input.scss";
import { useState } from "react";

const Input = ({ onSubmit, desc, type }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  if (show) {
    return (
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <input
          type="text"
          className="text_input"
          placeholder={`${desc} name`}
          value={text}
          onKeyDown={(e) => {
            if (text !== "") {
              if (e.key === "Enter") {
                onSubmit(text);
                setText("");
              }
            }
          }}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <p
          onClick={() => {
            setShow(false);
          }}
          style={{ cursor: "pointer" }}
        >
          X
        </p>
      </div>
    );
  } else {
    if (!type) {
      return (
        <button
          className="primary card_btn"
          onClick={() => {
            setShow(true);
          }}
        >
          {desc}
        </button>
      );
    } else {
      return (
        <button
          className="add_btn"
          onClick={() => {
            setShow(true);
          }}
        >
          +
        </button>
      );
    }
  }
};

export default Input;
