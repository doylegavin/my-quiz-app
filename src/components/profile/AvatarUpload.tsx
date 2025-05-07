'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Upload, X } from 'lucide-react';

interface AvatarUploadProps {
  currentImage?: string | null;
  onImageChange: (dataUrl: string) => void;
  className?: string;
  size?: number;
}

export default function AvatarUpload({ 
  currentImage, 
  onImageChange, 
  className = '', 
  size = 150 
}: AvatarUploadProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateInitialsAvatar = (name: string) => {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
      
    const colors = [
      '#4F46E5', // indigo-600
      '#0EA5E9', // sky-500
      '#10B981', // emerald-500
      '#F59E0B', // amber-500
      '#EF4444', // red-500
      '#8B5CF6', // violet-500
    ];
    
    // Generate a consistent color based on the name
    const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    
    const svg = `
      <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="${colors[colorIndex]}" />
        <text x="50%" y="50%" dy=".1em" font-family="Arial, sans-serif" font-size="80" 
          fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.addEventListener('load', () => {
        setUploadedImage(reader.result as string);
        setIsModalOpen(true);
      });
      
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    setIsLoading(true);
    
    try {
      if (uploadedImage) {
        onImageChange(uploadedImage);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get the avatar source (current image, uploaded image, or initials)
  const getAvatarSrc = () => {
    if (currentImage) {
      return currentImage;
    }
    return generateInitialsAvatar('User Name');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Avatar Display */}
      <div 
        className="relative mx-auto overflow-hidden rounded-full" 
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <img 
          src={getAvatarSrc()} 
          alt="Profile Avatar" 
          className="h-full w-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = generateInitialsAvatar('User Name');
          }}
        />
        
        {/* Upload button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-200 hover:opacity-100">
          <label 
            htmlFor="avatar-upload" 
            className="flex cursor-pointer items-center justify-center rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700"
          >
            <Upload size={24} />
            <span className="sr-only">Upload avatar</span>
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Image Preview Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set Profile Picture</DialogTitle>
          </DialogHeader>
          
          <div className="my-4 flex justify-center">
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Upload Preview"
                className="max-h-[300px] max-w-full rounded-lg object-contain"
              />
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={handleSaveImage}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Use This Image'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 