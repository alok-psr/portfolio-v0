"use client";

import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <PageHeader 
        title="CONTACT ME" 
        description="Let's build something amazing together." 
      />

      <div className="max-w-4xl mx-auto">
        <ContactForm />
      </div>
    </div>
  );
}
