import './globals.css';
import fonts from './font';

export const metadata = {
  title: 'Texavision-2k26',
  description:
    'Texavision-2k26 - Official web application for the Texavision 2k26 event and related activities.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fonts.justSans.variable} ${fonts.permanentMarker.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
