package com.apphotel.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.apphotel.hotel.model.Reserva;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByEmail(String email);  // 🔥 NUEVO
}
