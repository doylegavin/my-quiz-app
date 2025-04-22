import PointsCalculator from "@/components/PointsCalculator";

export const metadata = {
  title: "Points Calculator | Examinaite",
  description: "Calculate your Leaving Certificate points and see what courses you qualify for",
};

export default function PointsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Leaving Cert Points Calculator</h1>
      <p className="text-center text-gray-600 mb-8">
        Calculate your Leaving Certificate points by selecting your subjects and grades.
      </p>
      <PointsCalculator />
    </div>
  );
} 