"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DataDeletion() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Data Deletion Instructions</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            At Examinaite, we respect your data privacy rights. If you wish to delete your data from our systems, please follow the instructions below:
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">How to Request Data Deletion</h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <p className="font-medium">Email Request:</p>
              <p>Send an email to <span className="font-semibold">doyle.d.gavin@gmail.com</span> with the subject line "Data Deletion Request".</p>
            </li>
            <li>
              <p className="font-medium">Information to Include:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Your full name</li>
                <li>Email address associated with your account</li>
                <li>User ID or username (if known)</li>
                <li>Brief statement confirming your request to delete your data</li>
              </ul>
            </li>
            <li>
              <p className="font-medium">Verification:</p>
              <p>For security purposes, we may need to verify your identity. We'll respond with any additional verification steps if needed.</p>
            </li>
          </ol>
          
          <h2 className="text-2xl font-semibold mt-6">What Will Be Deleted</h2>
          <p>Upon a verified request, we will delete:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Your account information</li>
            <li>Personal data associated with your account</li>
            <li>Quiz history and progress data</li>
            <li>Any content you've created or uploaded</li>
          </ul>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md mt-6">
            <h3 className="text-xl font-medium text-blue-800 dark:text-blue-300">Please Note:</h3>
            <p className="mt-2">
              Some data may be retained for legal, legitimate business purposes, or if required by law. 
              This may include:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Data necessary for financial records</li>
              <li>Aggregated or anonymized data that no longer identifies you</li>
              <li>Data required for legal compliance</li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-6">Timeline for Deletion</h2>
          <p>
            We will process your deletion request within 30 days. You will receive a confirmation email once your data has been deleted.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">Third-Party Data</h2>
          <p>
            If you signed up or connected with third-party services (like Google, Facebook, or Instagram), you may also need to visit those services to remove connections to Examinaite.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6">Questions About Data Deletion</h2>
          <p>
            If you have any questions about data deletion or other privacy concerns, please contact us at:
          </p>
          <p className="font-medium">Email: doyle.d.gavin@gmail.com</p>
          
          <p className="mt-8 text-sm text-gray-500">Last updated: April 10, 2025</p>
        </CardContent>
      </Card>
    </div>
  );
} 