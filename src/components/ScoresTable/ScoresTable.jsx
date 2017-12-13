import React from 'react';

const ScoresTable = (props) => {

  function formatElapsedTime(seconds) {
    function pad(val, places) {
      var s = val.toString();
      return '0'.repeat(places - s.length) + s;
    } 
    return `${pad(Math.floor(seconds / 60), 2)}:${pad(seconds % 60, 2)}`;
  }

  return (
    <table className='table table-striped' style={{
      display: "flex",
      position: "fixed",
      justifyContent: "center",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: 500,
      width: 500,
      margin: "auto"}}>
      <thead>
        <tr>
          <th>Player</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {(props => 
          <tr key={props.player}>
            <td>{props.player}</td>
            <td>{props.points}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ScoresTable