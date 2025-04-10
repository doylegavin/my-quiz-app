"use client";

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy for Examinaite</h1>
        
        <p className="mb-4">Examinaite respects your privacy. We collect only essential data needed for functionality.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Email address</li>
          <li>Name (optional)</li>
          <li>Profile information (optional)</li>
          <li>Authentication data from providers (Google, Facebook, Instagram, etc.)</li>
          <li>Usage data (analytics)</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Providing core application functionality</li>
          <li>Personalizing your experience</li>
          <li>Analytics and service improvement</li>
          <li>Communication about features and updates</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Sharing Your Information</h2>
        <p className="mb-2">
          We never sell your information to third parties. We may share limited information with:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Service providers necessary for our operations</li>
          <li>Authentication providers (only as needed for login functionality)</li>
          <li>When required by law or to protect our rights</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Data Security</h2>
        <p className="mb-4">
          We use industry-standard security measures to protect your data. However, no method of 
          electronic transmission or storage is 100% secure, so we cannot guarantee absolute security.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Your Rights</h2>
        <p className="mb-2">
          Depending on your location, you may have rights regarding your personal data, including:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Access to your data</li>
          <li>Correction of inaccurate data</li>
          <li>Deletion of your data</li>
          <li>Restriction of processing</li>
          <li>Data portability</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p className="mb-2">
          If you have any questions about this privacy policy, please contact us at:
        </p>
        <p className="font-medium">Email: doyle.d.gavin@gmail.com</p>
        
        <p className="mt-8 text-sm text-gray-500">Last updated: April 10, 2025</p>
      </div>
    </div>
  );
} 