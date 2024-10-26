import { Header } from "@/components/Header";
import { PageLayoutFull } from "@/components/layouts/PageLayoutFull";
import Image from "next/image";
import makersInnImg from "./makers-inn.jpeg";

const MakersInnPage = () => {
  return (
    <PageLayoutFull>
      <section className="relative h-screen w-full">
        <Image
          src={makersInnImg}
          alt="Makers Inn"
          fill
          className="object-cover"
        />
        <div className="absolute left-0 top-0 w-full p-4 md:p-10">
          <Header variant="light" />
        </div>
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="bg-white text-6xl font-bold text-dark">
              Das Makers-Inn
            </h1>
            <h2 className="bg-white text-3xl font-bold text-dark">
              Die Zentrale Anlaufstelle für Menschen mit Ideen in Esslingen
            </h2>
          </div>
        </div>
      </section>
      <section>Das ist ein TEST!!!</section>
    </PageLayoutFull>
  );
};

export default MakersInnPage;
