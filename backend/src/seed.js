import 'dotenv/config'; import mongoose from 'mongoose'; import bcrypt from 'bcryptjs';
import User from './models/User.js'; import Station from './models/Station.js'; import Bike from './models/Bike.js';
if(!process.env.MONGODB_URI){console.error('Set MONGODB_URI in backend/.env');process.exit(1)}
await mongoose.connect(process.env.MONGODB_URI);
let owner=await User.findOne({username:'owner'});if(!owner)await User.create({name:'RideFleet Owner',username:'owner',email:'owner@ridefleet.local',passwordHash:await bcrypt.hash('owner123',12),role:'owner',kycStatus:'VERIFIED'});
let customer=await User.findOne({username:'customer'});if(!customer)await User.create({name:'Demo Customer',username:'customer',email:'customer@ridefleet.local',passwordHash:await bcrypt.hash('customer123',12),role:'customer',kycStatus:'VERIFIED'});
const seedStations=[['Model Town Substation','Ludhiana','Model Town, Ludhiana'],['Ferozepur Road Substation','Ludhiana','Ferozepur Road, Ludhiana'],['Civil Lines Substation','Ludhiana','Civil Lines, Ludhiana'],['Bus Stand Substation','Ludhiana','Near Bus Stand, Ludhiana']];
for(const [name,city,address] of seedStations){if(!await Station.exists({name}))await Station.create({name,city,address});}
const stations=await Station.find();const seedBikes=[['BIKE-101','Honda Activa','PB10-RF-101',0],['BIKE-102','TVS Jupiter','PB10-RF-102',120],['BIKE-103','Hero Splendor','PB10-RF-103',450],['BIKE-104','Honda Shine','PB10-RF-104',85],['BIKE-105','Bajaj Pulsar','PB10-RF-105',760],['BIKE-106','TVS Ntorq','PB10-RF-106',240]];
for(let i=0;i<seedBikes.length;i++){const [bikeCode,model,registration,odometer]=seedBikes[i];if(!await Bike.exists({bikeCode}))await Bike.create({bikeCode,model,registration,odometer,station:stations[i%stations.length]._id,status:'AVAILABLE'});}
console.log('Seed complete. Owner: owner / owner123; Customer: customer / customer123');await mongoose.disconnect();
