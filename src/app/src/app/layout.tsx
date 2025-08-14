import './globals.css';

export const metadata = {
  title: 'Anon Q&A',
  description: 'Recevez des messages anonymes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
