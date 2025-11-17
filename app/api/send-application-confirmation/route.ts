import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const { providerEmail, facilityEmail, shiftData, providerData } = await request.json();

    if (!providerEmail || !shiftData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send confirmation to provider
    const providerEmailResult = await resend.emails.send({
      from: 'PulseShift <noreply@pulseshift.health>',
      to: providerEmail,
      subject: 'Application Submitted - PulseShift',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0077CC;">Application Submitted! ✅</h1>

          <p>Your application has been successfully submitted to the facility.</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Shift Details:</h2>
            <p><strong>Specialty:</strong> ${shiftData.specialty}</p>
            <p><strong>Location:</strong> ${shiftData.location}</p>
            <p><strong>Facility:</strong> ${shiftData.facility_name}</p>
            <p><strong>Rate:</strong> $${shiftData.rate_cents / 100}/day</p>
            <p><strong>Start Date:</strong> ${new Date(shiftData.start_date).toLocaleDateString()}</p>
            ${shiftData.housing ? '<p><strong>Housing:</strong> Provided ✓</p>' : ''}
          </div>

          <h3>What's Next?</h3>
          <ul>
            <li>The facility will review your application</li>
            <li>Expect to hear back within 1 hour</li>
            <li>If selected, we'll coordinate credentialing and onboarding</li>
          </ul>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Questions? Reply to this email or visit <a href="https://pulseshift.health">pulseshift.health</a>
          </p>
        </div>
      `,
    });

    // Send notification to facility if email provided
    if (facilityEmail) {
      await resend.emails.send({
        from: 'PulseShift <noreply@pulseshift.health>',
        to: facilityEmail,
        subject: 'New Provider Application - PulseShift',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0077CC;">New Provider Application! 👨‍⚕️</h1>

            <p>A qualified provider has applied to your shift:</p>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0;">Shift Details:</h2>
              <p><strong>Specialty:</strong> ${shiftData.specialty}</p>
              <p><strong>Location:</strong> ${shiftData.location}</p>
              <p><strong>Start Date:</strong> ${new Date(shiftData.start_date).toLocaleDateString()}</p>
            </div>

            <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0;">Provider Details:</h2>
              <p><strong>Email:</strong> ${providerEmail}</p>
              ${providerData?.name ? `<p><strong>Name:</strong> ${providerData.name}</p>` : ''}
              ${providerData?.specialty ? `<p><strong>Specialty:</strong> ${providerData.specialty}</p>` : ''}
              ${providerData?.resume_url ? `<p><strong>Resume:</strong> <a href="${providerData.resume_url}">View Resume</a></p>` : ''}
            </div>

            <p>Log in to your PulseShift dashboard to review the full application and connect with this provider.</p>

            <a href="https://pulseshift.health/facility" style="display: inline-block; background: #0077CC; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px;">Review Application</a>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              Questions? Reply to this email or visit <a href="https://pulseshift.health">pulseshift.health</a>
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, data: providerEmailResult.data });
  } catch (error) {
    console.error('Send application confirmation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
