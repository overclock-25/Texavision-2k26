import { AddQuery } from '@/utils/services/AddQuery';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please fill in all required fields (name, email, subject, message)',
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide a valid email address',
        },
        { status: 400 }
      );
    }

    // Add query to Google Spreadsheet
    const query = await AddQuery({ name, email, phone, subject, message }, 'contact');

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
        data: {
          id: query._rowNumber,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (will appear in server logs)
    console.error('Contact form error:', error);

    // Return user-friendly error message
    return NextResponse.json(
      {
        success: false,
        message: error.message.includes('Spreadsheet')
          ? 'Unable to connect to database. Please try again later.'
          : 'Failed to submit your message. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
