"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2 } from "lucide-react";
import { useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatch
  useState(() => {
    setIsMounted(true);
  });

  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Profile" className="object-cover w-full h-full" />
        ) : (
          <ImagePlus className="w-8 h-8 text-muted-foreground" />
        )}
      </div>
      
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result: any) => {
          onChange(result.info.secure_url);
        }}
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button 
              type="button" 
              variant="secondary" 
              disabled={disabled} 
              onClick={onClick}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
