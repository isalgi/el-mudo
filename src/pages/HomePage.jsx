import { Footer, Card, Button } from "flowbite-react";
import Header from "../components/Header";
import { UserContext } from "../context/UserContextProvider";
import { useContext } from "react";

export default function HomePage() {
  const { user, handleChangeName } = useContext(UserContext);
  // const data = useContext(UserContext);
  // console.log(data);

  return (
    <>
      <Header />

      <section className="bg-slate-800 py-4">
        <Button
          className="mx-auto w-1/4"
          onClick={() => {
            handleChangeName("John John");
          }}
        >
          Change Name
        </Button>
        <Card className="bg-slate-600 text-white w-1/4 mx-auto">
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.id}</p>
        </Card>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white">EL-MUDO</h1>
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
