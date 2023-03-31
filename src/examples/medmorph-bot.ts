import { BotEvent, MedplumClient } from '@medplum/core';
import { Bundle } from '@medplum/fhirtypes';
import fetch from 'node-fetch';

export async function handler(medplum: MedplumClient, event: BotEvent<Bundle>): Promise<any> {
  // Read Bundle as Input
  const bundle = event.input as Bundle;

  // Validate the Transaction bundle and create a Message bundle
  const messageBundle = createMessageBundle(bundle);

  // Set up connect to the CDC FHIR Server
  const CDC_BASE_URL = event.secrets['CDC_BASE_URL'].valueString;
  const CDC_CLIENT_SECRET = event.secrets['CDC_CLIENT_SECRET'].valueString;

  if (!CDC_BASE_URL || !CDC_CLIENT_SECRET) {
    throw new Error('Missing environment variables');
  }

  const cdcMedplumClient = new MedplumClient({
    baseUrl: CDC_BASE_URL,
    fetch: fetch,
  });

  // Send Data to CDC FHIR Server
  await cdcMedplumClient.startClientLogin('', CDC_CLIENT_SECRET);
  await cdcMedplumClient.createResource(messageBundle);

  return true;
}

// This takes in a Transaction Bundle and creates a Message Bundle that is in the format required by the CDC
function createMessageBundle(bundle: Bundle): Bundle {
  console.log(bundle);
  const messageBundle: Bundle = {
    resourceType: 'Bundle',
    type: 'message',
    entry: [
      {
        fullUrl: 'http://example.com/fhir/Patient/123',
        resource: {
          resourceType: 'Patient',
          id: '123',
          name: [
            {
              family: 'Doe',
              given: ['John', 'Jacob', 'Jingleheimer'],
            },
          ],
          gender: 'male',
          birthDate: '1970-01-01',
        },
        request: {
          method: 'PUT',
          url: 'Patient/123',
          ifNoneExist: 'identifier=http://example.com/fhir/Patient/123',
        },
      },
    ],
  };

  return messageBundle;
}
