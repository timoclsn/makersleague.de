import Image from "next/image";

export const ContactSectionCity = () => {
  return (
    <section id="contact">
      <div className="mb-14">
        <h2 className="mb-2 text-base font-bold md:text-2xl">
          Dein Ansprechpartner vor Ort
        </h2>
        <p className="mb-10 text-base opacity-60 md:text-2xl">
          Bei Fragen, melde dich bei Simon!
        </p>
        <div className="flex justify-center">
          <div className="border-dark w-full border-4 border-dashed p-4 sm:w-auto">
            <Image
              src="https://st27fwzq2l.ufs.sh/f/SYIvy1FiUWjdhMexAatfD8zIlar1wTSdYQKecoZOWg0vGpCE"
              alt="Simon Kortus"
              width={300}
              height={300}
              className="mb-5 w-full sm:max-w-[300px]"
            />
            <h3 className="w-full text-base font-bold break-words opacity-80 md:text-2xl">
              Simon Kortus
            </h3>
            <p>Stadt Esslingen a. N.</p>
            <a href="mailto:simon.kortus@esslingen.de" className="mb-14 block">
              simon.kortus@esslingen.de
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
