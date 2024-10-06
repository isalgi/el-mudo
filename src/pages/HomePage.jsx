import { Footer } from "flowbite-react";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <>
      <Header />

      <section className="bg-slate-800">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white">Resto Icikiwir</h1>
            <p className="mt-4 text-white">
              Discover our amazing services that will help your business grow.
            </p>
          </div>
        </div>
      </section>

      <Footer container={true}>
        <Footer.Copyright href="#" year={2024} />
        <Footer.LinkGroup>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Terms of Service</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </>
  );
}
