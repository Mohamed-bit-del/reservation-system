export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

export type Reservation = {
  id: number;
  userId: string;
  user: string;
  hotel: string;
  checkIn: string;
  checkOut: string;
  status: 'Pending' | 'Approved' | 'Cancelled';
  roomType: 'Single' | 'Double' | 'Suite';
  guests: number;
  cancellationReason?: string;
};

export type Hotel = {
  id: number;
  name: string;
  roomTypes: ('Single' | 'Double' | 'Suite')[];
  maxGuests: number;
};