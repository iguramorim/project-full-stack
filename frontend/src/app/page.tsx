import FormUser from "@/components/FormUser";
import ListarUser from "@/components/ListarUser";

export default function Home() {
  return (
    <section className="max-w-screen-lg mx-auto p-5 space-y-7">
      <FormUser />
      <ListarUser />
    </section>
  );
}
