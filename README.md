# ServiceAgent.ai

ServiceAgent.ai is a modern recruitment platform that leverages AI to streamline the hiring process. Built with React, TypeScript, and integrated with Willo's video interview platform.

## Features

- Google Authentication
- Dashboard with hiring analytics
- Interview creation and management
- Video interview integration with Willo
- AI-powered candidate analysis
- Real-time candidate tracking

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Firebase Authentication
- Willo API Integration
- Vite

## Prerequisites

- Node.js 16.x or later
- npm or yarn
- Firebase account
- Willo API credentials

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/serviceagent-ai.git
cd serviceagent-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Firebase and Willo credentials.

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── lib/           # Library configurations
  ├── services/      # API services
  ├── types/         # TypeScript type definitions
  └── utils/         # Utility functions
```

## Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Run linter: `npm run lint`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 