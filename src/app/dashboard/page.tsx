import AboutSection from '@/components/home/about.section';
import FeaturesSection from '@/components/home/features.section';
import JumbotronSection from '@/components/home/jumbotron.section';
import PricingSection from '@/components/home/pricing.section';

const DashboardPage = async () => {
  return (
    <>
      <JumbotronSection />
      <FeaturesSection />
      <AboutSection />
      <PricingSection />
    </>
  );
};

export default DashboardPage;
