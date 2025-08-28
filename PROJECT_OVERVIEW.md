# PROJECT_OVERVIEW.md

## Project Information
- **Repository**: [JMS_IISPPR](https://github.com/payal1612/JMS_IISPPR.git)
- **Type**: Academic Journal Management System (Frontend-Only)
- **Status**: Production-Ready with Dynamic PDF Watermarking
- **Last Updated**: August 17, 2025
- **Latest Feature**: ✅ Dynamic PDF Watermarking System (Completed)

## Project Description
The **Law, Diplomacy, Tech & Public Policy Review (LDTPPR)** is a modern, frontend-only Journal Management System built for academic publishing. It simulates the complete journal article lifecycle, editorial workflow, and public-facing pages for an academic journal without requiring a backend infrastructure.

**Note**: This project has been restructured from a MERN-style `client/` folder structure to follow Vite+React best practices with all files in the root directory.

## Tech Stack & Architecture

### Core Technologies
- **React 19.1.0** - Frontend framework with JSX components
- **Vite 6.3.5** - Fast build tool and development server
- **Tailwind CSS 4.1.10** - Utility-first CSS framework for styling
- **React Router DOM 7.6.2** - Client-side routing
- **Framer Motion 12.23.5** - Animation library
- **Lucide React 0.523.0** - Icon library

### Additional Libraries
- **PDF Generation**: jsPDF 3.0.1, jsPDF-AutoTable, html2canvas
- **Dynamic PDF Watermarking**: Custom implementation with metadata integration
- **UI Enhancement**: react-countup, react-intersection-observer
- **Icons**: react-icons, lucide-react
- **Data Validation**: Custom validation utilities for watermark system

### Development Tools
- **ESLint 9.29.0** - Code linting with React-specific rules
- **TypeScript definitions** - Type safety for React components
- **Vercel** - Deployment platform (configured with vercel.json)

## Project Structure

```
JMS_IISPPR/
├── .git/                           # Git repository
├── .github/                        # GitHub configuration & instructions
├── .gitignore                      # Git ignore rules
├── README.md                       # Project documentation
├── PROJECT_OVERVIEW.md             # This overview file
├── public/                         # Static assets
│   ├── vite.svg
│   └── assets/                     # Images (1.jpg, 2.jpg)
├── src/                            # Source code
│   ├── main.jsx                    # Application entry point
│   ├── App.jsx                     # Root component with routing (339 lines)
│   ├── App.css                     # Global styles
│   ├── index.css                   # Base styles
│   ├── assets/                     # Application assets
│   │   ├── logo.png
│   │   └── react.svg
│   ├── components/                 # Reusable UI components
│   │   ├── ArticlePage.jsx         # Article display component
│   │   ├── BlogCard.jsx            # Blog post cards
│   │   ├── FilterDropdown.jsx      # Article filtering
│   │   ├── ResearchCard.jsx        # Research article cards (enhanced with watermarks)
│   │   ├── ResearchEnhancements.jsx
│   │   ├── ScrollToTop.jsx         # Navigation utility
│   │   ├── Sidebar.jsx             # Dashboard sidebar
│   │   ├── TopNavbar.jsx           # Main navigation (165 lines)
│   │   └── WatermarkInfo.jsx       # ✨ NEW: User education component
│   ├── data/                       # Static data stores
│   │   ├── articles.js             # Article data (10,255 lines) - ✨ Enhanced with serial numbers
│   │   ├── blogs.js                # Blog posts
│   │   ├── editions.js             # Journal editions - ✨ Enhanced with release dates
│   │   ├── staticUsers.js          # User accounts for simulation
│   │   └── users.js                # User data
│   ├── hooks/                      # Custom React hooks
│   │   ├── useArticles.js          # Article state management (41 lines)
│   │   └── useEditions.js          # Edition management
│   ├── layouts/                    # Layout components
│   │   └── DashboardLayout.jsx     # Dashboard layout wrapper
│   ├── pages/                      # Page components
│   │   ├── [Core Pages]            # 17 main pages - ✨ Enhanced with watermark features
│   │   ├── WatermarkTest.jsx       # ✨ NEW: Comprehensive testing interface
│   │   ├── admin/                  # Admin-specific pages
│   │   ├── author/                 # Author workflow pages
│   │   ├── dashboards/             # Role-based dashboards (5 roles)
│   │   ├── editions/               # Individual article pages (82 files!)
│   │   ├── editor/                 # Editorial workflow pages
│   │   ├── issues/                 # Issue management
│   │   ├── reader/                 # Reader interface
│   │   └── reviewer/               # Reviewer workflow pages
│   └── utils/                      # Utility functions
│       ├── pdfExport.js            # PDF generation utilities - ✨ Enhanced with watermarks
│       ├── pdfWatermark.js         # ✨ NEW: Dynamic watermark system (275 lines)
│       ├── dataMapping.js          # ✨ NEW: Data relationship utilities (121 lines)
│       └── watermarkValidation.js  # ✨ NEW: Comprehensive validation system (347 lines)
├── index.html                      # HTML entry point
├── package.json                    # Dependencies & scripts
├── package-lock.json               # Package lock file
├── vite.config.js                  # Vite configuration
├── eslint.config.js                # ESLint configuration
├── vercel.json                     # Vercel deployment config
├── DYNAMIC_PLAN.md                 # ✨ NEW: Implementation documentation
└── test-watermarks.js              # ✨ NEW: Testing script for watermark system
```

## Application Architecture

### Data Management
- **No Backend**: Entirely frontend-based with static data
- **State Management**: React hooks (useState) with custom hooks
- **Data Storage**: Static JavaScript arrays in `/src/data/`
- **Persistence**: Local state only (resets on refresh)

### Data Structures
```javascript
// Article Structure (Enhanced with watermarking)
{
  id, issue, volume, title, author, authorAbbrev, abstract, 
  keywords, status, intro, content, conclusion, references,
  assignedReviewers, feedback,
  serialNumber  // ✨ NEW: Unique sequential identifier (1-39)
}

// User Structure  
{
  id, name, role, email, password
}

// Edition Structure (Enhanced with dates)
{
  id, title, releaseDate, articles, published,  // ✨ releaseDate: Publication dates (Feb-Aug 2025)
  volume, issue  // ✨ NEW: Added volume and issue identifiers
}
```

### User Roles & Authentication
- **No Real Authentication**: Simulated login with static credentials
- **5 User Roles**:
  - `admin` - Super Admin (admin@email.com / admin@1234)
  - `editor` - Editor (editor@email.com / editor@123)
  - `reviewer` - Reviewer (reviewer@email.com / reviewer@123)
  - `author` - Author (author@email.com / author@123)
  - `reader` - Reader (reader@email.com / reader@123)

## Key Features & Workflows

### Article Lifecycle Management
1. **Submission** (`/submit-article`) - Authors submit articles
2. **Editorial Review** (`/editor`) - Editors approve/reject submissions
3. **Reviewer Assignment** (`/editor/assign-reviewers`) - Assign reviewers
4. **Peer Review** (`/reviewer`) - Reviewers provide feedback
5. **Author Revision** (`/author/revise`) - Authors revise based on feedback
6. **Publication** (`/editor/publish`) - Final publication to editions

### Role-Based Dashboards
- **Admin Dashboard** (`/admin`) - User management, system overview
- **Editor Dashboard** (`/editor`) - Editorial workflow, article management
- **Reviewer Dashboard** (`/reviewer`) - Review assignments
- **Author Dashboard** (`/author`) - Article submissions, revisions
- **Reader Dashboard** (`/reader`) - Published content access

### Public Pages
- **Landing Page** (`/`) - Homepage with navigation
- **Research Articles** (`/research`) - Published research
- **Journal Editions** (`/editions`) - All published editions
- **Blog** (`/blog`) - Academic blog posts
- **Static Content**: Ethics, Plagiarism Policy, Editorial Board, Contact Info

## Article Content Management

### Individual Article Pages
- **82 Individual Article Components** in `/pages/editions/`
- Each article has its own route and dedicated component
- Articles are comprehensive academic papers with:
  - Abstract, Introduction, Content sections
  - Conclusions, References, Keywords
  - PDF export functionality

### Content Scale
- **10,255+ lines** of article content in `articles.js`
- Covers topics in Law, Diplomacy, Technology, Public Policy
- Real academic research with proper citations and structure

## Technical Features

### 🔖 Dynamic PDF Watermarking System (NEW)
- **Automatic Watermarks** - Every PDF download includes dynamic watermarks
- **Three-Component System**:
  - 📍 **Serial Number** (top-left): "Serial X" - Unique article identifier
  - 📊 **Issue/Volume Info** (top-right): "Issue X: Volume Y" - Publication categorization
  - 📅 **Publication Date** (below issue): "Published: [Date]" - Temporal reference
- **Data Integration** - Watermarks generated from article and edition metadata
- **User Education** - Built-in help system explaining watermark benefits
- **Comprehensive Testing** - Validation suite for data integrity and system reliability

### PDF Generation
- **jsPDF Integration** - Generate PDFs from articles with enhanced watermarking
- **Batch Download** - Download multiple articles with individual watermarks
- **Formatted Output** - Professional academic formatting with metadata headers
- **Performance Optimized** - Efficient watermark rendering with minimal performance impact

### UI/UX
- **Responsive Design** - Mobile, tablet, desktop support
- **Clean Academic Styling** - Professional journal appearance
- **Accessibility** - Proper semantic markup
- **Animations** - Framer Motion for smooth interactions

### Development Setup
```bash
# Installation
npm install

# Development
npm run dev        # Start development server

# Production
npm run build      # Build for production
npm run preview    # Preview production build

# Code Quality
npm run lint       # Run ESLint
```

## Deployment Configuration

### Vercel Setup
- **SPA Configuration**: All routes redirect to index.html
- **Static Site**: No server-side rendering required
- **Build Output**: Optimized production build via Vite

### Environment
- **Development**: Vite dev server with HMR
- **Production**: Static files served via CDN
- **No Environment Variables**: Fully static application

## Git Repository Status
- **Current Branch**: `main`
- **Remote Origin**: `https://github.com/payal1612/JMS_IISPPR.git`
- **Untracked Files**: `.github/` directory (contains instructions)
- **Clean Working Directory**: No uncommitted changes

## File Statistics
- **Total JS/JSX Files**: 102 (↑5 new files)
- **Largest File**: `articles.js` (10,255 lines)
- **Component Count**: 85+ React components (↑5 new components)
- **Page Components**: 105+ individual pages (↑5 new pages)
- **New Utility Files**: 4 (watermarking, validation, testing)
- **Enhanced Files**: 7 (core PDF and UI components)

## Development Notes

### Current Limitations
1. **No Persistence**: Data resets on page refresh
2. **No Real Authentication**: Static login credentials
3. **No Backend Integration**: Ready for API integration
4. **Local State Only**: No global state management

### Extension Opportunities
1. **Backend Integration**: Connect to real API
2. **Database**: Persistent data storage
3. **Real Authentication**: JWT/OAuth implementation
4. **File Upload**: Real PDF/document upload
5. **Email Notifications**: Editorial workflow notifications
6. **Search Functionality**: Full-text article search

### Code Quality
- **ESLint Configuration**: Modern React best practices
- **Component Structure**: Well-organized, reusable components
- **Routing**: Comprehensive route structure
- **Styling**: Consistent Tailwind CSS usage

## Collaboration Guidelines

### For AI Agents & Developers
1. **Review this overview** before making changes
2. **Understand the role-based structure** - different user types have different interfaces
3. **Respect the academic context** - maintain professional, scholarly tone
4. **Test across all user roles** - ensure changes work for all 5 user types
5. **Maintain data structure consistency** - follow established patterns in `/data/`
6. **Consider the frontend-only nature** - no server-side dependencies

### Key Files to Understand
- `README.md` - Main project documentation and quick start guide
- `DYNAMIC_PLAN.md` - ✨ NEW: Complete watermarking implementation documentation
- `App.jsx` - Central routing and component imports
- `data/articles.js` - Core content data (enhanced with serial numbers)
- `data/editions.js` - ✨ Enhanced with publication dates
- `utils/pdfWatermark.js` - ✨ NEW: Core watermarking functionality
- `utils/watermarkValidation.js` - ✨ NEW: Testing and validation system
- `components/WatermarkInfo.jsx` - ✨ NEW: User education component
- `pages/WatermarkTest.jsx` - ✨ NEW: Comprehensive testing interface
- `hooks/useArticles.js` - State management patterns
- `components/TopNavbar.jsx` - Navigation structure
- `layouts/DashboardLayout.jsx` - Role-based layout system

This project represents a sophisticated simulation of an academic journal management system, ready for backend integration while providing a complete frontend experience for all stakeholders in the academic publishing process.

---

## 🔖 Recent Major Feature: Dynamic PDF Watermarking (August 17, 2025)

### Implementation Overview
A comprehensive **Dynamic PDF Watermarking System** has been successfully implemented to enhance academic integrity and document authenticity for all PDF downloads.

### What Was Added
- **✅ Enhanced Data Structure**: All 40 articles now have unique serial numbers (1-39) and 4 journal issues have publication dates (Feb-Aug 2025)
- **✅ Core Watermarking System**: Modular watermark utilities with dynamic metadata integration
- **✅ UI/UX Improvements**: Watermark indicators, enhanced loading states, user education components
- **✅ Comprehensive Testing**: Validation utilities and testing interface for quality assurance
- **✅ Production-Ready Documentation**: Complete implementation guide and user documentation

### Technical Benefits
- **Document Security**: Prevents forgery and misattribution of academic papers
- **Version Control**: Easy identification of article versions and publication tracking
- **Academic Standards**: Maintains professional journal publishing integrity
- **User Experience**: Clear indicators and help system for watermark functionality

### Files Added/Modified
**New Files (5):**
- `src/utils/pdfWatermark.js` - Core watermarking functionality
- `src/utils/dataMapping.js` - Data relationship utilities
- `src/utils/watermarkValidation.js` - Testing and validation system
- `src/components/WatermarkInfo.jsx` - User education component
- `src/pages/WatermarkTest.jsx` - Comprehensive testing interface

**Enhanced Files (7):**
- `src/data/editions.js` - Added release dates
- `src/data/articles.js` - Added serial numbers
- `src/utils/pdfExport.js` - Integrated watermarks
- `src/components/ResearchCard.jsx` - Enhanced download feedback
- `src/pages/EditionsPage.jsx` - Improved batch downloads
- `src/pages/ResearchPage.jsx` - Added watermark information
- `src/App.jsx` - Added test route

### For Contributors
- Review `DYNAMIC_PLAN.md` for complete implementation details
- Test watermark functionality at `/watermark-test` route (development only)
- All PDF downloads now include professional watermarks automatically
- System is production-ready with comprehensive validation and error handling
