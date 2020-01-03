import React, { useContext } from "react";
import { AppContext } from "../App";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Moment from "react-moment";

const StartActivity = () => {
  const { handleSubmit, register, reset } = useForm();
  const { state, dispatch } = useContext(AppContext);

  const changeValue = newActivity => {
    dispatch({ type: "NEW_ACTIVITIES", data: newActivity });
  };

  const onSubmit = (values, e) => {
    e.preventDefault();
    let activityList = JSON.parse(localStorage.getItem("activity"));
    let obj = {
      id: null,
      activity: values.activity,
      start_time: new Date().toISOString(),
      end_time: null
    };
    if (activityList.length === 0) {
      obj.id = 0;
    } else {
      obj.id = Number(activityList[activityList.length - 1].id) + 1;
    }
    activityList.push(obj);
    localStorage.setItem("activity", JSON.stringify(activityList));
    changeValue(activityList);

    reset({
      activity: ""
    });
  };

  const endActivitySybmit = id => {
    state.activities[id].end_time = new Date().toISOString();
    localStorage.setItem("activity", JSON.stringify(state.activities));
    dispatch({ type: "UPDATE_ACTIVITIES", data: state.activities });
  };

  const renderAddActivityForm = () => {
    return (
      <form className="activity-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Add an activity</h3>
        <TextField
          type="text"
          required
          label="Activity Description"
          name="activity"
          inputRef={register}
        />
        <Button type="submit" size="large" variant="contained" color="primary">
          Start Activity
        </Button>
      </form>
    );
  };

  const renderEndActivityForm = () => {
    return (
      <div className="activity-form">
        <h3>Current Activity</h3>
        <div>
          <p>{state.activities[state.activities.length - 1].activity}</p>
          <p>
            Current duration:&nbsp;
            <Moment
              interval={1000}
              date={state.activities[state.activities.length - 1].start_time}
              durationFromNow
            />
          </p>
        </div>
        <Button
          onClick={() =>
            endActivitySybmit(state.activities[state.activities.length - 1].id)
          }
          size="large"
          variant="contained"
          color="primary"
        >
          End Activity
        </Button>
      </div>
    );
  };

  const renderForm = () => {
    console.log(state);
    if (
      state &&
      "activities" in state &&
      state.activities &&
      state.activities.length > 0
    ) {
      console.log(state);
      if (state.activities[state.activities.length - 1].end_time) {
        return renderAddActivityForm();
      } else {
        return renderEndActivityForm();
      }
    } else {
      return renderAddActivityForm();
    }
  };

  return <div>{renderForm()}</div>;
};

export default StartActivity;
