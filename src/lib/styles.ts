/** The centred content column every section sits in. */
export const wrap = "mx-auto w-[min(1180px,92vw)]";

export const mono = "font-mono";

export const eyebrow =
  "font-mono text-[12.5px] font-bold tracking-[0.34em] text-sky uppercase";
export const eyebrowOnDark =
  "font-mono text-[12.5px] font-bold tracking-[0.34em] text-haze uppercase";

/** Home + 404 hero. */
export const heroHeading =
  "text-[clamp(30px,4vw,52px)] font-medium max-phablet:text-[clamp(31px,8.4vw,46px)]";
/** Inner-page masthead — titles run longer here, so the ramp is a touch lower. */
export const pageHeading =
  "text-[clamp(28px,4.6vw,50px)] font-medium max-phablet:text-[clamp(22px,7.6vw,34px)]";
/** `SectionHead`'s h2. */
export const sectionHeading = "text-[clamp(30px,3.6vw,44px)] font-medium";
/** The dark enquiry band's h2. */
export const enquireHeading = "text-[clamp(30px,3.8vw,46px)] font-medium";
/** In-column h2 that sits beside a panel rather than heading a whole section. */
export const columnHeading = "text-[clamp(26px,3vw,36px)] font-medium";

/** The smaller footnote under a checklist or spec table. */
export const noteBody = "text-[14.5px] text-slate";
/** Running prose in a page column, one step up from card copy. */
export const proseBody = "text-[17px] text-slate";

/** Vertical rhythm for a top-level section. */
export const sectionPad = "py-[50px] max-laptop:py-20 max-phablet:py-10";

/** The navy sky gradient behind the home hero and every page masthead. */
export const heroSurface = [
  "relative overflow-hidden text-white",
  "bg-[radial-gradient(1100px_520px_at_78%_-8%,rgba(63,91,214,0.55),transparent_60%),radial-gradient(760px_420px_at_10%_108%,rgba(217,31,42,0.14),transparent_60%),linear-gradient(180deg,var(--navy)_0%,var(--navy-2)_60%,#0c1440_100%)]",
].join(" ");

/** Home hero padding. */
export const heroPad =
  "pt-[78px] pb-24 max-laptop:pt-[60px] max-laptop:pb-[76px] max-phablet:pt-6 max-phablet:pb-16";

/** Inner-page masthead padding — tighter than the home hero. */
export const pageHeroPad =
  "pt-16 pb-[76px] max-laptop:pt-12 max-laptop:pb-[62px] max-phablet:pt-[38px] max-phablet:pb-[52px]";

/**
 * Hero body copy. The measure widens on inner pages, and both collapse to the
 * same width once the hero stacks.
 */
export const lede =
  "mt-5.5 text-[16px] text-[#c8d2f4] max-w-[50ch] max-laptop:max-w-[52ch] max-phablet:text-[14px]";
export const ledeWide =
  "mt-5.5 text-[17px] text-[#c8d2f4] max-w-[56ch] max-laptop:max-w-[52ch] max-phablet:text-[17px]";

/** The navy training-floor section, with a blue glow off the top right. */
export const trainSurface = [
  "relative overflow-hidden bg-navy text-white",
  "before:pointer-events-none before:absolute before:inset-0 before:content-['']",
  "before:bg-[radial-gradient(900px_400px_at_90%_0,rgba(63,91,214,0.4),transparent_55%)]",
].join(" ");

/** White card used for prose blocks on program and policy pages. */
export const panel =
  "rounded-(--r) border border-hairline bg-white px-7 py-7.5";

/** Pill tag. `chipOnDark` restyles it for navy sections. */
export const chips = "flex flex-wrap gap-2.5";
export const chip =
  "rounded-[999px] bg-cloud px-3.5 py-2 font-mono text-[11.5px] tracking-[0.14em] text-royal uppercase";
export const chipOnDark =
  "rounded-[999px] border border-(--line-d) bg-white/6 px-3.5 py-2 font-mono text-[11.5px] tracking-[0.14em] text-haze uppercase";

/** Ticked list of short lines. */
export const checklist = "m-0 grid gap-3 p-0";
export const checklistItem =
  "flex list-none items-start gap-3 text-[15.5px] text-slate";
export const checklistTick = "flex-none font-mono font-bold text-crimson";

/** Two columns that collapse together with the rest of the page. */
export const split =
  "grid grid-cols-[1.15fr_0.85fr] items-start gap-6.5 max-laptop:grid-cols-1 max-laptop:gap-11";

/** Numbered curriculum rows. */
export const moduleList = "m-0 grid gap-0 p-0";
export const moduleItem =
  "grid list-none grid-cols-[58px_1fr] gap-4 border-t border-hairline py-4.5 first:border-t-0 max-phone:grid-cols-1 max-phone:gap-1.5";
/** Wider gutter for word labels ("Mon – Tue") rather than "01". */
export const moduleItemWide =
  "grid list-none grid-cols-[92px_1fr] gap-4 border-t border-hairline py-4.5 first:border-t-0 max-phone:grid-cols-1 max-phone:gap-1.5";
export const moduleNo =
  "pt-[3px] font-mono text-[12px] tracking-[0.16em] text-crimson";

/** Key/value rows. */
export const specRow =
  "flex justify-between gap-4 border-t border-hairline py-3.5 text-[15px] first:border-t-0 max-phablet:flex-wrap max-phablet:gap-y-0.5";
export const specKey = "text-slate";
export const specValue =
  "text-right font-heading font-semibold text-royal max-phablet:text-left";
/** The same rows on a navy surface — hairline, label and value all re-tinted. */
export const specRowOnDark = "border-(--line-d)";
export const specKeyOnDark = "text-[#aebbe6]";
export const specValueOnDark = "text-white";

/** Recruiter logo wall. */
export const logoGrid =
  "grid grid-cols-4 gap-4 max-laptop:grid-cols-2 max-laptop:gap-6.5 max-phone:grid-cols-2 max-phone:gap-3 max-narrow:grid-cols-1";
export const logoCell =
  "rounded-[14px] border border-hairline bg-white px-4.5 py-6 text-center font-heading text-[17px] font-semibold text-royal transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-(--shadow)";

/** FAQ accordion. */
export const faq = "border-t border-hairline";
export const faqItem = "border-b border-hairline";
export const faqTrigger =
  "py-5.5 font-heading text-[18px] font-semibold text-ink";
export const faqBody = "pb-5.5 text-[15.5px] text-slate";

/** Eligibility / counselling call-out bar. */
export const elig =
  "mt-11 flex flex-wrap items-center justify-between gap-4 rounded-(--r) border border-hairline bg-paper px-7 py-6 max-tablet:flex-col max-tablet:items-stretch max-tablet:gap-5";
export const eligText = "text-[15.5px] text-slate";

/** Section background helpers, so pages read as intent not hex. */
export const surfacePaper = "bg-paper";
export const surfaceWhite = "bg-white";
export const surfaceProgram = "bg-[linear-gradient(180deg,#fff,var(--paper))]";

/** Three-up card grid shared by the pillars and the beliefs list. */
export const pillarGrid =
  "grid grid-cols-3 gap-5 max-laptop:grid-cols-2 max-phone:grid-cols-1";

/** Row of hero call-to-action buttons; stacks and goes full width on phones. */
export const heroCta =
  "mt-8.5 flex flex-wrap gap-3.5 max-phablet:mt-7 max-phablet:flex-col max-phablet:items-stretch max-phablet:gap-3";

/** Card used for the pillars grid and the placements support list. */
export const pillarCard =
  "rounded-(--r) border border-hairline bg-white px-6.5 py-7.5 transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1 hover:border-cloud hover:shadow-(--shadow)";
export const pillarIcon =
  "mb-4.5 grid size-11.5 place-items-center rounded-[12px] bg-cloud text-royal";
export const pillarHeading = "mb-2.25 text-[20px] font-semibold";
export const cardBody = "text-[15.5px] text-slate";
/** `.panel h3` and friends — a 20px card heading. */
export const panelHeading = "mb-3.5 text-[20px] font-semibold";

/** Numbered "what happens next" steps. */
export const stepGrid =
  "grid grid-cols-4 gap-5.5 max-laptop:grid-cols-2 max-laptop:gap-6.5 max-phone:grid-cols-1";
export const step = "relative pt-7";
export const stepNo =
  "font-mono text-[14px] font-bold tracking-[0.1em] text-crimson";
export const stepHeading = "mt-3.5 mb-2 text-[20px] font-semibold";
export const stepBody = "text-[15px] text-slate";

/** The dark enquiry band and its two-column layout. */
export const enquireSurface = [
  "relative overflow-hidden bg-[linear-gradient(160deg,var(--navy)_0%,var(--royal)_130%)] text-white",
  "before:pointer-events-none before:absolute before:inset-0 before:content-['']",
  "before:bg-[radial-gradient(700px_380px_at_12%_110%,rgba(217,31,42,0.18),transparent_60%)]",
].join(" ");
export const enqGrid =
  "relative grid grid-cols-[1fr_1.05fr] items-center gap-14 max-laptop:grid-cols-1 max-laptop:gap-11";
export const enqList = "mt-7 grid gap-3 p-0";
export const enqListItem =
  "flex list-none items-center gap-3 text-[15.5px] text-[#dbe2f7]";

/** Two-column boarding-pass grid. */
export const passGrid = "grid grid-cols-2 gap-6.5 max-laptop:grid-cols-1";

/** 404 — centres the whole hero. */
export const notFound = "grid min-h-[70vh] place-items-center text-center";

export const moduleTitle = "mb-1 block font-heading text-[17px] font-semibold";
export const moduleBody = "text-[15px] text-slate";
