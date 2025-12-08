import {
  FiCpu,
  FiZap,
  FiHeadphones,
  FiGlobe,
  FiShield,
  FiMusic,
  FiMic,
  FiUser
} from "react-icons/fi";
import images from "../assets/images";


export const cardsData = [
  {
    type: "large-text",
    title: "Milestones of Our\nStartup Journey",
    image: 'bg-[url("https://i.imgur.com/vHq83vR.png")]',
    layout: "col-span-1 row-span-2",
    textClasses: "text-white text-3xl font-semibold p-6 self-end",
  },
  {
    type: "image-text",
    text: "hi-tech",
    image: 'bg-[url("https://i.imgur.com/h5TjG3t.jpeg")]',
    layout: "col-span-1 row-span-1",
    textClasses:
      "absolute right-0 top-1/2 -translate-y-1/2 transform rotate-90 origin-bottom-right text-5xl font-extrabold text-blue-800 opacity-70",
  },
  {
    type: "data",
    value: "350K",
    description: "Active users every day",
    gradient: "bg-gradient-to-tr from-cyan-500 to-indigo-600",
    layout: "col-span-1 row-span-1",
    textClasses: "p-6 text-white",
  },
  {
    type: "image-only",
    image: 'bg-[url("https://i.imgur.com/kS93L6D.jpeg")]',
    layout: "col-span-1 row-span-1",
  },
  {
    type: "text-image",
    title: "Our Startup's Proud\nAchievements",
    image: 'bg-[url("https://i.imgur.com/N8J1h4q.png")]',
    layout: "col-span-1 row-span-1",
    textClasses: "p-6 text-xl font-semibold",
  },
  {
    type: "image-only",
    image: 'bg-[url("https://i.imgur.com/x4R7HnB.jpeg")]',
    layout: "col-span-1 row-span-2",
  },
  {
    type: "background-pattern",
    image: 'bg-[url("https://i.imgur.com/M6L4U0n.png")]',
    layout: "col-span-1 row-span-1",
  },
];


// pricing data //
export const pricingData = [
    {
      plan: "Basic",
      description: "Great for private individuals",
      features: ["1 User", "Unlimited Projects", "Download prototypes", "1 Gb workspace"],
      price: "Free",
      highlighted: true,
      priceDetail: "",
      isOptimal: false
    },
    {
      plan: "Starter",
      description: "Great for private individuals",
      features: ["1 User", "Unlimited Projects", "Download prototypes", "1 Gb workspace"],
      price: "$59",
      highlighted: false,
      priceDetail: "/mo",
      isOptimal: false
    },
    {
      plan: "Optimal",
      description: "14 days free period",
      features: ["3 Users", "Unlimited Projects", "Download prototypes", "100 Gb workspace"],
      price: "$99",
      highlighted: false,
      priceDetail: "/mo",
      isOptimal: true
    },
    {
      plan: "Unlimited",
      description: "Great for private individuals",
      features: ["100 Users", "Unlimited Projects", "Download prototypes", "100 Gb workspace"],
      price: "$199",
      highlighted: false,
      priceDetail: "/mo",
      isOptimal: false
    },
  ];

  // pricing page plans //
  export const pricingPlans = [
  {
    title: "Free Plan",
    subtitle: "Perfect for new users.",
    price: "$0/month",
    features: [
      "10–20 songs/day",
      "Standard song quality",
      "Basic mixing",
      "Limited commercial rights",
    ],
    button: { text: "Get Started", gradient: "from-[#43D9FA] to-[#FA1CD4]" },
  },
  {
    title: "Creator Plan",
    subtitle: "For regular creators, YouTubers, indie artists.",
    price: "$19/month",
    features: [
      "100–200 songs/day",
      "High-quality audio (320 kbps)",
      "Full mixing & mastering",
      "Commercial use allowed",
    ],
    button: { text: "Get Started", gradient: "from-[#43D9FA] to-[#FA1CD4]" },
    popular: true,
  },
  {
    title: "Pro Plan",
    subtitle: "For studios, labels, professionals.",
    price: "$49/month",
    features: [
      "Unlimited songs",
      "Ultra HD audio (WAV)",
      "Custom voice cloning",
      "Multi-track download",
    ],
    button: { text: "Go Pro", gradient: "from-[#43D9FA] to-[#FA1CD4]" },
  },
  {
    title: "Pro Plan",
    subtitle: "For studios, labels, professionals.",
    price: "$49/month",
    features: [
      "Unlimited songs",
      "Ultra HD audio (WAV)",
      "Custom voice cloning",
      "Multi-track download",
    ],
    button: { text: "Go Pro", gradient: "from-[#43D9FA] to-[#FA1CD4]" },
  },
];


export const creditPacks = [
    {
      pack: '100 Credits',
      credits: 100,
      price: '$25',
      description: 'Perfect for sampling and trying out a few generations.',
      features: [
        '100 Credits (~20-100 songs)',
        'Credits never expire',
        'Standard generation queue',
      ],
      isOptimal: false,
    },
    {
      pack: '500 Credits (Optimal)',
      credits: 500,
      price: '$99',
      description: 'Best value for regular creators and high-quality results.',
      features: [
        '500 Credits (~100-500 songs)',
        'Credits never expire',
        'Priority generation speed',
        'Access to V2 AI Model',
      ],
      isOptimal: true,
    },
  ];

  export  const guidelines = [
    {
      title: 'Be respectful and kind',
      desc:
        'Treat others with respect. Harassment, hate speech, or personal attacks are not allowed. Focus feedback on work and behaviour, not identity.',
    },
    {
      title: 'Share helpful, relevant content',
      desc:
        'Post content directly related to music creation, AI usage, and collaboration. Avoid excessive self-promotion or irrelevant advertising.',
    },
    {
      title: 'Respect intellectual property',
      desc:
        'Only upload or share audio you own or have permission to use. Always credit collaborators and use proper licensing for sampled material.',
    },
    {
      title: 'No malicious or illegal activity',
      desc:
        'Do not share instructions for wrongdoing, attempt to bypass content restrictions, or distribute malware. Follow local laws and platform terms.',
    },
    {
      title: 'Protect privacy',
      desc: 'Do not publish private information about others without consent. Respect requests to remove personal data.',
    },
    {
      title: 'Give constructive feedback',
      desc:
        "When critiquing, be specific and solution-oriented. Praise what's working and offer clear suggestions for improvement.",
    },
    {
      title: 'Report problems',
      desc:
        "If you see content that violates these guidelines, use the platform's reporting tools or contact the moderation team.",
    },
  ];



  export const termsOfServices = [
{
title: '4. User Conduct',
content:
'Users must not engage in illegal activities, harassment, or distribution of content that violates these Terms. You agree to use Suno AI in a lawful and respectful manner.',
},
{
title: '5. Intellectual Property',
content:
'All Suno AI content, branding, and software are owned by Suno AI or its licensors. You retain ownership of the content you create but grant Suno AI a limited license as described below.',
},
{
title: '6. Content License & Rights',
content:
'By uploading or creating content, you grant Suno AI a worldwide, royalty-free license to host, store, reproduce, and operate the service. You represent that you have the rights to grant this license.',
},
{
title: '7. Payments & Subscriptions',
content:
'Paid features require a subscription or one-time payment. Refunds, cancellations, and billing are subject to our billing policy and applicable laws.',
},
{
title: '8. Disclaimers',
content:
"THE SERVICE IS PROVIDED 'AS IS' WITHOUT WARRANTIES OF ANY KIND. SUNO AI DISCLAIMS ALL IMPLIED WARRANTIES TO THE MAXIMUM EXTENT PERMITTED BY LAW.",
},
{
title: '9. Limitation of Liability',
content:
'TO THE MAXIMUM EXTENT PERMITTED BY LAW, SUNO AI WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.',
},
{
title: '10. Termination',
content:
'We may suspend or terminate access for violations of these Terms or for other business reasons. Some sections will survive termination as described here.',
},
{
title: '11. Governing Law',
content:
'These Terms are governed by the laws of the jurisdiction specified in our legal notices. Disputes will be resolved in the courts of that jurisdiction unless otherwise agreed.',
},
{
title: '12. Changes to Terms',
content:
'We may modify these Terms from time to time. We will provide notice of significant changes; continued use constitutes acceptance of the updated Terms.',
},
{
title: '13. Contact',
content:
'For questions about these Terms, contact support@suno.ai.',
},
];

// privacy policy //
export const privacyData = [
{
title: 'Introduction',
content:
'Suno AI ("we", "us", "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.',
},
{
title: 'Information We Collect',
content:
'We collect information you provide directly (e.g., account registration, support requests), usage data (e.g., pages visited, features used), and technical data (e.g., IP address, device type).',
},
{
title: 'How We Use Information',
content:
'We use your information to provide and improve services, personalise experience, communicate updates, process payments, and protect the platform from abuse.',
},
{
title: 'Sharing & Disclosure',
content:
'We may share data with service providers who help operate the service, with affiliates, or when required by law. We do not sell personal data to third parties.',
},
{
title: 'Cookies & Tracking',
content:
'We use cookies, web beacons, and similar technologies to remember preferences, analyze usage, and serve relevant content. You can control cookies via your browser settings.',
},
{
title: 'Security',
content:
'We use administrative, technical, and physical safeguards to protect information. However, no method of transmission or storage is 100% secure.',
},
{
title: 'Data Retention',
content:
'We retain personal data as long as necessary to provide services and comply with legal obligations. Retention periods depend on the type of data and purpose.',
},
{
title: 'Your Rights',
content:
'Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of your personal data. To exercise these rights, contact support@suno.ai.',
},
{
title: 'International Transfers',
content:
'Your data may be transferred to and processed in countries with different privacy laws. We apply safeguards to protect your information during transfer.',
},
{
title: 'Children',
content:
"Our services are not directed to children under 13 (or higher age where required). We do not knowingly collect personal information from children without parental consent.",
},
{
title: 'Changes to this Policy',
content:
'We may update this Privacy Policy. We will post the updated policy with a new effective date. Continued use after changes constitutes acceptance.',
},
{
title: 'Contact Us',
content: 'If you have questions or requests regarding this policy, contact support@suno.ai.',
},
];


export const features = [
  {
    icon: FiCpu,
    title: "Advanced AI",
    description:
      "State-of-the-art neural networks trained on millions of songs to understand music theory and composition.",
  },
  {
    icon: FiZap,
    title: "Instant Generation",
    description: "Create full tracks in seconds. No waiting, no complex setups.",
  },
  {
    icon: FiHeadphones,
    title: "Studio Quality",
    description:
      "Professional-grade audio output at 320kbps. Ready for streaming or production.",
  },
  {
    icon: FiGlobe,
    title: "Any Genre",
    description:
      "From ambient to electronic, classical to hip-hop. Our AI understands every style.",
  },
  {
    icon: FiShield,
    title: "Royalty Free",
    description:
      "Full commercial rights to everything you create. Use your music anywhere.",
  },
  {
    icon: FiMusic,
    title: "Endless Variations",
    description:
      "Generate unlimited variations of any track. Find the perfect version.",
  },
];

export const stats = [
  { value: '10M+', label: 'Songs Created' },
  { value: '500K+', label: 'Active Users' },
  { value: '50+', label: 'Music Styles' },
  { value: '99.9%', label: 'Uptime' },
];



export const aiVoices = [
  {
    id: 1,
    name: "Alex (The Narrator)",
    style: "Deep, clear, and professional",
    icon: FiMic,
  },
  {
    id: 2,
    name: "Sophia (The Storyteller)",
    style: "Warm, expressive, and engaging",
    icon: FiUser,
  },
  {
    id: 3,
    name: "Max (The Robot)",
    style: "Synthetic, fast-paced, and energetic",
    icon: FiHeadphones,
  },
  {
    id: 4,
    name: "Lena (The Assistant)",
    style: "Smooth, friendly, and conversational",
    icon: FiUser,
  },
];

export const reelsData = [
    {
      id: 1,
      username: '@devianibza',
      label: 'producers',
      imageAlt: 'A man speaking into a microphone with studio equipment in the background.',
      imageUrl: images.feature1
    },
    {
      id: 2,
      username: '@techguyver',
      label: "it's the best numero UNO",
      imageAlt: 'Close-up of a hand pointing at a laptop screen showing music production software.',
      imageUrl: images.feature2
    },
    {
      id: 3,
      username: '@timbaland',
      label: 'grid-cols 2 opacity X X B',
      imageAlt: 'A man in a black shirt working on a computer screen.',
      imageUrl: images.feature3
    },
    {
      id: 4,
      username: '@spellspand',
      label: 'new sample wades X X B B',
      imageAlt: 'A man wearing a green hat working with music hardware controllers.',
      imageUrl: images.feature4
    },
    {
      id: 5,
      username: '@nickfoats',
      label: 'the most insane',
      imageAlt: 'A man looking up with text overlay on his face.',
      imageUrl: images.feature5
    },
  ];