# Digital Speak Recipe App

A modern, responsive recipe management application built with **Angular 18+** and **NgRx**. This application allows users to explore recipes by category, view detailed cooking instructions, and manages content via a dedicated Admin Panel.

## 🚀 Features

### 🏠 Public Interface
- **Recipe Discovery**: Browse a curated list of recipes with a beautiful grid layout.
- **Category Filtering**: 
  - Toggle between a summarized view and a full list of categories.
  - Instantly filter recipes by selecting a category (e.g., Breakfast, Vegan, Meat).
- **Recipe Details**: View comprehensive recipe information including:
  - Preparation & Cook times.
  - Nutrition facts.
  - Ingredients list.
  - Step-by-step directions with images.

### 🛡️ Admin Panel
- **Dashboard**: Manage the recipe library from a centralized table view.
- **Create & Edit**: 
  - Dynamic form to add new recipes.
  - Add/Remove ingredients and cooking steps dynamically.
  - Edit existing recipes.
- **Delete**: Remove recipes from the collection.
- **State Management**: All actions are handled via NgRx for predictable state changes.

## 🛠️ Tech Stack

- **Framework**: Angular (Standalone Components)
- **State Management**: NgRx (Store, Effects, Actions, Reducers)
- **Styling**: SCSS, Tailwind CSS (Utility classes), Angular Material (UI Components)
- **Routing**: Angular Router (Lazy loading for feature modules)

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/itsaliiiiiiii/frontend-tech-test.git
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   ng serve
   ```

4. **Open the application**
   Navigate to `http://localhost:4200/` in your browser.

## 📖 Usage Guide

### For Users
1. **Home Page**: Scroll down to see the "Categories" section.
2. **Filter**: Click "View All Categories" to expand the list. Click a specific category card (e.g., "Vegan") to filter the recipes below. Click it again to clear the filter.
3. **View Recipe**: Click on any recipe card to view its full details.

### For Administrators
1. **Access Admin Panel**: Navigate to `http://localhost:4200/admin`.
2. **Add Recipe**: Click the "Add New Recipe" button. Fill in the details, add ingredients and steps using the dynamic "+" buttons.
3. **Edit/Delete**: Use the action buttons in the recipe table to modify or remove entries.

## 📂 Project Structure

```
src/app/
├── core/           # Singleton services, layout components (Header, Main)
├── features/       # Feature modules
│   ├── admin/      # Admin pages (Recipe Management, Forms)
│   ├── home/       # Home page (Hero, Recipe List, Categories)
│   └── recipe/     # Recipe details page
├── shared/         # Reusable components (Recipe Card), models, pipes
├── store/          # NgRx State (Actions, Reducers, Effects, Selectors)
└── assets/         # Mock data (JSON), images
```


