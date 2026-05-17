# CM_RR_6 — Quiz Simulation 6

Web-based quiz simulation application for case study assessments. Guides users through a multi-phase research and analysis exercise about predator/prey population dynamics on the Aldarin Island (Dashed Coyotes and their prey).

## Phases

1. **Investigation** — collect data from exhibits into the research journal (35-minute timer starts here)
2. **Analysis** — answer 4 calculator-based questions about kill rates and prey loss
3. **Report** — write findings, choose the best chart, fill in visual breakdown
4. **Cases** — 6 case studies covering different data formats and question types

## Running locally

This is a static site with no build step. Either open `log_in.html` directly in a browser, or serve it locally to avoid CORS issues:

```bash
python -m http.server 8000
# then open http://localhost:8000/log_in.html
```

## Tech

Vanilla JS + jQuery + jQuery UI (drag/drop) + Chart.js v2.9.4. No build tools.
