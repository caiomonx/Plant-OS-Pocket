const fs = require('fs');
const file = 'd:/Antigravity/src/pages/ChallengeEcgPage.jsx';
let content = fs.readFileSync(file, 'utf8');
const headerRegex = /<header className="w-full bg-slate-900 border-b border-slate-800 shadow-md relative z-10 pt-4 pb-4 px-4 flex-shrink-0">[\s\S]*?<\/header>/m;
content = content.replace(headerRegex, `      <ChallengeEcgHeader 
         navigate={navigate}
         mode={mode}
         handleModeSwitch={handleModeSwitch}
         stats={stats}
         setIsStatsOpen={setIsStatsOpen}
      />`);
fs.writeFileSync(file, content);
console.log("Refactoring complete");
