import React, { useEffect, useContext } from "react";
import Moment from "react-moment";
import { AppContext } from "../App";
import Table from "react-bootstrap/Table";

const ActivityList = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    let activityList = JSON.parse(localStorage.getItem("activity"));
    if (activityList === null) {
      dispatch({ type: "UPDATE_ACTIVITIES", data: [] });
      localStorage.setItem("activity", JSON.stringify([]));
    } else {
      dispatch({ type: "UPDATE_ACTIVITIES", data: activityList });
    }
  }, []);

  const TableRow = ({ activity, start_time, end_time }) => (
    <tr>
      <td>{activity}</td>
      <td>
        <Moment date={start_time} format="HH:mm D MMM YYYY" />
      </td>
      <td>
        {end_time ? (
          <Moment date={end_time} format="HH:mm D MMM YYYY" />
        ) : (
          <span></span>
        )}
      </td>

      <td>
        {end_time ? (
          <Moment date={end_time} duration={start_time} />
        ) : (
          <Moment interval={1000} date={start_time} durationFromNow />
        )}
      </td>
    </tr>
  );

  return (
    <div className="table-container">
      {state &&
        "activities" in state &&
        state.activities &&
        state.activities.length > 0 && (
          <Table responsive>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {state.activities.map((a, i) => (
                <TableRow {...a} key={i} />
              ))}
            </tbody>
          </Table>
        )}
    </div>
  );
};

export default ActivityList;
