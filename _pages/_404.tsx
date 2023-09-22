import { Page } from 'components/Page';

export default function ErrorPage() {
  return (
    <Page
      title="Impressum"
      description="Das Impressum der Makers League"
      slug="impressum"
    >
      <section className="prose mb-8">
        <h1 className="mb-16 text-xl font-bold md:text-5xl">
          404 – Sorry da ist ein Fehler aufgetreten
        </h1>
      </section>
    </Page>
  );
}
