import { Document } from '@/lib/GoogleSpreadSheet';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

export async function AddQuery(formData, sheetName) {
  try {
    const doc = await Document(SPREADSHEET_ID);
    const sheet = doc.sheetsByTitle[sheetName];

    // Add new query to the sheet
    const query = await sheet.addRow({
      name: formData.name,
      email: formData.email.toLowerCase(),
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return query;
  } catch (error) {
    console.error('Error adding query:', error);
    throw error;
  }
}
