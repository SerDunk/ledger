import Navbar from "@/components/Navbar";
import ViewNavbar from "@/components/ViewNavbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-full">
      <div>{children}</div>
      <Navbar />
    </div>
  );
}
