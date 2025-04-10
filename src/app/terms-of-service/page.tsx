"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service for Examinaite</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-lg">By using Examinaite, you agree to the following terms and conditions:</p>
          
          <h2 className="text-2xl font-semibold mt-6">Acceptance of Terms</h2>
          <p>
            By accessing or using Examinaite, you agree to be bound by these Terms of Service. If you do not agree to all the terms, please do not use our service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">Use of Service</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You agree to use the service responsibly and in accordance with all applicable laws.</li>
            <li>You may not misuse, abuse, or attempt to exploit any features of the service.</li>
            <li>You may not use the service to distribute harmful content or engage in harmful activities.</li>
            <li>We reserve the right to terminate or suspend access to our service for violations of these terms or other harmful conduct.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6">Account Responsibility</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are responsible for maintaining the security of your account credentials.</li>
            <li>You are responsible for all activities that occur under your account.</li>
            <li>You must notify us immediately of any unauthorized use of your account or any other security breach.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6">Content and Intellectual Property</h2>
          <p>
            All content provided by Examinaite, including text, graphics, logos, and software, is the property of Examinaite or its licensors and is protected by copyright and other intellectual property laws.
          </p>
          <p>
            You retain ownership of any content you create or upload to the service, but you grant us a non-exclusive, worldwide, royalty-free license to use, store, display, and distribute your content in connection with providing the service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Examinaite shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of or inability to use the service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">Disclaimers</h2>
          <p>
            The service is provided "as is" and "as available" without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">Changes to Terms</h2>
          <p>
            We may update these terms of service from time to time. We will notify you of significant changes by posting the new terms on this page and updating the effective date.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of Ireland, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">Contact</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="font-medium">Email: doyle.d.gavin@gmail.com</p>
          
          <p className="mt-8 text-sm text-gray-500">Last updated: April 10, 2025</p>
        </CardContent>
      </Card>
    </div>
  );
} 