import React from "react";
import { Helmet } from "react-helmet-async";

export default function FirstVegan() {
  return (
    <>
      <Helmet>
        <title>The First Vegan — Abū al-ʿAlāʾ al-Maʿarrī | Plants Over Pain</title>
        <meta
          name="description"
          content="An exploration of Abū al-ʿAlāʾ al-Maʿarrī: his life, philosophy, and why many consider him the first recorded ethical vegan."
        />
        <link rel="canonical" href="https://plantsoverpain.org/first-vegan" />
        <meta
          property="og:title"
          content="The First Vegan — Abū al-ʿAlāʾ al-Maʿarrī"
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="px-4 pt-10 pb-20 text-[#3a3a3a]">
        <section className="max-w-4xl mx-auto text-center p-6 border border-gray-200 rounded-2xl shadow-sm bg-[#f9f9f7] mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#265947]">
            The First Vegan? Abū al-ʿAlāʾ al-Maʿarrī
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Early Life, Philosophy, and the Question of the First Vegan
          </p>
        </section>

        <article className="max-w-3xl mx-auto prose prose-emerald prose-lg">
          <figure className="max-w-2xl mx-auto mb-10">
            <img
              src="/images/al-maarri-gibran.png"
              alt="Portrait of Abū al-ʿAlāʾ al-Maʿarrī (973–1057) by Kahlil Gibran"
              className="w-full rounded-2xl shadow-md"
            />
            <figcaption className="mt-2 text-sm text-gray-600">
              Portrait of Abū al-ʿAlāʾ al-Maʿarrī (973–1057) by Kahlil Gibran. A
              blind Syrian poet and philosopher known for his radical skepticism
              and ascetic lifestyle.
            </figcaption>
          </figure>

          <h2 className="text-2xl font-bold text-[#265947] mt-10 mb-4">
            Abū al-ʿAlāʾ al-Maʿarrī: The Blind Poet Who Saw Too Much
          </h2>
          <p>Abū al-ʿAlāʾ al-Maʿarrī was an Arab poet and thinker of the 11th century. He was born in December 973 in Maʿarrat al-Nuʿmān, in Syria, near Aleppo. As a child he contracted smallpox which left him blind by the age of four. Later in life he described himself as “a double prisoner” — confined both by his blindness and by a sense of isolation.
          </p> <br />
          <p>
            Despite this, al-Maʿarrī became one of the most celebrated poets of his time. As a young man he traveled around the Middle East studying widely and taking in the vibrant scholarship of the Islamic Golden Age. His writings — including The Tinder Spark (Saqṭ al-Zand), Unnecessary Necessity (Luzūmiyyāt), and The Epistle of Forgiveness (Risālat al-Ghufrān) — reflect his vast learning and unconventional ideas.
          </p>
          <br />
          <p>In Baghdad’s literary circles he won fame and recognition, but around 1010 he chose to return to his hometown. There he lived quietly, by way of a small inheritance, and remained single. He dictated his works to students who came from near and far to learn from him.</p>
          <br />
          <p>He died in 1057 in the town where he was born. He was remembered by his contemporaries as one of the true geniuses of Arabic literature.</p>
        

          <h2 className="text-2xl font-bold text-[#265947] mt-10 mb-4">
            A Skeptic in an Age of Certainty
          </h2>
          <p>
            Al-Maʿarrī’s worldview was unusually skeptical and focused on human reason for his time. He criticized organized religion of every kind, mocking the teachings of Islam, Christianity, Judaism, and others as inventions of people rather than divine truth. This was of course dangerous at the time. Some Orthodox believers regarded him as a heretic.
          </p>
          <br />
          <p> His dark-ish outlook also led him to embrace antinatalism, the belief that it is better never to be born. He expressed this most clearly in the epitaph he wrote for himself: “This is my father’s crime against me, which I myself committed against none.” By this he meant that having a child condemns the child to the sufferings of life (which they did not choose). This burden he chose not to pass on. 
          </p>
          <br />
          
          <p>
True to his principles, al-Maʿarrī lived simply. He embraced poverty and celibacy. After returning to his hometown, he withdrew into his house, refused to sell his poetry, and lived on modest donations. He shunned wealth and comfort, did not drink wine, and even expressed a preference for cremation instead of burial. Again, openly rejecting his society's customs. These practices showed both his disdain for social conventions and his commitment to living with intellectual and moral consistency.          </p>
          <br />
<p>In his later years, despite his austere lifestyle, he became both wealthy and highly respected. Students came from across the Islamic world, even as far as India, to study language and poetry with the blind master.</p>

          

          <h2 className="text-2xl font-bold text-[#265947] mt-10 mb-4">
            A Medieval Vegan
          </h2>
          <p>
            Perhaps the most striking aspect of al-Maʿarrī’s philosophy, at
            least to modern readers, was his ethical diet. He believed that “no
            living creature should be harmed.” That conviction led him not only
            to reject meat but also milk, eggs, honey, and clothing made from
            animals. In effect, he lived as a vegan centuries before the word
            existed. Such choices were certainly unusual but yet they reflected his belief in the sanctity of all life.
          </p>
          <br />
          <p>Al-Maʿarrī expressed these views most powerfully in his poetry. In a well-known piece often called “I No Longer Steal from Nature,” he pleaded with humanity to reject animal exploitation:</p>


          <figure className="my-8">
            <blockquote className="border-l-4 border-emerald-700 pl-4 italic">
              <p className="whitespace-pre-line">{`Do not unjustly eat what the water has given up,
and do not desire as food the flesh of slaughtered animals,

Or the white milk of mothers who intended its pure draught
for their young, not for noble ladies.

And do not grieve the unsuspecting birds by taking their eggs;
for injustice is the worst of crimes.

And spare the honey which the bees get industriously
from the flowers of fragrant plants;

For they did not store it that it might belong to others,
nor did they gather it for bounty and gifts.

I washed my hands of all this;
and would that I had perceived my way before my hair went gray!`}</p>
            </blockquote>
            <figcaption className="mt-2 text-sm text-gray-600">
              — Abū al-ʿAlāʾ al-Maʿarrī,{" "}
              <i>translated by Reynold A. Nicholson</i> (1921)
            </figcaption>
          </figure>

          <p>
            This was not a health fad or a ritual discipline—it was a moral
            stance. Milk, he argued, belonged to calves, not humans. Eggs
            belonged to birds, not our kitchens. Honey belonged to bees, not our
            jars. For al-Maʿarrī, the human use of animals was an injustice. By
            his thirties he was eating only plants, making him one of the
            earliest clear examples of someone living as an ethical vegan.
          </p>

          <h2 className="text-2xl font-bold text-[#265947] mt-10 mb-4">
            Was He the First?
          </h2>
          <p>
            Al-Maʿarrī’s instincts did not arise in a vacuum. Many traditions across the
            world promoted compassion for animals. In India, the Jain
            principle of <i>ahimsa</i>—nonviolence toward all beings— guided
            ethics for centuries. Jain monks and nuns practiced strict
            vegetarianism, often carrying brushes to sweep insects from their
            path. Some Buddhist and Hindu texts questioned the morality of milk
            and honey, seeing them as stolen from animals. In China, some
            Mahayana Buddhist sects refused to eat animal flesh or even drink
            water which could contain tiny organisms.
          </p>
          <br />
          <p>
            In the West, Pythagoras of Samos and his followers abstained from
            meat as early as the 6th century BCE, believing in the transmigration
            of souls. Their “Pythagorean diet” became synonymous with
            vegetarianism for centuries. Later philosophers such as Plutarch and
            Porphyry wrote essays condemning the killing of animals for food.
            Porphyry even questioned the use of milk, wool, and honey, arguing
            that these were taken unjustly from creatures without consent.  Just like modern vegans do.
          </p>
          <br />
          <p>
            Early Christianity also took part. The Ebionites, a
            Jewish-Christian sect, avoided meat and wine. The Manichaean Elect
            lived on fruits, grains, and vegetables, abstaining from meat, dairy,
            and honey altogether. Religious fasting (Christian Orthodox) forbade not only meat but also eggs and dairy, leading to fully plant-based diets during Lent.
          </p>
          <br />
          <p>
            These precedents matter. They show that concern for animals and
            abstention from animal products have deep roots. But while others practiced
            partial abstinence or did so for ritual purity, he articulated a
            clear, personal philosophy of justice for animals—and lived it, every day.
          </p>

          <h2 className="text-2xl font-bold text-[#265947] mt-10 mb-4">
            The First Moral Vegan?
          </h2>
          <p>
            If we define real veganism as the deliberate rejection of all
            animal-derived products on ethical grounds, (for the sake of the animals essentially) al-Maʿarrī stands out as
            the first recorded individual to meet that definition. He lived
            nearly a thousand years before the Vegan Society, yet his poetry
            makes the moral logic unmistakable. Others, from Pythagoras to Jain
            sages, came close. But none left such direct testimony tying diet to
            compassion for animals.
          </p>
          <br />
          <p>
            That makes al-Maʿarrī not merely a curiosity in the history of
            ideas, but a genuine forerunner of modern veganism. His stance was
            not about ritual, health, or purity—it was about justice. And that
            clarity sets him apart.
          </p>

          <h2 className="text-2xl font-bold text-[#265947] mt-10 mb-4">
            A Poet Ahead of His Time
          </h2>
          <p>
            Al-Maʿarrī was a blind poet who saw further than most. He rejected
            wealth, and lived simply and entirely on plants. In a society that branded him a heretic, he stood firm. A
            thousand years later, his words still sting: humanity’s power over
            animals is not a right, but an injustice.
          </p>
          <br />
          <p>
            We raise our voices in respect for your compassion and courage.
          </p>
          <br />
          <br />

          {/* Sources remain untouched */}
          <h3 className="mt-6 text-xl font-semibold">Sources</h3>
          <ul className="space-y-2">
            <li>
              Hitti, Philip K., <i>Islam: A Way of Life</i>. (1971).
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Al-Ma%27arri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                Wikipedia — Abū al-ʿAlāʾ al-Maʿarrī
              </a>
            </li>
            <li>
              <a
                href="https://poets.org/poet/al-maarri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                Academy of American Poets — Abū al-ʿAlāʾ al-Maʿarrī
              </a>
            </li>
            <li>
              <a
                href="https://www.alimentarium.org/en/story/brief-history-non-meat-eaters"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                Alimentarium — A Brief History of Non-Meat Eaters
              </a>
            </li>
            <li>
              <a
                href="https://www.tertullian.org/fathers/porphyry_abstinence_01_book1.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                Porphyry — On Abstinence from Animal Food (Book I, Tertullian.org)
              </a>
            </li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold">Other Commentary</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://antagonist.co/the-work-of-blind-arabian-poet-al-maarri-is-proof-that-veganism-is-over-1000-years-old"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                Antagonist.co — The work of al-Maʿarrī as early vegan proof
              </a>
            </li>
            <li>
              <a
                href="https://noblechatter.com/what-rituals-practices-and-daily-disciplines-did-manichaeans-observe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                Noblechatter — Manichaean rituals and disciplines
              </a>
            </li>
            <li>
              <a
                href="https://whattoserveagoddess.com/the-vegetarian-theme-in-christian-tradition"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                What to Serve a Goddess? — The vegetarian theme in Christian
                tradition
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/sant-mat-meditation-and-spirituality/uncovering-a-vegetarian-jesus-at-the-beginning-of-christianity-9279741be7c4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                Medium — Uncovering a vegetarian Jesus at the beginning of
                Christianity
              </a>
            </li>
            <li>
              <a
                href="https://www.deccanherald.com/features/choice-yours-2031190"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                Deccan Herald — Choice Yours (opinion piece)
              </a>
            </li>
          </ul>
        </article>
      </div>
    </>
  );
}
