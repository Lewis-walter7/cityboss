import React from 'react';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-[var(--color-background)]">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="heading-1 mb-8 text-white">Privacy <span className="text-[var(--color-accent)]">Policy</span></h1>

                <div className="prose prose-invert prose-zinc max-w-none space-y-8 text-zinc-400">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p className="leading-relaxed">
                            At City Boss Estates, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. The Data We Collect</h2>
                        <p className="leading-relaxed">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Identity Data: includes first name, last name, username or similar identifier.</li>
                            <li>Contact Data: includes email address and telephone numbers.</li>
                            <li>Technical Data: includes internet protocol (IP) address, your login data, browser type and version.</li>
                            <li>Usage Data: includes information about how you use our website, products and services.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
                        <p className="leading-relaxed">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal obligation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                        <p className="leading-relaxed">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
                        <p className="leading-relaxed">
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: <span className="text-[var(--color-accent)]">privacy@cityboss.estate</span>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
