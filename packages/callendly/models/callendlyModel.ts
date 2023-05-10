import { CSSProperties } from "react";

export interface CalendarClassModel {
  calendarContainerClassProp: string;
  headerClassProp: string;
  headerDateClassProp: string;
  headerDateFontClassProp: string;
  headerButtonsContainerClassProp: string;
  prevMonthButtonClassProp: string;
  nextMonthButtonClassProp: string;
  sevenGridClassProp: string;
  daysOfWeekContainerClassProp: string;
  weekDaysKeyContainerClassProp: string;
  weekDaysFontClassProp: string;
  daysOfMonthClassProp: string;
  monthDaysKeyContainerClassProp: string;
  buttonClassProp: string;
  isTodayClassProp: string;
  isSameMonthClassProp: string;
  isEqualClassProp: string;
  eventBubbleContainerClassProp: string;
  eventBubbleClassProp: string;
}

export interface CalendarStyleModel {
  calendarContainerStylesProp: CSSProperties;
  headerStylesProp: CSSProperties;
  headerDateStylesProp: CSSProperties;
  headerDateFontStylesProp: CSSProperties;
  headerButtonsContainerStylesProp: CSSProperties;
  prevMonthButtonStylesProp: CSSProperties;
  nextMonthButtonStylesProp: CSSProperties;
  sevenGridStylesProp: CSSProperties;
  daysOfWeekContainerStylesProp: CSSProperties;
  weekDaysKeyContainerStylesProp: CSSProperties;
  weekDaysFontStylesProp: CSSProperties;
  daysOfMonthStylesProp: CSSProperties;
  monthDaysKeyContainerStylesProp: CSSProperties;
  buttonStylesProp: CSSProperties;
  isTodayStylesProp: CSSProperties;
  isSameMonthStylesProp: CSSProperties;
  isEqualStylesProp: CSSProperties;
  eventBubbleContainerStylesProp: CSSProperties;
  eventBubbleStylesProp: CSSProperties;
}