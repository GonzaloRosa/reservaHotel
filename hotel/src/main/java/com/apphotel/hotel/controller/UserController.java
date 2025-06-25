package com.apphotel.hotel.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.apphotel.hotel.model.User;
import com.apphotel.hotel.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok("Usuario registrado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User loggedUser = userService.loginUser(user);
            return ResponseEntity.ok(loggedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}