'use client';

import { useEffect, useState } from 'react';
import { MapPin, DollarSign, Home, Calendar, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ProviderShifts() {
  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState<any>(null);
  const [applicationForm, setApplicationForm] = useState({
    email: '',
    name: '',
    specialty: '',
    resume: null as File | null
  });
  const [uploading, setUploading] = useState(false);

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

  const openApplicationModal = (shift: any) => {
    setSelectedShift(shift);
    setShowApplicationModal(true);
  };

  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    setSelectedShift(null);
    setApplicationForm({ email: '', name: '', specialty: '', resume: null });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationForm({ ...applicationForm, resume: e.target.files[0] });
    }
  };

  const applyToShift = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShift) return;

    setUploading(true);
    try {
      // Check if provider exists or create new one
      const { data: provider } = await supabase
        .from('providers')
        .select('id')
        .eq('email', applicationForm.email)
        .single();

      let providerId = provider?.id;
      let resumeUrl = null;

      // Upload resume if provided
      if (applicationForm.resume) {
        const fileExt = applicationForm.resume.name.split('.').pop();
        const fileName = `${applicationForm.email.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, applicationForm.resume);

        if (uploadError) {
          alert('Error uploading resume. Please try again.');
          setUploading(false);
          return;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);

        resumeUrl = urlData.publicUrl;
      }

      // Create or update provider
      if (!providerId) {
        const { data, error } = await supabase
          .from('providers')
          .insert({
            email: applicationForm.email,
            name: applicationForm.name,
            specialty: applicationForm.specialty,
            resume_url: resumeUrl
          })
          .select()
          .single();

        if (error || !data) {
          alert('Error creating profile. Please try again.');
          setUploading(false);
          return;
        }
        providerId = data.id;
      } else {
        // Update existing provider with new info
        await supabase
          .from('providers')
          .update({
            name: applicationForm.name,
            specialty: applicationForm.specialty,
            resume_url: resumeUrl
          })
          .eq('id', providerId);
      }

      // Submit application
      const { error: applicationError } = await supabase
        .from('applications')
        .insert({
          shift_id: selectedShift.id,
          provider_id: providerId
        });

      if (applicationError) {
        alert('Error applying. You may have already applied to this shift.');
        setUploading(false);
        return;
      }

      // Send confirmation email
      await fetch('/api/send-application-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerEmail: applicationForm.email,
          shiftData: selectedShift,
          providerData: {
            name: applicationForm.name,
            specialty: applicationForm.specialty,
            resume_url: resumeUrl
          }
        })
      });

      alert('Applied successfully! Check your email for confirmation.');
      closeApplicationModal();
    } catch (error) {
      console.error('Application error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading shifts...</div>;

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-black text-center mb-2">Open Locum Shifts</h1>
          <p className="text-center text-gray-600 mb-10">Apply with your resume. Get paid weekly.</p>

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
                    onClick={() => openApplicationModal(shift)}
                    className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedShift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Apply to {selectedShift.specialty}</h2>
            <p className="text-gray-600 mb-6">{selectedShift.location} • ${selectedShift.rate_cents / 100}/day</p>

            <form onSubmit={applyToShift} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={applicationForm.email}
                  onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={applicationForm.name}
                  onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Dr. Jane Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Specialty *</label>
                <input
                  type="text"
                  required
                  value={applicationForm.specialty}
                  onChange={(e) => setApplicationForm({ ...applicationForm, specialty: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="e.g., Emergency Medicine, Psychiatry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Resume/CV (PDF) *</label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-blue-500 transition">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    {applicationForm.resume ? (
                      <p className="text-sm text-green-600">{applicationForm.resume.name}</p>
                    ) : (
                      <p className="text-sm text-gray-600">Click to upload PDF</p>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeApplicationModal}
                  disabled={uploading}
                  className="flex-1 px-4 py-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition disabled:opacity-50"
                >
                  {uploading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

