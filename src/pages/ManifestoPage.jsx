import { Link } from 'react-router-dom'

export default function ManifestoPage() {
  return (
    <div className="manifesto-page">
      <section className="manifesto-content" style={{ paddingTop: '120px' }}>
        <div className="header-block">
          <span className="mono-badge">[ REV_01.2026 ]</span>
          <h1>The Data <span className="highlight">Sovereignty</span> Manifesto</h1>
          <p className="subtitle">The internet was built to be decentralized. We are taking it back.</p>
        </div>

        <div className="glass-article">
          <h2>01. Privacy is a Binary.</h2>
          <p>You are either private or you are exploited. There is no "middle ground." Modern cloud providers claim to protect you while building a profile of your life. We believe privacy isn't a feature—it is the default state of a free person.</p>

          <div className="divider"></div>

          <h2>02. We Don't Want Your Identity.</h2>
          <p>We do not ask for your name. We do not ask for your email. We do not track your IP. Your account is a randomly generated number. If we don't know who you are, we can't be forced to tell anyone else.</p>

          <div className="divider"></div>

          <h2>03. Iron Over Ether.</h2>
          <p>The "Cloud" is just someone else's computer—usually a corporate one. We host from our own physical iron in St. Louis. Our <strong>Cisco 3560X</strong> and <strong>EdgeRouter</strong> stack is managed by us, not a faceless data center. When you host with us, you know exactly where the silicon is.</p>

          <div className="divider"></div>

          <h2>04. Zero-Knowledge Hosting.</h2>
          <p>We provide the hardware; you provide the encryption. We don't have the keys to your data, and we don't want them. Our infrastructure is a "dumb pipe"—we move your bits without looking at them.</p>

          <div className="divider"></div>

          <h2>05. No Logs. No Exceptions.</h2>
          <p>Logs are a liability. Our systems are configured to purge operational data instantly. We don't log traffic. We don't log timestamps. We don't log you.</p>

          <div className="terminal-box">
            <p className="mono-text">{`> status: hardware_sovereign`}</p>
            <p className="mono-text">{`> logs: /dev/null`}</p>
            <p className="mono-text">{`> tracking: disabled`}</p>
            <p className="mono-text">{`> sovereignty: 100%`}</p>
          </div>
        </div>

        <div className="manifesto-footer">
          <p>Join the rebellion against mass surveillance.</p>
          <Link to="/#pricing" className="btn-primary">Initiate a Node</Link>
        </div>
      </section>
    </div>
  )
}
