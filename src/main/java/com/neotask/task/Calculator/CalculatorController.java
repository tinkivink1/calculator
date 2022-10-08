package com.neotask.task.Calculator;

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
                                @RequestParam(value="vacationStartsAt", required=false, defaultValue="00-00-0000") String vacationStartsAt,
                                @RequestParam(value="vacationEndsAt", required=false, defaultValue="01-00-0000") String vacationEndsAt) {
        return new Calculator(yearSalary, vacationDays, vacationStartsAt, vacationEndsAt);
    }
}   