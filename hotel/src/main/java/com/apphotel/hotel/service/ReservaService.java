package com.apphotel.hotel.service;

import java.util.List;
import com.apphotel.hotel.model.Reserva;

public interface ReservaService {
    Reserva guardarReserva(Reserva reserva);
    List<Reserva> obtenerTodas();
    List<Reserva> obtenerPorEmail(String email); // 🔥 NUEVO
    public boolean eliminarPorId(Long id);
}
