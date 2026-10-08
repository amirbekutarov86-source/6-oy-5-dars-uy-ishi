type Props = { total: number; done: number };

export default function ProgressCard({ total, done }: Props) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <section className="card progress">
      <div className="progress-head">
        <div>
          <p className="muted">Your progress</p>
          <p className="big">{done} of {total} done</p>
        </div>
        <span className="pct">{pct}%</span>
      </div>
      <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="fill" style={{ width: `${pct}%` }} />
      </div>
    </section>
  );
}
