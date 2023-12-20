import { Link } from "./ui/Button";
import { Facebook, Instagram, LucideProps } from "lucide-react";

interface Link {
  local: LocalLink[];
  social: SocialLink[];
}

interface LocalLink {
  label: string;
  href: string;
}

interface SocialLink {
  href: string;
  icon: LucideProps;
}

const Links: Link = {
  local: [
    {
      label: "Politica de Cookies",
      href: "/politicsCookies",
    },
    {
      label: "Condiciones Generales del Servicio",
      href: "/conditions",
    },
  ],
  social: [
    {
      href: "https://www.facebook.com/nuna.cbi/",
      icon: <Facebook />,
    },
    {
      href: "https://www.instagram.com/nuna.saludmental/",
      icon: <Instagram />,
    },
  ],
};

const Footer = () => {
  return (
    <div
      id="footer"
      className="w-full h-full px-auto z-2  bg-secondary flex flex-col overflow-hidden p-6 sm:p-10 gap-10"
    >
      <ul className="w-full text-primary flex flex-col sm:flex-row justify-center gap-2 sm:gap-12">
        {Links.local.map((link, index) => (
          <li key={"item_footer" + index} className="hover:text-tertiary">
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <ul className="w-full text-primary flex flex-col sm:flex-row justify-around gap-2 sm:gap-10">
        <li className="font-heading font-bold text-xl">nuna</li>
        <li>nuna © 2023 All rights reserved.</li>
        <li className="flex flex-row gap-2">
          {Links.social.map((link, index) => (
            <a
              key={"item_footer_social" + index}
              href={link.href}
              target="_blank"
              className="hover:text-tertiary h-10 w-10"
            >
              <>{link.icon}</>
            </a>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default Footer;
