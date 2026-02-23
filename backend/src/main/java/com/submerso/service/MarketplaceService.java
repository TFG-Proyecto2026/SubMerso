package com.submerso.service;

import com.submerso.dto.marketplace.BookingDTO;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class MarketplaceService {
    
    public List<BookingDTO> getBookings(String userId) {
        return Collections.emptyList();
    }
    
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        return null;
    }
    
    public BookingDTO getBooking(String bookingId) {
        return null;
    }
    
    public void cancelBooking(String bookingId) {
    }
}
