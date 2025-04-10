"use client";

import React from 'react';

export default function DataDeletion() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Data Deletion Instructions</h1>
        
        <p className="mb-4">
          At Examinaite, we respect your data privacy rights. If you wish to delete your data from our systems, please follow the instructions below:
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">How to Request Data Deletion</h2>
        <ol className="list-decimal pl-6 mb-4 space-y-3">
          <li>
            <p className="font-medium">Email Request:</p>
            <p>Send an email to <span className="font-semibold">doyle.d.gavin@gmail.com</span> with the subject line "Data Deletion Request".</p>
          </li>
          <li>
            <p className="font-medium">Information to Include:</p>
            <ul className="list-disc pl-6 mt-1 space-y-1">
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
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">What Will Be Deleted</h2>
        <p className="mb-2">Upon a verified request, we will delete:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Your account information</li>
          <li>Personal data associated with your account</li>
          <li>Quiz history and progress data</li>
          <li>Any content you've created or uploaded</li>
        </ul>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Please Note:</h3>
          <p className="mb-2">
            Some data may be retained for legal, legitimate business purposes, or if required by law. 
            This may include:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Data necessary for financial records</li>
            <li>Aggregated or anonymized data that no longer identifies you</li>
            <li>Data required for legal compliance</li>
          </ul>
        </div>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Timeline for Deletion</h2>
        <p className="mb-4">
          We will process your deletion request within 30 days. You will receive a confirmation email once your data has been deleted.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Third-Party Data</h2>
        <p className="mb-4">
          If you signed up or connected with third-party services (like Google, Facebook, or Instagram), you may also need to visit those services to remove connections to Examinaite.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Questions About Data Deletion</h2>
        <p className="mb-2">
          If you have any questions about data deletion or other privacy concerns, please contact us at:
        </p>
        <p className="font-medium">Email: doyle.d.gavin@gmail.com</p>
        
        <p className="mt-8 text-sm text-gray-500">Last updated: April 10, 2025</p>
      </div>
    </div>
  );
} 