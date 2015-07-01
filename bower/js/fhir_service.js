angular.module('FHIRapp.services', [])
.factory('FHIRqueryservice', function($http) {

	var fhirAPI = {};
	var fhir_report_url = "http://fhir.hackathon.siim.org/fhir/DiagnosticReport";
	var fhir_patient_url = "http://fhir.hackathon.siim.org/fhir/Patient";

	fhirAPI.getPatientReports = function(params) {
		return $http.get(fhir_report_url,
		{
			headers: {
            	"Accept" : "application/json"
            },
			params: params
		});	
	}

	fhirAPI.getPatients = function(params) {
		return $http.get(fhir_patient_url,
		{
			headers: {
            	"Accept" : "application/json"
            },
			params: params
		});	
	}

	fhirAPI.getSnapshot = function(url) {
		return $http.get(url,
		{
			headers: {
				"Accept" : "application/json"
			}
		});
	}
/*
fhirAPI.getPatientName = function(subject) {
	var patient_query_url = fhir_patient_url + '?' + subject;
	$http.get(fhir_patient_url,
		{
			headers: {
            	"Accept" : "application/json"
            }
		}).success(function(data) {
			var fullName = {};
			fullName.family = data.entry.name.family[0];
			fullName.given = data.entry.name.given[0];

			return fullName;
		})
	}
*/
	return fhirAPI;


});