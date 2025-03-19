import { PageContent } from "components/layouts/PageContent";

const NotFound = () => {
  return (
    <PageContent>
      <section className="prose mb-8">
        <h1 className="mb-16 text-xl font-bold md:text-5xl">
          404 – Sorry da ist ein Fehler aufgetreten
        </h1>
      </section>
    </PageContent>
  );
};

export default NotFound;
