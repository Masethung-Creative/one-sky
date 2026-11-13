import Link from "next/link";
import type { ReactNode } from "react";
import policies from "@/content/policies.json";
import { COURSE_PARTS, FAQS, FORMS, GIVING_FAQS } from "@/content/site";
import { Card, Dashboard, Faq, LeadForm, Reveal, ReviewsBoard } from "@/components/pages/PageParts";

type SitePage = { eyebrow: string; title: string; intro?: string; body: ReactNode };

function Form({ id }: { id: string }) {
  return <LeadForm id={id} {...FORMS[id]} />;
}

function Policy({ id }: { id: keyof typeof policies }) {
  return <div className="sec-inner narrow prose" dangerouslySetInnerHTML={{ __html: policies[id] }} />;
}

function FormSection({ children }: { children: ReactNode }) {
  return <section className="sec"><div className="sec-inner narrow">{children}</div></section>;
}

const CONTACT_DETAILS = (
  <Reveal className="card contact-card">
    <h2>Contact details</h2>
    <p><b>Phone</b> <a href="tel:+917975291366">+91 79752 91366</a></p>
    <p><b>Email</b> <a href="mailto:founder@onesky.education">founder@onesky.education</a></p>
    <p><b>Business Address</b> Unit 2, B Block, 4th Floor, Uma Shree Dream World, Kudlu Gate, Bengaluru, Karnataka 560068</p>
  </Reveal>
);

export const SITE_PAGES: Record<string, SitePage> = {
  "giving-back": {
    eyebrow: "Giving back",
    title: "One Rupee. One Sky.",
    intro: "Every time a child enrols in One Sky, ₹1 goes into the Learner Fund. When the fund reaches ₹385, a child from a government school takes the same course for free. Small on its own. Big at 1 crore.",
    body: (
      <>
        <section className="sec">
          <div className="sec-inner narrow center">
            <div className="page-actions center-row">
              <Link className="sec-btn" href="/courses/ai-foundation">Enrol &amp; give ₹1</Link>
              <a className="sec-btn outline" href="#how-giving">See how it works</a>
            </div>
            <ul className="pill-row">
              {["₹1 from every enrolment", "1 free seat per 385 enrolments", "Count published live"].map((t) => <li key={t}>{t}</li>)}
            </ul>
            <Reveal>
              <h2>One rupee is almost nothing. One crore rupees is 25,974 children.</h2>
              <p className="lead">That is the maths behind the pledge. We are heading for 1 crore enrolments by 2030. If we get there, the Learner Fund will have paid for 25,974 full AI Foundation seats for children whose families could not.</p>
            </Reveal>
          </div>
        </section>
        <section className="sec sec-tint" id="how-giving">
          <div className="sec-inner">
            <Reveal className="sec-head"><p className="eyebrow">How it works</p><h2>Three steps, no extra cost to you</h2></Reveal>
            <div className="card-grid three">
              {[
                ["Step 1", "A family enrols", "A parent pays ₹385 for the AI Foundation course. The price does not change. Nothing extra is asked."],
                ["Step 2", "₹1 goes into the Learner Fund", "One Sky moves ₹1 from each enrolment into a ring-fenced fund held by SFJ Foundation. The running total is shown on this page."],
                ["Step 3", "Every ₹385 = one free seat", "Each time the fund reaches ₹385, a child from a government or low-fee school is enrolled at no cost. Schools nominate; we publish the count."],
              ].map(([step, title, text], i) => (
                <Card key={step} className="card" delay={i * 0.1}><p className="eyebrow">{step}</p><h3>{title}</h3><p>{text}</p></Card>
              ))}
            </div>
          </div>
        </section>
        <section className="sec">
          <div className="sec-inner">
            <Reveal className="sec-head"><h2>The fund, right now</h2><p className="lead">Updated on every enrolment. These are launch-day placeholders until the live counter is connected.</p></Reveal>
            <div className="stat-grid">
              {[["2,340", "enrolments so far"], ["₹2,340", "in the Learner Fund"], ["6", "free seats given"], ["355", "enrolments to the next seat"]].map(([n, label], i) => (
                <Card key={label} className="card center" delay={i * 0.08}><p className="price">{n}</p><p>{label}</p></Card>
              ))}
            </div>
            <p className="fine center">Example figures for design review. Live numbers come from the enrolment system.</p>
          </div>
        </section>
        <section className="sec sec-tint">
          <div className="sec-inner">
            <Reveal className="sec-head"><p className="eyebrow">Our promise</p><h2>What we commit to, in writing</h2></Reveal>
            <div className="card-grid">
              {[
                ["It comes out of our ₹385, never on top of it.", "You pay the same price as anyone else. The rupee is One Sky’s contribution, not a charge on parents."],
                ["The count is public.", "Enrolments, rupees in the fund and seats given are on this page, always. We publish a yearly statement signed by SFJ Foundation."],
                ["A floor of 20 seats a year, whatever the count says.", "If enrolments are slow, One Sky funds the seats anyway. The pledge does not wait for scale."],
                ["Schools nominate the children.", "Government and low-fee private schools choose who takes the free seat. We never pick names from a form."],
              ].map(([title, text], i) => (
                <Card key={title} className="card" delay={i * 0.07}><h3>{title}</h3><p>{text}</p></Card>
              ))}
            </div>
          </div>
        </section>
        <section className="sec">
          <div className="sec-inner narrow">
            <Reveal className="sec-head"><h2>Questions parents ask</h2></Reveal>
            <Faq items={GIVING_FAQS} />
            <div className="page-actions center-row">
              <Link className="text-link" href="/schools">For Schools →</Link>
              <Link className="text-link" href="/sponsor-learners">Sponsor Learners →</Link>
            </div>
          </div>
        </section>
      </>
    ),
  },
  about: {
    eyebrow: "About One Sky",
    title: "Big Dreams Should Be Within Every Child’s Reach.",
    intro: "We believe a student’s future should never be limited by their postcode or family income. One Sky aims to bring affordable, engaging learning to rural and urban communities—working towards a future where 1 crore students have more opportunities to discover, practise, and grow.",
    body: (
      <>
        <section className="sec sec-tint">
          <div className="sec-inner">
            <Reveal className="sec-head"><h2>What we stand for</h2></Reveal>
            <div className="card-grid three">
              {[
                ["🤝", "Fair for every family", "One clear price, ₹385 for the course, with no subscriptions or hidden costs."],
                ["🌾", "Built for rural and urban learners", "Simple language, everyday examples, and pages that work on basic phones and slow networks."],
                ["🌱", "Curiosity first", "A short, self-paced course that builds confidence through doing, not memorising."],
              ].map(([icon, title, text], i) => (
                <Card key={title} className="card" delay={i * 0.1}><span className="card-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{text}</p></Card>
              ))}
            </div>
          </div>
        </section>
        <section className="sec">
          <Reveal className="sec-inner narrow center">
            <h2>Our long-term goal</h2>
            <p className="lead">We want 1 crore children across India to build with AI, not just use it, by 2030. That is where we are heading, not where we are today. We are starting with one course — AI Foundation, a short story-led course a family can finish together on a Sunday — and we will grow from there, one course and one classroom at a time, with the parents, teachers and schools who join us. Every child who learns with us, and every teacher who runs a session, is counted toward that number.</p>
            <div className="page-actions center-row">
              <Link className="sec-btn" href="/courses/ai-foundation">Explore the AI Foundation Course</Link>
              <Link className="sec-btn outline" href="/schools">Explore School Partnerships</Link>
            </div>
          </Reveal>
        </section>
      </>
    ),
  },
  schools: {
    eyebrow: "For Schools",
    title: "Explore School Partnerships",
    intro: "Bring the AI Foundation course to your Class 3–12 students: a short, story-led course for ₹385 per child. Tell us about your school and we’ll get in touch.",
    body: <FormSection><Form id="schools" /></FormSection>,
  },
  "teacher-corner": {
    eyebrow: "For Teachers",
    title: "Teacher Corner",
    intro: "How to run AI Foundation in your classroom: in one session or across a few shorter periods, with simple materials.",
    body: (
      <section className="sec">
        <div className="sec-inner narrow">
          <Reveal>
            <h2>Lesson plan at a glance</h2>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Part</th><th>Time</th><th>What happens</th></tr></thead>
                <tbody>
                  {COURSE_PARTS.map(([icon, title, text, time]) => <tr key={title}><td>{icon} {title}</td><td>{time}</td><td>{text}</td></tr>)}
                  <tr><td>Flexible</td><td>Your pace</td><td>Run it in one session or split it into shorter periods, for example after the activities.</td></tr>
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal>
            <h2 className="spaced">Classroom tips</h2>
            <ul className="ticks">
              {[
                "Watch the eight short story chapters (10 minutes in total) together on a projector or a single phone held up for the group.",
                "Run the guided discussion as a circle: let every child answer at least one question.",
                "For the practical activities, pair children up: one shares a short memory, the other listens and notes three confirmed details, then swap.",
                "Use the quiz explanations to talk through any wrong answers with the whole class.",
                "For the story project, children can collect a memory from a family member at home and bring their memory page back to share, with permission.",
                "Close with “Ask. Think. Check.” and the final message: “Your ideas matter. Other people’s stories deserve care.”",
              ].map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Reveal>
          <Reveal>
            <h2 className="spaced">What you need</h2>
            <p className="lead">A screen to play the story chapters, plus paper, pencils and crayons. An AI tool is optional: you can demonstrate it with an approved tool, and every activity also works on paper. Children don’t need their own accounts.</p>
            <div className="page-actions">
              <Link className="sec-btn" href="/book-a-demo">Book a Demo</Link>
              <Link className="sec-btn outline" href="/schools">For Schools</Link>
            </div>
          </Reveal>
        </div>
      </section>
    ),
  },
  "sponsor-learners": {
    eyebrow: "Partner With Us",
    title: "Sponsor Learners",
    intro: "Help children in rural and underserved communities take their first step into AI. Each sponsored learner gets the full AI Foundation course.",
    body: (
      <FormSection>
        <Reveal className="form-intro">
          <h2>How sponsorship works</h2>
          <ol className="ordered">
            <li>Tell us how many learners you’d like to support, and any region or school you have in mind.</li>
            <li>We share a proposal with the number of learners, cost (₹385 per learner) and how learners will be reached.</li>
            <li>Once agreed, learners get access to the course, and you receive progress updates.</li>
          </ol>
          <p className="lead">Suitable for individuals, companies (including CSR programmes), NGOs and community groups. Online payment for sponsorships is not set up yet; we will contact you to arrange it.</p>
        </Reveal>
        <Form id="sponsor-learners" />
      </FormSection>
    ),
  },
  "book-a-demo": {
    eyebrow: "See It in Action",
    title: "Book a Demo",
    intro: "For schools, teachers and organisations: we’ll walk you through the AI Foundation course and how it works in a classroom.",
    body: <FormSection><Form id="book-a-demo" /></FormSection>,
  },
  contact: {
    eyebrow: "Support",
    title: "Contact Us",
    intro: "Questions about the course, enrolment or partnerships? Send us a message.",
    body: <FormSection><Form id="contact" />{CONTACT_DETAILS}</FormSection>,
  },
  reviews: {
    eyebrow: "Parents & Teachers",
    title: "Reviews",
    intro: "Tried AI Foundation with your child or class? Tell us how it went. Every review is checked before it is published.",
    body: <FormSection><ReviewsBoard /></FormSection>,
  },
  help: {
    eyebrow: "Support",
    title: "Help & FAQs",
    intro: "Answers to common questions about AI Foundation, enrolment and access.",
    body: (
      <FormSection>
        <Faq items={FAQS} />
        <Reveal className="center spaced-block">
          <h2>Still need help?</h2>
          <p className="lead">For payment problems, see <Link href="/payment-support">Payment Support</Link>. For anything else, <Link href="/contact">contact us</Link>.</p>
        </Reveal>
      </FormSection>
    ),
  },
  "payment-support": {
    eyebrow: "Support",
    title: "Payment Support",
    intro: "Help with payments, duplicate charges and missing course access.",
    body: (
      <FormSection>
        <p className="notice">Demo: online payment is not live on this website yet, so no payments are being taken.</p>
        <Reveal className="form-intro">
          <h2>Before you contact us</h2>
          <ul className="ticks">
            <li>Find your order ID in <Link href="/dashboard">My Learning</Link> under Order history, or on your confirmation page.</li>
            <li>Paid but can’t see the course? Use the same phone or computer and browser you enrolled on.</li>
            <li>Charged twice? Keep both payment references from your bank or UPI app.</li>
          </ul>
          <p className="lead">Refunds follow our <Link href="/refund-policy">Refund Policy</Link>.</p>
        </Reveal>
        <Form id="payment-support" />
      </FormSection>
    ),
  },
  "terms-conditions": { eyebrow: "Policies", title: "Terms & Conditions", body: <section className="sec"><Policy id="terms-conditions" /></section> },
  "privacy-policy": { eyebrow: "Policies", title: "Privacy Policy", body: <section className="sec"><Policy id="privacy-policy" /></section> },
  "refund-policy": { eyebrow: "Policies", title: "Refund Policy", body: <section className="sec"><Policy id="refund-policy" /></section> },
  dashboard: { eyebrow: "Student dashboard", title: "My learning", body: <FormSection><Dashboard /></FormSection> },
};
