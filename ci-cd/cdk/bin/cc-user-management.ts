#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as fs from 'fs';
import { UserMgmtCCAppStack } from '../lib/user-mgmt-cc-app-stack';


/**
 * REQUIRES 
 * 
 * DEPLOY_ENV
 * 
 * 
 */


let environment=process.env.DEPLOY_ENV;
const envdata = fs.readFileSync("../" + environment+ '/cdk-spec.json', 'utf8');
const configData = JSON.parse(envdata);

const app = new cdk.App();
new UserMgmtCCAppStack(app, 'UserMgmtCCAppStack', {
  env: { region: configData.settings.region, account: configData.settings.account },
  configData: configData
 
});