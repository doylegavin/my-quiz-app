"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy for Examinaite</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-lg">Examinaite respects your privacy. We collect only essential data needed for functionality.</p>
          
          <h2 className="text-2xl font-semibold mt-6">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email address</li>
            <li>Name (optional)</li>
            <li>Profile information (optional)</li>
            <li>Authentication data from providers (Google, Facebook, Instagram, etc.)</li>
            <li>Usage data (analytics)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing core application functionality</li>
            <li>Personalizing your experience</li>
            <li>Analytics and service improvement</li>
            <li>Communication about features and updates</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6">Sharing Your Information</h2>
          <p>
            We never sell your information to third parties. We may share limited information with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Service providers necessary for our operations</li>
            <li>Authentication providers (only as needed for login functionality)</li>
            <li>When required by law or to protect our rights</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6">Data Security</h2>
          <p>
            We use industry-standard security measures to protect your data. However, no method of 
            electronic transmission or storage is 100% secure, so we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal data, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access to your data</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your data</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6">Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience and collect usage data.
            You can control cookies through your browser settings.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">Children's Privacy</h2>
          <p>
            Our service is not intended for children under 16. We do not knowingly collect information
            from children under 16.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of significant changes
            by posting the new policy on this page and updating the effective date.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at:
          </p>
          <p className="font-medium">Email: doyle.d.gavin@gmail.com</p>
          
          <p className="mt-8 text-sm text-gray-500">Last updated: April 10, 2025</p>
        </CardContent>
      </Card>
    </div>
  );
} 