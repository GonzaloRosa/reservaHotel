package com.apphotel.hotel.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String welcome() {
        return "Bienvenido al backend. Usa /api/auth para autenticación.";
    }
}