package com.neotask.task.Calculator;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.StringJoiner;

import javax.management.DynamicMBean;

public class Calculator {
    private short vacationDays;
    private double yearSalary; 
    private LocalDate vacationStartsAt;
    private LocalDate vacationEndsAt;

    public Calculator(Double yearSalary, short vacationDays, String vacationStartsAt, String vacationEndsAt){
        this.vacationDays = vacationDays;
        this.yearSalary = yearSalary;
        this.vacationStartsAt = parseDateFormat(vacationStartsAt);
        this.vacationEndsAt = parseDateFormat(vacationEndsAt);
    }


    public double getHolidayPay(){
        return 0;
    }


    public LocalDate parseDateFormat(String defaultDate){
        String[] dayMonthYear = defaultDate.split("\\D");
        if(dayMonthYear[0].length()==1)
            dayMonthYear[0] = "0" + dayMonthYear[0];
        if(dayMonthYear[1].length()==1)
            dayMonthYear[1] = "0" + dayMonthYear[1];
        return LocalDate.parse(new StringJoiner("-")
                                    .add(dayMonthYear[2])
                                    .add(dayMonthYear[1])
                                    .add(dayMonthYear[0])
                                    .toString());
    }
}
