export const metadata = {
  title: 'YSOT GPT Chat',
  description: 'GPT API 기반 학과 전용 챗봇',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
