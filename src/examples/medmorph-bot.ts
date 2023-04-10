import { BotEvent, getDisplayString, getReferenceString, MedplumClient } from '@medplum/core';
import { Bundle, DiagnosticReport, Patient, Practitioner } from '@medplum/fhirtypes';
import { getDefaultSettings } from 'http2';
import fetch from 'node-fetch';

export async function handler(medplum: MedplumClient, event: BotEvent<DiagnosticReport>): Promise<any> {
  // Read Bundle as Input
  const report = event.input as DiagnosticReport;

  // Validate the Transaction bundle and create a Message bundle
  const messageBundle = await createMessageBundle(report, medplum);

  // Set up connect to the CDC FHIR Server
  const CDC_BASE_URL = event.secrets['CDC_BASE_URL'].valueString;
  const CDC_TOKEN = event.secrets['CDC_TOKEN'].valueString;

  if (!CDC_BASE_URL || !CDC_TOKEN) {
    throw new Error('Missing environment variables');
  }

  const cdcMedplumClient = new MedplumClient({
    baseUrl: CDC_BASE_URL,
    fetch: fetch,
  });

  // Send Data to CDC FHIR Server, we assume here that we already have a token
  await cdcMedplumClient.setAccessToken(CDC_TOKEN);
  await cdcMedplumClient.createResource(messageBundle);

  return true;
}

// This takes in a Diagnostic Report and creates a Message Bundle that is in the format required by the CDC
async function createMessageBundle(report: DiagnosticReport, medplum: MedplumClient): Promise<Bundle> {
  console.log(report);
  if (!report.subject) {
    throw new Error('Diagnostic Report is missing subject');
  }
  const patient = (await medplum.readReference(report.subject)) as Patient;
  if (!report.resultsInterpreter) {
    throw new Error('Diagnostic Report is missing performer');
  }
  const performer = (await medplum.readReference(report.resultsInterpreter[0])) as Practitioner;
  const messageBundle: Bundle = {
    resourceType: 'Bundle',
    type: 'message',
    entry: [
      {
        fullUrl: 'urn:uuid:07a76e52-0668-464a-a0c3-2b6ba22cebfc',
        resource: {
          resourceType: 'MessageHeader',
          meta: {
            profile: ['http://hl7.org/fhir/us/cancer-reporting/StructureDefinition/us-pathology-message-header'],
          },
          extension: [
            {
              url: 'http://hl7.org/fhir/us/medmorph/2021Jan/CodeSystem-us-ph-messageheader-message-types.html',
              valueCode: 'cancer-report-message',
            },
          ],
          eventCoding: {
            system: 'http://example.org/fhir/message-events',
            code: 'admin-notify',
          },
          source: {
            name: 'IHE SDC on FHIR Parser',
            endpoint: 'http://localhost:8080/sdcparser',
          },
        },
      },
      {
        fullUrl: 'urn:uuid:ce4c68d9-abca-427e-a62b-4f8a5c1ed6f0',
        resource: {
          resourceType: 'Bundle',
          type: 'collection',
          entry: [
            {
              fullUrl: 'urn:uuid:c2e6509d-31c1-4ce5-9ba1-5a6392b1efcd',
              resource: {
                resourceType: 'Patient',
                meta: {
                  profile: ['http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient'],
                },
                identifier: [
                  {
                    system: patient.identifier?.[0].system,
                    value: patient.identifier?.[0].value,
                  },
                ],
                name: [
                  {
                    family: patient.name?.[0].family,
                    given: patient.name?.[0].given,
                  },
                ],
                gender: patient.gender,
              },
            },
            {
              fullUrl: 'urn:uuid:5100cd34-ad65-4b8a-adfe-c806951dc3e2',
              resource: {
                resourceType: 'Practitioner',
                meta: {
                  profile: ['http://hl7.org/fhir/us/core/StructureDefinition/us-core-practitioner'],
                },
                identifier: [
                  {
                    system: performer.identifier?.[0].system,
                    value: performer.identifier?.[0].value,
                  },
                ],
                name: [
                  {
                    family: performer.name?.[0].family,
                    given: performer.name?.[0].given,
                  },
                ],
              },
            },
            {
              fullUrl: 'urn:uuid:3df5016c-677f-4259-ae10-ea9f23fd8376',
              resource: {
                resourceType: 'PractitionerRole',
                meta: {
                  profile: [
                    'hhttp://hl7.org/fhir/us/cancer-reporting/StructureDefinition/us-pathology-related-practitioner-role',
                  ],
                },
                identifier: [
                  {
                    system: 'http://someIdentifier.com',
                    value: 'pathpract1',
                  },
                  {
                    system: 'http://hl7.org/fhir/sid/us-npi',
                    value: '193757595',
                  },
                ],
                code: [
                  {
                    coding: [
                      {
                        system: 'http://hl7.org/fhir/us/cancer-reporting/ValueSet/us-pathology-provider-types',
                        code: 'principal-result-interpreter',
                        display: 'Pathologist principally interpreting results on pathology testing',
                      },
                    ],
                  },
                ],
              },
            },
            {
              fullUrl: 'urn:uuid:8732e82b-c5fd-4cc2-acb8-11faa3d66a85',
              resource: {
                resourceType: 'DiagnosticReport',
                meta: {
                  profile: [
                    'http://hl7.org/fhir/us/cancer-reporting/StructureDefinition/us-pathology-diagnostic-report',
                  ],
                },
                status: 'final',
                category: [
                  {
                    coding: [
                      {
                        system: 'http://loinc.org',
                        code: 'LP7839-6',
                        display: 'Pathology',
                      },
                    ],
                  },
                ],
                code: {
                  coding: [
                    {
                      system: 'http://loinc.org',
                      code: '60568-3',
                      display: 'Pathology Synoptic report',
                    },
                  ],
                },
                subject: {
                  reference: getReferenceString(patient),
                  display: getDisplayString(patient),
                },
                effectiveDateTime: '2021-01-01T21:39:30.000Z',
                result: [
                  {
                    reference: 'Observation/urn:uuid:27babfd5-d4bc-407f-8094-448074b49179',
                    identifier: {
                      system: 'https://cap.org/eCC',
                      value: 'urn:uuid:27babfd5-d4bc-407f-8094-448074b49179',
                    },
                  },
                ],
              },
            },
            {
              fullUrl: 'urn:uuid:35db25eb-29cb-402e-baca-9a10358720f3',
              resource: {
                resourceType: 'Observation',
                identifier: [
                  {
                    system: 'https://cap.org/eCC',
                    value: 'urn:uuid:3d2ddefd-df86-4d6f-8f8f-5614e7ff7014',
                  },
                ],
                status: 'final',
                code: {
                  coding: [
                    {
                      system: 'https://cap.org/eCC',
                      code: '1416.100004300',
                      display: 'Procedure',
                    },
                    {
                      system: 'http://snomed.info/sct',
                      code: '2620001000004108',
                      display: 'Specimen collection procedure (observable entity)',
                    },
                  ],
                },
                subject: {
                  reference: getReferenceString(patient),
                  display: getDisplayString(patient),
                },
                effectivePeriod: {
                  start: '2023-03-28T19:21:59+00:00',
                },
                performer: [
                  {
                    reference: getReferenceString(performer),
                    type: 'Practitioner',
                    display: getDisplayString(performer),
                  },
                ],
                valueCodeableConcept: {
                  coding: [
                    {
                      system: 'https://cap.org/eCC',
                      code: '1432.100004300',
                      display: 'Other (specify)',
                    },
                    {
                      system: 'http://snomed.info/sct',
                      code: '123038009',
                      display: 'Specimen (specimen)',
                    },
                  ],
                },
                derivedFrom: [
                  {
                    identifier: {
                      system: 'https://cap.org/eCC',
                      value: 'urn:uuid:f49f5e0c-3d32-4296-9442-f6bf2f7a8e76',
                    },
                  },
                ],
                component: [
                  {
                    code: {
                      coding: [
                        {
                          system: 'https://cap.org/eCC',
                          code: '1432.100004300',
                          display: 'Other (specify)',
                        },
                        {
                          system: 'http://snomed.info/sct',
                          code: '123038009',
                          display: 'Specimen (specimen)',
                        },
                      ],
                    },
                    valueString: 'Laparoscopic-assisted sigmoid colectomy (procedure)',
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  };

  return messageBundle;
}
