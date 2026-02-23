package com.submerso.controller;

import com.submerso.dto.common.ApiResponse;
import com.submerso.dto.marketplace.BookingDTO;
import com.submerso.service.MarketplaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marketplace")
@RequiredArgsConstructor
public class MarketplaceController {
    
    private final MarketplaceService marketplaceService;
    
    @GetMapping("/bookings")
    public ResponseEntity<ApiResponse<List<BookingDTO>>> getBookings() {
        return ResponseEntity.ok(ApiResponse.success(marketplaceService.getBookings(null)));
    }
    
    @PostMapping("/bookings")
    public ResponseEntity<ApiResponse<BookingDTO>> createBooking(@RequestBody BookingDTO bookingDTO) {
        return ResponseEntity.ok(ApiResponse.success(marketplaceService.createBooking(bookingDTO)));
    }
    
    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<ApiResponse<BookingDTO>> getBooking(@PathVariable String bookingId) {
        return ResponseEntity.ok(ApiResponse.success(marketplaceService.getBooking(bookingId)));
    }
    
    @DeleteMapping("/bookings/{bookingId}")
    public ResponseEntity<ApiResponse<Void>> cancelBooking(@PathVariable String bookingId) {
        marketplaceService.cancelBooking(bookingId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
