import {
    BlockPublicAccess,
    Bucket,
    BucketAccessControl,
  } from 'aws-cdk-lib/aws-s3';
  import { BucketDeployment, Source} from 'aws-cdk-lib/aws-s3-deployment';
  import { Construct } from 'constructs';
  import { resolve}  from 'path';
  import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
  import { Distribution, ViewerProtocolPolicy, CachePolicy, GeoRestriction } from 'aws-cdk-lib/aws-cloudfront';
  import { Duration } from 'aws-cdk-lib';
  import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
  import { ARecord, RecordTarget } from 'aws-cdk-lib/aws-route53';
  import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
  
  import { Route53 } from '../Route53';
  import * as acm from 'aws-cdk-lib/aws-certificatemanager';
  import * as wafv2 from 'aws-cdk-lib/aws-wafv2';


  

  interface Props {
    route53: Route53;
    siteName: string;
    domainName: string;
    env: string;
    certArn: string;
  }

  interface WafRule {
    name: string;
    rule: wafv2.CfnWebACL.RuleProperty;
}

  
  export class S3 extends Construct {
    public readonly web_bucket: Bucket;
  
    public readonly web_bucket_deployment: BucketDeployment;
  
    public readonly distribution: Distribution;
  
    constructor(scope: Construct, id: string, props: Props) {
      super(scope, id);
  

     let bucketName;
     let siteName;
     let frontEndSubDomain;
     let policybucketName;


      if (props.siteName === props.domainName) {
         bucketName=`${props.domainName}`;
         siteName = props.domainName;
         frontEndSubDomain = props.domainName;
         policybucketName=`user-mgmt-cc-cdk-webapp-${props.env}`;
      }
      else {
        bucketName=`${props.siteName}.${props.domainName}`;
        siteName = props.siteName;
        frontEndSubDomain = siteName;
        policybucketName=`user-mgmt-cc-cdk-${props.siteName}-${props.env}`;

      }

    
     let domainName = props.domainName;
    
  
     console.log ("bucketName: " + bucketName + " dom: " + domainName + " sitename: " + siteName);

      this.web_bucket = new Bucket(
        scope,
        `WebBucket-${bucketName}`,
        {
          bucketName: bucketName,
          websiteIndexDocument: 'index.html',
          websiteErrorDocument: 'index.html',
          publicReadAccess: true,
          blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
          accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
          removalPolicy: RemovalPolicy.DESTROY,
          autoDeleteObjects: true,
        },
      );

  
      if (siteName === "images") {
          this.web_bucket_deployment = new BucketDeployment(
            scope,
            `WebBucketDeployment-${bucketName}`,
            {
              sources: [
                Source.asset(
                  resolve(__dirname,  '..', '..', '..', 'web', 'build'),
                ),
              ],
              destinationBucket: this.web_bucket,
            },
          );
      }
  
 
      const noCachePolicy = new CachePolicy(this, `noCachePolicy-${policybucketName}`, {
        cachePolicyName: `NoCachePolicy-${policybucketName}`,
        defaultTtl: Duration.minutes(0),
        minTtl: Duration.minutes(0),
        maxTtl: Duration.minutes(0),
  
      });


      const awsManagedRules: WafRule[] = [
        // AWS IP Reputation list includes known malicious actors/bots and is regularly updated
        {
            name: 'AWS-AWSManagedRulesAmazonIpReputationList',
            rule: {
            name: 'AWS-AWSManagedRulesAmazonIpReputationList',
            priority: 10,
            statement: {
                managedRuleGroupStatement: {
                vendorName: 'AWS',
                name: 'AWSManagedRulesAmazonIpReputationList',
                },
            },
            overrideAction: {
                none: {},
            },
            visibilityConfig: {
                sampledRequestsEnabled: true,
                cloudWatchMetricsEnabled: true,
                metricName: `${policybucketName}-AWSManagedRulesAmazonIpReputationList`,
            },
            },
        },
        // Common Rule Set aligns with major portions of OWASP Core Rule Set
        {
            name: 'AWS-AWSManagedRulesCommonRuleSet',
            rule:
            {
            name: 'AWS-AWSManagedRulesCommonRuleSet',
            priority: 20,
            statement: {
                managedRuleGroupStatement: {
                vendorName: 'AWS',
                name: 'AWSManagedRulesCommonRuleSet',
                // Excluding generic RFI body rule for sns notifications
                // https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-list.html
                  excludedRules: [
                   { name: 'GenericRFI_BODY' },
                   { name: 'SizeRestrictions_BODY' },
                ],
                },
            },
            overrideAction: {
                none: {},
            },
            visibilityConfig: {
                sampledRequestsEnabled: true,
                cloudWatchMetricsEnabled: true,
                metricName: `${policybucketName}-AWS-AWSManagedRulesCommonRuleSet`,
            },
            },
        },
        // Blocks common SQL Injection
        {
            name: 'AWSManagedRulesSQLiRuleSet',
            rule: {
            name: 'AWSManagedRulesSQLiRuleSet',
            priority: 30,
            visibilityConfig: {
                sampledRequestsEnabled: true,
                cloudWatchMetricsEnabled: true,
                metricName: 'AWSManagedRulesSQLiRuleSet',
            },
            overrideAction: {
                none: {},
            },
            statement: {
                managedRuleGroupStatement: {
                vendorName: 'AWS',
                name: 'AWSManagedRulesSQLiRuleSet',
                excludedRules: [],
                },
            },
            },
        },
        {
          name: 'AWS-AWSManagedRulesBotControlRuleSet',
          rule: {
          name: 'AWS-AWSManagedRulesBotControlRuleSet',
          priority: 5,
          statement: {
              managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesBotControlRuleSet',
              },
          },
          overrideAction: {
              none: {},
          },
          visibilityConfig: {
              sampledRequestsEnabled: true,
              cloudWatchMetricsEnabled: true,
              metricName: `${policybucketName}-AWSManagedRulesBotControlRuleSet`,
          },
          },
      },
     
       
    ];

    
      const webAcl = new wafv2.CfnWebACL(this, `WebACL-${policybucketName}`, {
        scope: 'CLOUDFRONT', 
        defaultAction: {
          allow: {},
        },
        visibilityConfig: {
          cloudWatchMetricsEnabled: true,
          metricName: `WebACL-RAPIDCC-${policybucketName}`,
          sampledRequestsEnabled: true,
        },
        rules: awsManagedRules.map(wafRule => wafRule.rule),
      });

     
      const certificateArn = props.certArn;

      const myCert = acm.Certificate.fromCertificateArn(this, 'StaticSiteCertificate', certificateArn);
   
  
      this.distribution = new Distribution(
        scope,
        `Frontend-Distribution-${bucketName}`,
        {
          certificate: myCert,
          domainNames: [`${bucketName}`],
          defaultRootObject: 'index.html',
          defaultBehavior: {
            origin: new S3Origin(this.web_bucket),
            viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            cachePolicy: noCachePolicy
          },
          geoRestriction: GeoRestriction.allowlist('US'),
          webAclId: webAcl.attrArn,
        },
      );
  
      new ARecord(scope, `FrontendAliasRecord-${bucketName}`, {
        zone: props.route53.hosted_zone,
        target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution)),
        recordName: `${bucketName}`,
      });
  
      new CfnOutput(scope, `FrontendURL-${bucketName}`, {
        value: bucketName,
      });

   
    }
  }
  
