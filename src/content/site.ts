export const FAQS: [string, string][] = [
  ["Who is the AI Foundation course for?", "Children in Class 3–5, 6–10, 11 & 12. Lessons use simple words, pictures and games, and a parent or guardian joins in for the activities."],
  ["How much does it cost?", "₹385 for the full course, paid once. There is no subscription."],
  ["Which devices can I use?", "Any phone, tablet or computer with a modern web browser. The site is light and built to work on basic smartphones and slower connections."],
  ["How long can I access a course after enrolling?", "Access period: [to be confirmed, e.g. 12 months from enrolment]."],
  ["Do we need to create an account or sign in?", "No. A parent enrols the child directly. Progress is saved on the phone or computer you use, so keep using the same device and browser."],
  ["Is there a refund policy?", "Refund policy: [to be confirmed by One Sky before launch]."],
  ["Do learners get a certificate?", "Certificates: [to be confirmed, e.g. a completion certificate after the course quiz]."],
  ["How do I pay?", "Online payment is being set up and is not live on this demo website yet. Supported methods: [to be confirmed, e.g. UPI, cards, net banking]."],
];

export const GIVING_FAQS: [string, string][] = [
  ["Does this make the course more expensive?", "No. The course is ₹385 and the ₹1 comes out of that. You are not asked to add anything."],
  ["Where exactly is the money held?", "In the One Sky Learner Fund, a ring-fenced account held by SFJ Foundation, a Section 8 not-for-profit. It is used only to pay for AI Foundation seats for children in government and low-fee schools."],
  ["Can I see who received a seat?", "We publish the number of seats, the districts and the partner schools. We do not publish children’s names."],
  ["Can my school nominate children?", "Yes. Government and low-fee private schools can apply through the For Schools page. Seats are allotted in order of nomination as the fund fills."],
  ["Can I sponsor a whole seat instead?", "Yes. The Sponsor Learners page lets a family, a company or an alumni group fund one or more full seats at ₹385 each, on top of the ₹1 pledge."],
];

export const COURSE_PARTS: [string, string, string, string][] = [
  ["🎬", "Story videos", "Eight short animated chapters about Nila, Kavin, Ajji and Malar Teacher.", "10 min"],
  ["💬", "Guided discussion", "Talk about the story together, then check the facts.", "10 min"],
  ["🔍", "Practical activities", "Three 10-minute activities: Listen Before You Create, Build a Clear Prompt, and Check and Improve.", "30 min"],
  ["✅", "Quiz with explanations", "Eight questions about the story and using AI carefully. Explanations appear after you submit.", "15 min"],
  ["📝", "Your story project", "Collect a short memory with permission, check it with the storyteller and create a memory page.", "15 min"],
  ["🌈", "Reflection and recap", "Remember the key ideas and reflect on your own story project.", "10 min"],
];

export const COURSES = [
  {
    slug: "ai-foundation",
    title: "AI Foundation",
    tags: "Class 3–5, 6–10, 11 & 12 · Artificial Intelligence",
    price: 385,
    intro: "A story-led, parent-guided first step into using AI with care. Follow Nila and Kavin as they find Ajji’s unfinished memory, listen to her, write clearer prompts, check what AI invents and share her story respectfully.",
    outcomes: [
      "Explain why AI cannot automatically know someone’s personal memories",
      "Listen to a storyteller and note confirmed details",
      "Write a clear prompt using only confirmed details",
      "Check AI-generated details and correct invented ones",
      "Ask permission before recording or sharing someone’s story",
    ],
    insideSummary: "6 sections · Self-paced · Story: “Ajji, This Is for You”",
    parts: COURSE_PARTS,
    chapters: ["The Green Notebook", "Listening to Ajji", "A Clearer Prompt", "Checking the Details", "Pictures from Ajji’s Words", "May We Record Your Voice?", "Getting Ready to Share", "Ajji, This Is for You"],
    forParents: "This course is for children in Class 3–5, 6–10, 11 & 12. A parent or guardian completes the enrolment and sits with the child for the activities. Every activity also works with paper and pencils, and children don’t need their own AI accounts.",
    includes: ["⏱ Self-paced: learn in one go or a little each day", "🎬 8 short story chapters (10 min)", "🔍 Discussion and 30 minutes of activities", "✅ Quiz with explanations (15 min)", "📝 Your story project (15 min)", "📱 Works on phones and computers"],
  },
];

export type Field = {
  name: string;
  label: string;
  type?: "text" | "date" | "number" | "select" | "textarea";
  options?: string[];
  optional?: boolean;
  hint?: string;
};

const CONTACT: Field = { name: "contact", label: "Phone or email" };

export const FORMS: Record<string, { submit: string; fields: Field[] }> = {
  schools: {
    submit: "Send enquiry",
    fields: [
      { name: "school", label: "School or institution name" },
      { name: "person", label: "Your name and role", optional: true },
      CONTACT,
      { name: "town", label: "Town / district and state", optional: true },
      { name: "classes", label: "Classes", type: "select", optional: true, options: ["Class 3–5", "Class 6–10", "Class 11", "Class 12", "Several classes"] },
      { name: "learners", label: "Approximate number of students", type: "number", optional: true },
      { name: "message", label: "Message", type: "textarea", optional: true },
    ],
  },
  "sponsor-learners": {
    submit: "Send sponsorship enquiry",
    fields: [
      { name: "name", label: "Your name" },
      { name: "org", label: "Company or organisation", optional: true },
      CONTACT,
      { name: "learners", label: "Number of learners", type: "number", optional: true },
      { name: "region", label: "Preferred region or school", optional: true },
      { name: "message", label: "Message", type: "textarea", optional: true },
    ],
  },
  "book-a-demo": {
    submit: "Request a demo",
    fields: [
      { name: "name", label: "Your name" },
      { name: "role", label: "Your role", type: "select", options: ["Teacher", "School leader", "Parent", "NGO / CSR partner", "Other"] },
      { name: "org", label: "School or organisation", optional: true },
      CONTACT,
      { name: "town", label: "Town / district and state", optional: true },
      { name: "date", label: "Preferred date", type: "date", optional: true },
      { name: "message", label: "Anything we should know?", type: "textarea", optional: true },
    ],
  },
  contact: {
    submit: "Send message",
    fields: [
      { name: "name", label: "Your name" },
      CONTACT,
      { name: "topic", label: "Topic", type: "select", optional: true, options: ["About the course", "Enrolment", "Schools & partnerships", "Privacy request", "Something else"] },
      { name: "message", label: "Message", type: "textarea", hint: "Please don’t include a child’s personal details." },
    ],
  },
  "payment-support": {
    submit: "Send payment query",
    fields: [
      { name: "name", label: "Parent / guardian name" },
      CONTACT,
      { name: "issue", label: "Issue", type: "select", options: ["Paid but no access", "Charged twice", "Refund request", "Payment failed", "Other"] },
      { name: "order", label: "Order ID or payment reference", optional: true },
      { name: "date", label: "Payment date", type: "date", optional: true },
      { name: "message", label: "Details", type: "textarea", optional: true },
    ],
  },
};
