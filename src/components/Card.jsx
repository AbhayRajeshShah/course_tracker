import { useState, useEffect } from "react";
import Input from "./Input";

const Card = ({ subject, ind }) => {
  const [index, setIndex] = useState(-1);
  const [sub, setSub] = useState(subject);
  useEffect(() => {
    let subjects = JSON.parse(localStorage.getItem("subjects"));
    subjects[ind] = sub;
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [sub, ind]);
  console.log(index);
  const percentage = () => {
    var numerator = 0;
    var denominator = 0;
    for (var x = 0; x < sub.chapters.length; x++) {
      numerator += sub.chapters[x].topics.filter(
        (el) => el.completed === true
      ).length;
      denominator += sub.chapters[x].topics.length;
    }
    var per = (numerator / denominator) * 100;
    return Math.round(per * 100) / 100;
  };
  return (
    <div className="card" key={ind}>
      <div className="percentage_parent_div">
        <div className="percentage_parent">
          <div
            className="percentage_div"
            style={{ width: `${percentage()}%` }}
          ></div>
        </div>
        <p className="percentage stats">{percentage()}%</p>
      </div>
      <div className="content">
        <input
          type="text"
          value={sub.name}
          className="head"
          onChange={(e) => {
            setSub({ ...sub, name: e.target.value });
          }}
        />
        <div className="chapters">
          {sub.chapters.map((el, i) => {
            return (
              <div className="chapter" key={i}>
                <div
                  className="chapter_head"
                  style={{ backgroundColor: index === i ? "#ffffff16" : "" }}
                  onClick={() => {
                    setIndex(index === i ? -1 : i);
                  }}
                >
                  <p
                    className="chapter_name"
                    style={{
                      cursor: "pointer",
                      color: index === i ? "#60a5fa" : "white",
                    }}
                  >
                    {el.name}
                  </p>
                  <p className="stats">
                    {`${
                      el.topics.filter((el, i) => el.completed === true).length
                    }/${el.topics.length}`}
                  </p>
                </div>

                {index === i ? (
                  <div className="topics">
                    {el.topics.map((topic, tIndex) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            alignItems: "center",
                            margin: "0.25rem",
                          }}
                          key={tIndex}
                        >
                          <input
                            className="checkbox"
                            type="checkbox"
                            onChange={(e) => {
                              let temp = { ...sub };
                              console.log(e.target.checked);
                              temp.chapters[i].topics[tIndex].completed =
                                e.target.checked;
                              console.log(temp);
                              setSub(temp);
                            }}
                            checked={topic.completed}
                            id=""
                          />
                          <p key={tIndex}>{topic.name}</p>
                        </div>
                      );
                    })}
                    <Input
                      desc="Add Topic"
                      type={true}
                      onSubmit={(e) => {
                        setSub({
                          ...sub,
                          chapters: sub.chapters.map((el, i) => {
                            if (i === index) {
                              el.topics.push({ name: e, completed: false });
                            }
                            return el;
                          }),
                        });
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Input
        onSubmit={(e) => {
          setSub({
            ...sub,
            chapters: [...sub.chapters, { name: `${e}`, topics: [] }],
          });
        }}
        desc="Add Chapter"
      />
    </div>
  );
};

export default Card;
