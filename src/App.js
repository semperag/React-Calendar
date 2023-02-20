import React, {useState, useEffect} from 'react';
import './App.css';
import {Memory} from './Memory';
import {useSelector, useDispatch} from 'react-redux';
import {loadDay, startAddingMemory} from './actions';
import {ProgressBar} from 'react-fetch-progressbar';
import {Routes,Route} from 'react-router'

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
console.log("here");

var weekday = new Array(7);
weekday[0]="Monday";
weekday[1]="Tuesday";
weekday[2]="Wednesday";
weekday[3]="Thursday";
weekday[4]="Friday";
weekday[5]="Saturday";
weekday[6]="Sunday";

const months = [[], ["January", 31], ["February", 28], ["March", 31],
["April", 30], ["May", 31], ["June", 30], ["July", 31], 
["August", 31], ["September", 30], ["October", 31],
["November", 30], ["December", 31]];

function App() {

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(2);
  const [message, setMessage] = useState('');
  const [year_date, setYear] = useState(year);
  const [month_date, setMonth] = useState(month);
  const [day_date, setDay] = useState(day);
  const [day_number, setDayNumber] = useState(day+1);

  let today = months[month_date][0] + " " + day_date + ", " + year_date ;

  const memories = useSelector(state => state.memories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDay(year_date, month, day));
  }, [dispatch]);

  let startTime = (24 - parseInt(start)) * 50;
  let endTime = (24 - parseInt(end)) * 50 ;
  let heightNumber = startTime - endTime - 4;
  let looper = heightNumber;

  while (looper > 46) {
    startTime = startTime - 50;
    looper = looper - 50;
  }
  startTime = startTime + 154;

  const onAdd = () => {
    console.log('new event');
    dispatch(startAddingMemory(year_date, month_date, day_date, startTime, heightNumber, message));
  }

  const nextDay = () => {
    let loading_day = day_date;
    let loading_month = month_date;

    if (day_date === months[month_date][1]) {
      setDay(1);
      loading_day = 1;
      if (month_date === 12) {
        setMonth(1);
        setYear(year_date + 1)
        loading_month = 1;
      } else {
        setMonth(month_date + 1);
        loading_month = loading_month + 1;
      }
    } else {
      setDay(day_date + 1);
      loading_day = loading_day + 1;
    }

    setDayNumber(day_number + 1);

    dispatch(loadDay(year_date, loading_month, loading_day));
  }

  const prevDay = () => {
    let loading_day = day_date;
    let loading_month = month_date;

    if (day_date === 1) {
      if (month_date === 1) {
        setMonth(12);
        setDay(months[12][1]);
        setYear(year_date - 1);
        loading_day = months[12][1];
        loading_month = 12;
      } else {
        setMonth(month_date - 1);
        setDay(months[month_date - 1][1]);
        loading_day = months[month_date - 1][1];
        loading_month = loading_month - 1;
      }
    } else {
      setDay(day_date - 1);
      loading_day = loading_day - 1;
    }

    if (day_number === 0) {
      setDayNumber(6);
    } else {
      setDayNumber(day_number - 1);
    }

    dispatch(loadDay(year_date, loading_month, loading_day));
  }

  function startTimeClicked(startTime) {
    var endTimes = document.getElementById('end-times');
    var startTimeValue = parseInt(startTime.target.value);
    var endTimeValue = parseInt(endTimes.value)
    setStart(startTimeValue);

    for(var i = 0; i < endTimes.length; i++) {
      var endTime = endTimes[i];

      if (parseInt(endTime.value) <= startTimeValue) {
          endTime.disabled = true;
      } else {
        endTime.disabled = false;
      }
    }

    if (endTimeValue <= startTimeValue) {
      endTimes.selectedIndex = "" + (startTimeValue - 1);
      setEnd(parseInt(endTimes.value));
    }
  }

  // All the attributes of the website
  return (
    <Routes>
    <Route path="/">
    <div className="memories-root">
      <div id="app-name">
        <span id="calendar">Calendar</span> 
        <div className="loader"></div>
      </div>
      <div id="date">
        <button className="date-button" onClick={prevDay}>&lt;</button>
        <span> </span>
        <button className="date-button" onClick={nextDay}>&gt;</button>
        <span id="today-date">{today}</span>
      </div>
      <ProgressBar/>
      <div id="calendar-day">
      <div id="calendar-times">
          <div id="time-selectors">
              <div className="selector">
                <select className="times"
                    value={start}
                    onChange={e => startTimeClicked(e)}>
                    <option value="1">12:00am</option>
                    <option value="2">1:00am</option>
                    <option value="3">2:00am</option>
                    <option value="4">3:00am</option>
                    <option value="5">4:00am</option>
                    <option value="6">5:00am</option>
                    <option value="7">6:00am</option>
                    <option value="8">7:00am</option>
                    <option value="9">8:00am</option>
                    <option value="10">9:00am</option>
                    <option value="11">10:00am</option>
                    <option value="12">11:00am</option>
                    <option value="13">12:00pm</option>
                    <option value="14">1:00pm</option>
                    <option value="15">2:00pm</option>
                    <option value="16">3:00pm</option>
                    <option value="17">4:00pm</option>
                    <option value="18">5:00pm</option>
                    <option value="19">6:00pm</option>
                    <option value="20">7:00pm</option>
                    <option value="21">8:00pm</option>
                    <option value="22">9:00pm</option>
                    <option value="23">10:00pm</option>
                    <option value="24">11:00pm</option>
                </select>
              </div>

              <span id="select-between"> &ndash; </span>

              <div className="selector">
                <select id="end-times" 
                    className="times"
                    value={end}
                    onChange={e => setEnd(parseInt(e.target.value))}>
                    <option value="2">1:00am</option>
                    <option value="3">2:00am</option>
                    <option value="4">3:00am</option>
                    <option value="5">4:00am</option>
                    <option value="6">5:00am</option>
                    <option value="7">6:00am</option>
                    <option value="8">7:00am</option>
                    <option value="9">8:00am</option>
                    <option value="10">9:00am</option>
                    <option value="11">10:00am</option>
                    <option value="12">11:00am</option>
                    <option value="13">12:00pm</option>
                    <option value="14">1:00pm</option>
                    <option value="15">2:00pm</option>
                    <option value="16">3:00pm</option>
                    <option value="17">4:00pm</option>
                    <option value="18">5:00pm</option>
                    <option value="19">6:00pm</option>
                    <option value="20">7:00pm</option>
                    <option value="21">8:00pm</option>
                    <option value="22">9:00pm</option>
                    <option value="23">10:00pm</option>
                    <option value="24">11:00pm</option>
                    <option value="25">12:00am</option>
                </select>
              </div>
              <textarea id="event" value={message} placeholder="Event Title"
              onChange={e =>setMessage(e.target.value)}/>
              <button id="insert" onClick={onAdd}>New Event</button>
          </div>
                    
          <div id="left-cal">
              <div className="time">1 AM</div>
              <div className="time">2 AM</div>
              <div className="time">3 AM</div>
              <div className="time">4 AM</div>
              <div className="time">5 AM</div>
              <div className="time">6 AM</div>
              <div className="time">7 AM</div>
              <div className="time">8 AM</div>
              <div className="time">9 AM</div>
              <div className="time">10 AM</div>
              <div className="time">11 AM</div>
              <div className="time">12 PM</div>
              <div className="time">1 PM</div>
              <div className="time">2 PM</div>
              <div className="time">3 PM</div>
              <div className="time">4 PM</div>
              <div className="time">5 PM</div>
              <div className="time">6 PM</div>
              <div className="time">7 PM</div>
              <div className="time">8 PM</div>
              <div className="time">9 PM</div>
              <div className="time">10 PM</div>
              <div className="time">11 PM</div>
          </div>
          <div id="right-cal">
            <div id="today">{weekday[(day_number % 7)]}</div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              <div className="time-block"></div>
              
              {memories.map(memory => <Memory key={memory.id} memory={memory} />)}
          </div>
        </div>
      </div>
    </div>
    </Route>
    </Routes>
  );
}

export default App;