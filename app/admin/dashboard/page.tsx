'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Reservation } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filters, setFilters] = useState({
    status: '',
    hotel: '',
    userName: '',
  });

  useEffect(() => {
    const userDate = localStorage.getItem('user');
    const user = userDate ? JSON.parse(userDate) : null;
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }

    const storedData = localStorage.getItem('reservations');
    if (storedData) {
      setReservations(JSON.parse(storedData));
    }
  }, []);

  const filteredReservations = reservations.filter((reservation) => {
    return (
      (!filters.status || reservation.status === filters.status) &&
      (!filters.hotel || reservation.hotel.toLowerCase().includes(filters.hotel.toLowerCase())) &&
      (!filters.userName || reservation.user.toLowerCase().includes(filters.userName.toLowerCase()))
    );
  });


  const handleStatusChange = (id: number, status: "Pending" | "Approved" | "Cancelled") => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === id ? { ...reservation, status } : reservation
    );

    setReservations(updatedReservations);

    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Reservation Management</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium">Filter by Status</label>
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Filter by Hotel</label>
            <Input
              placeholder="Search hotels..."
              value={filters.hotel}
              onChange={(e) => setFilters({ ...filters, hotel: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Filter by User</label>
            <Input
              placeholder="Search users..."
              value={filters.userName}
              onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.id}</TableCell>
                  <TableCell>{reservation.user}</TableCell>
                  <TableCell>{reservation.hotel}</TableCell>
                  <TableCell>{format(new Date(reservation.checkIn), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{format(new Date(reservation.checkOut), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{reservation.roomType}</TableCell>
                  <TableCell>{reservation.guests}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${reservation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      reservation.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {reservation.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {reservation.status === 'Pending' && (
                      <div className="space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(reservation.id, 'Approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusChange(reservation.id, 'Cancelled')}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </div>
      </main>
    </div>
  );
}