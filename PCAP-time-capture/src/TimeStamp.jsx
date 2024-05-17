import { useState } from 'react';

const Timestamp = () => {
  const [timestamps, setTimestamps] = useState([]);

  function convertTo24HourFormat(time12h) {
    // Split the input time string by space to separate time and AM/PM
    time12h = time12h.split(", ")[1];
    const [time, period] = time12h.split(' ');
    // Split the time part by colon to get hours, minutes, and seconds
    let [hours, minutes, seconds] = time.split(':').map(Number);

    // Convert hours based on AM/PM period
    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }

    // Format hours, minutes, and seconds to ensure two digits
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    // Return the time in 24-hour format
    return `${hours}:${minutes}:${seconds}`;
}

  const handleClick = () => {
    const currentTimestamp = convertTo24HourFormat(new Date().toLocaleString());

    setTimestamps([currentTimestamp, ...timestamps]);
  };

  return (
    <div>
      <button onClick={handleClick} style={{backgroundColor:'gray'}}>Get Current Timestamp</button>
      <ul>
        {timestamps.map((timestamp, index) => (
          <li key={index}>{timestamp}</li>
        ))}
      </ul>
    </div>
  );
};

export default Timestamp;