"use client";
import React, { FC, memo, useEffect } from "react";
import styles from "./calendar.module.css";
import "./mystyle.css";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import clsx from "clsx";
import { CalendarClassModel, CalendarStyleModel } from "../../models/callendlyModel";

interface CalendarProps extends CalendarClassModel, CalendarStyleModel {
  currentMonthProp?: string;
  setCurrentMonthProp?: React.Dispatch<React.SetStateAction<string>>;
  setDaysProp?: React.Dispatch<React.SetStateAction<Date[]>>;
  onDateClick?: (date: Date) => void | Date;
  eventDataProps?: any[];
  eventKeyName?: string;
  weekDaysType?: "small" | "medium"
  
}

const CustomCalendar: FC<CalendarProps> = ({
  currentMonthProp,
  setCurrentMonthProp,
  setDaysProp,
  onDateClick,
  eventDataProps,
  eventKeyName,
  weekDaysType,

  // class props
  calendarContainerClassProp,
  headerClassProp,
  headerDateClassProp,
  headerDateFontClassProp,
  headerButtonsContainerClassProp,
  prevMonthButtonClassProp,
  nextMonthButtonClassProp,
  sevenGridClassProp,
  daysOfWeekContainerClassProp,
  weekDaysKeyContainerClassProp,
  weekDaysFontClassProp,
  daysOfMonthClassProp,
  monthDaysKeyContainerClassProp,
  buttonClassProp,
  isTodayClassProp,
  isSameMonthClassProp,
  isEqualClassProp,
  eventBubbleContainerClassProp,
  eventBubbleClassProp,

  // styles props
  calendarContainerStylesProp,
  headerStylesProp,
  headerDateStylesProp,
  headerDateFontStylesProp,
  headerButtonsContainerStylesProp,
  prevMonthButtonStylesProp,
  nextMonthButtonStylesProp,
  sevenGridStylesProp,
  daysOfWeekContainerStylesProp,
  weekDaysKeyContainerStylesProp,
  weekDaysFontStylesProp,
  daysOfMonthStylesProp,
  monthDaysKeyContainerStylesProp,
  buttonStylesProp,
  isTodayStylesProp,
  isSameMonthStylesProp,
  isEqualStylesProp,
  eventBubbleContainerStylesProp,
  eventBubbleStylesProp,
}) => {

  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekDaysType && weekDaysType==="small" && (daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"])

  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [eventData, setEventData] = useState(eventDataProps);

  let initialDaysData = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  const [days, setDays] = useState<Date[]>(initialDaysData);

  useEffect(() => {
    const daysData = eachDayOfInterval({
      start: startOfWeek(parse(currentMonth, "MMM-yyyy", new Date())),
      end: endOfWeek(endOfMonth(parse(currentMonth, "MMM-yyyy", new Date()))),
    });
    setDays(daysData);
    setDaysProp && setDaysProp(daysData);
  }, [currentMonth, setDaysProp]);

  // Update eventData
  useEffect(() => {
    // Create a new object with the updated events
    const updatedEventData = eventDataProps;
    setEventData(updatedEventData);
  }, [eventDataProps]);

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const handleOnDateClick = (day: Date) => {
    setSelectedDay(day);
    onDateClick && onDateClick(day);
  };

  return (
    <div className={clsx(styles.calendarContainer)}>
      {/* Header - current date and prev next button */}
      <div className={clsx(styles.header)}>
        <div className={clsx(styles.headerDate)}>
          <p className={clsx(styles.headerDateFont)}>
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </p>
        </div>
        <div className={clsx(styles.headerButtonsContainer)}>
          <button className={clsx(styles.prevMonthButton)} onClick={previousMonth}>
            <BiLeftArrowAlt />
          </button>
          <button className={clsx(styles.nextMonthButton)} onClick={nextMonth}>
            <BiRightArrowAlt />
          </button>
        </div>
      </div>

      {/* Render days of week */}
      <div className={clsx(styles.sevenGrid, styles.daysOfWeekContainer)}>
        {daysOfWeek.map((day) => (
          <div className={clsx(styles.weekDaysKeyContainer)} key={day}>
            <p className={clsx(styles.weekDaysFont)}>{day}</p>
          </div>
        ))}
      </div>

      {/* Render days of month */}
      <div className={clsx(styles.sevenGrid, styles.daysOfMonth)}>
        {days &&
          days.map((day, index) => {
            return (
              <div className={clsx(styles.monthDaysKeyContainer)} key={index}>
                <button
                  className={clsx(
                    styles.button,
                    isToday(day) && styles.isToday,
                    isSameMonth(day, firstDayCurrentMonth) &&
                      styles.isSameMonth,
                    isEqual(day, selectedDay) && styles.isEqual
                  )}
                  onClick={() => handleOnDateClick(day)}
                  style={{ gridColumnStart: getDay(day) + 1 }}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
                <div className={clsx(styles.eventBubbleContainer)}>
                  {eventData &&
                    eventKeyName &&
                    eventData.some((event) => {
                      return isSameDay(event[eventKeyName], day);
                    }) && <div className={clsx(styles.eventBubble)}></div>}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CustomCalendar;
