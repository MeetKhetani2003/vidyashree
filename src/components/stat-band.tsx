import { stats } from "@/data/site";

export function StatBand({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`stat-band ${dark ? "dark" : ""}`}>
      <div className="shell stats-grid">
        {stats.map((stat) => <div className="stat-item" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </div>
    </section>
  );
}
