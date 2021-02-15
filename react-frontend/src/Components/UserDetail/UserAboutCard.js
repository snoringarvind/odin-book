import React, { useEffect, useState, useContext } from "react";
import { OdinBookContext } from "../Context";

const UseraAboutCard = ({
  objkey,
  index,
  clickIndex,
  setClickIndex,
  result,
  setResult,
  ee,
  setee,
}) => {
  const { myAboutValue, didMyAboutMountValue } = useContext(OdinBookContext);
  const [myAbout, setMyAbout] = myAboutValue;

  const [state, setState] = useState({
    fname: result[objkey],
    lname: result[objkey],
    bio: result[objkey],
    nickName: result[objkey],
    school: result[objkey],
    college: result[objkey],
    working: result[objkey],
    relationshipStatus: result[objkey],
    book: result[objkey],
    food: result[objkey],

    gender: result[objkey],
    dob: result[objkey],
  });
  const str = {
    fname: "First Name",
    lname: "Last Name",
    bio: "Bio",
    nickName: "Nick-name",
    school: "School",
    college: "College",
    working: "Work Place",
    relationshipStatus: "Relationhsip Status",
    book: "Book",
    food: "Food",
    gender: "Gender",
    dob: "Date of birth",
  };
  const changeHandler = (e) => {
    // console.log(e.key);
    e.preventDefault();
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    const element = document.querySelector(`#${objkey}`);
    if (element) {
      element.addEventListener("keydown", (e) => {
        // console.log(e.key, "jdfjdfjdfnjdfn");
        if (e.key == "Escape") {
          setClickIndex(null);
        }
      });
    }
  }, []);

  console.log(state[objkey]);
  return (
    <div className="UserAboutCard">
      <form>
        <div className="form-group">
          <label htmlFor={objkey}>{str[objkey]}</label>
          <div className="container">
            {clickIndex != index && (
              <div className="profile-values">{ee[objkey]}</div>
            )}
            {clickIndex == index && (
              <input
                name={objkey}
                id={objkey}
                value={state[objkey]}
                onChange={changeHandler}
              />
            )}
          </div>
          {clickIndex !== index && (
            <div
              className="edit-icon fas fa-edit"
              onClick={(e) => {
                console.log(e);
                e.preventDefault();
                e.stopPropagation();
                setClickIndex(index);
              }}
            ></div>
          )}
          {clickIndex == index && (
            <div
              className="save-icon fas fa-save"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setClickIndex(null);
                // result.objkey = state.objkey;
                // console.log(result);
                // setResult(result);
                ee[objkey] = state[objkey];
                setee(ee);
                myAbout[objkey] = state[objkey];
                setMyAbout(myAbout);
              }}
            ></div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UseraAboutCard;
