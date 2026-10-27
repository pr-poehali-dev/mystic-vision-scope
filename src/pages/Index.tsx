import Header from "@/components/Header";
import Featured from "@/components/Featured";

const Index = () => {
  return (
    <main className="h-[100dvh] overflow-hidden flex flex-col bg-black">
      <Header />
      <Featured />
    </main>
  );
};

export default Index;