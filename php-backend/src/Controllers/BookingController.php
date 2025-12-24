<?php

namespace App\Controllers;

use App\Response;
use App\Utils;

class BookingController extends BaseController
{
    /**
     * List all bookings with room info
     */
    public function index()
    {
        $bookings = $this->db->fetchAll(
            'SELECT b.*, p.title as roomName 
             FROM Booking b 
             JOIN Post p ON b.roomId = p.id 
             ORDER BY b.createdAt DESC'
        );
        Response::json($bookings);
    }

    /**
     * Create a new booking
     */
    public function create()
    {
        $data = $this->getJsonInput();
        
        if (empty($data['roomId']) || empty($data['checkIn']) || empty($data['checkOut'])) {
            Response::error('Missing required fields', 400);
        }

        // Check availability
        if (!$this->isRoomAvailable($data['roomId'], $data['checkIn'], $data['checkOut'])) {
            Response::error('Room is not available for these dates', 400);
        }

        $id = Utils::generateId();
        $this->db->query(
            'INSERT INTO Booking (id, roomId, guestName, guestEmail, guestPhone, checkIn, checkOut, totalPrice, status, notes) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                $id,
                $data['roomId'],
                $data['guestName'] ?? 'Guest',
                $data['guestEmail'] ?? null,
                $data['guestPhone'] ?? null,
                $data['checkIn'],
                $data['checkOut'],
                $data['totalPrice'] ?? 0,
                'booked',
                $data['notes'] ?? null
            ]
        );

        $booking = $this->db->fetchOne('SELECT * FROM Booking WHERE id = ?', [$id]);
        Response::json($booking);
    }

    /**
     * Update booking status (Check-in, Check-out, Cancel)
     */
    public function updateStatus($id)
    {
        $data = $this->getJsonInput();
        $status = $data['status'] ?? null;

        if (!in_array($status, ['booked', 'checked_in', 'checked_out', 'cancelled'])) {
            Response::error('Invalid status', 400);
        }

        $this->db->query('UPDATE Booking SET status = ? WHERE id = ?', [$status, $id]);
        Response::json(['success' => true, 'status' => $status]);
    }

    /**
     * Get available rooms for a date range
     */
    public function availableRooms()
    {
        $checkIn = $_GET['checkIn'] ?? date('Y-m-d');
        $checkOut = $_GET['checkOut'] ?? date('Y-m-d', strtotime('+1 day'));

        $query = "
            SELECT p.*, 
                   (SELECT metaValue FROM PostMeta WHERE postId = p.id AND metaKey = 'price') as price,
                   (SELECT metaValue FROM PostMeta WHERE postId = p.id AND metaKey = 'capacity') as capacity
            FROM Post p 
            WHERE p.postType = 'room' 
            AND p.status = 'publish'
            AND p.id NOT IN (
                SELECT roomId FROM Booking 
                WHERE status IN ('booked', 'checked_in')
                AND NOT (checkOut <= ? OR checkIn >= ?)
            )
        ";

        $rooms = $this->db->fetchAll($query, [$checkIn, $checkOut]);
        Response::json($rooms);
    }

    /**
     * Helper to check if room is available
     */
    private function isRoomAvailable($roomId, $checkIn, $checkOut)
    {
        $query = "
            SELECT COUNT(*) as count FROM Booking 
            WHERE roomId = ? 
            AND status IN ('booked', 'checked_in')
            AND NOT (checkOut <= ? OR checkIn >= ?)
        ";
        $result = $this->db->fetchOne($query, [$roomId, $checkIn, $checkOut]);
        return $result['count'] == 0;
    }
}

