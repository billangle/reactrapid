import * as cdk from 'aws-cdk-lib';
import { StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ConfigurationData } from '../@types';
import { Route53 } from './constructs/Route53';
import { ACM } from './constructs/ACM';
import { S3 } from './constructs/UIS3';
//import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
//import * as acm from 'aws-cdk-lib/aws-certificatemanager';
interface ContractsStackProps extends StackProps {
  configData: ConfigurationData
}

let gatewatename="cdk-cc-user-mgmt-main-ui";
let gatewatename2="cdk-cc-user-mgmt-main-ui-2";
//let getwaydns="app";

export class UserMgmtCCAppStack extends cdk.Stack {
  public readonly acm: ACM;

  public readonly route53: Route53;

  public readonly s3: S3;
  constructor(scope: Construct, id: string, props: ContractsStackProps) {
    super(scope, id, props);

    /** web application */

    let gatewaydns= props.configData.settings.api_dns;
    let domain =  props.configData.settings.domain

    this.route53 = new Route53(this, gatewatename, {
      domain: domain,   
    });

    let  webName;

    if (gatewaydns === "") {

      gatewaydns = domain;
      webName = domain;

    }else {
      webName = gatewaydns + "." + domain;

    }
   

    console.log ("Web Name URL: " + webName);

  /** CloudFront Region must be us-east-1 */

    this.acm = new ACM(this, gatewaydns,{
      hosted_zone: this.route53.hosted_zone,
       domain: webName,
       region: "us-east-1",

    });

      this.s3 = new S3(this, gatewatename2, {
        route53: this.route53,
        siteName: gatewaydns,
        domainName: domain,
        env: props.configData.settings.environment,
        certArn: this.acm.certificate.certificateArn,
      });
  
      /** images - place to store images for the app so they are not built into react */

      let images = "images." + domain;
      console.log ("IMAGES URL: " + images);

      this.acm = new ACM(this, `${gatewaydns}-IMAGES`,{
        hosted_zone: this.route53.hosted_zone,
        domain: images,
        region: "us-east-1",

      });

        this.s3 = new S3(this, `${gatewatename2}-IMAGES`, {
          route53: this.route53,
          siteName: "images",
          domainName: domain,
          env: props.configData.settings.environment,
          certArn: this.acm.certificate.certificateArn,
        });


  }
}
