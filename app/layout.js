export const metadata = { title: 'CJ Vercel Store' };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin:0,fontFamily:'sans-serif',background:'#0a0a0a',color:'white'}}>
        {children}
      </body>
    </html>
  );
}
