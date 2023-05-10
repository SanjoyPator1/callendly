"use client";
import styles from "./page.module.css";
import { Calendar } from "callendly";
import { addDays, startOfDay,format } from "date-fns";

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

  const onDateMouseEnter = (date : Date) => {
    console.log("onDateMouseEnter date", format(date, "yyyy-MM-dd"))
  }

  return (
    <main className={styles.main}>
      <div style={{width:"300px"}}>
        <Calendar eventDataProps={eventData} eventKeyName="meetingDate" 
          viewPrevNextMonth={true}
          onDateMouseEnter={onDateMouseEnter}
          // weekDaysType="small"
        />
        <div>

        </div>
      </div>
    </main>
  );
}
