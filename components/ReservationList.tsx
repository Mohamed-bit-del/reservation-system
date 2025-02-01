'use client';

import { Reservation } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { updateReservation } from '@/lib/api';
import { Calendar, Users, Home } from 'lucide-react';
import { format } from 'date-fns';

interface ReservationListProps {
  reservations: Reservation[];
  onReservationUpdated: () => void;
}

export default function ReservationList({ 
  reservations,
  onReservationUpdated
}: ReservationListProps) {
  const handleCancel = async (id: number) => {
    await updateReservation(id, { status: 'Cancelled' });
    onReservationUpdated();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reservations.map((reservation) => (
        <Card key={reservation.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2 text-gray-500" />
                <h3 className="font-semibold">{reservation.hotel}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(reservation.status)}`}>
                {reservation.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {format(new Date(reservation.checkIn), 'MMM d, yyyy')} - {format(new Date(reservation.checkOut), 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>{reservation.guests} guests • {reservation.roomType}</span>
              </div>
            </div>

            {reservation.status === 'Pending' && (
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => handleCancel(reservation.id)}
              >
                Cancel Reservation
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}