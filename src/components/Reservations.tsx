import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

export default function Reservations() {
  return (
    <section
      id="reservations"
      className="py-24 px-6 bg-gradient-to-tl from-sky-50/50 via-white to-sky-100/50"
    >
      <Container>
        <SectionTitle
          title="Rezervace"
          subtitle="Vyberte si čas, který vám vyhovuje, a zarezervujte si místo na lekci"
        />

        <div className="flex justify-center">
          <iframe
            src="https://power-joga-s-eliskou.reservio.com"
            width="1280px"
            height="800px"
            frameBorder="0"
          />
        </div>
      </Container>
    </section>
  );
}
