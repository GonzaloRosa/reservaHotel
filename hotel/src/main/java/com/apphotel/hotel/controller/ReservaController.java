package com.apphotel.hotel.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.apphotel.hotel.service.ReservaService;
import com.apphotel.hotel.model.Reserva;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*") // permite peticiones desde el frontend
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping
    public Reserva crearReserva(@RequestBody Reserva reserva) {
        return reservaService.guardarReserva(reserva);
    }

    @GetMapping
    public List<Reserva> obtenerReservas() {
        return reservaService.obtenerTodas();
    }

    // 🔥 Cambiado: obtener solo reservas del usuario
    @GetMapping("/{email}")
    public List<Reserva> obtenerReservasPorEmail(@PathVariable String email) {
        return reservaService.obtenerPorEmail(email);
    }
}
