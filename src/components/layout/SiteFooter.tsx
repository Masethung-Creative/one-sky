import Image from "next/image";
import Link from "next/link";
import HomeLink from "@/components/layout/HomeLink";

const FOOTER_LINKS = [
  { title: "Company", links: [["About Us", "about"], ["Reviews", "reviews"], ["Terms & Conditions", "terms-conditions"], ["Privacy Policy", "privacy-policy"], ["Refund Policy", "refund-policy"]] },
  { title: "Learn & Partner", links: [["Explore the Course", "courses/ai-foundation"], ["Teacher Corner", "teacher-corner"], ["For Schools", "schools"], ["Sponsor Learners", "sponsor-learners"], ["Book a Demo", "book-a-demo"]] },
  { title: "Support", links: [["Contact Us", "contact"], ["Help & FAQs", "help"], ["Payment Support", "payment-support"]] },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="sec-inner footer-grid">
        <div>
          <p className="footer-brand" translate="no">
            <HomeLink aria-label="One Sky home">
              <Image src="/images/brand/one-sky-logo-footer.png" alt="" width={52} height={40} />
              One Sky
            </HomeLink>
          </p>
          <p>Every child and student with AI</p>
          <p>Our vision: Empower 1 crore children and 1 lakh teachers across India by 2030.</p>
        </div>
        {FOOTER_LINKS.map(({ title, links }) => (
          <nav key={title} aria-label={title}>
            <h2>{title}</h2>
            <ul>
              {links.map(([label, path]) => (
                <li key={label}><Link href={`/${path}`}>{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="sec-inner footer-contact">
        <p><b>Phone</b> <a href="tel:+917975291366">+91 79752 91366</a></p>
        <p><b>Email</b> <a href="mailto:founder@onesky.education">founder@onesky.education</a></p>
        <p><b>Business Address</b> Unit 2, B Block, 4th Floor, Uma Shree Dream World, Kudlu Gate, Bengaluru, Karnataka 560068</p>
      </div>
      <p className="copyright">© 2026 One Sky. All rights reserved.</p>
    </footer>
  );
}
