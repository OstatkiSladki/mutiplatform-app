const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'shared', 'config', 'tokens.json');
const outPath = path.join(__dirname, 'src', 'shared', 'config', 'theme', 'index.ts');
const themePath = path.join(__dirname, 'src', 'shared', 'config', 'theme', 'theme.ts');

const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const data = json.global || json;

// Function to clean hex keys 'Primary 100%' -> '100'
const cleanKey = (key) => key.replace(/[^0-9a-zA-Z_-]/g, '').toLowerCase();

const formatColorGroup = (group) => {
  if (!group) return {};
  const result = {};
  for (const [k, v] of Object.entries(group)) {
    let rawK = k;
    let newK = k.split(' ').pop().replace('%', '');
    if (newK.toLowerCase() === 'bg') newK = 'bg';
    if (k.toLowerCase() === 'warning bg') newK = 'warningBg';
    if (k.toLowerCase() === 'success bg') newK = 'successBg';
    if (k.toLowerCase() === 'error bg') newK = 'errorBg';
    if (k.toLowerCase() === 'info bg') newK = 'infoBg';
    if (k.toLowerCase() === 'hover 10%') newK = 'hover10';
    if (k.toLowerCase() === 'active 20%') newK = 'active20';
    if (k.toLowerCase() === 'black' || k.toLowerCase() === 'white') newK = k.toLowerCase();
    
    // fallback
    if (!result[newK]) {
      result[newK] = v['$value'] || v.value;
    } else {
      result[cleanKey(k)] = v['$value'] || v.value;
    }
  }
  return result;
};

const colors = {
  primary: formatColorGroup(data['Primary']),
  secondary: formatColorGroup(data['Secondary']),
  neutral: formatColorGroup(data['Neutral']),
  accent: formatColorGroup(data['Accent']),
  status: formatColorGroup(data['Status']),
  actionPrimary: formatColorGroup(data['Action Primary']),
  actionSecondary: formatColorGroup(data['Action Secondary']),
  actionNeutral: formatColorGroup(data['Action Neutral']),
};

const formatShadowsGroup = (group) => {
  if (!group) return {};
  const result = {};
  for (const [k, v] of Object.entries(group)) {
                 result[k.replace('Elevation ', 'elevation')] = {
        color: v.color['$value'],
        offset: { width: v.x['$value'], height: v.y['$value'] },
        shadowOpacity: 1, // standard RN
        shadowRadius: v.blur['$value'],
        elevation: v.spread['$value'] || v.blur['$value'] // simple mapping for RN
     };
  }
  return result;
}

const shadows = {
  tight: formatShadowsGroup(data['Tight']),
  fluffy: formatShadowsGroup(data['Fluffy']),
};

const mapValues = (obj) => {
  if(!obj) return {};
  const res = {};
  for(const [k,v] of Object.entries(obj)) {
     if(v['$value'] !== undefined) {
         res[k] = v['$value'];
     }
  }
  return res;
}

const typography = {
  fontFamilies: mapValues(data.fontFamilies),
  lineHeights: mapValues(data.lineHeights),
  fontWeights: mapValues(data.fontWeights),
  fontSizes: mapValues(data.fontSize),
  letterSpacing: mapValues(data.letterSpacing)
};

const spacing = {
  '0': 0,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 32,
  '8': 40,
  '9': 48,
  '10': 64
};

const radius = {
  'none': 0,
  'sm': 4,
  'md': 8,
  'lg': 16,
  'xl': 24,
  'full': 9999
};

const tokens = {
  colors,
  typography,
  shadows,
  spacing,
  radius
};

const fileContent = \`export const tokens = \${JSON.stringify(tokens, null, 2)} as const;

export const theme = {
  colors: tokens.colors,
  typography: tokens.typography,
  shadows: tokens.shadows,
  spacing: tokens.spacing,
  radius: tokens.radius,
} as const;

export type AppTheme = typeof theme;
\`;

fs.mkdirSync(path.join(__dirname, 'src', 'shared', 'config', 'theme'), { recursive: true });
fs.writeFileSync(outPath, fileContent, 'utf8');
console.log('Conversion successful!');
