"use client";

import Link from "next/link";
import { Info } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function PrivacyPolicyContent() {
  const { content } = useContent();
  const policy = content.privacyPolicy;
  const renderPolicyText = (text: string) =>
    text
      .replaceAll("{{companyName}}", content.company.name)
      .replaceAll("{{companyEmail}}", content.company.email);

  return (
    <div className="flex flex-col">
      <section className="bg-black text-white py-16 md:py-20 border-b border-black-70 overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="animate-fade-in-down">
              <Badge variant="accent">{policy.badge}</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight animate-fade-in-up [animation-delay:100ms]">
              {policy.title}
            </h1>
            <p className="text-base text-black-20 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
              {policy.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-black">
        <Container size="md">
          <div className="prose dark:prose-invert max-w-none space-y-8 text-black-70 dark:text-black-20">
            <div className="p-4 rounded-xl bg-black-20/10 dark:bg-black-70/10 border border-black-20 dark:border-black-70 text-xs text-black-60 dark:text-black-20 space-y-1">
              <p className="font-semibold text-black dark:text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-brand-purple" />
                {policy.disclaimerTitle}
              </p>
              <p>{policy.disclaimerText}</p>
            </div>

            {policy.sections.map((section, index) => (
              <section key={`${section.heading}-${index}`} className="space-y-3">
                <h2 className="text-xl font-bold text-black dark:text-white">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${section.heading}-paragraph-${paragraphIndex}`}
                    className="text-sm leading-relaxed"
                  >
                    {renderPolicyText(paragraph)}
                  </p>
                ))}
                {section.bulletItems.length > 0 && (
                  <ul className="list-disc pl-5 text-sm space-y-1 text-black-70 dark:text-black-20">
                    {section.bulletItems.map((item, itemIndex) => (
                      <li key={`${section.heading}-bullet-${itemIndex}`}>
                        {renderPolicyText(item)}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="pt-6 border-t border-black-20 dark:border-black-70 flex justify-between items-center text-xs text-black-60 dark:text-black-20">
              <span>Last Updated: {policy.lastUpdated}</span>
              <Link
                href="/"
                className="text-brand-purple dark:text-brand-purple hover:text-brand-purple dark:hover:text-white hover:underline font-medium"
              >
                Return to Homepage &rarr;
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
