# Invoice Generator

A modern, fully responsive web application for creating, managing, and exporting professional invoices. Built with React, TypeScript, and Tailwind CSS for a seamless user experience across all devices.

## Features

- **Invoice Management** - Create, view, edit, and delete invoices with ease
- **Multiple Templates** - Choose between Classic and Modern invoice designs
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **PDF Export** - Download invoices as formatted PDF documents
- **Company Settings** - Customize company name, logo, address, and contact information
- **Local Storage** - Invoices automatically saved to browser storage for offline access
- **Real-time Preview** - See invoice changes instantly before saving
- **Tax Calculation** - Automatic line item totals and invoice tax calculations
- **Invoice Tracking** - Quick access to all invoices with status overview

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **PDF Export**: react-to-print 3.2.0
- **Icons**: Lucide React 0.563.0
- **Development**: ESLint 9.39.1

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Setup Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd invoice-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Usage

### Creating an Invoice
1. Click **"New Invoice"** button on the main page
2. Fill in client details (name, email, address)
3. Add line items with descriptions, quantities, and unit prices
4. Set tax rate if applicable
5. Choose invoice template (Classic or Modern)
6. Preview and save

### Managing Invoices
- **View**: Click the eye icon to see full invoice details
- **Edit**: Click the pencil icon to modify invoice details
- **Delete**: Click the trash icon to remove an invoice
- **Download**: Use the print/download button in preview mode

### Customizing Company Information
1. Click the **Settings** (gear icon) button in the top-right
2. Update company name, logo, address, and contact details
3. Settings automatically save to local storage

## Configuration

### Adjusting Templates
Edit template files in `src/components/` to customize:
- **ClassicTemplate.tsx** - Traditional professional design
- **ModernTemplate.tsx** - Contemporary gradient-based design

### Modifying Tax Rates
Tax rates can be set per invoice in the invoice form. Amounts are calculated automatically.

### Logo Management
Logos are stored in memory and associated with company settings. Upload PNG, JPG, or GIF images.

## Development

### Project Structure
```
src/
├── components/           # React components
│   ├── LandingPage.tsx         # Landing page
│   ├── InvoiceForm.tsx         # Invoice creation/editing form
│   ├── InvoiceList.tsx         # Invoice list view with grid
│   ├── InvoicePreview.tsx      # Invoice preview and templates
│   ├── ClassicTemplate.tsx     # Classic invoice template
│   ├── ModernTemplate.tsx      # Modern invoice template
│   ├── CompanySettingsModal.tsx # Company settings dialog
│   └── LineItemRow.tsx         # Individual line item editor
├── types/               # TypeScript type definitions
│   ├── invoice.ts            # Invoice and LineItem types
│   └── company.ts            # CompanySettings type
├── utils/              # Utility functions
│   ├── storage.ts            # localStorage management
│   ├── company.ts            # Company settings utilities
│   ├── calculations.ts       # Tax and total calculations
│   └── dates.ts              # Date formatting utilities
├── App.tsx             # Main app component
├── App.css             # Global styles
├── main.tsx            # React entry point
└── index.css           # Tailwind CSS imports
```

### Available Scripts

- `npm run dev` - Start development server with hot module reload
- `npm run build` - Build for production with TypeScript compilation
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

### Code Style
- Use ES6+ syntax and async/await
- Leverage TypeScript strict mode for type safety
- Use functional components with React hooks
- Follow ESLint configuration for code consistency

## Testing

The application can be tested through:
- **Manual Testing**: Navigate through the UI and verify all features work
- **Responsive Testing**: Use browser DevTools to test different screen sizes
- **Storage Testing**: Open DevTools → Application → Local Storage to verify saved data
- **PDF Export**: Test in different browsers (Chrome, Firefox, Safari)

## Known Limitations

- Local storage limited to ~5-10MB per domain (typically supports 50-100 invoices)
- Logos stored in memory only (refreshing page reloads company settings)
- No cloud sync between devices
- Single-user application (no multi-user support)

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Review Process
- All PRs require at least one approval
- Tests and linting must pass
- Keep commits clean and descriptive

## Future Enhancements

- Cloud storage integration (Firebase, AWS)
- Templates gallery with more designs
- Multi-currency support
- Automatic invoice numbering with sequences
- Recurring invoice scheduling
- Payment status tracking
- Email invoice delivery
- Dark mode theme

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or feedback:
- Open an issue on GitHub
- Check existing documentation in this README

---

**Jhay4Julian**
