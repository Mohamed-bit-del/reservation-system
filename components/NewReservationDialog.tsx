'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createReservation } from '@/lib/api';
import { getCurrentUser } from '@/lib/auth';
import { Reservation } from '@/lib/types';

const HOTELS = [
  'Luxury Grand Hotel',
  'Seaside Resort',
  'Mountain Lodge',
  'City Center Hotel',
  'Business Plaza Hotel',
];

const ROOM_TYPES = ['Single', 'Double', 'Suite'];

type NewReservationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReservationCreated: () => void;
}

export default function NewReservationDialog({
  open,
  onOpenChange,
  onReservationCreated,
}: NewReservationDialogProps) {
  const [formData, setFormData] = useState({
    hotel: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    roomType: 'Single',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) return;

    const ReservationsStorage: Reservation[] = JSON.parse(localStorage.getItem('reservations') || '[]');

    // توليد ID جديد بناءً على آخر حجز
    const newId = ReservationsStorage.length > 0
      ? Math.max(...ReservationsStorage.map(res => res.id)) + 1
      : 1;

    const newReservation: Reservation = {
      id: newId,
      userId: user.id,
      user: user.name,
      hotel: formData.hotel,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: parseInt(formData.guests),
      roomType: formData.roomType as 'Single' | 'Double' | 'Suite',
      status: 'Pending',
    };

    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    existingReservations.push(newReservation);

    localStorage.setItem('reservations', JSON.stringify(existingReservations));

    onOpenChange(false);

    setFormData({
      hotel: '',
      checkIn: '',
      checkOut: '',
      guests: '1',
      roomType: 'Single',
    });

    // onReservationCreated();
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Reservation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Hotel</label>
            <Select
              value={formData.hotel}
              onValueChange={(value) => setFormData({ ...formData, hotel: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a hotel" />
              </SelectTrigger>
              <SelectContent>
                {HOTELS.map((hotel) => (
                  <SelectItem key={hotel} value={hotel}>
                    {hotel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Check-in</label>
              <Input
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Check-out</label>
              <Input
                type="date"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Guests</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Room Type</label>
              <Select
                value={formData.roomType}
                onValueChange={(value) => setFormData({ ...formData, roomType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROOM_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Reservation
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}