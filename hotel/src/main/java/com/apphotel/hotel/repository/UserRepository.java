package com.apphotel.hotel.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apphotel.hotel.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByEmailAndPassword(String email, String password);

    Optional<User> findByEmail(String email);

}