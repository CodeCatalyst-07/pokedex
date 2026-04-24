import { Link } from 'react-router-dom';

const TIPS = [
  {
    id: 'capture',
    icon: '🎯',
    title: 'Capture Mechanics',
    subtitle: 'Master the art of catching',
    sections: [
      {
        heading: 'Poké Ball Types',
        body: 'Different balls have different catch rates. The Ultra Ball has a 2× modifier, the Great Ball 1.5×, and the Master Ball guarantees capture. Use the right ball for the right situation.',
      },
      {
        heading: 'Status Condition Advantages',
        body: 'Inflicting Sleep or Freeze doubles the catch rate multiplier. Paralysis and Burn also help. Never use conditions that cause fainting — you\'ll lose the Pokémon.',
      },
      {
        heading: 'HP Threshold',
        body: 'Catch rate increases as HP decreases. Aim for the red HP zone for the highest success chance before throwing.',
      },
    ],
  },
  {
    id: 'evolution',
    icon: '🌿',
    title: 'Evolutionary Mastery',
    subtitle: 'Unlock every stage',
    sections: [
      {
        heading: 'Level-Up Evolution',
        body: 'Most Pokémon evolve at specific levels. Charmander → Charmeleon at 16, Charmeleon → Charizard at 36. Keep battling to level up.',
      },
      {
        heading: 'Stone Evolution',
        body: 'Fire Stone, Water Stone, Thunder Stone, Moon Stone, Leaf Stone — each triggers specific evolutions. Pikachu → Raichu uses a Thunder Stone.',
      },
      {
        heading: 'Friendship Evolution',
        body: 'Certain Pokémon evolve when their friendship reaches 220+. Walk with them, avoid fainting, and give them vitamins to build the bond faster.',
      },
    ],
  },
  {
    id: 'battle',
    icon: '⚔️',
    title: 'Battle Ready',
    subtitle: 'Advanced combat mechanics',
    sections: [
      {
        heading: 'Type Matchups',
        body: 'Super-effective moves deal 2× damage. Understand the 18-type chart to exploit weaknesses. Water beats Fire, Electric beats Water, etc.',
      },
      {
        heading: 'STAB Bonus',
        body: 'Same-Type Attack Bonus gives a 1.5× damage multiplier when a Pokémon uses a move matching one of its own types.',
      },
      {
        heading: 'Speed Tiers',
        body: 'Higher Speed stat means you attack first. Speed ties are broken randomly. Use Paralysis to halve the opponent\'s speed.',
      },
    ],
  },
  {
    id: 'community',
    icon: '🌍',
    title: 'Community Hub',
    subtitle: 'Connect with trainers worldwide',
    sections: [
      {
        heading: 'Monthly Challenges',
        body: 'Every month, the community runs themed challenges — type-only runs, speed-runs, and themed collections. Join to earn badges.',
      },
      {
        heading: 'Collection Milestones',
        body: 'Share your Dex completion progress and get community-awarded titles. 50 Pokémon = "Novice Trainer", 151 = "Dex Master".',
      },
    ],
  },
];

export default function TrainerTips() {
  return (
    <div className="animate-fadeUp">
      {/* Header */}
      <section className="bg-gradient-to-b from-tertiary/10 to-surface border-b border-outline-variant">
        <div className="section-container py-lg">
          <h1 className="font-headline text-display text-on-surface mb-2">
            Trainer <span className="text-tertiary">Tips & Wiki</span>
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl">
            Everything a trainer needs to succeed — from catching mechanics to competitive battle strategies.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="section-container py-lg">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-surface-card rounded-xl shadow-card border border-outline-variant p-4">
              <h3 className="font-headline font-bold text-label-bold text-on-surface-variant uppercase tracking-wider mb-3">
                Contents
              </h3>
              <nav className="space-y-1">
                {TIPS.map((tip) => (
                  <a
                    key={tip.id}
                    href={`#${tip.id}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-md font-body text-body-md text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
                  >
                    <span>{tip.icon}</span>
                    <span>{tip.title}</span>
                  </a>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-outline-variant">
                <Link to="/catalog" className="btn-primary w-full text-center text-sm block">
                  Browse Catalog →
                </Link>
              </div>
            </div>
          </aside>

          {/* Articles */}
          <main className="lg:col-span-3 space-y-10">
            {TIPS.map((tip) => (
              <article
                key={tip.id}
                id={tip.id}
                className="bg-surface-card rounded-xl shadow-card border border-outline-variant overflow-hidden"
              >
                <div className="bg-gradient-to-r from-tertiary/10 to-transparent p-6 border-b border-outline-variant flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-tertiary/10 flex items-center justify-center text-3xl">
                    {tip.icon}
                  </div>
                  <div>
                    <h2 className="font-headline text-h2 text-on-surface">{tip.title}</h2>
                    <p className="font-body text-body-md text-on-surface-variant">{tip.subtitle}</p>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {tip.sections.map((s) => (
                    <div key={s.heading}>
                      <h3 className="font-headline font-bold text-h3 text-on-surface mb-2">{s.heading}</h3>
                      <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">{s.body}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
