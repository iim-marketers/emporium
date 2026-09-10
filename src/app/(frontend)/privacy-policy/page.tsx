import { PolicyPage } from "@/components/policy-page";
import { privacyPolicy } from "@/lib/policies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Emporium collects, uses and protects the personal information you share with us, including your CCPA and GDPR data protection rights.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Privacy Policy"
      lede="The information we collect, why we collect it, and the rights you have over it."
      sections={privacyPolicy}
    />
  );
}
