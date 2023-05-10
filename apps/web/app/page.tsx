"use client";
import styles from "./page.module.css";
import { Calendar } from "callendly";
import { addDays, startOfDay } from "date-fns";

const eventData = [
  {
    meetingDate: startOfDay(new Date()),
    otherProperty: "some value",
  },
  {
    meetingDate: startOfDay(addDays(new Date(), 1)),
    otherProperty: "some value",
  },
  {
    meetingDate: startOfDay(addDays(new Date(), 2)),
    otherProperty: "some value",
  },
  {
    meetingDate: startOfDay(addDays(new Date(), 3)),
    otherProperty: "some value",
  },
  {
    meetingDate: startOfDay(addDays(new Date(), 4)),
    otherProperty: "some value",
  },
];

// console.log(eventData);

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <div> */}
        <Calendar eventDataProps={eventData} eventKeyName="meetingDate" 
          // weekDaysType="small"
          
        />
      {/* </div> */}
    </main>
  );
}
