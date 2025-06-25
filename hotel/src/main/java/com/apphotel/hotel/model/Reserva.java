package com.apphotel.hotel.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreHotel;
    private String descripcion;
    private String destino;
    private String fechas;
    private int adultos;
    private int niños;
    private int habitaciones;
    private int precio;
    private String email; // 👈 Nuevo campo para vincular la reserva con el usuario

    public Reserva() {}

    public Reserva(String nombreHotel, String descripcion, String destino, String fechas, int adultos, int niños, int habitaciones, int precio, String email) {
        this.nombreHotel = nombreHotel;
        this.descripcion = descripcion;
        this.destino = destino;
        this.fechas = fechas;
        this.adultos = adultos;
        this.niños = niños;
        this.habitaciones = habitaciones;
        this.precio = precio;
        this.email = email;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombreHotel() { return nombreHotel; }
    public void setNombreHotel(String nombreHotel) { this.nombreHotel = nombreHotel; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }

    public String getFechas() { return fechas; }
    public void setFechas(String fechas) { this.fechas = fechas; }

    public int getAdultos() { return adultos; }
    public void setAdultos(int adultos) { this.adultos = adultos; }

    public int getNiños() { return niños; }
    public void setNiños(int niños) { this.niños = niños; }

    public int getHabitaciones() { return habitaciones; }
    public void setHabitaciones(int habitaciones) { this.habitaciones = habitaciones; }

    public int getPrecio() { return precio; }
    public void setPrecio(int precio) { this.precio = precio; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}

