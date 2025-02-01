'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { getCurrentUser } from '@/lib/auth';
import { fetchReservations } from '@/lib/api';
import { Reservation } from '@/lib/types';
import { Plus } from 'lucide-react';
import ReservationList from '@/components/ReservationList';
import NewReservationDialog from '@/components/NewReservationDialog';

export default function Dashboard() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isNewReservationOpen, setIsNewReservationOpen] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/');
      return;
    }

    loadReservations();
  }, [router]);

  const loadReservations = async () => {
    const data = await fetchReservations();
    setReservations(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Reservations</h2>
          <Button onClick={() => setIsNewReservationOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Reservation
          </Button>
        </div>
        <ReservationList
          reservations={reservations}
          onReservationUpdated={loadReservations}
        />
        <NewReservationDialog
          open={isNewReservationOpen}
          onOpenChange={setIsNewReservationOpen}
          onReservationCreated={loadReservations}
        />
      </main>
    </div>
  );
}