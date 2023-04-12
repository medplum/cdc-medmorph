Instance: RosaPatient
InstanceOf: Patient
Usage: #inline
* meta.profile = "http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient"
* extension[0].extension[0].url = "ombCategory"
* extension[=].extension[=].valueCoding = urn:oid:2.16.840.1.113883.6.238#2106-3 "White"
* extension[=].url = "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race"
* extension[+].extension[0].url = "ombCategory"
* extension[=].extension[=].valueCoding = urn:oid:2.16.840.1.113883.6.238#2135-2 "Hispanic or Latino"
* extension[=].extension[+].url = "detailed"
* extension[=].url = "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity"
* identifier[0].system = "http://hl7.org/fhir/sid/us-npi"
* identifier[=].value = "1234567893"
* identifier[+].system = "urn:MRN"
* identifier[=].value = "1EKG4-TEST-RG56"
* name.family = "Gonzalez"
* name.given = "Rosa"
* gender = #female
* telecom[0].system = #phone
* telecom[=].value = "612-364-1723"
* telecom[=].use = #home
* gender = #female
* birthDate = "1967-01-15"
* address.line = "700 W Fullerton Ave, Unit 103"
* address.city = "Minneapolis"
* address.state = "MN"
* address.postalCode = "55480"
* address.country = "US"

Instance: LauraPractitioner
InstanceOf: Practitioner
Usage: #inline
* meta.profile = "http://hl7.org/fhir/us/core/StructureDefinition/us-core-practitioner"
* identifier[0].system = "http://hl7.org/fhir/sid/us-npi"
* identifier[=].value = "1245319599"
* identifier[+].system = "http://someIdentifier.com"
* identifier[=].value = "pathpract1"
* name.family = "Turtzo Sample"
* name.given = "Laura"
* telecom[0].system = #phone
* telecom[=].value = "952-777-3333"
* address.line = "621 Science Drive, ST."
* address.city = "ST. LOUIS PARK"
* address.state = "MN"
* address.postalCode = "55425"
* address.country = "US"

Instance: LauraPractitionerRole
InstanceOf: PractitionerRole
Usage: #inline
* meta.profile = "hhttp://hl7.org/fhir/us/cancer-reporting/StructureDefinition/us-pathology-related-practitioner-role"
* identifier[0].system = "http://someIdentifier.com"
* identifier[=].value = "pathpract1"
* identifier[+].system = "http://hl7.org/fhir/sid/us-npi"
* identifier[=].value = "1245319599"
* code = http://hl7.org/fhir/us/cancer-reporting/ValueSet/us-pathology-provider-types#principal-result-interpreter "Pathologist principally interpreting results on pathology testing"

Instance: AbrahamPractitioner
InstanceOf: Practitioner
Usage: #example
* meta.profile = "http://hl7.org/fhir/us/core/StructureDefinition/us-core-practitioner"
* identifier[0].system = "http://hl7.org/fhir/sid/us-npi"
* identifier[=].value = "1871569939"
* identifier[+].system = "http://someIdentifier.com"
* identifier[=].value = "oncpract1"
* name.family = "Atlas"
* name.given = "Abraham"
* telecom[0].system = #phone
* telecom[=].value = "952-883-6789"

Instance: AbrahamPractitionerRole
InstanceOf: PractitionerRole
Usage: #example
* identifier[+].system = "http://hl7.org/fhir/sid/us-npi"
* identifier[=].value = "1871569939"
* practitioner = Reference(Practitioner/1871569939)
* organization = Reference(Organization/1194881234)
* code = http://terminology.hl7.org/CodeSystem/v2-0443#OP "Ordering Provider"
* telecom.system = #phone
* telecom.value = "720-242-5555"

Instance: EndoSoftPathologyLab
InstanceOf: Organization
Usage: #example
* meta.extension[0].url = "http://hl7.org/fhir/StructureDefinition/instance-name"
* meta.extension[=].valueString = "EndoSoft Pathology Lab"
* meta.extension[+].url = "http://hl7.org/fhir/StructureDefinition/instance-description"
* meta.extension[=].valueMarkdown = "This is the EndoSoft Pathology Lab for the HIMSS 2023 Treating the Whole Person Showcase."
* meta.profile = "http://hl7.org/fhir/us/core/StructureDefinition/us-core-organization"
* identifier.system = "urn:oid:2.16.840.1.113883.4.7"
* identifier.value = "12D3456789"
* active = true
* type = http://terminology.hl7.org/CodeSystem/organization-type#prov "Healthcare Provider"
* name = "EndoSoft Pathology Lab"
* telecom.system = #phone
* telecom.value = "952-777-3333"
* address.line = "621 Science Drive, ST."
* address.city = "ST. LOUIS PARK"
* address.state = "MN"
* address.postalCode = "55425"
* address.country = "USA"

Instance: GastroenterologistCenterOrganization
InstanceOf: Organization
Usage: #example
* meta.extension[0].url = "http://hl7.org/fhir/StructureDefinition/instance-name"
* meta.extension[=].valueString = "GastroenterologistCenter"
* meta.extension[+].url = "http://hl7.org/fhir/StructureDefinition/instance-description"
* meta.extension[=].valueMarkdown = "This is the Gastroenterologist Center for the HIMSS 2023 Treating the Whole Person Showcase."
* meta.profile = "http://hl7.org/fhir/us/core/StructureDefinition/us-core-organization"
* identifier[0].system = "http://hl7.org/fhir/sid/us-npi"
* identifier[=].value = "1194881234"
* active = true
* type = http://terminology.hl7.org/CodeSystem/organization-type#prov "Healthcare Provider"
* name = "Gastroenterologist Center"
* telecom[0].system = #phone
* telecom[=].value = "952-883-1212"
* address.line = "3000 32nd AVE"
* address.city = "Minneapolis"
* address.state = "MN"
* address.postalCode = "55425"
* address.country = "USA"

Instance: ColorectalServiceRequest
InstanceOf: ServiceRequest
Usage: #example
* status = #active
* intent = #order
* category = http://snomed.info/sct#386053000 "Evaluation procedure (procedure)"
* code = http://snomed.info/sct#50322008 "Surgical pathology specimen, clerical procedure including coding of diagnoses"
* subject = Reference(Patient/1EKG4-TEST-RG56)
* requester = Reference(Practitioner/1871569939)