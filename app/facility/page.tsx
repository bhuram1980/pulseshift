'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabase';

const formSchema = z.object({
  specialty: z.string().min(2),
  rate: z.string().regex(/^\d+$/, "Must be a number"),
  startDate: z.string(),
  facility: z.string().min(3),
  location: z.string().min(3),
  housing: z.boolean()
});

type FormData = z.infer<typeof formSchema>;

export default function FacilityForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const { error: insertError } = await supabase.from('shifts').insert({
        specialty: data.specialty,
        rate_cents: parseInt(data.rate) * 100,
        start_date: data.startDate,
        facility_name: data.facility,
        location: data.location,
        housing: data.housing || false,
        status: 'open'
      });
      if (insertError) {
        setError('Failed to post shift. Please check your connection and try again.');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Shift Posted!</h2>
          <p className="text-gray-600 mt-2">AI is matching providers now. Expect 3+ candidates in &lt;2 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-4xl font-black text-center mb-2">Post a Shift</h1>
        <p className="text-center text-gray-600 mb-10">Takes 60 seconds. Get matches in &lt;2 hours.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-xl">
          {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
          
          <input {...register('specialty')} placeholder="Specialty (e.g. ER, Psych, CRNA)" className="w-full p-4 border rounded-lg mb-4" />
          {errors.specialty && <p className="text-red-500 text-sm mb-2">Required</p>}

          <input {...register('rate')} type="number" placeholder="Daily Rate ($)" className="w-full p-4 border rounded-lg mb-4" />
          {errors.rate && <p className="text-red-500 text-sm mb-2">Enter a valid number</p>}

          <input {...register('startDate')} type="date" className="w-full p-4 border rounded-lg mb-4" />
          {errors.startDate && <p className="text-red-500 text-sm mb-2">Required</p>}

          <input {...register('facility')} placeholder="Hospital / Clinic Name" className="w-full p-4 border rounded-lg mb-4" />
          {errors.facility && <p className="text-red-500 text-sm mb-2">Required</p>}

          <input {...register('location')} placeholder="City, State (e.g. Dallas, TX)" className="w-full p-4 border rounded-lg mb-4" />
          {errors.location && <p className="text-red-500 text-sm mb-2">Required</p>}

          <label className="flex items-center gap-2 mb-6">
            <input {...register('housing')} type="checkbox" />
            <span>Housing Provided</span>
          </label>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition">
            Post Shift → Get Matches in 2hrs
          </button>
        </form>
      </div>
    </div>
  );
}

