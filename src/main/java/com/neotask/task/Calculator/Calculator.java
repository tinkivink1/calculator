package com.neotask.task.Calculator;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.Scanner;
import java.util.StringJoiner;


public class Calculator {
    private short vacationDays;
    private double yearSalary; 
    private LocalDate vacationStartsAt;
    private LocalDate vacationEndsAt;
    private HashSet<LocalDate> companyWeekends; // нерабочие дни компании, задаются в weekends.txt в формате yyyy-mm-dd

    public Calculator(Double yearSalary, short vacationDays, String vacationStartsAt, String vacationEndsAt){
        this.vacationDays = vacationDays;
        this.yearSalary = yearSalary;
        try{
            this.vacationStartsAt = parseDateFormat(vacationStartsAt);
        }
        catch (DateTimeParseException e){
            this.vacationStartsAt = null;
        }
        try{
            this.vacationEndsAt = parseDateFormat(vacationEndsAt);
        }
        catch (DateTimeParseException e){
            this.vacationEndsAt = null;
        }
        companyWeekends = readCompanyWeekendsList("/task/src/main/resources/weekends.txt");

    }

    // смотрим что пришло и возвращаем соответствующий результат
    public double getHolidayPay(){
        if(vacationStartsAt != null)
            if(vacationDays != 0)
                return yearSalary/workingDaysByDateAndDays(vacationStartsAt, vacationDays);
            else
                if(vacationEndsAt != null)
                    return yearSalary/workingDaysByDates(vacationStartsAt, vacationEndsAt);

        return yearSalary/vacationDays;
    }

    // workingDays - рабочие дни, на которые попадает отпуск,
    // т.е. исключаем из оплачиваемых дней выходные дни компании(праздники и т.д.) и выходные
    public short workingDaysByDateAndDays(LocalDate vacationStartsAt, short vacationDays) {
        LocalDate vacationEndsAt = vacationStartsAt.plus(vacationDays, ChronoUnit.DAYS);
        return workingDaysByDates(vacationStartsAt, vacationEndsAt);
    }

    public short workingDaysByDates(LocalDate vacationStartsAt, LocalDate vacationEndsAt) {
        short workingDays = 0; 
        vacationEndsAt = vacationEndsAt.plus(1, ChronoUnit.DAYS);
        for (LocalDate date = vacationStartsAt; date.isBefore(vacationEndsAt); date = date.plusDays(1)) {
            if(!(date.getDayOfWeek() == DayOfWeek.SATURDAY 
                || date.getDayOfWeek() == DayOfWeek.SUNDAY 
                || companyWeekends.contains(date))) {
                workingDays++;
            }
        }
        return workingDays;
    }

    // считываем из файла нерабочие дни компании
    public HashSet<LocalDate> readCompanyWeekendsList(String filename){
        HashSet<LocalDate> companyWeekends = new HashSet<>();

        try{
            FileReader reader = new FileReader(filename);
            Scanner scan = new Scanner(reader);
            String date;
            while(scan.hasNext()){
                date = scan.nextLine();
                try{
                    companyWeekends.add(LocalDate.parse(date));
                }
                catch(DateTimeParseException e){

                }
            }
            scan.close();
        }
        catch (FileNotFoundException e1){
            System.out.print(e1.getMessage());
        }
        catch (IOException e){
            System.out.print(e.getMessage());
        }
        
        return companyWeekends;
    }

    // конвертируем формат даты из yyyy-mm-dd в dd-mm-yyyy
    public LocalDate parseDateFormat(String defaultDate) throws DateTimeParseException{
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
