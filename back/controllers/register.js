const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const Signup = require("../models/user"); // ✅ Correct import
const otpStore = {};
const nodemailer  = require("nodemailer");
const jwt = require("jsonwebtoken");


// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });


// Registration route
router.post('/register', upload.fields([
  { name: 'idProof', maxCount: 1 },
  { name: 'panCard', maxCount: 1 }
]), async (req, res) => {
  try {
    const { username, email, dob, nationality, mobileNumber, address, password, account_no } = req.body;

    const idProof = req.files['idProof']?.[0]?.path;
    const panCard = req.files['panCard']?.[0]?.path;

    if (!username || !email || !dob || !nationality || !mobileNumber || !address || !password || !account_no || !idProof || !panCard) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newUser = new Signup({
      username,
      email,
      dob,
      nationality,
      mobileNumber,
      address,
      password,
      account_no,
      aadhar: idProof,
      pan: panCard
    });

    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or your email provider
  auth: {
    user: "murugesanrithika28@gmail.com",
    pass: "essw taod iucs rbwo",
  },
});

// Step 1: Verify email & password and send OTP
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email & password are required' });
    }
    console.log("Login entered")

    const user = await Signup.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    // Send OTP via email
    await transporter.sendMail({
      from: "murugesanrithika28@gmail.com",
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your OTP for BNP Paribas login is <b>${otp}</b>. It expires in 2 minutes.</p>`,
    });

    res.status(200).json({ success: true, message: 'OTP sent', email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Step 2: Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    console.log("Otp verification entered")
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email & OTP are required' });
    }

    if (otpStore[email] !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // OTP verified, generate JWT token
    const user = await Signup.findOne({ email });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Clear OTP
    delete otpStore[email];

    res.status(200).json({ success: true, message: 'Login successful', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/*router.post("/chatbot", async (req, res) => {
  const userQuery = req.body.question;

  try {
    const prompt = `
You are a chatbot that helps users query exam data from a MongoDB database. 
Convert the user's natural language question into a MongoDB query using Mongoose.

The database has a collection called "ExamResult" with fields:
- examName (String)
- userId (String)
- score (Number)
- attended (Boolean)

User question: "${userQuery}"

Return ONLY a JSON object like this:
{
  "query": {}, 
  "explanation": "your human readable answer here"
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const output = JSON.parse(completion.choices[0].message.content);
    const queryResult = await ExamResult.find(output.query).countDocuments();

    const reply = output.explanation.replace(/\d+/, queryResult);

    res.json({ answer: reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});*/

/*router.post("/chatbot", async (req, res) => {
  try {
   
    const  userQuery  = req.body.prompt;
     console.log('Received body:', req.body.prompt);
    // if (!userQuery) {
    //   return res.status(400).json({ success: false, message: "Query required" });
    // }

    // 1️⃣ Generate MongoDB query using Gemini
    const mongoPrompt = `
You are an AI assistant that converts natural language into a MongoDB find query.
The database collection is "signup" with fields: username, email, dob, nationality, mobileNumber, address, aadhar, pan, account_no.

User query: "${userQuery}"

Important instructions:
1. Return ONLY a valid JSON object.
2. All keys must be enclosed in double quotes (e.g., "$or", "username").
3. All string values must use double quotes.
4. Do not include comments, explanations, or Markdown formatting.
5. Output should be directly usable with JSON.parse().
`;

   console.log('Received body:', req.body);
    model=genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const mongoResponse = await model.generateContent(mongoPrompt);
    console.log(mongoResponse);
const mongoText = await mongoResponse.response.text(); // don't forget await    console.log("Gemini entered")
console.log("Gemini response:", mongoText);
//const mongoText1 = mongoText.replace(/```(json|javascript)?/g, '').trim();
console.log("Processed MongoDB query:", mongoText);
    /*let mongoQuery;
    try {
      mongoQuery = JSON.parse(mongoText);
      
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Generated query is invalid JSON",
        error: err.message,
      });
    }
   mongoQuery = JSON.parse(mongoText);
    console.log("Final MongoDB query object:", mongoQuery);
    const results = await Signup.find(mongoQuery).lean();

    // 2️⃣ Convert results to natural language
    const resultPrompt = `
Convert the following MongoDB result into a readable natural language answer for the user:
${JSON.stringify(results)}
`;

    const answerResponse = await model.generateContent(resultPrompt);
    const answer = answerResponse.response.text().trim();

    res.status(200).json({ success: true, answer, rawResults: results });
  } catch (error) {
    console.error("Gemini chatbot error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
*/
router.post("/chatbot", async (req, res) => {
  try {
    const userQuery = req.body.prompt;
    console.log("Received prompt:", userQuery);

    // 1️⃣ Get all collection names from the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    console.log("Available collections:", collectionNames);

    // 2️⃣ Prompt Gemini to generate MongoDB query + target collection
    const mongoPrompt = `
You are an AI assistant that converts natural language into a MongoDB find query.
The database has the following collections: ${collectionNames.join(", ")}.

Each collection contains documents with various fields. Based on the user query, choose the most relevant collection and generate a MongoDB find query for it.

User query: "${userQuery}"

Important instructions:
1. Return ONLY a valid JSON object with two keys: "collection" and "query".
2. "collection" must be the name of the chosen collection (string).
3. "query" must be a valid MongoDB find query object.
4. All keys and string values must use double quotes.
5. Do not include comments, explanations, or Markdown formatting.
6. Output must be directly usable with JSON.parse().
7. Only choose from the following collections: ${collectionNames.join(", ")}.
8. Do not invent or assume collections that are not listed.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const mongoResponse = await model.generateContent(mongoPrompt);
    const mongoText = await mongoResponse.response.text();
    console.log("Gemini response:", mongoText);
    // Clean Gemini output before parsing
    const cleanedText = mongoText.replace(/```json|```/g, "").replace(/(\r\n|\n|\r)/gm, "").trim();
    console.log("Raw Gemini output:", mongoText);
console.log("Cleaned output:", cleanedText);

    let parsed;
try {
  parsed = JSON.parse(cleanedText);
} catch (err) {
  return res.status(400).json({
    success: false,
    message: "Gemini returned invalid JSON",
    raw: mongoText,
    error: err.message,
  });
}

    // const parsed = JSON.parse(mongoText);
    const { collection, query } = parsed;

    // if (!collectionNames.includes(collection)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: `Invalid collection name: ${collection}`,
    //   });
    // }
    if (!collectionNames.includes(parsed.collection)) {
  return res.status(400).json({
    success: false,
    message: `Collection "${parsed.collection}" does not exist in the database.`,
    availableCollections: collectionNames,
  });
}

    // 3️⃣ Dynamically query the selected collection
    let results;

if (query.hasOwnProperty("$count")) {
  // Run aggregation pipeline for $count
  results = await mongoose.connection.db.collection(collection).aggregate([query]).toArray();
} else {
  // Run regular find query
  results = await mongoose.connection.db.collection(collection).find(query).toArray();
}

    // 4️⃣ Convert results to natural language
    const resultPrompt = `
Convert the following MongoDB result into a readable natural language answer for the user:
${JSON.stringify(results)}
`;

    const answerResponse = await model.generateContent(resultPrompt);
    const answer = answerResponse.response.text().trim();

    res.status(200).json({ success: true, answer, rawResults: results });
  } catch (error) {
    console.error("Gemini chatbot error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
