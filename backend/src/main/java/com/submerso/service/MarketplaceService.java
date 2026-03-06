package com.submerso.service;

import com.submerso.dto.marketplace.BookingDTO;
import com.submerso.model.Booking;
import com.submerso.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MarketplaceService {

    private final BookingRepository bookingRepository;

    public List<BookingDTO> getBookings(String userId) {
        List<Booking> bookings = userId != null
                ? bookingRepository.findByUserId(userId)
                : bookingRepository.findAll();
        return bookings.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public BookingDTO createBooking(BookingDTO dto) {
        Booking booking = Booking.builder()
                .offerId(dto.getOfferId())
                .offerTitle(dto.getOfferTitle())
                .userId(dto.getUserId())
                .date(dto.getDate())
                .participants(dto.getParticipants())
                .totalPrice(dto.getTotalPrice())
                .status("PENDING")
                .notes(dto.getNotes())
                .createdAt(LocalDateTime.now())
                .build();
        Booking saved = bookingRepository.save(booking);
        return toDTO(saved);
    }

    public BookingDTO getBooking(String bookingId) {
        return bookingRepository.findById(bookingId).map(this::toDTO).orElse(null);
    }

    public void cancelBooking(String bookingId) {
        bookingRepository.findById(bookingId).ifPresent(b -> {
            b.setStatus("CANCELLED");
            bookingRepository.save(b);
        });
    }

    private BookingDTO toDTO(Booking b) {
        return BookingDTO.builder()
                .id(b.getId())
                .offerId(b.getOfferId())
                .offerTitle(b.getOfferTitle())
                .userId(b.getUserId())
                .date(b.getDate())
                .participants(b.getParticipants())
                .totalPrice(b.getTotalPrice())
                .status(b.getStatus())
                .notes(b.getNotes())
                .build();
    }
}
