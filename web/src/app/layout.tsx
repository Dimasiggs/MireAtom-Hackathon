import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
    title: "Главная",
    description: "Вебсервис для редактирования и анализа формул",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
