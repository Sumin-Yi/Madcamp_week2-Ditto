const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Image } = require('image-js');
const path = require('path')
const axios = require('axios')
const tf = require('@tensorflow/tfjs-node');

const JWT_SECRET = "fsdhidsfbejbrichuishdihfjkwehihf";

const app = express();

app.use(express.json());
app.use(cors());

const cafes = require("./assets/cafes")

// Connect to MongoDB
const dbURI = 'mongodb+srv://suminY:sumin24@clusterditto.ensxxl4.mongodb.net/ditto';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

  require("./userDetails")
// Mongoose model for user details
const User = mongoose.model("UserInfo");

async function calculateImageSimilarity(referenceImage, targetImage) {
  try {
    // Calculate RGB similarity
    const rgbSimilarity = await calculateColorSimilarityRGB(referenceImage, targetImage);

    return rgbSimilarity;
  } catch (error) {
    console.error('Error calculating color similarity:', error);
    throw error;
  }
}


// ...
async function calculateColorFeaturesRGB(image) {
  try {
    const data = image.data;
    const totalPixels = data.length / 4; // Each pixel has 4 values (RGBA)

    let totalRed = 0;
    let totalGreen = 0;
    let totalBlue = 0;
    let totalBrightness = 0;

    for (let i = 0; i < data.length; i += 4) {
      totalRed += data[i];
      totalGreen += data[i + 1];
      totalBlue += data[i + 2];
      totalBrightness += rgbToBrightness(data[i], data[i + 1], data[i + 2]);
    }

    const avgRed = totalRed / totalPixels;
    const avgGreen = totalGreen / totalPixels;
    const avgBlue = totalBlue / totalPixels;
    const avgBrightness = totalBrightness / totalPixels;

    return { avgRed, avgGreen, avgBlue, avgBrightness };
  } catch (error) {
    console.error('Error calculating color features (RGB):', error);
    throw error;
  }
}

function rgbToBrightness(red, green, blue) {
  return 0.299 * red + 0.587 * green + 0.114 * blue;
}

async function calculateColorSimilarityRGB(referenceImage, targetImage) {
  // Calculate RGB features for both images
  const refColorFeatures = await calculateColorFeaturesRGB(referenceImage);
  const targetColorFeatures = await calculateColorFeaturesRGB(targetImage);

  // Calculate Euclidean distance between RGB features
  const redDiff = Math.abs(refColorFeatures.avgRed - targetColorFeatures.avgRed);
  const greenDiff = Math.abs(refColorFeatures.avgGreen - targetColorFeatures.avgGreen);
  const blueDiff = Math.abs(refColorFeatures.avgBlue - targetColorFeatures.avgBlue);
  const brightnessDiff = Math.abs(refColorFeatures.avgBrightness - targetColorFeatures.avgBrightness);

  const euclideanDistance = Math.sqrt(Math.pow(redDiff, 2) + Math.pow(greenDiff, 2) + Math.pow(blueDiff, 2) + Math.pow(brightnessDiff, 2));

  // Normalize distance (optional, depending on the specific use case)
  const maxPossibleDistance = Math.sqrt(4); // Maximum Euclidean distance in 4D space (RGBB)
  const normalizedDistance = euclideanDistance / maxPossibleDistance;

  // Calculate similarity
  const similarity = -1 * normalizedDistance;

  return similarity;
}


// ...



// async function calculateImageSimilarity(referenceImage, targetImage) {
//   const bins = 64; // Number of bins in the color histogram
//   const refHistogram = calculateColorHistogram(referenceImage, bins);
//   const targetHistogram = calculateColorHistogram(targetImage, bins);

//   // Calculate histogram intersection for similarity
//   let intersection = 0;
//   let refNorm = 0;
//   let targetNorm = 0;

//   for (let i = 0; i < bins; i++) {
//     intersection += Math.min(refHistogram[i], targetHistogram[i]);
//     refNorm += Math.pow(refHistogram[i], 2);
//     targetNorm += Math.pow(targetHistogram[i], 2);
//   }

//   const similarity = intersection / Math.sqrt(refNorm * targetNorm);

//   return similarity;
// }

// async function calculateImageSimilarity(referenceImage, targetImage) {
//   try {
//     // Convert image data to Float32Array (required by TensorFlow)
//     const refImgTensor = await imageToTensor(referenceImage);
//     const targetImgTensor = await imageToTensor(targetImage);
//     const refTensorData = new Float32Array(refImgTensor.data);
//     const targetTensorData = new Float32Array(targetImgTensor.data);

//     // Create tensors from the image data
//     const refTensor = tf.tensor3d(refTensorData, [referenceImage.height, referenceImage.width, 4], 'float32');
//     const targetTensor = tf.tensor3d(targetTensorData, [targetImage.height, targetImage.width, 4], 'float32');

//     // Calculate Mean Squared Error (MSE)
//     const mse = tf.metrics.meanSquaredError(refTensor, targetTensor);

//     // Calculate similarity
//     const similarity = 1 - mse.dataSync()[0];

//     // Dispose of tensors to free up memory
//     refTensor.dispose();
//     targetTensor.dispose();

//     return similarity;
//   } catch (error) {
//     console.error('Error calculating image similarity:', error);
//     throw error;
//   }
// }

// function calculateColorHistogram(image, bins) {
//   const data = image.data;
//   const histogram = new Array(bins).fill(0);

//   for (let i = 0; i < data.length; i += 4) {
//     const redIndex = Math.floor((data[i] / 256) * bins);
//     const greenIndex = Math.floor((data[i + 1] / 256) * bins);
//     const blueIndex = Math.floor((data[i + 2] / 256) * bins);

//     // Increase the count in the corresponding bin
//     histogram[redIndex]++;
//     histogram[greenIndex]++;
//     histogram[blueIndex]++;
//   }

//   return histogram;
// }

// async function calculateImageSimilarity(referenceImage, targetImage) {
//   try {
//     const refTensor = await imageToTensor(referenceImage);
//     const targetTensor = await imageToTensor(targetImage);

//     // Calculate Mean Squared Error (MSE)
//     const mse = tf.metrics.meanSquaredError(refTensor, targetTensor);

//     // Calculate similarity
//     const similarity = 1 - mse.dataSync()[0];

//     return similarity;
//   } catch (error) {
//     console.error('Error calculating image similarity:', error);
//     throw error;
//   }
// }

async function imageToTensor(image) {
  try {
    // Convert image data to Uint8Array
    const imageData = new Uint8Array(image.data);

    // Create a tensor from the image data
    const tensor = tf.tensor3d(imageData, [image.height, image.width, 4], 'int32');

    return tensor;
  } catch (error) {
    console.error('Error converting image to tensor:', error);
    throw error;
  }
}


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized: Token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
          return res.status(401).json({ status: 'error', message: 'Unauthorized: Invalid token' });
      }
      req.user = user;
      next();
  });
};

app.get('/calculate-similarity', async (req, res) => {
  try {
    const referenceImagePath = path.join(__dirname, 'assets', 'unnamed.png');
    const referenceImage = await Image.load(referenceImagePath);

    const imageProcessingPromises = cafes.map(async (cafe) => {
      try {
        const imageResponse = await axios.get(cafe.image, { responseType: 'arraybuffer' });
        const imageData = Buffer.from(imageResponse.data, 'binary');
        const targetImage = await Image.load(imageData);
    
        // 각 카페 이미지를 크기 조절 없이 그대로 사용
        // 이때 가로세로 비율이 다를 수 있음
        // 예시로, resize 메서드에서 preserveAspectRatio 옵션을 사용하지 않거나 false로 설정
        const resizedTargetImage = targetImage.resize({
          width: referenceImage.width,
          height: referenceImage.height,
          preserveAspectRatio: false,
        });

        
    
        const similarity = await calculateImageSimilarity(referenceImage, resizedTargetImage);
    
        // Check if similarity is NaN and replace with 0
        const validSimilarity = isNaN(similarity) ? 0 : similarity;
    
        return {
          title: cafe.title,
          address: cafe.address,
          image: cafe.image,
          similarity: validSimilarity,
        };
      } catch (imageError) {
        console.error('Error processing image:', imageError);
        throw imageError;
      }
    });

    const similarityResults = await Promise.all(imageProcessingPromises);

    console.log('Before sorting:', similarityResults);

    // Debugging sorting
    similarityResults.sort((a, b) => {
      console.log(`Comparing ${a.similarity} with ${b.similarity}`);
      return b.similarity - a.similarity;
    });

    console.log('After sorting:', similarityResults);

    const top5Results = similarityResults.slice(0, 5);

    res.json({ status: 'success', data: top5Results });
  } catch (error) {
    console.error('Error calculating similarity:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});




app.listen(80, () => {
    console.log('Server is running on port 80');
});



// const User = mongoose.model("UserInfo");
app.post("/register", async (req,res) => {
  const {username, id, password} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10)
  try{
    const oldUser = await User.findOne({ id });
    console.log(req.body)
    if (oldUser){
      res.send({error: "User Exists"})
    }
    await User.create({
      username,
      id,
      password: encryptedPassword,
    });
    res.send({status:"ok"})
  }catch (error){
    res.send({status:"error"})
  }
})

app.post("/login-user", async (req, res) => {
  const {id, password} = req.body;
  const user = await User.findOne({id});
  if (!user) {
    return res.json({ error: "User Not Found"})
  }

  if(await bcrypt.compare(password, user.password)){
    const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET);
    if(res.status(201)){
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" })
    }
  }
  res.json({ status: "error", error: "Invalid Password" })
 });

 app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Check the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);

    res.json({ status: 'success', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});


app.post("/userData", async(req, res) => {
  const {token} = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const user_name = user.username;
    User.findOne({ username: user_name })
    .then((data) => {
      res.send({ status: "ok", data: data});
    })
    .catch((error) => {
      res.send({ status: "error", data: error})
    })
  } catch (error) {}
})

app.get('/api', (req,res) => {
  res.send({message:'hello'});
});