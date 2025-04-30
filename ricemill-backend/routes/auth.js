/*const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
  console.log('Register route hit:', req.body); // Debugging log
  try {
    const { firstName, lastName, phoneNumber, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const username = `${firstName}${lastName}`.toLowerCase();
    const user = new User({
      firstName,
      lastName,
      username,
      phoneNumber,
      role: role === 'Admin' ? 'mill_owner' : 'customer',
    });

    await user.save();

    // Generate OTP (mock)
    const otp = '9876'; // In production, use a proper OTP generation library
    console.log(`Generated OTP for ${phoneNumber} (Register): ${otp}`);

    res.status(200).json({ otp, message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, phoneNumber, role } = req.body;

    // Check if user exists
    const user = await User.findOne({ username, phoneNumber });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.role !== (role === 'Admin' ? 'mill_owner' : 'customer')) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Generate OTP (mock)
    const otp = '9876'; // In production, use a proper OTP generation library
    console.log(`Generated OTP for ${phoneNumber} (Login): ${otp}`);

    res.status(200).json({ otp, message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;*/





/*const express = require('express');
   const router = express.Router();
   const User = require('../models/User');
   const generateOTP = require('../utils/otp');

   router.post('/register', async (req, res) => {
       const { firstName, lastName, phoneNumber, role } = req.body;

       try {
           // Check if phone number already exists
           let user = await User.findOne({ phoneNumber });
           if (user) {
               return res.status(400).json({ message: 'Phone number already exists' });
           }

           // Generate username (can be duplicate now)
           const username = `${firstName}${lastName}`.toLowerCase();

           // Generate OTP
           const otp = generateOTP();
           const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

           // Create new user
           user = new User({
               firstName,
               lastName,
               phoneNumber,
               username,
               role,
               otp,
               otpExpires
           });

           await user.save();

           console.log(`Register route hit: { firstName: '${firstName}', lastName: '${lastName}', phoneNumber: '${phoneNumber}', role: '${role}' }`);
           console.log(`Generated OTP for ${phoneNumber} (Register): ${otp}`);

           res.status(200).json({ otp, message: 'OTP sent successfully' });
       } catch (error) {
           console.error(error);
           res.status(500).json({ message: 'Server error' });
       }
   });

   router.post('/login', async (req, res) => {
       const { username, phoneNumber, role } = req.body;

       try {
           // Find user by phone number (not username)
           const user = await User.findOne({ phoneNumber, role });
           if (!user) {
               return res.status(400).json({ message: 'User not found' });
           }

           // Generate OTP
           const otp = generateOTP();
           const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

           user.otp = otp;
           user.otpExpires = otpExpires;
           await user.save();

           console.log(`Generated OTP for ${phoneNumber} (Login): ${otp}`);

           res.status(200).json({ otp, message: 'OTP sent successfully' });
       } catch (error) {
           console.error(error);
           res.status(500).json({ message: 'Server error' });
       }
   });

   router.post('/verify-otp', async (req, res) => {
       const { phoneNumber, otp, role, action } = req.body;

       try {
           // Find user by phone number and role
           const user = await User.findOne({ phoneNumber, role });
           if (!user) {
               return res.status(400).json({ message: 'User not found' });
           }

           // Check if OTP matches and is not expired
           if (user.otp !== otp || Date.now() > user.otpExpires) {
               return res.status(400).json({ message: 'Invalid OTP' });
           }

           // Clear OTP fields after successful verification
           user.otp = undefined;
           user.otpExpires = undefined;
           await user.save();

           res.status(200).json({ message: 'OTP verified successfully' });
       } catch (error) {
           console.error(error);
           res.status(500).json({ message: 'Server error' });
       }
   });

   router.post('/resend-otp', async (req, res) => {
       const { phoneNumber, role, action } = req.body;

       try {
           const user = await User.findOne({ phoneNumber, role });
           if (!user) {
               return res.status(400).json({ message: 'User not found' });
           }

           const otp = generateOTP();
           const otpExpires = Date.now() + 10 * 60 * 1000;

           user.otp = otp;
           user.otpExpires = otpExpires;
           await user.save();

           console.log(`Resent OTP for ${phoneNumber} (${action}): ${otp}`);

           res.status(200).json({ otp, message: 'OTP resent successfully' });
       } catch (error) {
           console.error(error);
           res.status(500).json({ message: 'Server error' });
       }
   });

   module.exports = router;*/








   const express = require('express');
   const router = express.Router();
   const User = require('../models/User');
   const generateOTP = require('../utils/otp');

   router.post('/register', async (req, res) => {
       const { firstName, lastName, phoneNumber, role } = req.body;

       try {
           // Check if phone number already exists
           let user = await User.findOne({ phoneNumber });
           if (user) {
               return res.status(400).json({ message: 'Phone number already exists' });
           }

           const username = `${firstName}${lastName}`.toLowerCase();
           const otp = generateOTP();
           const otpExpires = Date.now() + 10 * 60 * 1000;

           // Map role from frontend to backend
           const mappedRole = role === 'Admin' ? 'mill_owner' : 'customer';

           user = new User({
               firstName,
               lastName,
               phoneNumber,
               username,
               role: mappedRole,
               otp,
               otpExpires
           });

           await user.save();

           console.log(`Register route hit: { firstName: '${firstName}', lastName: '${lastName}', phoneNumber: '${phoneNumber}', role: '${role}' }`);
           console.log(`Generated OTP for ${phoneNumber} (Register): ${otp}`);

           res.status(200).json({ otp, message: 'OTP sent successfully' });
       } catch (error) {
           console.error(error);
           res.status(500).json({ message: 'Server error' });
       }
   });

   /*router.post('/login', async (req, res) => {
       const { username, phoneNumber, role } = req.body;

       try {
           // Map role from frontend to backend
           const mappedRole = role === 'Admin' ? 'mill_owner' : 'customer';

           const user = await User.findOne({ phoneNumber, role: mappedRole });
           if (!user) {
               return res.status(400).json({ message: 'User not found' });
           }

           


           const otp = generateOTP();
           const otpExpires = Date.now() + 10 * 60 * 1000;

           user.otp = otp;
           user.otpExpires = otpExpires;
           await user.save();

           console.log(`Generated OTP for ${phoneNumber} (Login): ${otp}`);

           res.status(200).json({ otp, message: 'OTP sent successfully' });
       } catch (error) {
           console.error(error);
           res.status(500).json({ message: 'Server error' });
       }
   });*/


   router.post('/login', async (req, res) => {
    const { username, phoneNumber, role } = req.body;

    try {
        console.log('Request Body:', req.body); 

        // Map role from frontend to backend
        const mappedRole = role === 'Admin' ? 'mill_owner' : 'customer';

        const user = await User.findOne({ phoneNumber, role: mappedRole });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000;

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        console.log(`Generated OTP for ${phoneNumber} (Login): ${otp}`);

        res.status(200).json({ otp, message: 'OTP sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


   router.post('/verify-otp', async (req, res) => {
       const { phoneNumber, otp, role, action } = req.body;

       try {
           // Map role from frontend to backend
           const mappedRole = role === 'Admin' ? 'mill_owner' : 'customer';

           const user = await User.findOne({ phoneNumber, role: mappedRole });
           if (!user) {
               return res.status(400).json({ message: 'User not found' });
           }

           if (user.otp !== String(otp) || Date.now() > user.otpExpires) {
               return res.status(400).json({ message: 'Invalid OTP' });
           }

           user.otp = undefined;
           user.otpExpires = undefined;
           await user.save();

           res.status(200).json({ message: 'OTP verified successfully' });
       } catch (error) {
           console.error(error);
           res.status(500).json({ message: 'Server error' });
       }
   });

   router.post('/resend-otp', async (req, res) => {
       const { phoneNumber, role, action } = req.body;

       try {
           // Map role from frontend to backend
           const mappedRole = role === 'Admin' ? 'mill_owner' : 'customer';

           const user = await User.findOne({ phoneNumber, role: mappedRole });
           if (!user) {
               return res.status(400).json({ message: 'User not found' });
           }

           const otp = generateOTP();
           const otpExpires = Date.now() + 10 * 60 * 1000;

           user.otp = otp;
           user.otpExpires = otpExpires;
           await user.save();

           console.log(`Resent OTP for ${phoneNumber} (${action}): ${otp}`);

           res.status(200).json({ otp, message: 'OTP resent successfully' });
       } catch (error) {
           console.error(error);
           res.status(500).json({ message: 'Server error' });
       }
   });

   module.exports = router;








   

