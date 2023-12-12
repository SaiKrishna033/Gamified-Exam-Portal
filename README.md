# KH GameOn

## Branching Strategy

- app components and routings are declared from main the sync to other branches
- committing `app-routing.module.ts` and `app.component.ts` on non-main branches will cause merge conflicts so do not commit these files
- make to sure PR to non-main branches to sync the app components and routings

## Running the app

```bash
git clone git@gitlab.com:sec01/kh-gameon.git
cd kh-gameon
npm install
npm start # or ng serve
```
