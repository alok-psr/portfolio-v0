# Keyboard-First Portfolio

A modern, interactive, and keyboard-centric portfolio website built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. It features a unique dual-interface design: a standard graphical UI and a fully functional, hacker-style terminal for navigation and interaction.

## 🚀 Features

*   **Dual Interface**: Switch between a beautiful graphical UI and a command-line terminal (`Ctrl+K`).
*   **Secret Admin Dashboard**: Securely manage your profile, projects, and blog posts via a hidden terminal command (`Ctrl+U`).
*   **Keyboard Navigation**: Navigate the entire site using keyboard shortcuts.
*   **Dynamic Content**: All content (profile, projects, blogs) is dynamically fetched from JSON files, making updates easy.
*   **Blog System**: Full markdown support for writing and displaying technical blog posts.
*   **Cloudinary Integration**: Easy image uploads for your profile and projects.
*   **Responsive Design**: Fully optimized for all devices.
*   **Themes**: Light and Dark mode support with a custom "Hacker" font mode.

## 📂 Project Structure

Here's a breakdown of the key folders and files in the `src` directory:

### `src/app`
The main application routing and page structure (Next.js App Router).

*   **`page.tsx`**: The main entry point (Home Page). It fetches data and renders the `HomeClient` component.
*   **`layout.tsx`**: The root layout file. It includes global providers (Theme, Tooltip) and the `Terminal` component so it's accessible everywhere.
*   **`globals.css`**: Global styles, Tailwind directives, and custom CSS variables for themes (colors, fonts).
*   **`actions.ts`**: Server Actions for the Admin Dashboard. Handles secure operations like saving profile data, updating projects, and creating blog posts.
*   **`admin/page.tsx`**: The Secret Admin Dashboard. Contains the UI for editing your profile, managing projects, and writing blogs.
*   **`blog/`**: Contains the blog list page and individual blog post dynamic routes (`[slug]`).
*   **`projects/`**, **`about/`**, **`contact/`**, **`experience/`**: Individual pages for each section of the portfolio.

### `src/components`
Reusable UI components.

*   **`Terminal.tsx`**: The core of the keyboard interface. Handles commands, the secret login flow (`Ctrl+U`), and navigation.
*   **`ProjectCard.tsx`**: The component used to display project details with hover effects.
*   **`HomeClient.tsx`**: The client-side UI for the Home page.
*   **`AboutClient.tsx`**: The client-side UI for the About page.
*   **`ImageUpload.tsx`**: A component for uploading images to Cloudinary.
*   **`Background.tsx`**: The animated background component.
*   **`Cursor.tsx`**: A custom cursor implementation.
*   **`ui/`**: Contains reusable UI primitives (buttons, inputs, cards) from `shadcn/ui`.

### `src/lib`
Utility functions and data access.

*   **`db.ts`**: The "Database" layer. It reads and writes to the JSON files in `src/data`.
*   **`blog.ts`**: Utilities for reading and parsing markdown blog posts.
*   **`utils.ts`**: General helper functions (e.g., class name merging).

### `src/data`
The data storage for the application.

*   **`profile.json`**: Stores your personal information (name, bio, social links, skills).
*   **`projects.json`**: Stores the list of your projects.

## 🛠️ How to Customize

### 1. Personal Information
To update your name, bio, title, or social links, you can either:
*   **Use the Admin Dashboard**: Press `Ctrl+K`, then `Ctrl+U`, enter the password (`konami`), and use the "Profile" tab.
*   **Edit Manually**: Open `src/data/profile.json` and modify the values directly.

### 2. Projects
To add or edit projects:
*   **Use the Admin Dashboard**: Go to the "Projects" tab in the admin panel.
*   **Edit Manually**: Open `src/data/projects.json`. Each project has a title, description, tags, links, and an image.

### 3. Blog Posts
*   **Write New Posts**: Use the "Write Blog" tab in the Admin Dashboard.
*   **Manual Entry**: Create a new `.md` file in the `content/blogs` directory (create it if it doesn't exist) with frontmatter (title, date, description).

### 4. Styling & Colors
*   **Global Colors**: Open `src/app/globals.css`. You can change the `--accent`, `--background`, and `--foreground` variables to customize the color scheme.
*   **Fonts**: The project uses `Geist Sans` and `Geist Mono`. You can change these in `src/app/layout.tsx`.

### 5. Terminal Commands
To add new commands to the terminal:
*   Open `src/components/Terminal.tsx`.
*   Add your command to the `handleCommand` function inside the `switch` statement.
*   Add the command name to the `systemCommands` array for autocomplete.

### 6. Admin Security
*   The current admin password is hardcoded as `"konami"` in `src/components/Terminal.tsx` (for the client-side flow) and `src/app/actions.ts` (for server-side verification).
*   **IMPORTANT**: Change this to a secure environment variable (`process.env.ADMIN_SECRET`) before deploying.

## 🚀 Deployment

1.  **Environment Variables**: Ensure you have the following in your `.env.local` or deployment environment:
    ```env
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
    ADMIN_SECRET=your_secure_password
    ```
2.  **Build**: Run `npm run build` to create the production build.
3.  **Start**: Run `npm start` to launch the server.

---

Built with ❤️ by [Your Name]
