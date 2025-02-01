import { Reservation } from './types';

const API_URL = 'https://api.mockapi.io/v1';

export async function fetchReservations(filters?: {
  status?: string;
  dateRange?: { start: string; end: string };
  hotel?: string;
  userName?: string;
}): Promise<Reservation[]> {
  // In a real app, these would be actual API calls
  const response = await fetch(`${API_URL}/reservations`);
  let data = await response.json();

  if (filters) {
    if (filters.status) {
      data = data.filter((r: Reservation) => r.status === filters.status);
    }
    if (filters.hotel) {
      data = data.filter((r: Reservation) => 
        r.hotel.toLowerCase().includes(filters.hotel!.toLowerCase())
      );
    }
    if (filters.userName) {
      data = data.filter((r: Reservation) => 
        r.user.toLowerCase().includes(filters.userName!.toLowerCase())
      );
    }
    if (filters.dateRange) {
      data = data.filter((r: Reservation) => 
        r.checkIn >= filters.dateRange!.start && 
        r.checkOut <= filters.dateRange!.end
      );
    }
  }

  return data;
}

export async function createReservation(reservation: Omit<Reservation, 'id'>): Promise<Reservation> {
  const response = await fetch(`${API_URL}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservation),
  });
  return response.json();
}

export async function updateReservation(
  id: number,
  updates: Partial<Reservation>
): Promise<Reservation> {
  const response = await fetch(`${API_URL}/reservations/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return response.json();
}

export async function deleteReservation(id: number): Promise<void> {
  await fetch(`${API_URL}/reservations/${id}`, {
    method: 'DELETE',
  });
}