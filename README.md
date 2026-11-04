# eRedBook Engineering — Starter v1

A responsive React + TypeScript + Vite engineering calculator starter intended for GitHub and Vercel.

## Included in this starter
- Annular capacity (bbl/m, total bbl and litres)
- Pipe internal capacity (bbl/m, total bbl and litres)
- Steel displacement per metre
- Metres ↔ feet converter
- Responsive dashboard for phone, tablet and desktop

## Run locally
1. Install Node.js (LTS).
2. In this folder run:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local URL printed by Vite.

## Publish on GitHub
1. Create a new empty GitHub repository.
2. Upload the contents of this folder (not the ZIP file inside another folder).
3. Commit to the `main` branch.

## Deploy on Vercel
1. Sign in to Vercel with GitHub.
2. Choose **Add New → Project** and import this repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Press **Deploy**.

Every push to the connected branch will trigger a new deployment.

## Important engineering limitations
This is a starter build, not a complete copy of Halliburton eRedBook. It does not contain Halliburton's proprietary database or certified/API tubular ratings. Calculations here are limited to geometric capacities and steel displacement. Verify dimensions, units, assumptions and results independently before using them in field operations. API burst/collapse/tensile and connection ratings must be added from licensed, verified manufacturer/API data with the applicable edition, tolerances, grades, connections and design factors.

## Calculation conventions
- Diameters are entered in inches.
- Length is entered in metres.
- Output volumes are US oilfield barrels (bbl) and litres.
- 1 in = 0.0254 m.
- 1 m³ = 6.28981077 US bbl.
