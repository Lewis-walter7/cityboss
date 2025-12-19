import React from 'react';

export default function TermsPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-[var(--color-background)]">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="heading-1 mb-8 text-white">Terms of <span className="text-[var(--color-accent)]">Service</span></h1>

                <div className="prose prose-invert prose-zinc max-w-none space-y-8 text-zinc-400">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                        <p className="leading-relaxed">
                            By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
                        <p className="leading-relaxed">
                            Permission is granted to temporarily download one copy of the materials (information or software) on City Boss Estates&apos; website for personal, non-commercial transitory viewing only.
                        </p>
                        <p className="mt-4">This license shall automatically terminate if you violate any of these restrictions and may be terminated by City Boss Estates at any time.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
                        <p className="leading-relaxed">
                            The materials on City Boss Estates&apos; website are provided on an &apos;as is&apos; basis. City Boss Estates makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
                        <p className="leading-relaxed">
                            In no event shall City Boss Estates or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on City Boss Estates&apos; website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law</h2>
                        <p className="leading-relaxed">
                            These terms and conditions are governed by and construed in accordance with the laws of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
