import { Github } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
      <Link href="https://github.com/anishmitta1/casca">
        <Github className="w-4 h-4" color="gray" />
      </Link>
      <ThemeSwitcher />
    </footer>
  );
};

export default Footer;
