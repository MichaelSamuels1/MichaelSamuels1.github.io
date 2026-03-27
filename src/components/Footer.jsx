export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-content">
        <div className="footer-section">
          <h4>QuantumHomelab</h4>
          <p>Decentralized. Sovereign. Yours.</p>
          <div className="social-links">
            <a href="#" title="GitHub">GitHub</a>
            <a href="#" title="Twitter">Twitter</a>
            <a href="#" title="Discord">Discord</a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Product</h4>
          <ul>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#pricing">Pricing</a></li>
            <li><a href="/#how-it-works">How It Works</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Acceptable Use</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>support@quantumhomelab.com</p>
          <p>St. Louis, Missouri, USA</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 QuantumHomelab. Hosted locally, powered globally.</p>
        <p>Payment processing by third-party services. Check our <a href="#">Terms</a>.</p>
      </div>
    </footer>
  )
}
