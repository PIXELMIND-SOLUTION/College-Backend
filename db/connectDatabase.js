// import mongoose from "mongoose";

// const connectDatabase = () => {
//   mongoose
//     .connect(process.env.MONGO_URI, {
//     })
//     .then((data) => {
//       console.log(`Servers is connected with server: ${data.connection.host}`);
//     });
// };

// export default connectDatabase;


import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ Servers is connected with server: ${mongoose.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDatabase;