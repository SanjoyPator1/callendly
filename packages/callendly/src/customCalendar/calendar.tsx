"use client";
import React, { FC,useEffect } from "react";
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
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import {LeftArrowIcon,RightArrowIcon} from "../customIcons/CustomIcons"
import clsx from "clsx";
import {
  CalendarClassModel,
  CalendarStyleModel,
} from "../../models/callendlyModel";

interface CalendarProps extends CalendarClassModel, CalendarStyleModel {
  setDaysProp?: React.Dispatch<React.SetStateAction<Date[]>>;
  onDateClick?: (date: Date) => void | Date;
  onDateMouseEnter?: (date: Date) => void | Date;
  onDateMouseLeave?: (date: Date) => void | Date;
  onPrevMonthClick?: () => void | Date;
  onNextMonthClick?: () => void | Date;
  prevMonthButtonIcon?: React.ReactNode;
  nextMonthButtonIcon?: React.ReactNode;
  eventDataProps?: any[];
  eventKeyName?: string;
  weekDaysType?: "small" | "medium";
  viewPrevNextMonth?: boolean
}

const CustomCalendar: FC<CalendarProps> = ({
  setDaysProp,
  onDateClick,
  onDateMouseEnter,
  onDateMouseLeave,
  onPrevMonthClick,
  onNextMonthClick,
  prevMonthButtonIcon,
  nextMonthButtonIcon,
  eventDataProps,
  eventKeyName,
  weekDaysType,
  viewPrevNextMonth = true,


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
  weekDaysType &&
    weekDaysType === "small" &&
    (daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]);

  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [eventData, setEventData] = useState(eventDataProps);

  let initialDaysData = eachDayOfInterval({
    start: viewPrevNextMonth ? startOfWeek(firstDayCurrentMonth): firstDayCurrentMonth,
    end: viewPrevNextMonth ? endOfWeek(endOfMonth(firstDayCurrentMonth)): endOfMonth(firstDayCurrentMonth),
  });

  const [days, setDays] = useState<Date[]>(initialDaysData);

  useEffect(() => {
    const daysData = eachDayOfInterval({
      start: viewPrevNextMonth ? startOfWeek(firstDayCurrentMonth): firstDayCurrentMonth,
      end: viewPrevNextMonth ? endOfWeek(endOfMonth(firstDayCurrentMonth)): endOfMonth(firstDayCurrentMonth),
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
    onPrevMonthClick && onPrevMonthClick();
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    onNextMonthClick && onNextMonthClick();
  }

  const handleOnDateClick = (day: Date) => {
    setSelectedDay(day);
    onDateClick && onDateClick(day);
  };

  return (
    <div
      className={clsx(styles.calendarContainer, calendarContainerClassProp)}
      style={Object.assign({}, calendarContainerStylesProp)}
    >
      {/* Header - current date and prev next button */}
      <div
        className={clsx(styles.header, headerClassProp)}
        style={Object.assign({}, headerStylesProp)}
      >
        <div className={clsx(styles.headerDate, headerDateClassProp)}
          style={Object.assign({}, headerDateStylesProp)}
        >
          <p className={clsx(styles.headerDateFont, headerDateFontClassProp)}
            style={Object.assign({}, headerDateFontStylesProp)}
          >
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </p>
        </div>
        <div
          className={clsx(
            styles.headerButtonsContainer,
            headerButtonsContainerClassProp
          )}
          style={Object.assign({}, headerButtonsContainerStylesProp)}
        >
          <button
            className={clsx(styles.prevMonthButton, prevMonthButtonClassProp)}
            style={Object.assign({}, prevMonthButtonStylesProp)}
            onClick={previousMonth}
          >
            {prevMonthButtonIcon ? prevMonthButtonIcon : <LeftArrowIcon />}
          </button>
          <button
            className={clsx(styles.nextMonthButton, nextMonthButtonClassProp)}
            style={Object.assign({}, nextMonthButtonStylesProp)}
            onClick={nextMonth}
          >
            {nextMonthButtonIcon ? nextMonthButtonIcon : <RightArrowIcon />}
          </button>
        </div>
      </div>

      {/* Render days of week */}
      <div
        className={clsx(
          styles.sevenGrid,
          styles.daysOfWeekContainer,
          sevenGridClassProp,
          daysOfWeekContainerClassProp
        )}
        style={Object.assign({}, sevenGridStylesProp, daysOfWeekContainerStylesProp)}
      >
        {daysOfWeek.map((day) => (
          <div
            className={clsx(
              styles.weekDaysKeyContainer,
              weekDaysKeyContainerClassProp
            )}
            style={Object.assign({}, weekDaysKeyContainerStylesProp)}
            key={day}
          >
            <p className={clsx(styles.weekDaysFont, weekDaysFontClassProp)}
              style={Object.assign({}, weekDaysFontStylesProp)}
            >
              {day}
            </p>
          </div>
        ))}
      </div>

      {/* Render days of month */}
      <div
        className={clsx(
          styles.sevenGrid,
          styles.daysOfMonth,
          sevenGridClassProp,
          daysOfMonthClassProp
        )}
        style={Object.assign({}, sevenGridStylesProp, daysOfMonthStylesProp)}
      >
        {days &&
          days.map((day, index) => {
            return (
              <div
                className={clsx(
                  styles.monthDaysKeyContainer,
                  monthDaysKeyContainerClassProp
                )}
                style={Object.assign({},{gridColumnStart: getDay(day) + 1}, monthDaysKeyContainerStylesProp)}
                key={index}
              >
                <button
                  className={clsx(
                    styles.button,
                    isSameMonth(day, firstDayCurrentMonth) &&
                      styles.isSameMonth,
                    isEqual(day, selectedDay) && styles.isEqual,
                    isToday(day) && styles.isToday,
                    buttonClassProp,
                    isSameMonthClassProp,
                    isEqualClassProp,
                    isTodayClassProp,
                  )}
                  onClick={() => handleOnDateClick(day)}
                  onMouseEnter={()=> onDateMouseEnter && onDateMouseEnter(day)}
                  onMouseLeave={()=> onDateMouseLeave && onDateMouseLeave(day)}
                  style={Object.assign({},
                    buttonStylesProp,isSameMonthStylesProp,isEqualStylesProp,isTodayStylesProp )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
                <div
                  className={clsx(
                    styles.eventBubbleContainer,
                    eventBubbleContainerClassProp
                  )}
                  style={Object.assign({}, eventBubbleContainerStylesProp)}
                >
                  {eventData &&
                    eventKeyName &&
                    eventData.some((event) => {
                      return isSameDay(event[eventKeyName], day);
                    }) && (
                      <div
                        className={clsx(
                          styles.eventBubble,
                          eventBubbleClassProp
                        )}
                        style={Object.assign({}, eventBubbleStylesProp)}
                      ></div>
                    )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CustomCalendar;
