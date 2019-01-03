'use strict'

const jwt = require('jsonwebtoken');
const fs = require('fs');

import config from '../config/app.config';
import db from './db.module';
import password from './password.module';
import logger from './logger.module';

const generatePayload = user => {
  return {
    uuid: user.uuid,
    email: user.email
  };
}

const generateToken = async user => {
  const payload = generatePayload(user);

  if(config.jwtSignMethod == "secret") {
    // Generate token with secret
    return jwt.sign(payload, config.jwtSecretString, {algorithm: config.jwtAlgorithmSecret});
  }
  else if(config.jwtSignMethod == "privatekey") {
    // Generate token with privatekey
    const cert = fs.readFileSync(config.privateKeyPath, 'utf8');
    return jwt.sign(payload, cert, {algorithm: config.jwtAlgorithmKeys});
  }
  else {
    return null;
  }
};

const verifyToken = async token => {
  console.log('config.jwtSignMethod: ', config.jwtSignMethod);
  if(config.jwtSignMethod == "secret") {
    try{
      // Verify token with secret
      const decoded = await jwt.verify(token, config.jwtSecretString, {algorithm: config.jwtAlgorithmSecret});
      return { success: true, decoded: decoded }
    }
    catch(err){
      return { success: false, error: err }
    }
  }
  else if(config.jwtSignMethod == "privatekey") {
    try{
      // Verify token with privatekey
      const cert = fs.readFileSync(config.publicKeyPath, 'utf8');
      const decoded = await jwt.verify(token, cert, {algorithm: config.jwtAlgorithmKeys});
      return { success: true, decoded: decoded }
    }
    catch(err){
      return { success: false, error: err }
    }
  }
  else {
    return null;
  }
}

const authenticate = async (params) => {
  // Check for user first
  const record = await db.getUser('email', params.email);

  if(record.success && record.user) {
    // User found, check for password
    const passwordsMatch = await password.checkPasswords(record.user.password, params.password);
    if(passwordsMatch) {
      // Correct password. Generate JWT Token
      const token = await generateToken(record.user);
      if(token){
        // Token generated successfully
        return { success: true, token: token }
      }
      else {
        // Error. Check config
        return { success: false, error: { code: 360, message: logger.getErrorMessage(360) } }
      }
    }
    else {
      // Wrong password. Return error
      return { success: false, error: { code: 352, message: logger.getErrorMessage(352) } }
    }
  }
  else {
    // Wrong email. return error
    return { success: false, error: { code: 351, message: logger.getErrorMessage(351) } }
  }
}

const verify = async token => {
  const result = await verifyToken(token);
  if(result) {
    return result;
  }
  else {
    return { success: false, error: { code: 361, message: logger.getErrorMessage(361) } }
  }
}

module.exports = {
    authenticate,
    verify
}
