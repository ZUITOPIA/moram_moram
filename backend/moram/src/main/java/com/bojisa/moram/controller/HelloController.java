package com.bojisa.moram.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String helloController() {
        System.out.println("hello");
        return "hello";
    }
}
