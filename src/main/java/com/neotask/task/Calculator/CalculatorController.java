package com.neotask.task.Calculator;

import java.time.LocalDate;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalculatorController {

    CalculatorController(){
        
    }

    @RequestMapping("/calculate")
    public Calculator calculate( @RequestParam(value="yearSalary", required=false, defaultValue="0.0") Double yearSalary,
                                @RequestParam(value="vacationDays", required=false, defaultValue="0") short vacationDays,
                                @RequestParam(value="vacationStartsAt", required=false, defaultValue="2001-01-01") String vacationStartsAt,
                                @RequestParam(value="vacationEndsAt", required=false, defaultValue="2001-01-01") String vacationEndsAt) {
        return new Calculator(yearSalary, vacationDays, vacationStartsAt, vacationEndsAt);
    }
}   