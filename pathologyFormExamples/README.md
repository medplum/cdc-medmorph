# Examples

This markdown file explains what each example in this folder is. There are two categories of samples.

1. Sample protocols published by CAP
2. FHIR Bundles
   a. Transaction Bundles produced by EHRs
   b. Message Bundle samples designed for transmission to the CDC FHIR Server

## CAP electronic Cancer Protocols

The following are examples of [CAP Protocols](https://www.cap.org/protocols-and-guidelines/electronic-cancer-protocols). The output of the protocols is [IG](https://build.fhir.org/ig/HL7/ihe-sdc-ecc-on-fhir/)

### Filled_ColorectalBx.xml

This file is an example of a colorectal biopsy electronic cancer protocol from the College of American Pathologists.

### Filled_ColoRectal.Res.xml

This file is an example of a colorectal resection electronic cancer protocol from the College of American Pathologists.

### FilledForHIMSSColon.Bmk.228_1.002.001.REL_sdcFDF.xml

This file is an example of a colorectal biomarker electronic cancer protocol from the College of American Pathologists.

## FHIR Bundles

All of these bundles are FHIR R4 bundles which can be used for testing. The transaction bundles are meant to be passed to the MedPlum bot and the Message bundles are example output

### MsgBundle_ColorectalBx.json

Example output of what needs to be sent to the CDC

### Bundle-TxBundleColorectalBx.json

Example input bundle for Colorectal Biopsy

### Bundle-TxBundleColorectalRes.json

Example input bundle for Colorectal Resection

### Bundle-TxBundleColorectalBK.json

Example input bundle for Colorectal BMK
