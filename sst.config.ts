import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "t3-recipes",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        customDomain: {
            cdk: {
                certificate: new Certificate(stack, "Certificate", {
                    domainName: "*.rossreicks.com",
                    validation: CertificateValidation.fromDns(),
                }),
            },
            domainName: "t3-recipes.rossreicks.com",
            isExternalDomain: true,
        }
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
