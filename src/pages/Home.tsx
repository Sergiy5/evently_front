import { useState } from "react";
import { Auth, Modal } from "@/components";
import { Main } from "@/components/Main";
import { Container } from "@/components/Container";
import { TopEvents } from "@/components/TopEvents";
import { AllEvents } from "@/components/AllEvents";
import { Hero } from "@/components/Hero";

const Home: React.FC = () => {
  const  [isOpen, setIsOpen ] = useState<boolean>(false);

  const loginUser= () => {
   setIsOpen(true);
  }
  const onCloseModal = () => {
    setIsOpen(false);
  }

  return (
    <Main>
      <Hero />
      <TopEvents events={4} />
      <AllEvents />
      <Container>
        <div className="h-auto">
          <button
            id="register"
            className="bg-blue-500 hover:bg-blue-700 focus:outline-none text-white font-bold py-2 px-4 rounded"
            onClick={loginUser}
            >
            Auth
          </button>
          </div>
      </Container>
        <Modal isOpen={isOpen} onClose={onCloseModal}>
          <Auth onCloseModal={onCloseModal} />
        </Modal>
    </Main>
  );
};
export default Home;
