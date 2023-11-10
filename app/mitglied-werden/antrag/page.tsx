const ApplyPage = () => {
  return (
    <section className="border-4 p-4">
      <h1 className="mb-10 text-xl font-bold md:text-5xl">Mitgliedsantrag</h1>
      <iframe
        src="https://easyverein.com/public/ML/applicationform/1099?iframe=True"
        title="Vereinsverwaltungssoftware easyVerein"
        style={{ width: "100%", height: "1500px", border: "none" }}
      />
    </section>
  );
};

export default ApplyPage;
