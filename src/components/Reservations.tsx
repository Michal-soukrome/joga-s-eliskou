import SectionTitle from "@/components/SectionTitle";

export default function Reservations() {
  return (
    <section
      id="reservations"
      className="py-24 px-6 bg-gradient-to-b from-white to-sky-50"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Rezervace"
          subtitle="Vyberte si čas, který vám vyhovuje, a zarezervujte si místo na lekci"
        />

        <div className="flex justify-center">
          <iframe
            src="https://power-joga-s-eliskou.reservio.com"
            width="800px"
            height="500px"
            frameBorder="0"
          />
        </div>
      </div>
    </section>
  );
}
