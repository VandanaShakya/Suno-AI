import { Wand2 } from "lucide-react";    
import {
  FiCpu,
  FiZap,
  FiHeadphones,
  FiGlobe,
  FiShield,
  FiMusic,
  } from "react-icons/fi";
import images from "../assets/images";
import { FaMusic, FaSlidersH } from "react-icons/fa";  

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
    features: [
      "1 User - Ideal for personal use",
      "Unlimited Projects - Manage all your personal projects",
      "Download prototypes - Save your designs locally",
      "1 Gb workspace - Store your small files securely"
    ],
    price: "Free",
    highlighted: true,
    priceDetail: "",
    isOptimal: false,
    bgImage: images.pricingBackImage
  },
  {
    plan: "Starter",
    description: "Perfect for small teams and freelancers",
    features: [
      "3 Users - Collaborate with your small team",
      "Unlimited Projects - Handle multiple projects simultaneously",
      "Download prototypes - Share and download easily",
      "10 Gb workspace - Enough space for team files"
    ],
    price: "$59",
    highlighted: false,
    priceDetail: "/mo",
    isOptimal: false,
    bgImage: images.pricingBackImage
  },
  {
    plan: "Optimal",
    description: "Ideal for growing teams with advanced needs",
    features: [
      "10 Users - Large team collaboration",
      "Unlimited Projects - Keep all team projects organized",
      "Download prototypes - Easy access to all designs",
      "100 Gb workspace - Large storage for all files"
    ],
    price: "$99",
    highlighted: false,
    priceDetail: "/mo",
    isOptimal: true,
    bgImage: images.pricingBackImage
  }
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
  { id: 1, name: "Nova", style: "Warm & Calm" },
  { id: 2, name: "Echo", style: "Deep & Professional" },
  { id: 3, name: "Luna", style: "Soft & Friendly" },
  { id: 4, name: "Atlas", style: "Strong & Confident" },
  { id: 5, name: "Iris", style: "Bright & Cheerful" },
  { id: 6, name: "Zen", style: "Smooth & Relaxed" },
];


export const stepsData = [
  {
    id: 1,
    title: "Generate Prompt",
    description: "Generate the track, vocalise and get instant result in a click.",
  },
  {
    id: 2,
    title: "Audio in Insees",
    description: "Use our powerful software to edit and version performing tracks.",
  },
  {
    id: 3,
    title: "Generate Track",
    description: "Select the instrument and create musical language through this camera shock.",
  },
];

 

export const faqData = [
  {
    question: "What is the AI Music Generator?",
    answer:
      "Our AI Music Generator is a tool that allows you to create high-quality, professional music tracks by simply typing a text prompt. It uses advanced neural networks to understand style, mood, and instrumentation.",
  },
  {
    question: "How does AuraBeat generate tracks?",
    answer:
      "AuraBeat analyzes your text prompt for keywords like 'chill synthwave' or 'epic orchestral.' It then synthesizes original audio samples, melodies, and rhythms to match your specific description in seconds.",
  },
  {
    question: "Can I use the music for commercial projects?",
    answer:
      "Yes! Depending on your plan, the tracks generated can be used in YouTube videos, podcasts, and other commercial media projects without worrying about traditional copyright strikes.",
  },
  {
    question: "Ready to create your perfect soundtrack?",
    answer:
      "Getting started is easy. Simply enter a prompt in the hero section above, click generate, and watch your musical ideas come to life instantly.",
  },
];


export const featuresData = [
  {
    id: "prompt-ai",
    icon: Wand2,
    title: "Text-to-Music AI",
    description:
      "Describe your idea in words and let our AI instantly transform it into expressive, professional-quality music.",
  },
  {
    id: "instant-generation",
    icon: FaMusic,
    title: "Instant Track Generation",
    description:
      "Advanced neural networks generate high-fidelity tracks in seconds, adapting seamlessly to genre, mood, and style.",
  },
  {
    id: "creative-control",
    icon: FaSlidersH,
    title: "Full Creative Control",
    description:
      "Fine-tune vocals, instruments, and structure effortlessly to shape the final track exactly how you envision it.",
  },
];