import Image from 'next/image';

export function ValuesSection() {
  return (
    <section id="values" className="relative bg-blue p-8">
      <h2 className="mb-2 text-base font-bold md:text-2xl">Unsere Werte</h2>
      <p className="mb-10 text-base opacity-60 md:text-2xl">
        OMG – Offenheit, Machen & Gemeinschaft
      </p>
      <div className="mb-16 flex flex-col gap-12 md:flex-row">
        <div>
          <h3 className="mb-2 font-bold">Offenheit</h3>
          <p className="opacity-80">
            <span className="font-bold underline">Wir sind offen.</span> Mit
            Neugier und Respekt heißen wir jede Idee, jeden Vorschlag, vor allem
            aber jeden Menschen willkommen. Ohne Vorbehalte und Angst vor
            Verwundbarkeit zeigen wir einander, wer wir sind, und schätzen die
            Vielfalt unserer Erfahrungen und Einsichten. In direktem, ehrlichem
            Austausch bringen wir viele Perspektiven zusammen und machen so Raum
            für das Überraschende.
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-bold">Machen</h3>
          <p className="opacity-80">
            <span className="font-bold underline">Wir machen.</span> Dabei
            warten wir nicht auf andere und stellen die Zweifel hintenan. Wir
            geben einander durch unser Vorbild Mut, im Erfolg ebenso wie im
            Scheitern, denn wir schätzen jeden Versuch wert und lernen Tag für
            Tag dazu. Angehen, ausprobieren, aktiv werden, anstatt abzuwarten,
            bis sich etwas tut: Nur so entsteht Neues. Durch Machen, voller
            Zuversicht und Energie.
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-bold">Gemeinschaft</h3>
          <p className="opacity-80">
            <span className="font-bold underline">
              {' '}
              Wir sind eine Gemeinschaft.
            </span>{' '}
            Wir vertrauen einander und nehmen Anteil an Fortschritt und
            Rückschlag gleichermaßen. So zeigen wir, dass Verlass aufeinander
            ist, wenn es Unterstützung braucht, und bieten diese ohne zu zögern
            an. Denn wir wissen, dass die helfende Hand von heute schon morgen
            selbst auf der Suche nach Rückhalt sein kann. So wachsen wir –
            zusammen.
          </p>
        </div>
      </div>
      <div className="absolute left-[calc(50%-75px)] bottom-0 -mb-8 w-[150px]">
        <Image
          src="/assets/doodle-loving-blue.svg"
          alt="Doodle Loving"
          layout="responsive"
          width={150}
          height={100}
        />
      </div>
    </section>
  );
}
