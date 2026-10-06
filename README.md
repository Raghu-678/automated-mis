# Targo Smart MIS — Automated Business Reporting & Analytics Platform

[![Status](https://img.shields.io/badge/Status-Live%20Production-10B981?style=for-the-badge)](https://github.com/Raghu-678)
[![License](https://img.shields.io/badge/License-MIT-15BCDF?style=for-the-badge)](LICENSE)

An intelligent, enterprise-grade automated Management Information System (MIS) and Business Intelligence platform built with sleek high-performance web architecture, Quantico typography, and real-time data ingestion pipelines.

---

## 🌟 Key Highlights & Core Features

- 📥 **Excel / CSV Ingestion**: Drag-and-drop file ingestion supporting `.xlsx`, `.xls`, and `.csv` files up to 25MB with auto-schema detection.
- 🧹 **Automated Data Cleaning Engine**: Real-time Pandas-grade cleaning pipeline that:
  - Trims whitespace & sanitizes unicode
  - Maps headers to uniform `snake_case`
  - Parses mixed date formats (`DD/MM/YYYY` vs `YYYY-MM-DD`)
  - Strips currency symbols (`$`, `₹`, commas) into normalized floats
  - Removes duplicate entries & empty rows
  - Normalizes categorical inconsistencies (e.g. `mumbai ` → `Mumbai`)
  - Detects and flags statistical outliers using the IQR (Interquartile Range) method
- 📊 **Power BI-Style Analytics Suite**:
  - Monthly revenue timeline with interactive **6M / 12M** range toggle
  - Revenue vs Target combo charts (dual theme: light mode & dark neon mode)
  - Year-over-Year (YoY) revenue comparison with trajectory tracking
  - Product category contribution & regional sales distribution
- 🎯 **KPI Tracking & Threshold Alerts**:
  - Continuous evaluation against Warning & Critical threshold limits
  - Real-time alert trigger simulator with live notification bell counter and resolution workflows
- 🤖 **AI-Generated Business Summary**:
  - Executive intelligence briefs synthesized from underlying SQL fact tables
  - Natural Language Query ("Ask Your Business Data") converting English queries to SQL
- 📅 **Automated Reports & Scheduling**:
  - Daily Flash Snapshot, Weekly Executive Deck, and Monthly Board Review
  - Simulated APScheduler cron jobs with interactive HTML email previews and PDF print exports
- 🗄️ **Multi-Tenant SQL Explorer**:
  - Normalized PostgreSQL schema explorer (`sales_fact`, `kpi_definitions`, `alerts`, `reports`)
  - Interactive in-browser SQL query sandbox with live execution
- 👥 **Role-Based Access Control (RBAC)**:
  - Dynamic switching between **Admin**, **Manager**, and **Viewer** roles with contextual permission tags

---

## 🚀 Getting Started Locally

### Prerequisites
- Any modern web browser (Chrome, Edge, Firefox, Safari)
- Optional: Node.js or Python (for local HTTP server)

### Running the App
Clone the repository and start any static file server:

```bash
# Clone repository
git clone https://github.com/Raghu-678/automated-mis.git
cd automated-mis

# Run with Python
python -m http.server 3000

# Or run with Node
npx serve -p 3000
```

Open `http://localhost:3000` in your browser to explore the live platform.

---

## 🎨 Design & Aesthetic System
- **Typography**: Google Fonts [Quantico](https://fonts.google.com/specimen/Quantico) (400, 700) + JetBrains Mono
- **Primary Accent**: `#15BCDF` (Hover: `#3fd0ef`, Border: `#0fa3c2`)
- **Theme Palette**: Chamfered polygon geometry, subtle gradient scrims, dark surfaces `#111827`, and `#F2F1F0` body backgrounds.

---

## 👤 Author
- **GitHub**: [@Raghu-678](https://github.com/Raghu-678)
