package com.apphotel.hotel.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.apphotel.hotel.model.User;
import com.apphotel.hotel.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // Constructor
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) throws Exception {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        
        if (existingUser.isPresent()) {
            throw new Exception("El email ya está registrado");
        }

        // Crear nuevo usuario desde los campos que te interesan
        User newUser = new User(user.getEmail(), user.getPassword());

        return userRepository.save(newUser);
    }

    @Override
    public User loginUser(User user) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        if (optionalUser.isEmpty()) {
            throw new Exception("Usuario no encontrado");
        }

        User foundUser = optionalUser.get();

        if (!foundUser.getPassword().equals(user.getPassword())) {
            throw new Exception("Contraseña incorrecta");
        }

        return foundUser;
    }
}
