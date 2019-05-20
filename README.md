# OmniMerger

**OmniMerger** is a premium, client-side document merging application built with React and Vite. It allows users to seamlessly merge PDFs, Images (PNG, JPG), and DOCX files into a single, high-quality PDF document.

Designed with a focus on aesthetics and user experience, OmniMerger features a stunning glassmorphism UI, interactive particle background, and smooth animations.

## ✨ Features

*   **Multi-Format Support**: Merge PDF, PNG, JPG, and DOCX files.
*   **Smart DOCX Handling**: Renders DOCX files as high-fidelity images to preserve complex layouts and formatting in the final PDF.
*   **Drag & Drop Reordering**: Easily organize your files with intuitive drag-and-drop functionality.
*   **Client-Side Processing**: All file processing happens in your browser. Your files never leave your device, ensuring maximum privacy.
*   **Premium UI/UX**:
    *   Interactive particle background.
    *   Modern glassmorphism design.
    *   Beautiful toast notifications.
    *   Dark mode aesthetic with neon accents.
*   **Customization**: Rename your output file before downloading.

## 🛠️ Tech Stack

*   **Framework**: React + Vite
*   **PDF Processing**: `pdf-lib`
*   **DOCX Rendering**: `docx-preview`, `html2canvas`
*   **Drag & Drop**: `@dnd-kit`
*   **UI Components**: `lucide-react` (Icons), `sonner` (Toasts)
*   **Styling**: Vanilla CSS with CSS Variables & Animations

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/omnimerger.git
    ```

2.  **Install dependencies**
    ```bash
    cd omnimerger
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📄 License

MIT
