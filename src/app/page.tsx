import MacbookScrollytelling from "@/components/MacbookScrollytelling";
import CreatorReviews from "@/components/CreatorReviews";
import DisplayAudioExperience from "@/components/DisplayAudioExperience";
import EcosystemIntegration from "@/components/EcosystemIntegration";
import PerformanceReactor from "@/components/PerformanceReactor";
import PricingCTA from "@/components/PricingCTA";

export const metadata = {
  title: "MacBook Air - High-End Scrollytelling",
  description: "A high-end scrollytelling experience showcasing the MacBook Air.",
};

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <MacbookScrollytelling />
      <PerformanceReactor />
      <DisplayAudioExperience />
      <EcosystemIntegration />
      <CreatorReviews />
      <PricingCTA />
    </main>
  );
}
