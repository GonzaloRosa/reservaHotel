package com.apphotel.hotel.service;

import com.apphotel.hotel.model.Reserva;
import com.apphotel.hotel.repository.ReservaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReservaServiceImpl implements ReservaService {

    private final ReservaRepository reservaRepository;

    public ReservaServiceImpl(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    @Override
    public Reserva guardarReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    @Override
    public List < Reserva > obtenerTodas() {
        return reservaRepository.findAll();
    }

    @Override
    public List < Reserva > obtenerPorEmail(String email) {
        return reservaRepository.findByEmail(email);
    }

}