import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'YSOT GPT Chat',
  description: 'GPT와 대화할 수 있는 작업치료학과 전용 챗봇',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <main className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}