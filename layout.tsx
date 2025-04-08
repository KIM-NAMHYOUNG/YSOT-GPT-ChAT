export const metadata = {
  title: 'YSOT GPT ChAT',
  description: 'A GPT-4 Turbo chatbot for the Department of Occupational Therapy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}