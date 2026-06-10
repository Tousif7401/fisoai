"use client";

import { WordsPullUpMultiStyle, AnimatedLetter } from './animations';

export function About() {
  const headingSegments = [
    { text: 'Built by developers,', className: 'font-normal' },
    { text: 'for developers.', className: 'italic font-serif bg-amber-400/30' },
    { text: 'Calmify understands the builder mindset because we live it every day.', className: 'font-normal' },
  ];

  const bodyText = "I created Calmify after experiencing burnout, imposter syndrome, and the isolation that comes with building things. I needed someone who understood the pressure of shipping, the fear of not being good enough, and the weight of expectations. Calmify is that companion — free, judgment-free, and always here for you.";

  const chars = bodyText.split('');
  const totalChars = chars.length;

  return (
    <section className="bg-black py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] p-8 md:p-16 text-center">
          {/* Label */}
          <p className="text-[50px] sm:text-[52px] mb-8 md:mb-12" style={{ color: '#DEDBC8' }}>
            Why <em className="italic font-serif">Calmify</em>
          </p>

          {/* Main Heading */}
          <WordsPullUpMultiStyle
            segments={headingSegments}
            containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]"
          />

          {/* Body Paragraph with Character Animation */}
          <p className="mt-8 md:mt-12 text-[17px] sm:text-[18px] md:text-[16px] max-w-3xl mx-auto leading-relaxed" style={{ color: '#DEDBC8' }}>
            {chars.map((char, index) => (
              <AnimatedLetter
                key={index}
                char={char}
                index={index}
                totalChars={totalChars}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
