'use client';

import { useEffect, useState } from 'react';
import { MapPin, DollarSign, Home, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ProviderShifts() {
  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      const { data } = await supabase
        .from('shifts')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });
      setShifts(data || []);
      setLoading(false);
    };
    fetchShifts();
  }, []);

  const applyToShift = async (shiftId: string) => {
    const email = prompt("Enter your email to apply:");
    if (!email) return;

    try {
      const { data: provider } = await supabase.from('providers').select('id').eq('email', email).single();
      let providerId = provider?.id;

      if (!providerId) {
        const { data, error } = await supabase.from('providers').insert({ email }).select().single();
        if (error || !data) {
          alert("Error creating profile. Please try again.");
          return;
        }
        providerId = data.id;
      }

      const { error } = await supabase.from('applications').insert({ shift_id: shiftId, provider_id: providerId });
      if (error) {
        alert("Error applying. You may have already applied to this shift.");
        return;
      }
      alert("Applied! Facility will contact you in <1hr.");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading shifts...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-black text-center mb-2">Open Locum Shifts</h1>
        <p className="text-center text-gray-600 mb-10">Apply in 1 click. Get paid weekly.</p>

        {shifts.length === 0 ? (
          <p className="text-center text-gray-500">No open shifts right now. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shifts.map(shift => (
              <div key={shift.id} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
                <h3 className="font-bold text-lg">{shift.specialty}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" /> {shift.location}
                </p>
                <p className="text-2xl font-black text-green-600 mt-3">
                  ${shift.rate_cents / 100}<span className="text-sm font-normal text-gray-600">/day</span>
                </p>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {new Date(shift.start_date).toLocaleDateString()}
                  {shift.housing && <span className="ml-2 flex items-center gap-1"><Home className="w-4 h-4" /> Housing</span>}
                </p>
                <button
                  onClick={() => applyToShift(shift.id)}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Apply in 1 Click
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

