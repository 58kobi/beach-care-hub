import { ChatIcon, ChevronRightIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const articles = [
  "How do I file a claim?",
  "How long does a refund take?",
  "How do I track my claim?",
  "What evidence should I attach?",
  "Can I add more info after submitting?",
  "What counts as a valid claim?",
  "Who reviews my claim?",
  "What if I disagree with the outcome?",
];

const contacts = [
  { Icon: PhoneIcon, title: "Call us", desc: "Lines open 7 days a week", link: "View numbers" },
  { Icon: ChatIcon, title: "Live chat", desc: "Chat with our support team", link: "Start chat" },
  { Icon: MailIcon, title: "Email us", desc: "We reply within one business day", link: "Send email", href: "mailto:careonthebeach@gmail.com" },
  { Icon: WhatsAppIcon, title: "WhatsApp", desc: "Message us directly", link: "Message us" },
];

export function ArticlesContact() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[3fr_2fr]">
      <div>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-navy">Popular articles</h2>
          <a href="#" className="text-sm font-semibold text-navy-3 hover:underline">
            View all articles →
          </a>
        </div>
        <ul className="mt-6 grid gap-1 sm:grid-cols-2">
          {articles.map((a) => (
            <li key={a}>
              <a
                href="#"
                className="flex items-center justify-between gap-3 rounded-[8px] px-3 py-3 text-sm text-ink hover:bg-paper"
              >
                <span className="min-w-0">{a}</span>
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-navy-3" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-display text-2xl font-bold text-navy">Contact us</h2>
        <p className="mt-1 text-sm text-ink-soft">Our team is here to help</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {contacts.map(({ Icon, title, desc, link, href }) => (
            <div key={title} className="rounded-[12px] border border-line p-4">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-paper text-navy-3">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-display text-sm font-semibold text-navy">{title}</h3>
              <p className="mt-1 text-xs text-ink-soft">{desc}</p>
              <a href={href} className="mt-2 inline-block text-xs font-semibold text-navy-3 hover:underline">
                {link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
