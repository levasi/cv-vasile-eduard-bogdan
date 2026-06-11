import React from "react";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const contact = {
  location: "București, Romania",
  email: "vasileeduardbogdan@gmail.com",
  phone: "0752 383 792",
  linkedin: "https://www.linkedin.com/in/vasile-eduard-bogdan",
  github: "https://github.com/levasi",
} as const;

export function Footer() {
  return (
    <footer
      className="footer py-8 border-t-1"
      style={{ borderTopColor: "rgba(255,255,255,0.1)" }}

    >
      <div className="portfolio-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/60">Contact</div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-4 h-4 text-white/50" />
                <span>{contact.location}</span>
              </div>
              <a
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                href={`mailto:${contact.email}`}
              >
                <Mail className="w-4 h-4 text-white/50" />
                <span>{contact.email}</span>
              </a>
              <a
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              >
                <Phone className="w-4 h-4 text-white/50" />
                <span>{contact.phone}</span>
              </a>
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="text-xs uppercase tracking-widest text-white/60">Links</div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Vasile Bogdan</span>
          <span className="text-white/40">Frontend engineer · UI-focused · Performance-minded</span>
        </div>
      </div>
    </footer>
  );
}

