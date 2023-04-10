# CDC Medpmorph

This repository shows reference material related to CDC Electronic Case Reporting (eCR) for cancer registry. The reference material uses [Medplum Bots](https://www.medplum.com/docs/bots/bot-basics) to validate and synchronize the FHIR resource bundles to the registry.

## Background and Dataflow

At a high level this integration takes a FHIR Transaction Bundle or FHIR DiagnosticReport resource from an EHR, like Endosoft, and produces a FHIR Message bundle and synchronizes it to the CDC FHIR server.

The workflow corresponds to the Cancer Reporting FHIR [Implementation Guide](https://build.fhir.org/ig/HL7/cancer-reporting/Bundle-us-pathology-reporting-bundle-example.html).

## Importing eCR Bundles

Sample bundles are available in this repository.

## Sending Data to the Registry

The CDC maintains a FHIR server that expects expects bundles with a specific structure. The toolkit demonstrated here shows the process of receiving an FHIR bundle and then validating and reformatting it into the structure required by the Cancer Reporting FHIR [Implementation Guide](https://build.fhir.org/ig/HL7/cancer-reporting/Bundle-us-pathology-reporting-bundle-example.html).

This repository also includes a unit test for the conversion, which can be useful as an example.

## Message Bundle Structure

The message bundle has the following structure. Here is documentation on [bundles](https://www.medplum.com/docs/api/fhir/resources/bundle) and [sample bundles](/pathologyFormExamples/). EHRs and other medical systems are typically the source for bundles like these.

├──Message Header

| ├──Collection Bundle

| | ├──Patient

| | ├──Practitioner

| | ├──PractitionerRole

| | ├──DiagnosticReport

| | ├──Observation 1

| | ├──Observation 2

| | ├──Observation \*

## Transaction Bundle Structure

The message bundle has the following structure. Here is documentation on [bundles](https://www.medplum.com/docs/api/fhir/resources/bundle) and [sample bundles](/pathologyFormExamples/). This is what the CDC system expects to receive.

├──Transaction Bundle

| ├──Patient

| | ├──Practitioner

| | ├──PractitionerRole

| | ├──DiagnosticReport

| | ├──Observation 1

| | ├──Observation 2

| | ├──Observation 3

## Medplum Setup

To set up your bot deployment you will need to do the following:

- [Create a Bot](https://app.medplum.com/admin/project) on Medplum, call it `medmorph-bot` and note its `id`. (All Bots in your account can be found [here](https://app.medplum.com/Bot))
- With the `id` of the Bot `id` in hand, add a section to `medplum.config.json` like so

```json
{
  "name": "medmorph-bot",
  "id": "<bot-id>",
  "source": "src/examples/medmorph-bot.ts",
  "dist": "dist/medmorph-bot.js"
}
```

- [Create an ClientApplication](https://app.medplum.com/ClientApplication/new) on Medplum. (All ClientApplications in your account can be found [here](https://app.medplum.com/ClientApplication))
- Create a .env file locally by copying `.env.example` and put the `ClientId` and `ClientSecret` from the `ClientApplication` into the file.
- (Optional) Create an [AccessPolicy](https://app.medplum.com/AccessPolicy) on Medplum that can only read/write Bots and add it to the Bot in the [admin panel](https://app.medplum.com/admin/project).

Create a [Subscription](https://www.medplum.com/docs/subscriptions) on Medplum with criteria "Bundle" and have it trigger the bot you've just created.

Set [bot secrets](https://www.medplum.com/docs/bots/bot-secrets) `MEDMORPH_DEMO_REPORT_ENDPOINT` and `MEDMORPH_DEMO_REPORT_ENDPOINT_AUTH` to the endpoint that the bot should send the final results to.

## Installation

To run and deploy your Bot do the following steps:

Install:

```bash
npm i
```

Build:

```bash
npm run build
```

Test:

```bash
npm t
```

Deploy medmorph bot:

```bash
npx medplum deploy-bot medmorph-bot
```

You will see the following in your command prompt if all goes well:

```bash
Update bot code.....
Success! New bot version: 7fcbc375-4192-471c-b874-b3f0d4676226
Deploying bot...
Deploy result: All OK
```

## Related Reading

- [MedMorph Data Flow](https://build.fhir.org/ig/HL7/fhir-medmorph/usecases.html#interactions-between-medmorph-actors-and-systems) Diagram, this repo represents the Data Health Exchange App
- [MedMorph Specification Bundle](https://build.fhir.org/ig/HL7/fhir-medmorph/StructureDefinition-us-ph-specification-bundle.html)
- [Reference Bot](https://github.com/TopologyHealth/medplum-ecrnow-js)
