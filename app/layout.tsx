import "@/app/ui/global.css";
import { roboto, inter } from "@/app/ui/fonts";   

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" title="Tricli">
      <body className={`${roboto.variable} ${inter.variable} ${roboto.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
