import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg">PulseShift.health</h3>
          <p className="text-sm text-gray-400 mt-2">AI-powered locum staffing</p>
        </div>
        <div>
          <h4 className="font-semibold">For Hospitals</h4>
          <Link href="/facility" className="block text-sm text-gray-400 hover:text-white mt-2">Post a Shift</Link>
        </div>
        <div>
          <h4 className="font-semibold">For Providers</h4>
          <Link href="/provider" className="block text-sm text-gray-400 hover:text-white mt-2">Find Shifts</Link>
        </div>
        <div>
          <h4 className="font-semibold">Legal</h4>
          <Link href="/privacy" className="block text-sm text-gray-400 hover:text-white mt-2">Privacy</Link>
          <Link href="/terms" className="block text-sm text-gray-400 hover:text-white mt-2">Terms</Link>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500">
        © 2025 PulseShift.health LLC • NALTO Member • HIPAA Compliant
      </div>
    </footer>
  );
}

