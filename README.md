A Starter app including:

-   React v19
-   Typescript
-   Tailwind
-   Shadn-ui
-   Redux toolkit

## Getting Started

### Clone the Repository (without origin remote)

```bash
nvm use 22.11.0
git clone -b main --single-branch git@github.com:rishadomar/react-shadcn-tailwind-starterapp.git <YOUR_APP_NAME_HERE>
cd <YOUR_APP_NAME_HERE>
rm -rf .git
npm install
npm run dev
```

This clones only the main branch code without any git history or remote configuration.

### Set Up Your Own Repository

After cloning, initialize your own git repository:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <YOUR_NEW_REPOSITORY_URL>  # eg. git@github.com:yourusername/your-project.git
git push -u origin main
```

### Other Useful Commands

```bash
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```
