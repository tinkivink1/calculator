package com.neotask.task.ExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
@ControllerAdvice
public class ExceptionHandlerController {
    
    //...
    @ExceptionHandler(value = MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Object> exception(MethodArgumentTypeMismatchException exception) {
        return new ResponseEntity<>("Invalid params sent, may be we should to do something =)", HttpStatus.NOT_FOUND);
    }
}
