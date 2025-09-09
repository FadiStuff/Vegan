import React from "react";
import { Helmet } from "react-helmet-async";

export default function FirstVegan() {
  return (
    <>
      <Helmet>
        <title>The First Vegan — Abū al-ʿAlāʾ al-Maʿarrī | Plants Over Pain</title>
        <meta name="description" content="Full essay on Abū al-ʿAlāʾ al-Maʿarrī: early life, philosophy, and the case for the first recorded ethical vegan." />
        <link rel="canonical" href="https://plantsoverpain.org/first-vegan" />
        <meta property="og:title" content="The First Vegan — Abū al-ʿAlāʾ al-Maʿarrī" />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="px-4 pt-10 pb-20 text-[#3a3a3a]">
        <section className="max-w-4xl mx-auto text-center p-6 border border-gray-200 rounded-2xl shadow-sm bg-[#f9f9f7] mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#265947]">The First Vegan? Abū al-ʿAlāʾ al-Maʿarrī (973–1057)</h1>
          <p className="mt-3 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            An 11th-century Syrian poet and philosopher who rejected all animal products for ethical reasons — a millennium before the word “vegan” was coined.
          </p>
        </section>

        {/* Figure section */}
        <figure className="max-w-2xl mx-auto mb-10">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/57/Al-Ma%CA%BFarri_by_Khalil_Gibran.png"
            alt="Portrait of Abū al-ʿAlāʾ al-Maʿarrī (973–1057) by Kahlil Gibran"
            className="w-full rounded-2xl shadow-md"
          />
          <figcaption className="mt-2 text-sm text-gray-600">
            Portrait of Abū al-ʿAlāʾ al-ʿMaʿarrī (973–1057) by Kahlil Gibran. Al-Maʿarrī was a blind Syrian poet and philosopher known for his radical skepticism and ascetic lifestyle.
          </figcaption>
        </figure>

        <article className="max-w-3xl mx-auto prose prose-emerald prose-lg">
          <p className="mt-4">
            [Full essay text would go here — this is placeholder until we inject the full text content]
          </p>

          <h2 className="mt-10">Sources & Further Reading</h2>
          <ul className="space-y-2">
            <li>Hitti, Philip K., Islam: A Way of Life. (1971).</li>
            <li>
              <a href="https://www.britannica.com/biography/Abu-al-Ala-al-Maarri" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                Encyclopaedia Britannica — Abū al-ʿAlāʾ al-Maʿarrī
              </a>
            </li>
            <li>
              <a href="https://en.wikipedia.org/wiki/Al-Ma%27arri" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                Wikipedia — Abū al-ʿAlāʾ al-Maʿarrī
              </a>
            </li>
            <li>
              <a href="https://poets.org/poet/abu-al-ala-al-maarri" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                Academy of American Poets — Abū al-ʿAlāʾ al-Maʿarrī
              </a>
            </li>
            <li>
              <a href="https://www.bbc.co.uk/programmes/w3csvx6c" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                BBC — Museum of Lost Objects: The Unacceptable Poet
              </a>
            </li>
            <li>
              <a href="https://www.humanistictexts.org/ma_arri.htm" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                Humanistic Texts — Nicholson translation (1921)
              </a>
            </li>
            <li>
              <a href="https://www.alimentarium.org/en/knowledge/brief-history-non-meat-eaters" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                Alimentarium — A Brief History of Non-Meat Eaters
              </a>
            </li>
            <li>
              <a href="https://plato.stanford.edu/entries/porphyry/#OnAbsAniFoo" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                Stanford Encyclopedia of Philosophy — Porphyry: On Abstinence from Animal Food
              </a>
            </li>
            <li>
              <a href="https://www.gutenberg.org/ebooks/11221" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                Project Gutenberg — Porphyry: On Abstinence from Animal Food
              </a>
            </li>
            <li>
              <a href="https://archive.org/details/porphyryonabstin00porp" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                Internet Archive — Porphyry: On Abstinence from Animal Food
              </a>
            </li>
          </ul>
        </article>
      </div>
    </>
  );
}
