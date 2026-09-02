/**
 * Privacy and cookie policies, reproduced from emporiumsolutions.com.
 *
 * A section is either running paragraphs, a bulleted list, or both — the policy
 * page renders whichever keys are present.
 */

export type PolicySection = {
  heading?: string;
  body?: string[];
  list?: string[];
  /** Trailing paragraphs after a list. */
  after?: string[];
};

export const privacyPolicy: PolicySection[] = [
  {
    body: [
      "At Emporiumsolutions, accessible from https://www.emporiumsolutions.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Emporiumsolutions and how we use it.",
      "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.",
      "This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Emporiumsolutions. This policy is not applicable to any information collected offline or via channels other than this website.",
    ],
  },
  {
    heading: "Consent",
    body: [
      "By using our website, you hereby consent to our Privacy Policy and agree to its terms.",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.",
      "If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.",
      "When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.",
    ],
  },
  {
    heading: "How we use your information",
    body: ["We use the information we collect in various ways, including to:"],
    list: [
      "Provide, operate, and maintain our website",
      "Improve, personalize, and expand our website",
      "Understand and analyze how you use our website",
      "Develop new products, services, features, and functionality",
      "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes",
      "Send you emails",
      "Find and prevent fraud",
    ],
  },
  {
    heading: "Log Files",
    body: [
      "Emporiumsolutions follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.",
    ],
  },
  {
    heading: "Cookies and Web Beacons",
    body: [
      "Like any other website, Emporiumsolutions uses \"cookies\". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.",
    ],
  },
  {
    heading: "Our Advertising Partners",
    body: [
      "Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data.",
      "Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Emporiumsolutions, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.",
      "Note that Emporiumsolutions has no access to or control over these cookies that are used by third-party advertisers.",
    ],
  },
  {
    heading: "Third Party Privacy Policies",
    body: [
      "Emporiumsolutions's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.",
      "You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.",
    ],
  },
  {
    heading: "CCPA Privacy Rights (Do Not Sell My Personal Information)",
    body: ["Under the CCPA, among other rights, California consumers have the right to:"],
    list: [
      "Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.",
      "Request that a business delete any personal data about the consumer that a business has collected.",
      "Request that a business that sells a consumer's personal data, not sell the consumer's personal data.",
    ],
    after: [
      "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.",
    ],
  },
  {
    heading: "GDPR Data Protection Rights",
    body: [
      "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:",
    ],
    list: [
      "The right to access — You have the right to request copies of your personal data. We may charge you a small fee for this service.",
      "The right to rectification — You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.",
      "The right to erasure — You have the right to request that we erase your personal data, under certain conditions.",
      "The right to restrict processing — You have the right to request that we restrict the processing of your personal data, under certain conditions.",
      "The right to object to processing — You have the right to object to our processing of your personal data, under certain conditions.",
      "The right to data portability — You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.",
    ],
  },
  {
    heading: "Children's Information",
    body: [
      "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.",
      "Emporiumsolutions does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.",
    ],
  },
];

export const cookiePolicy: PolicySection[] = [
  {
    body: [
      "This is the Cookie Policy for Emporiumsolutions, accessible from https://www.emporiumsolutions.com/",
    ],
  },
  {
    heading: "What Are Cookies",
    body: [
      "As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.",
    ],
  },
  {
    heading: "How We Use Cookies",
    body: [
      "We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.",
    ],
  },
  {
    heading: "Disabling Cookies",
    body: [
      "You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.",
    ],
  },
  {
    heading: "The Cookies We Set",
    list: [
      "Account related cookies — If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.",
      "Login related cookies — We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.",
      "Email newsletters related cookies — This site offers newsletter or email subscription services and cookies may be used to remember if you are already registered and whether to show certain notifications which might only be valid to subscribed/unsubscribed users.",
      "Orders processing related cookies — This site offers e-commerce or payment facilities and some cookies are essential to ensure that your order is remembered between pages so that we can process it properly.",
      "Surveys related cookies — From time to time we offer user surveys and questionnaires to provide you with interesting insights, helpful tools, or to understand our user base more accurately. These surveys may use cookies to remember who has already taken part in a survey or to provide you with accurate results after you change pages.",
      "Forms related cookies — When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.",
      "Site preferences cookies — In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.",
    ],
  },
  {
    heading: "Third Party Cookies",
    body: [
      "In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.",
      "This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.",
      "Third party analytics are used to track and measure usage of this site so that we can continue to produce engaging content. These cookies may track things such as how long you spend on the site or pages you visit which helps us to understand how we can improve the site for you.",
      "From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimisations our users appreciate the most.",
      "The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you.",
      "We use adverts to offset the costs of running this site and provide funding for further development. The behavioural advertising cookies used by this site are designed to ensure that we provide you with the most relevant adverts where possible by anonymously tracking your interests and presenting similar things that may be of interest.",
      "Several partners advertise on our behalf and affiliate tracking cookies simply allow us to see if our customers have come to the site through one of our partner sites so that we can credit them appropriately and where applicable allow our affiliate partners to provide any bonus that they may provide you for making a purchase.",
      "We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work, the social media sites we integrate with will set cookies through our site which may be used to enhance your profile on their site or contribute to the data they hold for various purposes outlined in their respective privacy policies.",
    ],
  },
  {
    heading: "More Information",
    body: [
      "Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.",
      "However if you are still looking for more information then you can contact us through one of our preferred contact methods.",
    ],
  },
];
