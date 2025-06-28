
export interface Course {
  id: string;
  title: string;
  description: string;
  rating: number;
  duration: string;
  students: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  modules: Module[];
  abstract: string;
  reviews: Review[];
}

export interface Module {
  id: string;
  title: string;
  content: string;
  jokes: string[];
  mcqs: MCQ[];
  completed?: boolean;
}

export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Quantum Physics',
    description: 'Explore the fascinating world of quantum mechanics and its real-world applications.',
    rating: 4.8,
    duration: '8 weeks',
    students: 12,
    level: 'Intermediate',
    category: 'Physics',
    abstract: 'Dive deep into the quantum realm and discover how particles behave at the smallest scales. This course covers fundamental concepts like wave-particle duality, uncertainty principle, and quantum entanglement.',
    modules: [
      {
        id: '1-1',
        title: 'Quantum Foundations',
        content: `
          Welcome to the weird and wonderful world of quantum physics! 🎭
          
          ## The Quantum Revolution
          
          Quantum physics began in the early 1900s when scientists realized that classical physics couldn't explain certain phenomena. It's like discovering that your well-behaved dog has been secretly running a quantum computing startup in the garage!
          
          ### Key Concepts:
          
          **Wave-Particle Duality**: Particles can behave like waves and waves can behave like particles. It's nature's way of saying "why choose one when you can be both?" 
          
          **The Uncertainty Principle**: You can't know both the exact position and momentum of a particle simultaneously. It's like trying to catch a greased pig while blindfolded - the more precisely you know where it is, the less you know where it's going!
          
          **Quantum Superposition**: Particles can exist in multiple states simultaneously until observed. Schrödinger's cat is both alive and dead until you check - talk about commitment issues!
        `,
        jokes: [
          "Why don't quantum physicists ever win at poker? Because they always fold when observed!",
          "A photon checks into a hotel. The bellhop asks, 'Can I help you with your luggage?' The photon replies, 'No thanks, I'm traveling light!'"
        ],
        mcqs: [
          {
            question: "What is wave-particle duality?",
            options: [
              "Particles that only behave as waves",
              "The concept that matter exhibits both wave and particle properties",
              "Waves that never behave as particles", 
              "A type of quantum computer"
            ],
            correctAnswer: 1,
            explanation: "Wave-particle duality is the concept that all matter exhibits both wave and particle properties, depending on how it's observed."
          }
        ]
      }
    ],
    reviews: [
      {
        id: '1',
        userName: 'Alice Chen',
        rating: 5,
        comment: 'Mind-blowing course! The jokes made complex concepts so much easier to understand.',
        date: '2024-01-15'
      }
    ]
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    description: 'Master the basics of ML algorithms and build your first intelligent systems.',
    rating: 4.9,
    duration: '10 weeks',
    students: 25,  
    level: 'Beginner',
    category: 'Computer Science',
    abstract: 'Learn the core concepts of machine learning, from linear regression to neural networks. Build practical projects and understand how AI systems learn from data.',
    modules: [
      {
        id: '2-1',
        title: 'Introduction to Machine Learning',
        content: `
          Welcome to the age of machines that learn! 🤖
          
          ## What is Machine Learning?
          
          Machine Learning is like teaching a computer to recognize patterns, just like how you learned to recognize your mom's footsteps in the hallway. Except computers need millions of examples instead of just a few scary midnight encounters!
          
          ### Types of Machine Learning:
          
          **Supervised Learning**: We show the algorithm examples with correct answers. It's like studying for a test with answer keys - the algorithm learns to map inputs to outputs.
          
          **Unsupervised Learning**: The algorithm finds patterns without being told what to look for. It's like a detective solving a mystery without any clues - sometimes it finds treasure, sometimes it finds your lost socks!
          
          **Reinforcement Learning**: The algorithm learns through trial and error with rewards and penalties. Think of it as training a pet - good predictions get treats, bad ones get the disappointed head shake.
        `,
        jokes: [
          "Why did the machine learning algorithm break up with the dataset? It said there was no correlation!",
          "A neural network walks into a bar. The bartender says, 'What'll it be?' The network replies, 'I'll have what the training data suggests!'"
        ],
        mcqs: [
          {
            question: "What is supervised learning?",
            options: [
              "Learning without any data",
              "Learning from examples with known correct answers",
              "Learning only from mistakes",
              "Learning from watching YouTube videos"
            ],
            correctAnswer: 1,
            explanation: "Supervised learning uses labeled training data where the correct answers are provided to teach the algorithm."
          }
        ]
      }
    ],
    reviews: [
      {
        id: '2',
        userName: 'Bob Johnson',
        rating: 5,
        comment: 'Perfect introduction to ML! The explanations are clear and the humor keeps you engaged.',
        date: '2024-01-20'
      }
    ]
  },
  {
    id: '3',
    title: 'Modern Web Development',
    description: 'Build responsive, interactive websites using React, Node.js, and modern tools.',
    rating: 4.7,
    duration: '12 weeks',
    students: 18,
    level: 'Intermediate',
    category: 'Web Development',
    abstract: 'Learn full-stack web development with modern JavaScript frameworks. Build real-world projects and deploy them to the cloud.',
    modules: [
      {
        id: '3-1',
        title: 'React Fundamentals',
        content: `
          Welcome to React - where components are king! ⚛️
          
          ## What is React?
          
          React is a JavaScript library for building user interfaces. Think of it as LEGO blocks for websites - you build small, reusable components and snap them together to create amazing applications!
          
          ### Core Concepts:
          
          **Components**: Reusable pieces of UI. Like having a magic template that you can use over and over again, but without the copy-paste carpal tunnel syndrome!
          
          **JSX**: JavaScript XML - it lets you write HTML-like syntax in your JavaScript. It's like having a bilingual conversation between HTML and JS, and surprisingly, they get along great!
          
          **Props**: How components talk to each other. It's like passing notes in class, but legal and encouraged by the teacher (React)!
          
          **State**: Data that can change over time. Like your mood on Monday mornings - unpredictable and constantly evolving!
        `,
        jokes: [
          "Why do React developers prefer function components? Because they don't like class warfare!",
          "What's a React developer's favorite type of music? Component music - it's all about that base (component)!"
        ],
        mcqs: [
          {
            question: "What is JSX?",
            options: [
              "A new programming language",
              "JavaScript XML - syntax extension for JavaScript",
              "A React competitor",
              "A type of database"
            ],
            correctAnswer: 1,
            explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like syntax in your JavaScript code."
          }
        ]
      }
    ],
    reviews: [
      {
        id: '3',
        userName: 'Sarah Wilson',
        rating: 4,
        comment: 'Great course structure and practical examples. The jokes made learning fun!',
        date: '2024-01-25'
      }
    ]
  },
  {
    id: '4',
    title: 'Digital Marketing Mastery',
    description: 'Learn SEO, social media marketing, and analytics to grow your online presence.',
    rating: 4.6,
    duration: '6 weeks',
    students: 22,
    level: 'Beginner',
    category: 'Marketing',
    abstract: 'Master digital marketing strategies from content creation to conversion optimization. Learn to build and execute successful online marketing campaigns.',
    modules: [
      {
        id: '4-1',
        title: 'Digital Marketing Foundations',
        content: `
          Welcome to the digital marketing jungle! 🦁
          
          ## The Digital Marketing Ecosystem
          
          Digital marketing is like being a ringmaster in a circus - you need to juggle multiple acts (channels) while keeping the audience (customers) entertained and engaged!
          
          ### Key Channels:
          
          **Search Engine Optimization (SEO)**: Making Google fall in love with your content. It's like being a matchmaker between your website and search engines - when it works, it's beautiful!
          
          **Social Media Marketing**: Building relationships one post at a time. Think of it as hosting the world's largest dinner party, except everyone's invited and some people only come for the appetizers (content)!
          
          **Email Marketing**: The art of sliding into inboxes professionally. It's like having a pen pal with millions of people who actually want to hear from you!
          
          **Content Marketing**: Telling stories that sell without being salesy. It's like being a campfire storyteller, but instead of ghost stories, you're sharing value!
        `,
        jokes: [
          "Why don't digital marketers ever get lost? Because they always follow the conversion funnel!",
          "A marketer's favorite type of coffee? Espresso - because they need that instant engagement!"
        ],
        mcqs: [
          {
            question: "What is the primary goal of SEO?",
            options: [
              "To increase social media followers",
              "To improve website visibility in search engine results",
              "To create viral content",
              "To reduce website loading time"
            ],
            correctAnswer: 1,
            explanation: "SEO (Search Engine Optimization) aims to improve a website's visibility and ranking in search engine results pages."
          }
        ]
      }
    ],
    reviews: [
      {
        id: '4',
        userName: 'Mike Davis',
        rating: 5,
        comment: 'Comprehensive coverage of digital marketing. The practical tips are immediately applicable!',
        date: '2024-02-01'
      }
    ]
  },
  {
    id: '5',
    title: 'Data Science with Python',
    description: 'Analyze data, create visualizations, and build predictive models using Python.',
    rating: 4.9,
    duration: '14 weeks',
    students: 15,
    level: 'Advanced',
    category: 'Data Science',
    abstract: 'Master data science tools and techniques using Python. Learn to extract insights from data and build machine learning models.',
    modules: [
      {
        id: '5-1',
        title: 'Introduction to Data Science',
        content: `
          Welcome to the world of data science - where numbers tell stories! 📊
          
          ## What is Data Science?
          
          Data science is like being a detective, statistician, and fortune teller all rolled into one. You investigate data mysteries, analyze evidence (statistics), and predict future outcomes!
          
          ### The Data Science Process:
          
          **Data Collection**: Gathering information like a digital hoarder, but with purpose! It's like being a collector, except instead of stamps, you collect datasets that might change the world.
          
          **Data Cleaning**: Making messy data presentable. Think of it as giving your data a spa day - removing impurities, filling in missing values, and making everything look beautiful!
          
          **Exploratory Data Analysis**: Getting to know your data intimately. It's like going on a first date with your dataset - asking questions, looking for interesting patterns, and hoping for good chemistry!
          
          **Modeling**: Creating mathematical representations of real-world phenomena. It's like building a crystal ball, but instead of magic, you use algorithms!
        `,
        jokes: [
          "Why do data scientists make great comedians? Because they know how to find the patterns in their jokes!",
          "What do you call a data scientist who can't find correlations? Uncorrelated!"
        ],
        mcqs: [
          {
            question: "What is the first step in the data science process?",
            options: [
              "Building models",
              "Data visualization", 
              "Data collection",
              "Making predictions"
            ],
            correctAnswer: 2,
            explanation: "Data collection is typically the first step, as you need data before you can analyze, clean, or model it."
          }
        ]
      }
    ],
    reviews: [
      {
        id: '5',
        userName: 'Emma Thompson',
        rating: 5,
        comment: 'Excellent course! The Python examples are clear and the humor makes complex topics digestible.',
        date: '2024-02-05'
      }
    ]
  }
];

export const trendingTopics = [
  'Artificial Intelligence',
  'Machine Learning',
  'Web Development',
  'Data Science',
  'Digital Marketing',
  'Quantum Physics',
  'Blockchain',
  'Cybersecurity',
  'Mobile Development',
  'Cloud Computing'
];
