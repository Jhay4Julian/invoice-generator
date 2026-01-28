import { FileText, Download, Settings, Smartphone, Palette, Lock, Github, Linkedin, Mail, Twitter } from 'lucide-react';

interface LandingPageProps {
    handleGetStarted: () => void;
}

export const features = [
    {
        icon: FileText,
        title: "Easy Creation",
        description:
            "Create invoices with a simple, intuitive form. Add clients, items, and taxes in seconds.",
        color: "text-blue-600",
    },
    {
        icon: Palette,
        title: "Multiple Templates",
        description:
            "Choose between professional Classic and modern gradient designs for your invoices.",
        color: "text-purple-600",
    },
    {
        icon: Download,
        title: "PDF Download",
        description:
            "Download invoices as PDF files ready to send to your clients or print.",
        color: "text-green-600",
    },
    {
        icon: Smartphone,
        title: "Mobile Friendly",
        description:
            "Fully responsive design works seamlessly on desktop, tablet, and mobile devices.",
        color: "text-orange-600",
    },
    {
        icon: Lock,
        title: "Local Storage",
        description:
            "Your invoices are saved locally in your browser. No cloud, no servers, complete privacy.",
        color: "text-red-600",
    },
    {
        icon: Settings,
        title: "Company Settings",
        description:
            "Add your company logo, details, and branding to all your invoices automatically.",
        color: "text-indigo-600",
    },
];

export default function LandingPage({ handleGetStarted: handleGetStarted }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                            <span className="text-lg sm:text-xl font-bold text-gray-900">Invoice Generator</span>
                        </div>
                        <button
                            onClick={handleGetStarted}
                            className="hidden sm:block px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base cursor-pointer"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-24 sm:pt-32 pb-16 sm:pb-15 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                        {/* Left Content */}
                        <div className="">
                            <div className="space-y-3 sm:space-y-6 text-center">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Create Professional Invoices<br />
                                    <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        in Seconds
                                    </span>
                                </h1>

                                <p className="text-lg sm:text-xl text-gray-600">
                                    Create, manage, and download invoices effortlessly. Fast, simple, and completely free.
                                </p>

                                <button
                                    onClick={handleGetStarted}
                                    className="px-5 py-3 sm:px-10 sm:py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-lg mb-4 cursor-pointer"
                                >
                                    Start Creating Invoices
                                </button>
                                <p className="text-sm text-gray-500">No sign-up required • Works entirely in your browser • 100% free</p>
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className="hidden lg:block bg-white rounded-3xl shadow-2xl p-12 mb-20 border border-gray-200">
                            <div className="bg-linear-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-dashed border-gray-300">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <div className="w-16 h-16 bg-blue-600 rounded-xl mb-3"></div>
                                        <p className="text-sm text-gray-500">Your Company Name</p>
                                    </div>
                                    <div className="text-right">
                                        <h2 className="text-4xl font-bold text-gray-800">INVOICE</h2>
                                        <p className="text-gray-500">#INV-001</p>
                                    </div>
                                </div>

                                <div className="space-y-3 bg-white/50 rounded-xl p-6">
                                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <div className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                                        <p className="text-sm opacity-90">Total Amount</p>
                                        <p className="text-2xl font-bold">$1,234.56</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-8 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Powerful Features
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to create professional invoices and manage your billing
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-6 sm:p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
                                >
                                    <Icon className={`w-10 h-10 sm:w-12 sm:h-12 mb-4 ${feature.color}`} />
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Get started in just three simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4 sm:mb-6">
                                <span className="text-2xl sm:text-3xl font-bold text-blue-600">1</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center">Set Up Your Company</h3>
                            <p className="text-sm sm:text-base text-gray-600 text-center">
                                Add your company logo, name, and contact information in settings.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4 sm:mb-6">
                                <span className="text-2xl sm:text-3xl font-bold text-purple-600">2</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center">Create Your Invoice</h3>
                            <p className="text-sm sm:text-base text-gray-600 text-center">
                                Fill in client details, add line items, and set taxes automatically.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 sm:mb-6">
                                <span className="text-2xl sm:text-3xl font-bold text-green-600">3</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center">Download & Send</h3>
                            <p className="text-sm sm:text-base text-gray-600 text-center">
                                Download as PDF and send to clients or print directly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                        Ready to Create Professional Invoices?
                    </h2>
                    <p className="text-base sm:text-lg text-blue-100 mb-8">
                        Start creating invoices in seconds. No sign-up, no payment required.
                    </p>
                    <button
                        onClick={handleGetStarted}
                        className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-bold text-base sm:text-lg cursor-pointer shadow-lg hover:shadow-xl"
                    >
                        Get Started Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-10">

                        <div className='max-w-sm'>
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="w-5 h-5 text-blue-400" />
                                <span className="font-bold text-white">Invoice Generator</span>
                            </div>
                            <p className="text-sm leading-relaxed">
                                Create professional invoices for free, right in your browser.
                                Built for freelancers and small businesses.
                            </p>
                        </div>

                        <div className='text-center md:text-right'>
                            <h3 className="text-white font-semibold mb-4">Connect</h3>
                            <div className="flex justify-center md:justify-end items-center gap-4">
                                <a
                                    href="https://github.com/jhay4julian"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white hover:scale-110 transition transform"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-5 h-5" />
                                </a>

                                <a
                                    href="https://linkedin.com/in/julian-koripamo-a4013b11b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white hover:scale-110 transition transform"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>

                                <a
                                    href="https://x.com/jhay4julian"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white hover:scale-110 transition transform"
                                    aria-label="Twitter (X)"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>

                                <a
                                    href="mailto:jkoripamo@gmail.com"
                                    className="hover:text-white hover:scale-110 transition transform"
                                    aria-label="Email"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6 text-center text-sm">
                        <p>
                            © {new Date().getFullYear()} Invoice Generator · Built by Julian Koripamo
                        </p>
                    </div>

                </div>
            </footer>

        </div>
    );
}

