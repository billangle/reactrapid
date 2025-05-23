import { IHostedZone } from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';


interface Props {
  hosted_zone: IHostedZone;
  domain: string;
  region: string;
}

export class ACM extends Construct {
  public readonly certificate: acm.Certificate;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const certName = 'SiteCert' + props.domain;
    console.log ("region: " + props.region + " domain: " + props.domain + " certName" + certName);

    /*

     ** this code doesn't work for CloudFront. **
    this.certificate = new acm.Certificate(this, certName, {
      domainName: props.domain,
      validation: acm.CertificateValidation.fromDns(props.hosted_zone),
      region: 'us-east-1', // this doesn't exist on this class - which why it is broken for cloudfront

    });

    
    */

    this.certificate = new acm.DnsValidatedCertificate(this, certName, {
      domainName: props.domain,
      subjectAlternativeNames: ['*.' + props.domain],
          hostedZone: props.hosted_zone,
          region: 'us-east-1', // Cloudfront only checks this region for certificates
    });




   
  }
}

