import { DrAliceSmith, HomerSimpson, MockClient } from '@medplum/mock';
import { expect, test } from 'vitest';
import { handler } from './medmorph-bot';
import { env } from 'process';
import { getDisplayString, getReferenceString } from '@medplum/core';

const contentType = 'application/fhir+json';
// npm t src/examples/medmorph-bot.test.ts
test('Success', async () => {
  const medplum = new MockClient();
  const cbcObservation = await medplum.createResource({
    resourceType: 'Observation',
    status: 'final',
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '58410-2',
          display: 'Complete blood count (hemogram) panel - Blood',
        },
      ],
      text: 'CBC Panel',
    },
    effectiveDateTime: '2023-04-02T08:30:00-04:00',
    issued: '2023-04-02T08:30:00-04:00',
    component: [
      {
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '6690-2',
              display: 'Leukocytes [#/volume] in Blood by Automated count',
            },
          ],
          text: 'White Blood Cell Count',
        },
        valueQuantity: {
          value: 5.2,
          unit: 'x10^3/uL',
          system: 'http://unitsofmeasure.org',
          code: '10*3/uL',
        },
      },
      {
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '789-8',
              display: 'Erythrocytes [#/volume] in Blood by Automated count',
            },
          ],
          text: 'Red Blood Cell Count',
        },
        valueQuantity: {
          value: 4.7,
          unit: 'x10^6/uL',
          system: 'http://unitsofmeasure.org',
          code: '10*6/uL',
        },
      },
      {
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '718-7',
              display: 'Hemoglobin [Mass/volume] in Blood',
            },
          ],
          text: 'Hemoglobin',
        },
        valueQuantity: {
          value: 14.3,
          unit: 'g/dL',
          system: 'http://unitsofmeasure.org',
          code: 'g/dL',
        },
      },
      {
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '4544-3',
              display: 'Hematocrit [Volume Fraction] of Blood by Automated count',
            },
          ],
          text: 'Hematocrit',
        },
        valueQuantity: {
          value: 41.0,
          unit: '%',
          system: 'http://unitsofmeasure.org',
          code: '%',
        },
      },
      {
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '2951-2',
              display: 'Platelets [#/volume] in Blood by Automated count',
            },
          ],
          text: 'Platelet Count',
        },
        valueQuantity: {
          value: 250,
          unit: 'x10^3/uL',
          system: 'http://unitsofmeasure.org',
          code: '10*3/u',
        },
      },
    ],
  });

  const input = await medplum.createResource({
    resourceType: 'DiagnosticReport',
    id: '123456',
    status: 'final',
    category: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
            code: 'LAB',
            display: 'Laboratory',
          },
        ],
      },
    ],
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '789-8',
          display: 'Complete blood count (hemogram) panel - Blood by Automated count',
        },
      ],
      text: 'Complete Blood Count',
    },
    subject: {
      reference: getReferenceString(HomerSimpson),
      display: getDisplayString(HomerSimpson),
    },
    resultsInterpreter: [
      {
        reference: getReferenceString(DrAliceSmith),
        display: getDisplayString(DrAliceSmith),
      },
    ],
    effectiveDateTime: '2023-03-23T10:30:00-04:00',
    issued: '2023-03-23T10:45:00-04:00',
    performer: [
      {
        reference: 'Organization/123456',
        display: 'ABC Laboratory',
      },
    ],
    result: [
      {
        reference: getReferenceString(cbcObservation),
      },
    ],
  });

  console.log(env.CDC_TOKEN);

  const cdc_secrets = {
    CDC_BASE_URL: { valueString: env.CDC_BASE_URL },
    CDC_CLIENT_SECRET: { valueString: env.CDC_CLIENT_SECRET },
    CDC_TOKEN: { valueString: env.CDC_TOKEN },
  };

  const result = await handler(medplum, {
    input,
    contentType,
    secrets: cdc_secrets,
  });
  expect(result).toBe(true);
});
