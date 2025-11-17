import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const { email, shiftData } = await request.json();

    if (!email || !shiftData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'PulseShift <noreply@pulseshift.health>',
      to: email,
      subject: 'Shift Posted Successfully - PulseShift',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0077CC;">Shift Posted Successfully! 🎉</h1>

          <p>Your shift has been posted on PulseShift and is now visible to verified healthcare providers.</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Shift Details:</h2>
            <p><strong>Specialty:</strong> ${shiftData.specialty}</p>
            <p><strong>Location:</strong> ${shiftData.location}</p>
            <p><strong>Facility:</strong> ${shiftData.facility}</p>
            <p><strong>Rate:</strong> $${shiftData.rate}/day</p>
            <p><strong>Start Date:</strong> ${new Date(shiftData.startDate).toLocaleDateString()}</p>
            ${shiftData.housing ? '<p><strong>Housing:</strong> Provided ✓</p>' : ''}
          </div>

          <h3>What's Next?</h3>
          <ul>
            <li>Our AI is matching qualified providers to your shift right now</li>
            <li>Expect 3+ candidate applications within 2 hours</li>
            <li>You'll receive email notifications when providers apply</li>
          </ul>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Questions? Reply to this email or visit <a href="https://pulseshift.health">pulseshift.health</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Send shift confirmation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
