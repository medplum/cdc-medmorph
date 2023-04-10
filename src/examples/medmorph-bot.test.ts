import { MockClient } from '@medplum/mock';
import { expect, test } from 'vitest';
import { handler } from './medmorph-bot';
import { env } from 'process';
import msgBundle from '../../pathologyFormExamples/MsgBundle_ColorectalRes.json';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

const contentType = 'application/fhir+json';
// npm t src/examples/medmorph-bot.test.ts
test('Success', async () => {
  dotenv.config();
  const medplum = new MockClient();
  const input = await medplum.createResource(msgBundle);

  console.log(input);
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
