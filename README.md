# Mid-Cycle Report Survey | 中期报告调查

Bilingual survey system for school evaluation | 学校评估双语问卷系统

## 🌐 Live Demo
Access at: `https://yourusername.github.io/survey-project/`

## 📁 Project Structure
```
survey-project/
├── index.html              # Home page with survey selection
├── parent-survey.html      # Parent survey (12 questions)
├── teacher-survey.html     # Teacher survey (20 questions)
├── student-survey.html     # Student survey (9 questions)
├── backend/
│   ├── Code.gs             # Google Apps Script
│   └── Dashboard.html      # Analysis dashboard
└── README.md
```

## 🚀 Deployment to GitHub Pages

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `survey-project`
3. Choose "Public"
4. Click "Create repository"

### Step 2: Upload Files
```bash
# Clone your repo
git clone https://github.com/YOUR_USERNAME/survey-project.git
cd survey-project

# Copy all files from this project
# (index.html, parent-survey.html, teacher-survey.html, student-survey.html)

# Commit and push
git add .
git commit -m "Add survey pages"
git push origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repo on GitHub
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: "main" → "/ (root)"
5. Save

## 📊 Backend Setup (Google Forms + Sheets)

### Option 1: Google Forms (Recommended)
1. **Create Google Forms**
   - Go to https://forms.google.com
   - Create 3 forms: Parent Survey, Teacher Survey, Student Survey
   - Add questions matching the Excel file
   - Get the form URLs

2. **Update HTML forms to submit to Google Forms**
   - In each survey HTML, find the form tag
   - Add `action="YOUR_GOOGLE_FORM_URL"` and `method="POST"`

3. **View Responses**
   - In Google Forms, go to "Responses" tab
   - Click Sheets icon to open in Google Sheets

### Option 2: Google Apps Script Dashboard
1. Open Google Sheets where responses are collected
2. Extensions → Apps Script
3. Create two files:
   - `Code.gs` - paste content from backend/Code.gs
   - `Dashboard.html` - paste content from backend/Dashboard.html
4. Deploy → New deployment
5. Select "Web app"
6. Configure:
   - Execute as: "Me"
   - Who has access: "Anyone"
7. Copy the deployment URL
8. Access to see interactive dashboard!

## 📈 Features

### Frontend
- ✅ Bilingual interface (Chinese/English)
- ✅ Responsive design (mobile-friendly)
- ✅ Progress indicator
- ✅ Local storage for demo testing
- ✅ Visual rating system

### Backend (Dashboard)
- ✅ Real-time data from Google Sheets
- ✅ Average score calculation
- ✅ Distribution charts (bar graphs)
- ✅ Per-question analysis
- ✅ Color-coded ratings
- ✅ Bilingual labels

## 🔧 Customization

### Change Colors
Edit the `background` or color values in each HTML file:
- Parent: `#ff6b6b`
- Teacher: `#4ecdc4`
- Student: `#45b7d1`

### Add More Questions
1. Edit the Excel file
2. Run the Python script again to regenerate HTML
3. Update Google Forms accordingly

## 📝 Questions (from Excel)

### Parent Survey (12)
1. Leaders regularly evaluate instructional programs...
2. Learners are immersed in an environment that fosters lifelong skills...
3. Learners had lessons that prepared them for the future...
...

### Teacher Survey (20)
1. I receive the support they need to strengthen my professional practice...
2. I use student achievement data to modify and adjust materials...
...

### Student Survey (9)
1. Our leaders regularly evaluate instructional programs...
2. We are prepared to deal with issues we may face in the future...
...

## 📄 License
MIT License
