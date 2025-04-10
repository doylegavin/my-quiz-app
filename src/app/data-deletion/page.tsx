export default function DataDeletion() {
  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Data Deletion Instructions</h1>
        
        <p className="mb-6">
          At Examinaite, we respect your data privacy rights. If you wish to delete your data from our systems, please follow the instructions below:
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">How to Request Data Deletion</h2>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Send an email to <strong>doyle.d.gavin@gmail.com</strong> with the subject line "Data Deletion Request"</li>
          <li>Include your full name and email address associated with your account</li>
          <li>We'll verify your identity and process your request within 30 days</li>
          <li>You'll receive confirmation when your data has been deleted</li>
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
          <h3 className="text-lg font-medium mb-2">Please Note:</h3>
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
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p className="mb-2">
          If you have any questions about data deletion or other privacy concerns, please contact us at: doyle.d.gavin@gmail.com
        </p>
        
        <p className="mt-8 text-sm text-gray-500">Last updated: April 10, 2025</p>
      </div>
    </div>
  );
} 