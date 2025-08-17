# 🤖 RoboPick: AI-Powered Dynamic Vision Assistant  

RoboPick is an AI-powered vision assistant that helps individuals with **Color Vision Deficiency (CVD)** confidently identify and select fresh produce.  
It transforms a standard device camera into an **intelligent co-pilot** by applying **scientific color correction, deep contextual analysis, and real-time guidance**.  

---

## ✨ Features  

- 🎥 **Real-Time Video Analysis** – Live camera feed with AI-powered color correction.  
- 🖼️ **Static Image Upload** – Upload photos for instant produce quality analysis.  
- 🎯 **Personalized Onboarding** – Users can set their CVD condition or take a quick visual test.  
- 📊 **CVD AI Analysis View** – Clear recommendation score, explanation, and visual bounding boxes.  
- 🧠 **Proprietary Vision AI** – Detects ripeness, freshness, and defects with contextual analysis.  
- 🎨 **Scientific Vision Correction** – Accurate color transformation (Daltonization via OpenCV).  

---

## 🛠️ Technologies Used  

- **Next.js (React + TypeScript)** – Scalable frontend framework with SSR.  
- **Tailwind CSS** – Modern, responsive UI design.  
- **Python + OpenCV** – Backend image processing and vision correction.  
- **Gunicorn** – WSGI server for Python backend.  
- **Supabase** – Authentication, database, and real-time storage.  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js (v18+)  
- Python (3.9+)  
- Supabase account & API keys  

### Installation  

```bash
# Clone the repo
git clone https://github.com/your-username/robopick.git
cd robopick

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
