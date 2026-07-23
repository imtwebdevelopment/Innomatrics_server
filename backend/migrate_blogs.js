require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const defaultBlogs = [
  {
    title: "The Future of Web Development: Trends to Watch in 2024",
    slug: "the-future-of-web-development-trends-to-watch-in-2024",
    excerpt: "Explore the latest trends shaping the future of web development, from AI integration to advanced frameworks.",
    content: `Web development is evolving at an unprecedented pace. In 2024, we are seeing a massive shift in how web applications are built, deployed, and experienced. Key trends include the integration of AI-assisted coding tools, the rise of serverless computing, and the increasing adoption of frameworks like Next.js and Remix.

Developers are focusing heavily on performance, accessibility, and user experience. Edge rendering is becoming the default choice for dynamic content delivery, ensuring pages load in milliseconds globally. Additionally, web security has never been more critical, with modern platforms enforcing stricter protocols and automated threat detection directly within CI/CD pipelines.

Over the coming months, expect a deeper fusion of WebAssembly (Wasm) and browser-based machine learning models, bringing heavy computational tasks directly to the user's browser, leading to richer web applications that run smoothly without high backend costs.`,
    category: "Web Development",
    image: "https://t3.ftcdn.net/jpg/08/71/60/32/360_F_871603234_fTMmjlUOpt4F9mDudj8wjyzkt0khEtSZ.jpg",
    status: "Published",
    createdAt: "2024-03-15"
  },
  {
    title: "How AI is Transforming Digital Marketing",
    slug: "how-ai-is-transforming-digital-marketing",
    excerpt: "Discover how artificial intelligence is revolutionizing digital marketing strategies and customer engagement.",
    content: `Artificial intelligence (AI) has moved from a futuristic concept to an essential tool for digital marketers. From personalized content recommendations to predictive analytics, AI is changing how brands connect with their audiences.

Using machine learning models, companies can analyze vast amounts of customer data in real time to deliver tailored experiences. Chatbots powered by natural language processing provide instant customer support, improving satisfaction and converting leads faster. Furthermore, AI tools are automating content generation, graphic design, and search engine optimization, allowing marketing teams to focus on strategy and high-level creativity.

In the realm of paid advertising, programmatic bidding algorithms analyze customer behavior patterns to place ads where they are most likely to yield high returns, reducing wasteful ad spend and optimizing conversion rates automatically.`,
    category: "Digital Marketing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyYUBp-sS7gkr50RwnCu5hElWKdKNuk3eqbw&s",
    status: "Published",
    createdAt: "2024-04-02"
  },
  {
    title: "Mobile App Development: Native vs Cross-Platform",
    slug: "mobile-app-development-native-vs-cross-platform",
    excerpt: "A comprehensive comparison of native and cross-platform mobile app development approaches.",
    content: `Choosing the right framework for mobile app development is one of the most critical decisions for any startup or enterprise. The classic battle between native development (using Swift/Kotlin) and cross-platform frameworks (like React Native and Flutter) continues to dominate developer discussions.

Native apps offer unmatched performance, smooth transitions, and seamless access to device-specific features (such as advanced cameras or sensors). However, they require maintaining two separate codebases, doubling development effort and cost.

Cross-platform frameworks have matured significantly, enabling developers to build near-native quality applications using a single codebase. This reduces time-to-market and lowers maintenance costs. For most businesses, cross-platform is the ideal route unless the application demands heavy graphics, extensive 3D processing, or advanced low-level system integration.`,
    category: "Mobile Development",
    image: "https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg",
    status: "Published",
    createdAt: "2024-04-18"
  },
  {
    title: "Designing for Accessibility: Best Practices",
    slug: "designing-for-accessibility-best-practices",
    excerpt: "Learn how to create inclusive digital experiences that work for everyone.",
    content: `Web accessibility (a11y) is no longer an afterthought; it is a fundamental design principle. Designing inclusive digital experiences ensures that users of all abilities can navigate, understand, and interact with web content successfully.

Key practices include using sufficient color contrast, supporting full keyboard navigation, and writing semantic HTML with proper ARIA attributes for screen readers. Form fields should have explicit labels, and all media elements (images and videos) must provide descriptive alternative text (alt tags) or transcripts.

Making your site accessible doesn't just help users with visual, motor, or cognitive impairments; it also improves overall user experience, boosts search engine rankings, and protects your business from potential accessibility compliance lawsuits.`,
    category: "UI/UX Design",
    image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149024129.jpg",
    status: "Published",
    createdAt: "2024-05-01"
  },
  {
    title: "Innomatrics Wins Best Tech Innovation Award 2024",
    slug: "innomatrics-wins-best-tech-innovation-award-2024",
    excerpt: "We're proud to announce our recent recognition at the Annual Tech Excellence Awards.",
    content: `We are thrilled to share that Innomatrics has been awarded the prestigious "Best Tech Innovation Award 2024" at this year's Annual Tech Excellence Gala. This recognition highlights our team's hard work, creativity, and dedication to delivering top-tier software solutions for our clients.

Our winning project showcased a state-of-the-art enterprise logistics dashboard integrating real-time telemetry, predictive route scheduling using machine learning, and a clean, responsive interface. This solution helped our logistics partner reduce delivery delays by 22% and fuel consumption by 15%.

We want to thank our amazing clients for trusting us as their development partners, and our brilliant engineering and design teams who continually push the boundaries of what is possible. The future is bright, and we are excited to continue driving technology forward!`,
    category: "Company News",
    image: "https://img.freepik.com/free-vector/gradient-technology-award-illustration_52683-62314.jpg",
    status: "Published",
    createdAt: "2024-05-12"
  },
  {
    title: "The Rise of Edge Computing in 2024",
    slug: "the-rise-of-edge-computing-in-2024",
    excerpt: "Understanding the impact of edge computing on modern application architecture.",
    content: `As internet-connected devices multiply and dynamic applications require faster responsiveness, standard cloud computing models face latency bottlenecks. Enter Edge Computing: a distributed computing paradigm that brings computation and data storage closer to the sources of data.

By processing data locally at the edge (near the user or device) instead of routing every request back to a centralized data center, edge computing dramatically reduces latency, saves bandwidth, and improves real-time processing capabilities.

In 2024, edge computing is powering next-generation experiences: from smart city grids and autonomous driving systems to highly responsive e-commerce websites utilizing edge workers to serve localized, customized page versions instantly. As the tech matures, edge integration will become an industry standard for speed-critical web and mobile applications.`,
    category: "Technology",
    image: "https://img.freepik.com/free-vector/digital-technology-background-with-hexagonal-segments-circuit-pattern_1017-41325.jpg",
    status: "Published",
    createdAt: "2024-05-20"
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB for migration');
    
    // Check if blogs already exist
    const count = await Blog.countDocuments();
    if (count > 0) {
      console.log('Blogs already exist in the database. Deleting them to replace with default data or you can abort.');
      // uncomment to clear before insert
      // await Blog.deleteMany({});
    }

    try {
      const docs = await Blog.insertMany(defaultBlogs);
      console.log(`Successfully inserted ${docs.length} blogs!`);
    } catch (err) {
      console.error('Error inserting blogs:', err);
    }
    
    mongoose.disconnect();
    console.log('Disconnected.');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
